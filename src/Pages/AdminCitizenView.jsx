import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AdminCitizenView = () => {
  const [citizens, setCitizens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteCitizenId, setDeleteCitizenId] = useState(null);
  const [logoutConfirmation, setLogoutConfirmation] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));
  const id = user ? user.id : null; 
  const userName = user ? user.firstName + " " +user.lastName : null; 

  const fetchCitizens = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BACKEND_URL}/user/citizens`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: currentPage, limit: itemsPerPage },
      });
      setCitizens(response.data.data || []);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch citizens");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCitizens();
  }, [currentPage]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/user/delete-user/${deleteCitizenId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCitizens((prev) => prev.filter((citizen) => citizen._id !== deleteCitizenId));
      setDeleteCitizenId(null);
    } catch (err) {
      console.error("Error deleting citizen:", err.response?.data?.message || err.message);
    }
  };

  const handleViewClick = (id) => navigate(`/adminCitizenProfile/${id}`);
  const handleEditClick = (id) => navigate(`/editpage/${id}`);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login"); // Navigate to the login page after logout
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-40 bg-gray-800 text-white p-4 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform sm:relative sm:translate-x-0 sm:w-64`}
      >
        <div className="flex justify-between items-center mb-4 sm:hidden">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="text-white text-2xl">
            <FaTimes />
          </button>
        </div>
        <AdminSidebar userName={userName} id={id} />
      </div>

      {/* Overlay for Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-8 bg-gray-100">
        <div className="container mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:hidden">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-gray-700 text-2xl"
            >
              <FaBars />
            </button>
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold mb-2">Manage All Citizens</h1>
            <p className="text-lg text-gray-600">View and Edit Citizens Details</p>
          </div>

          <div className="mb-6">
            <Link to="/createuser">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 transition-all duration-300">
                Add More Citizens
              </button>
            </Link>
          </div>

          {loading ? (
            <div className="text-center w-full text-lg text-gray-500">Loading data...</div>
          ) : error ? (
            <div className="text-center text-red-600 text-lg">{error}</div>
          ) : (
            <div className="overflow-x-auto bg-white shadow-md sm:rounded-lg">
              <table className="min-w-full text-black">
                <thead className="text-xs font-semibold uppercase bg-gray-200">
                  <tr>
                    <th className="px-4 py-3">User ID</th>
                    <th className="px-4 py-3">First Name</th>
                    <th className="px-4 py-3">Last Name</th>
                    <th className="px-4 py-3">Mobile</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Gender</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {citizens.map((citizen) => (
                    <tr key={citizen._id} className="hover:bg-gray-100">
                      <td className="px-4 py-3">{citizen.userId}</td>
                      <td className="px-4 py-3">{citizen.firstName}</td>
                      <td className="px-4 py-3">{citizen.lastName}</td>
                      <td className="px-4 py-3">{citizen.mobile}</td>
                      <td className="px-4 py-3">{citizen.emailId}</td>
                      <td className="px-4 py-3">{citizen.gender}</td>
                      <td className="px-4 py-4 text-center flex justify-center space-x-4">
                        <button onClick={() => handleViewClick(citizen._id)} className="text-blue-600 bg-transparent hover:bg-white hover:scale-150 hover:shadow-md hover:shadow-gray-500 rounded-full p-2 transition-transform duration-200">
                          <FaEye className="text-blue-500" />
                        </button>
                        <button onClick={() => handleEditClick(citizen._id)} className="text-green-600 bg-transparent hover:bg-white hover:scale-150 hover:shadow-md hover:shadow-gray-500 rounded-full p-2 transition-transform duration-200">
                          <FaEdit className="text-green-500" />
                        </button>
                        <button onClick={() => setDeleteCitizenId(citizen._id)} className="text-red-600 bg-transparent hover:bg-white hover:scale-150 hover:shadow-md hover:shadow-gray-500 rounded-full p-2 transition-transform duration-200">
                          <FaTrash className="text-red-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-4 mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-500 text-white hover:bg-gray-700"
              }`}
            >
              Prev
            </button>
            <span className="text-lg">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-500 text-white hover:bg-gray-700"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Citizen Deletion */}
      {deleteCitizenId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-red-500">
              Are you sure you want to delete this Citizen?
            </h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDelete}
                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteCitizenId(null)}
                className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      
    </div>
  );
};

export default AdminCitizenView;
