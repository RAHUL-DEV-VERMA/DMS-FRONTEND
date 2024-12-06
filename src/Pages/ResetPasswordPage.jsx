import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ResetPasswordPage = () => {
  const { id, token } = useParams(); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // To show success popup
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/user/reset-password/${id}/${token}`, 
        { password }
      );
      setMessage(response.data.message);
      setError("");
      setShowSuccessPopup(true); // Show success popup

      setTimeout(() => {
        setShowSuccessPopup(false); // Hide success popup after 3 seconds
        navigate("/"); // Redirect to home page
      }, 3000);
    } catch (err) {
      if (err.response?.data?.message === "Link has expired") {
        setError("The link has expired. Please request a new one.");
      } else {
        setError(err.response?.data?.message || "Failed to reset password.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          Reset Password
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium">
              New Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          {/* Success Message Popup */}
          {showSuccessPopup && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-green-500 text-white rounded-lg shadow-lg z-50">
              {message}
            </div>
          )}

          {/* Success Message */}
          {message && !showSuccessPopup && (
            <p className="text-green-500 text-sm mt-1">{message}</p>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none transition"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
