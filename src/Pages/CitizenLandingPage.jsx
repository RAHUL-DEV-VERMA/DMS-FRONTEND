import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import CitizenNavbar from './CitizenNavbar';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function CitizenLandingPage() {
  const navigate = useNavigate();
  const [citizen, setCitizen] = useState(null);  // Single citizen data
  const [devices, setDevices] = useState([]);    // Device data associated with the citizen
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem("user"));
  const loginId = user ? user.id : null;
  const loginName = user ? user.firstName + " " + user.lastName : null;

  const fetchCitizenData = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert("Please log in first.");
      navigate('/');
      return;
    }

    setLoading(true);

    try {
      // Fetch citizen profile data
      const citizenResponse = await axios.get(`${BACKEND_URL}/user/profile/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCitizen(citizenResponse.data.user);

      // Fetch devices associated with this citizen
      const deviceResponse = await axios.get(`${BACKEND_URL}/user/device/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDevices(deviceResponse.data.devices);  // Assume response contains an array of devices
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCitizenData();
  }, []);

  const handleNavigate = () => {
    navigate(`/changepassword/${id}`);
  };

  return (
    <div className="flex min-h-screen">
      {/* Fixed Sidebar */}
      <CitizenNavbar userName={loginName} id={loginId} />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8 bg-gray-100 overflow-auto">
        <div className="container mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold mb-2">Welcome to Your Profile</h1>
            <p className="text-black text-lg">View Your Details</p>
          </div>

          {loading ? (
            <div className="text-center text-black text-lg">Loading data...</div>
          ) : (
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
              {/* Citizen Data Table */}
              <table className="min-w-full text-black bg-white rounded-lg">
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
                  {citizen ? (
                    <tr className="bg-gray-50 border-b border-gray-200 hover:bg-gray-100">
                      <td className="px-6 py-4 text-center">{citizen.userId}</td>
                      <td className="px-6 py-4 text-center">{citizen.firstName}</td>
                      <td className="px-6 py-4 text-center">{citizen.lastName}</td>
                      <td className="px-6 py-4 text-center">{citizen.mobile}</td>
                      <td className="px-6 py-4 text-center">{citizen.emailId}</td>
                      <td className="px-6 py-4 text-center">{citizen.gender}</td>
                      <td className="px-6 py-4 text-center">{citizen.aadharNo}</td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-gray-700">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Device Information */}
              {devices.length > 0 && (
                <div className="mt-8 p-6 bg-white shadow-md rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4">Device Information</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm bg-white rounded-lg">
                      <thead className="text-xs font-semibold  uppercase bg-gray-200">
                        <tr>
                          <th className="px-6 py-3 text-center">Device Number</th>
                          <th className="px-6 py-3 text-center">Device Model</th>
                          <th className="px-6 py-3 text-center">Device Information</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {devices.map((device) => (
                          <tr key={device._id} className="hover:bg-gray-100">
                            <td className="px-6 py-3 text-center">{device.deviceNo}</td>
                            <td className="px-6 py-3 text-center">{device.deviceMdl}</td>
                            <td className="px-6 py-3 text-center">{device.deviceInfo}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}


            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CitizenLandingPage;
