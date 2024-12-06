import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import DmNavbar from "./DmNavbar"; // Sidebar component
import Footer from "./Footer";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Backend URL from environment variable

const DmLandingPage = () => {
  const [citizens, setCitizens] = useState([]); // Array to hold citizens data
  const [loading, setLoading] = useState(true); // Loading state
  const [username, setUsername] = useState(""); // Store username
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [itemsPerPage] = useState(10); // Number of items per page
  const navigate = useNavigate();
  const { id } = useParams(); // Get the user ID from the URL params
  const token = localStorage.getItem("token"); // Fetch token from localStorage

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/profile/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(response.data.user.firstName);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    // Fetch citizens data with pagination
    const fetchCitizens = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/citizens`, {
          params: { page: currentPage, limit: itemsPerPage }, // Pass pagination params
          headers: { Authorization: `Bearer ${token}` },
        });
        setCitizens(response.data.data); // Set citizens data
        setTotalPages(response.data.totalPages); // Set total number of pages
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching citizens:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchUserProfile(); // Fetch profile
    fetchCitizens(); // Fetch citizens data
  }, [id, token, currentPage]); // Fetch data whenever currentPage or ID changes

  const handleViewClick = (citizenId) => {
    navigate(`/citizenlandingpage/${citizenId}`, { state: { citizenId } });
  };

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Go to the next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Go to the previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="flex min-h-screen">

        <div className="md:w-64 w-full bg-white shadow-lg z-40">
          <DmNavbar userName={username} id={id} />
        </div>

        {/* Main Content */}
        <div className="w-full ml-10 p-8 bg-gray-100">
          <div className="container mx-auto">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold mb-2">Welcome to DM Dashboard</h1>
              <p className="text-black text-lg">View Citizen Details</p>
            </div>

            {loading ? (
              <div className="text-center text-black text-lg">Loading data...</div>
            ) : (
              <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="min-w-full text-black bg-white rounded-lg">
                  <thead className="text-xs font-semibold text-gray-700 uppercase bg-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-center">User ID</th>
                      <th className="px-6 py-3 text-center">First Name</th>
                      <th className="px-6 py-3 text-center">Last Name</th>
                      <th className="px-6 py-3 text-center">Mobile Number</th>
                      <th className="px-6 py-3 text-center">Email Address</th>
                      <th className="px-6 py-3 text-center">Gender</th>
                      <th className="px-6 py-3 text-center">Aadhar Card Number</th>
                      <th className="px-6 py-3 text-center">View More</th>
                    </tr>
                  </thead>
                  <tbody>
                    {citizens.length > 0 ? (
                      citizens.map((citizen) => (
                        <tr key={citizen._id} className="bg-gray-50 border-b border-gray-200 hover:bg-gray-100">
                          <td className="px-6 py-4 text-center">{citizen.userId}</td>
                          <td className="px-6 py-4 text-center">{citizen.firstName}</td>
                          <td className="px-6 py-4 text-center">{citizen.lastName}</td>
                          <td className="px-6 py-4 text-center">{citizen.mobile}</td>
                          <td className="px-6 py-4 text-center">{citizen.emailId}</td>
                          <td className="px-6 py-4 text-center">{citizen.gender}</td>
                          <td className="px-6 py-4 text-center">{citizen.aadharNo}</td>
                          <td className="px-4 py-4 text-center flex justify-center space-x-4">
                            <button
                              onClick={() => handleViewClick(citizen._id)}
                              className="text-blue-600 bg-transparent hover:bg-white hover:scale-150 hover:shadow-md hover:shadow-gray-500 rounded-full p-2 transition-transform duration-200"
                            >
                              <FaEye />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-center mt-6 items-center space-x-4">
                  <button
                    onClick={handlePrevPage}
                    className={`px-4 py-2 rounded ${currentPage === 1
                      ? "bg-gray-300 hover:bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>
                  <span className="text-lg font-medium text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    className={`px-4 py-2 rounded ${currentPage === totalPages
                      ? "bg-gray-300 hover:bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DmLandingPage;
