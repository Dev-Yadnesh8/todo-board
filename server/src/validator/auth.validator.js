import z,{ZodError} from "zod";

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[@$!%*?&]/, "Password must contain at least one special character");

const emailSchema = z.email("Please enter a valid email");

const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

class UserValidator {
  static validateSignUp(data) {
    // console.log("Raw data", data);

    const result = signUpSchema.safeParse(data);
    // console.log("result data", result?.error?.issues);

    if (!result.success) {
      const errors = result.error.issues.reduce((acc, err) => {
        const field = err.path[0];
        acc[field] = err.message;
        return acc;
      }, {});
      return { success: false, errors };
    }
    return { success: true, data: result.data };
  }
}

export default UserValidator;
