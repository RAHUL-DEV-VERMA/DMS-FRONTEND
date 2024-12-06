import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const DeviceIssueForm = () => {
  const { id } = useParams();  // Get user ID from the URL
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState(null); // To store fetched user profile
  const [deviceList, setDeviceList] = useState([]); // Initialize as an empty array
  const [deviceIssueData, setDeviceIssueData] = useState({
    selectedDevice: ''
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // For Success Message

  const user = JSON.parse(localStorage.getItem("user"));
  const loginId = user ? user.id : null; 
  const loginName = user ? user.firstName + " " +user.lastName : null; 

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/profile/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        
        setUserProfile(response.data.user);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    const fetchDeviceList = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/all-devices`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        
        // Ensure the response is an array
        console.log(response.data.data)
        setDeviceList(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        console.error('Error fetching device list:', error);
      }
    };

    fetchUserProfile();
    fetchDeviceList();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeviceIssueData({
      ...deviceIssueData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { selectedDevice } = deviceIssueData;

    try {
      const response = await axios.post(
        `${BACKEND_URL}/user/issue-device/${id}`,
        { deviceId: selectedDevice },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      if (response.status === 200) {
        console.log('Device Issued:', response.data);
        setShowSuccessMessage(true);
      }
    } catch (error) {
      console.error('Error issuing device:', error);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessMessage(false);
    navigate(-2); // Go back to the previous page
  };

  return (
    <>
      <AdminSidebar userName={loginName} id={loginId} />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
          {/* Header Section with Icon */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-indigo-700">Device Issue Form</h1>
            <p className="text-gray-600 mt-2">Help us resolve your device issue quickly.</p>
          </div>

          {/* Citizen Information */}
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <p className="text-gray-700">
              <strong>Citizen Name:</strong> {userProfile?.firstName} {userProfile?.lastName}
            </p>
            <p className="text-gray-700">
              <strong>Citizen Email:</strong> {userProfile?.emailId}
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit}>
            {/* Device Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Select Device</label>
              <div className="relative">
                <select
                  name="selectedDevice"
                  value={deviceIssueData.selectedDevice}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring focus:ring-indigo-300"
                >
                  <option value="">Choose your device</option>
                  {deviceList.length > 0 ? (
                    deviceList.map((device) => (
                      <option key={device._id} value={device._id}>
                        {device.deviceMdl} - {device.deviceNo}
                      </option>
                    ))
                  ) : (
                    <option value="">No devices available</option>
                  )}
                </select>
                <img
                  src="https://cdn-icons-png.freepik.com/256/608/608245.png?uid=R174161672&ga=GA1.1.1233295676.1731658458&semt=ais_hybrid"
                  alt="Device Icon"
                  className="absolute top-2 right-2 w-8 h-8 pointer-events-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-500 transition-all"
            >
              Submit 
            </button>
          </form>

          {/* Footer Section */}
          <div className="text-center mt-6 text-sm text-gray-500">
            <p>Need help? <Link to="/contact" className="text-indigo-600 underline">Contact Support</Link></p>
          </div>
        </div>
      </div>

      {/* Success Message Modal */}
      {showSuccessMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            <h2 className="text-xl font-semibold text-green-600">Device Issued to Citizen Successfully!</h2>
            <p className="text-gray-700 mt-4">Your device has been issued Successfully to Citizen.</p>
            <button
              onClick={handleSuccessClose}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
            >
              Done
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default DeviceIssueForm;
