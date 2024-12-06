import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { FiHome, FiUserPlus, FiList, FiLock, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ChangePasswordNavbar = ({ userName, id }) => {
  const navigate = useNavigate();

  // Navigation handlers
  const handleNavigate = (path) => {
    navigate(path);
  };
  const handleNavigateBack = () => {
    navigate(-1); // Go back one step in the history stack
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;

    try {
      await axios.post(`${BACKEND_URL}/user/logout`, {}, { withCredentials: true });
      localStorage.removeItem("token");
      alert("You have been logged out.");
      window.location.href = "/";
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred during logout. Please try again.");
    }
  };

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg flex flex-col justify-between z-50">
      {/* Upper Section: User Profile */}
      <div className="p-6">
        {/* Profile Picture */}
        <div
          className="flex items-center space-x-4 cursor-pointer group"
          onClick={() => handleNavigate(`/citizenlandingpage/${id}`)} // Navigate to user profile
        >
          <div className="bg-gray-200 p-4 rounded-full shadow-lg group-hover:bg-blue-500 transition">
            <AiOutlineUser size={48} className="text-gray-700 group-hover:text-white" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-500 transition">
            {userName || "Guest"}
          </h2>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col space-y-4 px-6">
      <button
          onClick={handleNavigateBack} 
          className="flex items-center space-x-4 py-3 px-4 text-gray-700 hover:text-blue-500 transition hover:bg-gray-100 rounded-lg"
        >
          <FiLock size={20} />
          <span>Home</span>
        </button>
        <button
          onClick={() => handleNavigate(`/contact`)}
          className="flex items-center space-x-4 py-3 px-4 text-gray-700 hover:text-blue-500 transition hover:bg-gray-100 rounded-lg"
        >
          <FiLock size={20} />
          <span>Contact Us</span>
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
    </div>
  );
};

export default ChangePasswordNavbar;
