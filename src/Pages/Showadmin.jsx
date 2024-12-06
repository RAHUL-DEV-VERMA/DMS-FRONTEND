import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Showadmin = () => {
  const [citizens, setCitizens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteCitizenId, setDeleteCitizenId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [itemsPerPage] = useState(10); // Items per page
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));
  const loginId = user ? user.id : null;
  const loginName = user ? user.firstName + " " + user.lastName : null;

  // Fetch citizens with pagination
  const fetchCitizens = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BACKEND_URL}/user/admins`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage, // Pass the current page
          limit: itemsPerPage, // Pass the items per page
        },
      });
      console.log(response.data.admins)
      setCitizens(response.data.admins || []);
      setTotalPages(response.data.totalPages); // Set the total number of pages
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch Admins");
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCitizens((prevCitizens) => prevCitizens.filter((citizen) => citizen._id !== deleteCitizenId));
      setDeleteCitizenId(null); // Close the confirmation modal
    } catch (err) {
      console.error("Error deleting citizen:", err.response?.data?.message || err.message);
    }
  };

  const handleEditClick = (id) => {
    navigate(`/editpage/${id}`);
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

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden sm:block sm:w-64 bg-gray-800 text-white p-4">
      <AdminSidebar userName={loginName} id={loginId} />

      </div>

      {/* Main Content (Table) */}
      <div className="flex-1 p-8 bg-gray-100 overflow-x-auto">
        <div className="container mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold mb-2">Manage Admins</h1>
            <p className="text-black text-lg">View and Edit Admins Details</p>
          </div>

          {loading ? (
            <div className="text-center w-full text-black text-lg">Loading data...</div>
          ) : error ? (
            <div className="text-center text-red-600 text-lg">{error}</div>
          ) : (
            <div className="overflow-x-auto w-full shadow-md sm:rounded-lg">
              <table className="min-w-full text-black bg-white rounded-lg">
                <thead className="text-xs font-semibold text-gray-700 uppercase bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-center">User id</th>
                    <th className="px-6 py-3 text-center">First Name</th>
                    <th className="px-6 py-3 text-center">Last Name</th>
                    <th className="px-6 py-3 text-center">Mobile Number</th>
                    <th className="px-6 py-3 text-center">Email Address</th>
                    <th className="px-6 py-3 text-center">Gender</th>
                    <th className="px-6 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {citizens.length > 0 ? (
                    citizens.map((citizen) => (
                      <tr key={citizen._id} className="bg-gray-50 border-b border-gray-200 hover:bg-gray-100">
                        <td className="px-6 py-3 text-center">{citizen.userId}</td>

                        <td className="px-6 py-4 text-center">{citizen.firstName}</td>
                        <td className="px-6 py-4 text-center">{citizen.lastName}</td>
                        <td className="px-6 py-4 text-center">{citizen.mobile}</td>
                        <td className="px-6 py-4 text-center">{citizen.emailId}</td>
                        <td className="px-6 py-4 text-center">{citizen.gender}</td>
                        <td className="px-6 py-4 text-center flex justify-center space-x-4">
                          
                          <button
                            onClick={() => handleEditClick(citizen._id)}
                            className="text-green-600 bg-transparent hover:bg-white hover:scale-150 hover:shadow-md hover:shadow-gray-500 rounded-full p-2 transition-transform duration-200"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => setDeleteCitizenId(citizen._id)}
                            className="text-red-600 bg-transparent hover:bg-white hover:scale-150 hover:shadow-md hover:shadow-gray-500 rounded-full p-2 transition-transform duration-200"
                          >
                            <FaTrash />
                          </button>
                        </td>


                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-gray-700">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4 items-center space-x-4">
            {/* Previous Button */}
            <button
              onClick={handlePrevPage}
              className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 hover:bg-gray-300   cursor-not-allowed" : "bg-gray-500 text-white"}`}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {/* Page Number */}
            <span className="text-lg font-semibold">
              Page {currentPage} of {totalPages}
            </span>

            {/* Next Button */}
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

      {/* Confirmation Modal */}
      {deleteCitizenId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md w-full">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Are you want to delete this Citizen?
            </h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDelete}
                className="px-6 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteCitizenId(null)} // Close the modal
                className="px-6 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Showadmin;
