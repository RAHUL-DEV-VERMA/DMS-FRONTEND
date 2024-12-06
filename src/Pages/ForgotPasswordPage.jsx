import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter a valid email address.");
      return;
    }
    
    try {
      const response = await axios.post(`${BACKEND_URL}/user/forgot-password`, { email });
      setMessage(response.data.message);
      setEmail(""); // Reset email input field after success
      setIsModalOpen(true); // Open the modal on success
    } catch (error) {
      setError(error.response?.data?.message || "Failed to send reset link.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal when OK is clicked
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          Forgot Password
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          
          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none transition"
            >
              Send Reset Link
            </button>
          </div>
        </form>
      </div>

      {/* Modal for success message */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm text-center">
            <p className="text-green-500 text-lg">{message || "Reset link sent successfully!"}</p>
            <button
              onClick={closeModal}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg focus:outline-none"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
