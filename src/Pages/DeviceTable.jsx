import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit, FaBars, FaPlus } from 'react-icons/fa'; // Import FaBars for the toggle button
import AdminSidebar from './AdminSidebar';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const DeviceTable = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [itemsPerPage] = useState(10); // Items per page
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to manage sidebar visibility
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  const navigate = useNavigate(); // Initialize navigate

  const user = JSON.parse(localStorage.getItem("user"));
  const loginId = user ? user.id : null; 
  const loginName = user ? user.firstName + " " +user.lastName : null; 

  // Fetch devices with pagination
  const fetchDevices = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BACKEND_URL}/user/all-devices`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          page: currentPage, // Pass current page
          limit: itemsPerPage, // Pass items per page
        },
      });
      // Ensure that devices is an array
      setDevices(Array.isArray(response.data.data) ? response.data.data : []);
      setTotalPages(response.data.totalPages); // Set total pages for pagination
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch devices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, [currentPage]); // Fetch devices when current page changes

  // Delete device function
  const deleteDevice = async () => {
    try {
      if (deviceToDelete) {
        const response = await axios.delete(`${BACKEND_URL}/user/delete-device/${deviceToDelete}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setDevices((prevDevices) => prevDevices.filter((device) => device._id !== deviceToDelete));
        setSuccessMessage('Device deleted successfully!');
      }
    } catch (err) {
      console.error('Error deleting device:', err.response?.data?.message || err.message);
    } finally {
      setShowConfirmation(false);
      setDeviceToDelete(null);
    }
  };

  const openDeleteConfirmation = (id) => {
    setDeviceToDelete(id);
    setShowConfirmation(true);
  };

  const closeDeleteConfirmation = () => {
    setShowConfirmation(false);
    setDeviceToDelete(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle edit click
  const handleEditClick = (deviceId) => {
    navigate(`/edit-device/${deviceId}`); // Navigate to the edit page for the device
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div className="flex">
        {/* Sidebar Toggle Button */}
       

        {/* Sidebar */}
        <div className={`w-64 ${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
        <AdminSidebar userName={loginName} id={loginId} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8 bg-gray-100 min-h-screen">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6">Show All Devices</h1>

            <button className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 transition-all duration-300">
            <Link to="/add-device">
              <i className="fas fa-desktop mr-2"></i> Add More Devices
            </Link>
          </button>

            {loading ? (
              <div className="text-center text-black text-lg">Loading devices...</div>
            ) : error ? (
              <div className="text-center text-red-600 text-lg">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg table-auto">
                  <thead className="bg-blue-800 text-white">
                    <tr>
                      <th className="px-6 py-3 text-center">Device No</th>
                      <th className="px-6 py-3 text-center">Device Model</th>
                      <th className="px-6 py-3 text-center">Device Information</th>
                      <th className="px-6 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(devices) && devices.length > 0 ? (
                      devices.map((device) => (
                        <tr
                          key={device._id}  // Use _id as key
                          className="border-b border-gray-200 hover:bg-gray-100"
                        >
                          <td className="px-6 py-4 text-center">{device.deviceNo}</td>
                          <td className="px-6 py-4 text-center">{device.deviceMdl}</td>
                          <td className="px-6 py-4 text-center">{device.deviceInfo}</td>
                          <td className="px-6 py-4 text-center space-x-4">
                            {/* Edit button */}
                            <button
                              onClick={() => handleEditClick(device._id)} // On click, navigate to edit page
                              className="text-green-600 bg-transparent hover:bg-white hover:scale-150 hover:shadow-md hover:shadow-gray-500 rounded-full p-2 transition-transform duration-200"
                              title="Edit Device"
                            >
                              <FaEdit />
                            </button>

                            {/* Delete button */}
                            <button
                              onClick={() => openDeleteConfirmation(device._id)}
                              className="text-red-600 bg-transparent hover:bg-white hover:scale-150 hover:shadow-md hover:shadow-gray-500 rounded-full p-2 transition-transform duration-200"
                              title="Delete Device"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-4 text-center text-gray-700">
                          No devices available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
                  <h2 className="text-xl font-semibold text-green-600">{successMessage}</h2>
                  <button
                    onClick={() => setSuccessMessage(null)}
                    className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4 items-center space-x-4">
              <button
                onClick={handlePrevPage}
                className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 hover:bg-gray-300 cursor-not-allowed" : "bg-gray-500 text-white"}`}
                disabled={currentPage === 1}
              >
                Prev
              </button>

              <span className="text-lg font-semibold">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={handleNextPage}
                className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300 hover:bg-gray-300 cursor-not-allowed" : "bg-gray-500 text-white"}`}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            <h2 className="text-xl font-semibold text-blue-600">Are you sure you want to delete this device?</h2>
            <div className="mt-4 space-x-4">
              <button
                onClick={deleteDevice}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={closeDeleteConfirmation}
                className="px-6 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeviceTable;
