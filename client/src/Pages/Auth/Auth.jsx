import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Button, InputField } from "../../Components";
import { authSchema } from "../../Utils/Validators/auth.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "../../Utils/api/axios";
import {
  SIGN_IN_ENPOINT,
  SIGN_UP_ENPOINT,
} from "../../Utils/api/api_endpoints";
import toast from "react-hot-toast";
import handleApiError from "../../Utils/api/handle_api_error";

function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data) => {
    console.log("✅ Form Data:", data);
    try {
      setLoading(true);
      const response = await sendConditionalRequest(data);
      console.log("RES--", response);

      const result = response.data;
      if (!result.success) {
        console.error(result.message);
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      console.log("request successful", result.message);
    } catch (error) {
      handleApiError(error, isSignIn ? SIGN_IN_ENPOINT : SIGN_UP_ENPOINT);
    } finally {
      setLoading(false);
    }
  };

  async function sendConditionalRequest(data) {
    return isSignIn
      ? await axiosInstance.post(SIGN_IN_ENPOINT, data, {
          withCredentials: true,
        })
      : await axiosInstance.post(SIGN_UP_ENPOINT, data);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2
          style={{
            fontSize: "1.75rem",
            marginBottom: "0.5rem",
            color: "#333",
            textAlign: "center",
          }}
        >
          {isSignIn ? "Welcome Back 👋" : "Join ToDo Board 🚀"}
        </h2>

        <p
          style={{
            fontSize: "0.95rem",
            color: "#666",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          {isSignIn
            ? "Login to stay productive and manage your tasks effortlessly."
            : "Create a new account to organize and collaborate in real-time."}
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            {...register("email")}
            label="Email"
            placeholder="Enter your email"
            name="email"
          />
          {errors.email && (
            <p style={{ color: "red", margin: "4px 0 10px" }}>
              {errors.email.message}
            </p>
          )}

          <InputField
            {...register("password")}
            label="Password"
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            name="password"
            endIcon={
              showPassword ? (
                <EyeOff
                  size={18}
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Eye
                  size={18}
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(true)}
                />
              )
            }
          />

          {errors.password && (
            <p style={{ color: "red", margin: "4px 0 10px" }}>
              {errors.password.message}
            </p>
          )}

          <div style={{ marginTop: "1.5rem", marginBottom: "1rem" }}>
            <Button type="submit" disabled={loading}>
              {loading
                ? "Loading ...."
                : isSignIn
                ? "Log In"
                : "Create Account"}
            </Button>
          </div>
        </form>

        <p style={{ fontSize: "0.9rem", textAlign: "center", color: "#555" }}>
          {isSignIn ? "New here?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsSignIn(!isSignIn)}
            style={{
              color: "#646cff",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            {isSignIn ? "Create an account" : "Log in instead"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
