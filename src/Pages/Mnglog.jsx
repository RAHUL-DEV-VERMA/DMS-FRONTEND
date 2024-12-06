import React,{useState} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import log from '../img/log.png'

// Backend URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const LoginForm = () => {

  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  // Validation schema for react-hook-form with Yup
  const validationSchema = Yup.object().shape({
    userId: Yup.string().required("User ID is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });


  // Mutation for login
  const loginMutation = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await axios.post(`${BACKEND_URL}/user/login`, data);
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || "Login failed");
      }
    },
    onSuccess: (data) => {
      // Store the token and user info in local storage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Navigate to the dashboard
      if (data.user.role === "DM") {
        navigate(`/dmlandingpage/${data.user.id}`, { replace: true });
      } else if (data.user.role === "ADMIN") {
        navigate(`/adminlandingpage/${data.user.id}`, { replace: true });
      } else {
        console.error("Invalid role:", data.user.role);
        // Optionally, redirect to a default or error page
        navigate("/", { replace: true });
      }
      console.log(data.user.role)

    },
    onError: (error) => {
      // Show error message
      alert(error.message || "Login failed. Please try again.");
    },
  });

  // Form submission handler
  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <>
    <Navbar/>
    <section className="h-screen rounded shadow-lg">
      <div className="container  ">
        <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
          {/* Left column with image */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src={log}
              className="w-full"
              alt="Illustration"
            />
          </div>

          {/* Right column with form */}
          <div className="md:w-8/12 lg:ms-6 lg:w-5/12 mb-24">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* User ID Input */}
              <div className="relative mb-6">
                <input
                  type="text"
                  {...register("userId")}
                  className="peer block w-full rounded border px-3 py-2 leading-[2.15] outline-none transition-all focus:ring focus:ring-primary"
                  placeholder="User ID"
                />
                {errors.userId && (
                  <p className="text-red-600 text-sm">{errors.userId.message}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="relative mb-6">
  <input
    type={showPassword ? "text" : "password"} // Use the same state variable for visibility
    {...register("password")}
    className="peer block w-full rounded border px-3 py-2 leading-[2.15] outline-none transition-all focus:ring focus:ring-primary"
    placeholder="Password"
  />
  {errors.password && (
    <p className="text-red-600 text-sm">{errors.password.message}</p>
  )}

  {/* Eye Icon */}
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)} // Update the correct state
    className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:bg-white"
  >
    {showPassword ? "🙈" : "👁"} {/* Toggle icon based on state */}
  </button>
</div>


              {/* Remember Me Checkbox */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className="mr-2"
                  />
                  <label htmlFor="rememberMe">Remember me</label>
                </div>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || loginMutation.isLoading}
                className="w-full rounded bg-primary px-4 py-2 text-white font-semibold hover:bg-primary-dark transition"
              >
                {loginMutation.isLoading ? "Signing in..." : "Sign In"}
              </button>
             
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default LoginForm;
