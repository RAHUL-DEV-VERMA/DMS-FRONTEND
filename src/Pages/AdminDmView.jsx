import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEye, FaEdit } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AdminDmView = () => {
  const [dms, setDms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedDm, setSelectedDm] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const loginId = user ? user.id : null; 
  const loginName = user ? user.firstName + " " +user.lastName : null; 

  // Fetch DMs from the backend
  const fetchDms = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BACKEND_URL}/user/dms`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDms(response.data.dms);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch DMs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDms();
  }, []);

  const handleDeleteClick = (index, id) => {
    setSelectedDm({ index, id });
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    const { index, id } = selectedDm;
    try {
      await axios.delete(`${BACKEND_URL}/user/delete-user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDms((prevDms) => prevDms.filter((_, i) => i !== index));
      setShowConfirmModal(false);
      setSelectedDm(null);
    } catch (err) {
      console.error("Error deleting DM:", err.response?.data?.message || err.message);
    }
  };

  const handleViewClick = (id) => {
    navigate(`/adminCitizenProfile/${id}`); // Navigate to the DM view page
  };

  const handleEditClick = (id) => {
    navigate(`/editpage/${id}`); // Navigate to the DM edit page
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="lg:w-64 w-full bg-white shadow-lg z-40">
      <AdminSidebar userName={loginName} id={loginId} />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-8 bg-gray-100">
        <div className="text-center mb-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">Manage DM Dashboard</h1>
          <p className="text-lg text-gray-600">View and manage direct messages from users</p>
        </div>

        {/* Loading and Error States */}
        {loading ? (
          <div className="text-center text-lg text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-600 text-lg">{error}</div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg sm:rounded-lg">
            <table className="min-w-full text-gray-700">
              <thead className="text-xs font-semibold uppercase bg-gray-200">
                <tr>
                  <th className="px-4 py-3 text-center">First Name</th>
                  <th className="px-4 py-3 text-center">Last Name</th>
                  <th className="px-4 py-3 text-center">Mobile</th>
                  <th className="px-4 py-3 text-center">Email</th>
                  <th className="px-4 py-3 text-center">Gender</th>
                  <th className="px-4 py-3 text-center">Aadhar No</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dms.length > 0 ? (
                  dms.map((dm, index) => (
                    <tr
                      key={dm._id}
                      className="bg-white hover:bg-gray-100 transition-all duration-200"
                    >
                      <td className="px-4 py-4 text-center">{dm.firstName}</td>
                      <td className="px-4 py-4 text-center">{dm.lastName}</td>
                      <td className="px-4 py-4 text-center">{dm.mobile}</td>
                      <td className="px-4 py-4 text-center">{dm.emailId}</td>
                      <td className="px-4 py-4 text-center">{dm.gender}</td>
                      <td className="px-4 py-4 text-center">{dm.aadharNo}</td>
                      <td className="px-4 py-4 text-center flex justify-center space-x-4">
                        <button
                          onClick={() => handleViewClick(dm._id)}
                          className="text-blue-600 bg-transparent hover:bg-white hover:scale-150 hover:shadow-md hover:shadow-gray-500 rounded-full p-2 transition-transform duration-200"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleEditClick(dm._id)}
                          className="text-green-600 bg-transparent hover:bg-white hover:scale-150 hover:shadow-md hover:shadow-gray-500 rounded-full p-2 transition-transform duration-200"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(index, dm._id)}
                          className="text-red-600 bg-transparent hover:bg-white hover:scale-150 hover:shadow-md hover:shadow-gray-500 rounded-full p-2 transition-transform duration-200"
                        >
                          <FaTrash />
                        </button>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-4 py-4 text-center text-gray-500">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center space-y-6 max-w-sm w-full">
          
            <p className="text-gray-600">Do you want to delete this DM?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-all duration-200"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-all duration-200"
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDmView;
