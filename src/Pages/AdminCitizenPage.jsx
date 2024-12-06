import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdCreate, IoMdTrash } from 'react-icons/io';
import { FaEye } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CitizenViewPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [citizenData, setCitizenData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch Citizen data with role-based filtering
  const fetchCitizenData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Login First");
      localStorage.removeItem('token');
      window.location.href = "/";
      return;
    }

    try {
      const response = await axios.get(`${BACKEND_URL}/user/citizens`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token here
        },
      });

      // Filter out citizens from the response data
      const citizens = response.data.filter((user) => user.role === "CITIZEN");
      setCitizenData(citizens);
    } catch (error) {
      console.error('Error fetching Citizen data:', error);
      setCitizenData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCitizenData();
  }, []);

  // Navigate to Edit Page
  const handleEditClick = (id) => {
    navigate(`/useredit/${id}`);
  };

  // Handle Delete Action
  const handleDeleteClick = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this user?');
    if (isConfirmed) {
      try {
        const token = localStorage.getItem("token");
  
        if (!token) {
          alert("Login First");
          localStorage.removeItem('token');
          window.location.href = "/";
          return;
        }
  
        // Send token with Authorization header
        await axios.delete(`${BACKEND_URL}/user/delete-user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add token here
          },
        });
  
        // Show alert after the user is deleted
        alert('User deleted successfully');
  
        // Reload data after successful deletion
        fetchCitizenData();
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error deleting user');
      }
    }
  };
  

  // View Details Click
  const handleViewClick = (id) => {
    navigate(`/profile/${id}`);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg transform ${
          isOpen ? "w-64" : "w-0"
        } transition-all duration-300 z-40 overflow-hidden`}
      >
        <div className="flex flex-col items-center mt-10">
          {/* User Logo */}
          <div className="bg-white p-4 rounded-full shadow-lg">
            <AiOutlineUser size={48} className="text-blue-600" />
          </div>
          <h2 className="mt-4 text-white text-lg font-semibold">Device Manager</h2>
        </div>
      </div>

      <AdminSidebar />

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${isOpen ? "ml-64" : "ml-0"} flex-1 p-6`}
      >
        <div className="container mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-white mb-2">Citizen View Page</h1>
            <p className="text-white text-lg">Manage and view Citizen details</p>
          </div>

          {/* Loading Indicator */}
          {loading ? (
            <div className="text-center text-white">Loading...</div>
          ) : (
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
              <table className="min-w-full text-black rounded-lg">
                <thead className="bg-blue-600 text-white ">
                  <tr>
                    <th className="px-6 py-3 text-center">First Name</th>
                    <th className="px-6 py-3 text-center">Last Name</th>
                    <th className="px-6 py-3 text-center">Mobile Number</th>
                    <th className="px-6 py-3 text-center">Email Address</th>
                    <th className="px-6 py-3 text-center">Gender</th>
                    <th className="px-6 py-3 text-center">Aadhar Card Number</th>
                    <th className="px-6 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {citizenData.length > 0 ? (
                    citizenData.map((citizen) => (
                      <tr
                        key={citizen._id}
                        className="border-b border-gray-700 bg-gray-50 hover:bg-gray-100"
                      >
                        <td className="px-6 py-4 text-center">{citizen.firstName}</td>
                        <td className="px-6 py-4 text-center">{citizen.lastName}</td>
                        <td className="px-6 py-4 text-center">{citizen.mobile}</td>
                        <td className="px-6 py-4 text-center">{citizen.emailId}</td>
                        <td className="px-6 py-4 text-center">{citizen.gender}</td>
                        <td className="px-6 py-4 text-center">{citizen.aadharNo}</td>
                        <td className="px-6 py-4 text-center flex justify-center space-x-4">
                          {/* Edit Button */}
                          <button
                            onClick={() => handleEditClick(citizen._id)}
                            className="text-yellow-500 hover:text-yellow-300"
                          >
                            <IoMdCreate className="text-xl" />
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDeleteClick(citizen._id)}
                            className="text-red-500 hover:text-red-300"
                          >
                            <IoMdTrash className="text-xl" />
                          </button>

                          {/* View Button */}
                          <button
                            onClick={() => handleViewClick(citizen._id)}
                            className="text-white-500 hover:text-blue-300"
                          >
                            <FaEye />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-white">
                        No data available
                      </td>
                    </tr>
                  )} 
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CitizenViewPage;
