import React, { useState, useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FiHome, FiList, FiLock, FiLogOut, FiArrowRight, FiArrowLeft, FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AdminSidebar = ({ userName, id }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true); 
  const [isMobile, setIsMobile] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); 
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); 
  const [isLoggingOut, setIsLoggingOut] = useState(false); 

  

  // Check if the screen size is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Mobile screen size (adjust as needed)
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize on load
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navigation handler
  const handleNavigate = (path) => {
    navigate(path);
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
        window.location.href = "/";
        setShowSuccessMessage(false);
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

  // Toggle Sidebar Open/Close
  const toggleSidebar = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className="relative flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-40 w-64 transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        {/* User Profile Section */}
        <div className="px-3 py-3 bg-blue-700 text-white flex flex-col justify-center items-center">
          <div
            className="p-4 rounded-full bg-white shadow-lg cursor-pointer"
            onClick={() => handleNavigate(`/citizenlandingpage/${id}`)}
          >
            <AiOutlineUser size={12} className="text-blue-500" />
          </div>
          <h1 className="text-lg font-semibold truncate mt-2">{userName || "Guest"}</h1>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6 space-y-4 px-6">
          {[ 
            { label: "Home", path: `/adminlandingpage/${id}`, icon: <FiHome /> },
            { label: "View DMs", path: "/adminDmView", icon: <FiList /> },
            { label: "View Citizens", path: "/adminCitizenView", icon: <FiList /> },
            { label: "View Devices", path: "/view-device", icon: <FiList /> },
            { label: "Change Password", path: `/changepassword/${id}`, icon: <FiLock /> },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigate(item.path)}
              className="flex items-center space-x-4 w-full py-3 px-4 text-sm text-gray-700 hover:bg-blue-100 rounded-lg transition"
            >
              {item.icon}
              <span className="truncate">{item.label}</span>
            </button>
          ))}
          
          {/* Add Create Button */}
          <button
            onClick={() => handleNavigate('/createuser')}
            className="flex items-center space-x-4 w-full py-3 px-4 text-sm text-gray-700 hover:bg-blue-100 rounded-lg transition"
          >
            <FiUserPlus size={20} />
            <span className="truncate">Create Users</span>
          </button>
        </nav>

        {/* Logout Button */}
        <div className="mt-6 px-6">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-4 w-full py-3 px-4 text-sm text-gray-700 hover:bg-red-100 rounded-lg transition"
          >
            <FiLogOut size={20} />
            <span className="truncate">Log Out</span>
          </button>
        </div>
      </div>

      {/* Arrow Button to Toggle Sidebar (Only for Mobile) */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className={`fixed top-1/2 transform -translate-y-1/2 ${isOpen ? 'right-0' : 'left-0'} z-50 p-3 bg-blue-500 text-white rounded-full shadow-lg transition-all duration-300`}
        >
          {isOpen ? <FiArrowLeft size={24} /> : <FiArrowRight size={24} />}
        </button>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold text-red-700 mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-4">Are you Sure want to log out?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                disabled={isLoggingOut} // Disable while logging out
              >
                {isLoggingOut ? "Logging out..." : "Yes, Cofirm"}
              </button>
              <button
                onClick={cancelLogout}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                No , Thanks
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

export default AdminSidebar;