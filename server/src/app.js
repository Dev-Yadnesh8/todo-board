import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CORS_ORIGIN_DEV } from "./constants.js";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || CORS_ORIGIN_DEV,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true })); // "extended" true allows nested objects
app.use(cookieParser());

app.get("/",(req,res)=>{
  res.status(200).json({message:"Hello World"})
})


export { app };
