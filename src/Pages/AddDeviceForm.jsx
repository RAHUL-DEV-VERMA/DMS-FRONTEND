import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import Footer from './Footer';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AddDeviceForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const citizenData = location.state?.citizenData;

  const user = JSON.parse(localStorage.getItem("user"));
  const id = user ? user.id : null; 
  const userName = user ? user.firstName + " " +user.lastName : null; 

  // State for device details
  const [deviceIssueData, setDeviceIssueData] = useState({
    deviceNo: '',
    deviceMdl: '',
    deviceInfo: '',
  });

  // States for modals
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeviceIssueData({
      ...deviceIssueData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

    try {
      // Make API request to create the device issue
      const response = await axios.post(
        `${BACKEND_URL}/user/create-device/`, // Use the citizenData id for the API if required
        deviceIssueData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        console.log('Device Created Successfully', response.data);
        setShowSuccessMessage(true); // Show success message modal
      } else {
        console.error('Unexpected response:', response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // 409 Conflict status for email or mobile number already existing
        setErrorMessage('Email or Mobile number already exists.');
      } else {
        // Handle other errors
        setErrorMessage('Device number or Devicce model are Already exixts.');
      }
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessMessage(false); // Hide success message modal
    navigate('/view-device'); // Navigate to `/view-device` page
  };

  const handleErrorClose = () => {
    setErrorMessage(''); // Clear error message
  };

  return (
    <>
      <AdminSidebar userName={userName} id={id} />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
          {/* Header Section */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-indigo-700">Add Device</h1>
            <p className="text-gray-600 mt-2">Add your devices and issue them to the citizen</p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit}>
            {/* Device Number */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Device Number</label>
              <input
                type="text"
                name="deviceNo"
                value={deviceIssueData.deviceNo}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring focus:ring-indigo-300"
                placeholder="Enter device number"
              />
            </div>

            {/* Device Model */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Device Model</label>
              <input
                type="text"
                name="deviceMdl"
                value={deviceIssueData.deviceMdl}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring focus:ring-indigo-300"
                placeholder="Enter device model"
              />
            </div>

            {/* Device Info */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Device Info</label>
              <textarea
                name="deviceInfo"
                value={deviceIssueData.deviceInfo}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring focus:ring-indigo-300"
                placeholder="Describe the issue or provide details about the device"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-500 transition-all"
            >
              Submit Device
            </button>
          </form>
        </div>
      </div>

      {/* Success Message Modal */}
      {showSuccessMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            <h2 className="text-xl font-semibold text-green-600">Device Created Successfully!</h2>
            <p className="text-gray-700 mt-4">Your device has been successfully recorded.</p>
            <button
              onClick={handleSuccessClose}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Error Message Modal */}
      {errorMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            <h2 className="text-xl font-semibold text-red-600">Error</h2>
            <p className="text-gray-700 mt-4">{errorMessage}</p>
            <button
              onClick={handleErrorClose}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default AddDeviceForm;
