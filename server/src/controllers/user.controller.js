import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import UserValidator from "../validator/auth.validator.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import { cookieOptions } from "../constants.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    // console.log(error);
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

const signUp = asyncHandler(async (req, res) => {
  //Step1: Get data form user and validate it using zod
  const result = UserValidator.validateSignUp(req.body);
  console.log("Controller result", result);

  if (!result.success) {
    throw new ApiError(422, "Validation failed", result.errors);
  }

  //Step2: Check if user with same creds exist or not
  const { email, password } = result.data;

  // Step2 : Check if user already exist
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(
      409,
      "Email is already in use. Please use a different email, or log in."
    );
  }
  //Step3: Create user and store in db
  const user = await User.create({
    email,
    password,
  });
  //Step4: Check if user is created or not ( if yes then remove password and refresh token fields form response )
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(
      500,
      "Something went wrong while creating the user. Please try again later."
    );
  }

  //Step5: Send the user response
  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        "Your account has been created successfully.",
        createdUser
      )
    );
});

const signIn = asyncHandler(async (req, res) => {
  //Step1 : Get data from user and validate it using zod.
  const result = UserValidator.validateSignUp(req.body);

  if (!result.success) {
    throw new ApiError(422, "Validation error", result.errors);
  }

  //Step2: Check if user existis or not.
  const { email, password } = result.data;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(
      404,
      "It looks like you don’t have an account yet. Please sign up."
    );
  }

  //Step3 : Validate user credintials with backend credintials.
  const isPasswordCorrect = await user.checkPassword(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password. Please try again.");
  }

  //Step4: Generate Tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //Step6 : Send token & response

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(200, "SignIn Successful", {
        accessToken,
        refreshToken,
        user: loggedInUser,
      })
    );
});

const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $set: { refreshToken: undefined } },
    { new: true }
  );

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, "User logout successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const userRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
  console.log("User Refresh Token", userRefreshToken);
  if (!userRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }
  try {
    const decodedToken = jwt.verify(
      userRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "User not found. Invalid refresh token.");
    }

    if (userRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "Refresh token expired or already used");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
        new ApiResponse(200, "Tokens refreshed successfully", {
          user: loggedInUser,

          accessToken,
          refreshToken,
        })
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

export { signUp, signIn, logout, refreshAccessToken };
