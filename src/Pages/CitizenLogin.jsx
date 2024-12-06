import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup'; // For form validation
import Navbar from './Navbar';

// Backend URL (adjust it according to your environment)
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CitizenLogin = () => {

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // State for form fields
  const [formData, setFormData] = useState({ userId: '', password: '' });
  const [errors, setErrors] = useState({});

  // Validation schema
  const validationSchema = Yup.object().shape({
    userId: Yup.string().required('User ID is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  });

  // Mutation for login
  const loginMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`${BACKEND_URL}/user/login`, data);
      return response.data;
    },
    onSuccess: (data) => {
      // Store the token and user info in local storage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log("Login successful:", data);

      // Navigate to citizen landing page
      navigate(`/citizenlandingpage/${data.user.id}`);
    },
    onError: (error) => {
      setErrors({ general: error.response?.data?.message || 'Login failed' });
    },
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate form data
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({}); // Clear previous errors

      // Trigger login mutation
      loginMutation.mutate(formData);
    } catch (validationErrors) {
      // Map Yup validation errors to state
      const validationErrorsMap = {};
      validationErrors.inner.forEach((err) => {
        validationErrorsMap[err.path] = err.message;
      });
      setErrors(validationErrorsMap);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 flex flex-col">
        {/* Main Content */}
        <div className="relative flex flex-1 items-center justify-center bg-transparent py-10">
          <div className="flex justify-center self-center z-10">
            <div className="p-8 bg-white rounded-3xl w-96 shadow-lg">
              <div className="mb-7">
                <h3 className="text-2xl font-semibold text-gray-800 text-center">Citizen Sign In</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User ID Input */}
                <div>
                  <input
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    placeholder="User ID"
                    className="w-full px-4 py-3 text-sm bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                  {errors.userId && <p className="text-red-600 text-sm">{errors.userId}</p>}
                </div>

                {/* Password Input */}
                <div className="relative">
      <input
        type={showPassword ? "text" : "password"} // Toggles input type
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        className="w-full px-4 py-3 text-sm bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)} // Toggles visibility
        className="absolute right-3 top-4 text-gray-600  hover:bg-gray-200 hover:border-gray-200"
      >
        {showPassword ? (
          <i className="fa fa-eye-slash"></i> // Eye-slash icon
        ) : (
          <i className="fa fa-eye"></i> // Eye icon
        )}
      </button>
    </div>

                {/* General Error */}
                {errors.general && <p className="text-red-600 text-sm">{errors.general}</p>}

                {/* Sign-In Button */}
                <div className="flex justify-between">
                 <a href="/forgot-password" className="text-sm text-purple-700 hover:underline">
                   Forgot your password?
                 </a>
               </div>
                <button
                  type="submit"
                  disabled={loginMutation.isLoading}
                  className="w-full py-3 bg-purple-800 hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-300"
                >
                  {loginMutation.isLoading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CitizenLogin;
