import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import './Style.css'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AdminLanding = () => {
  let { id } = useParams();

  const [counts, setCounts] = useState({
    totalDM: 0,
    totalAdmin: 0,
    totalCitizen: 0,
    totalDevices: 0,
  });
  const [username, setUsername] = useState(""); // State to store the username
  const token = localStorage.getItem("token"); // Get the token from localStorage

  // Fetch totals
  const fetchTotals = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/totals`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCounts(response.data); // Update counts state
    } catch (error) {
      console.error("Error fetching totals:", error.response?.data || error.message);
    }
  };

  // Fetch the user profile
  const fetchUserProfile = async () => {
    if (!token) {
      console.error("Error: Token is missing");
      return;
    }

    try {
      const response = await axios.get(`${BACKEND_URL}/user/profile/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsername(response.data.user.firstName); // Set username
    } catch (error) {
      console.error("Error fetching user profile:", error.response?.data || error.message);
    }
  };

  // Run fetch functions on component mount
  useEffect(() => {
    fetchTotals();
    fetchUserProfile();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="md:w-64 w-full bg-white shadow-lg z-40">
        <AdminSidebar userName={username} id={id} />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <header className="mb-6 text-center space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 animate-fadeInDown">
            Welcome to the Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600 animate-slideIn">
            Manage DMs, Citizens, and Devices seamlessly.
          </p>
        </header>

        {/* Dashboard Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to='/adminDmView'>
            <div className="w-full p-4 rounded-lg shadow-lg flex items-center justify-center bg-indigo-500 cursor-pointer">
              <div className="text-center">
                <span className="block text-xl sm:text-2xl font-semibold text-white">Total DMs</span>
                <span className="text-3xl sm:text-4xl font-bold text-white">{counts.totalDM}</span>
              </div>
            </div>
          </Link>

          <Link to='/adminCitizenView'>      <div className="w-full p-4 rounded-lg shadow-lg flex items-center justify-center bg-teal-500 cursor-pointer">
            <div className="text-center">
              <span className="block text-xl sm:text-2xl font-semibold text-white">Total Citizens</span>
              <span className="text-3xl sm:text-4xl font-bold text-white">{counts.totalCitizen}</span>
            </div>
          </div>   </Link>

          <Link to='/view-device'>
            <div className="w-full p-4 rounded-lg shadow-lg flex items-center justify-center bg-gray-500 cursor-pointer">
              <div className="text-center">
                <span className="block text-xl sm:text-2xl font-semibold text-white">Total Devices</span>
                <span className="text-3xl sm:text-4xl font-bold text-white">{counts.totalDevices}</span>
              </div>
            </div>
          </Link>

          <Link to='/showadmin'> <div className="w-full p-4 rounded-lg shadow-lg flex items-center justify-center bg-blue-800 cursor-pointer">
            <div className="text-center">
              <span className="block text-xl sm:text-2xl font-semibold text-white">Total Admins</span>
              <span className="text-3xl sm:text-4xl font-bold text-white">{counts.totalAdmin}</span>
            </div>
          </div>    </Link>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-8 justify-center ">
          <button className="flex items-center bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-400 transition-all duration-300">
            <Link to="/createuser">
              <i className="fas fa-plus mr-2"></i> Create User
            </Link>
          </button>

          <button className="flex items-center bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-400 transition-all duration-300">
            <Link to="/adminDmView">
              <i className="fas fa-eye mr-2"></i> View DMs
            </Link>
          </button>

          <button className="flex items-center bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-400 transition-all duration-300">
            <Link to="/view-device">
              <i className="fas fa-eye mr-2"></i> View Devices
            </Link>
          </button>
          <button className="flex items-center bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-400 transition-all duration-300">
            <Link to="/adminCitizenView">
              <i className="fas fa-users mr-2"></i> View Citizens
            </Link>
          </button>
          <button className="flex items-center bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-400 transition-all duration-300">
            <Link to="/showadmin">
              <i className="fas fa-eye mr-2"></i> View Admins
            </Link>
          </button>
          <button className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 transition-all duration-300">
            <Link to="/add-device">
              <i className="fas fa-desktop mr-2"></i> Add Device
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLanding;
