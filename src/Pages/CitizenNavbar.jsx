import React, { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { FiHome, FiLock, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CitizenNavbar = ({ userName = "Guest", id }) => {
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Show confirmation modal
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Show success message
  const [isLoggingOut, setIsLoggingOut] = useState(false); // To disable the button while logging out

  // Navigation handlers
  const handleNavigate = (path) => {
    if (path) navigate(path);
  };

  // Logout handler
  const handleLogout = async () => {
    setShowConfirmModal(true); // Show confirmation modal
  };

  // Confirm Logout
  const confirmLogout = async () => {
    setIsLoggingOut(true); // Disable the button while logging out
    try {
      await axios.post(`${BACKEND_URL}/user/logout`, {}, { withCredentials: true });
      localStorage.removeItem("token");

      // Show success message
      setShowSuccessMessage(true);
      
      // Wait for 0.5 seconds before redirecting
      setTimeout(() => {
        setShowSuccessMessage(false);
        navigate("/"); // Redirect to home page after logout
      }, 300);
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred during logout. Please try again.");
    }
  };

  // Cancel Logout
  const cancelLogout = () => {
    setShowConfirmModal(false); // Hide the confirmation modal
  };

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg flex flex-col justify-between z-50">
      {/* Upper Section: User Profile */}
      <div className="p-6">
        <div
          className="flex items-center space-x-4 cursor-pointer group"
          onClick={() => handleNavigate(`/citizenlandingpage/${id}`)}
        >
          <div className="bg-gray-200 p-4 rounded-full shadow-lg group-hover:bg-blue-500 transition">
            <AiOutlineUser size={48} className="text-gray-700 group-hover:text-white" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-500 transition">
            {userName}
          </h2>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col space-y-4 px-6">
        <button
          onClick={() => handleNavigate(`/citizenlandingpage/${id}`)}
          className="flex items-center space-x-4 py-3 px-4 text-gray-700 hover:text-blue-500 transition hover:bg-gray-100 rounded-lg"
        >
          <FiHome size={20} />
          <span>Home</span>
        </button>
        <button
          onClick={() => handleNavigate(`/contact`)}
          className="flex items-center space-x-4 py-3 px-4 text-gray-700 hover:text-blue-500 transition hover:bg-gray-100 rounded-lg"
        >
          <FiLock size={20} />
          <span>Contact Us</span>
        </button>
        <button
          onClick={() => handleNavigate(`/changepassword/${id}`)}
          className="flex items-center space-x-4 py-3 px-4 text-gray-700 hover:text-blue-500 transition hover:bg-gray-100 rounded-lg"
        >
          <FiLock size={20} />
          <span>Change Password</span>
        </button>
      </div>

      {/* Logout Button */}
      <div className="px-6 pb-6">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-4 py-3 px-4 w-full text-gray-700 hover:text-red-500 transition hover:bg-red-100 rounded-lg"
        >
          <FiLogOut size={20} />
          <span>Log Out</span>
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                disabled={isLoggingOut} // Disable while logging out
              >
                {isLoggingOut ? "Logging out..." : "Yes, Log out"}
              </button>
              <button
                onClick={cancelLogout}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Message Popup */}
      {showSuccessMessage && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg max-w-xs w-full text-center">
            <p className="text-lg">Logout successful!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CitizenNavbar;
