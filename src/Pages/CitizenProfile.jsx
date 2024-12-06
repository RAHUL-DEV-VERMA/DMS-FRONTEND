import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Fetch user ID from params
import axios from "axios"; // Use axios for API requests
import AdminSidebar from "./AdminSidebar";
import { FaPlus } from "react-icons/fa";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CitizenProfile = () => {
  const [citizenData, setCitizenData] = useState({});
  const [deviceData, setDeviceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { id } = useParams(); // Extract the user ID from the route params
  const navigate = useNavigate();

  const token = localStorage.getItem("token"); // Retrieve token from localStorage

  const user = JSON.parse(localStorage.getItem("user"));
  const loginId = user ? user.id : null;
  const loginName = user ? user.firstName + " " + user.lastName : null;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/profile/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { user } = response.data;
        setCitizenData({
          firstName: user.firstName,
          lastName: user.lastName,
          mobile: user.mobile,
          emailId: user.emailId,
          gender: user.gender,
          aadharNumber: user.aadharNo,
          userId: user.userId,
        });

        setDeviceData(user.deviceId || []); // Devices will be populated
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, token]);

  const handleAddDevice = () => {
    navigate(`/device-issue/${id}`); // Navigate to add device page
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
     
        {/* Sidebar Header */}
       
        {/* Sidebar Content */}
        <div>
          <AdminSidebar userName={loginName} id={loginId} />
        </div>
     

      {/* Overlay for Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 sm:ml-64 p-6">
        {/* Header for Small Screens */}
     

        {/* Main Heading */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-2">Citizen Profile</h1>
          <p className="text-gray-700 text-lg">View Citizen Information</p>
        </div>

        {/* Citizen Information Table */}
        <div className="overflow-x-auto shadow-md sm:rounded-lg mb-8">
          <table className="min-w-full text-gray-700 bg-white rounded-lg">
            <thead className="text-xs font-semibold text-gray-700 uppercase bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-center">User Id</th>
                <th className="px-6 py-3 text-center">First Name</th>
                <th className="px-6 py-3 text-center">Last Name</th>
                <th className="px-6 py-3 text-center">Mobile Number</th>
                <th className="px-6 py-3 text-center">Email Address</th>
                <th className="px-6 py-3 text-center">Gender</th>
                <th className="px-6 py-3 text-center">Aadhar Card Number</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50 border-b border-gray-200 hover:bg-gray-100">
                <td className="px-6 py-4 text-center">{citizenData.userId}</td>
                <td className="px-6 py-4 text-center">{citizenData.firstName}</td>
                <td className="px-6 py-4 text-center">{citizenData.lastName}</td>
                <td className="px-6 py-4 text-center">{citizenData.mobile}</td>
                <td className="px-6 py-4 text-center">{citizenData.emailId}</td>
                <td className="px-6 py-4 text-center">{citizenData.gender}</td>
                <td className="px-6 py-4 text-center">{citizenData.aadharNumber}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Add Device Button */}
        <div className="flex justify-end mb-2">
  <button
    onClick={handleAddDevice}
    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
  >
    <FaPlus className="mr-2" /> Issue Device
  </button>
</div>


        {/* Device Information */}
      

        {/* Device Information Table */}
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full text-gray-700 bg-white rounded-lg">
            <thead className="text-xs font-semibold text-gray-700 uppercase bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-center">Device No</th>
                <th className="px-6 py-3 text-center">Device Model</th>
                <th className="px-6 py-3 text-center">Device Information</th>
              </tr>
            </thead>
            <tbody>
              {deviceData.map((device) => (
                <tr
                  key={device._id}
                  className="bg-gray-50 border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="px-6 py-4 text-center">{device.deviceNo}</td>
                  <td className="px-6 py-4 text-center">{device.deviceMdl}</td>
                  <td className="px-6 py-4 text-center">{device.deviceInfo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CitizenProfile;
