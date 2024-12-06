import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import AdminSidebar from "./AdminSidebar";
import Footer from "./Footer";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const UserEditPage = () => {
  const { id } = useParams(); // User ID from URL
  const navigate = useNavigate(); // Navigation hook

  const user = JSON.parse(localStorage.getItem("user"));
  const loginId = user ? user.id : null; 
  const loginName = user ? user.firstName + " " +user.lastName : null; 

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    gender: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [success, setSuccess] = useState(false); // Track success state

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please log in first.");
        localStorage.removeItem("token");
        navigate("/"); // Redirect to login
        return;
      }

      try {
        const response = await axios.get(`${BACKEND_URL}/user/profile/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = response.data.user || {};
        setUserData({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          mobileNumber: user.mobile || "",
          gender: user.gender || "",
        });

        setLoading(false);
      } catch (err) {
        setError("Failed to load user data.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id, navigate]);

  // Validation schema with Yup
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().notRequired(),
    lastName: Yup.string().notRequired(),
    gender: Yup.string().notRequired(),
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(userData, { abortEarly: false });

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in first.");
        navigate("/");
        return;
      }

      await axios.put(`${BACKEND_URL}/user/update-user/${id}`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess(true); // Show success message
    } catch (err) {
      if (err.name === "ValidationError") {
        const errors = err.inner.reduce((acc, curr) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {});
        setFormErrors(errors);
      } else {
        setError("An error occurred while updating the profile.");
      }
    }
  };

  if (loading) {
    return <div className="text-center text-2xl mt-10">Loading user data...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl mt-10">{error}</div>;
  }

  return (
    <>
    <AdminSidebar userName={loginName} id={loginId} />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 to-teal-400 px-4 relative">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">
            Edit User Profile
          </h2>
          <form onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="mb-4">
              <label className="block text-lg font-semibold text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
              {formErrors.firstName && (
                <p className="text-red-500 text-sm">{formErrors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label className="block text-lg font-semibold text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
              {formErrors.lastName && (
                <p className="text-red-500 text-sm">{formErrors.lastName}</p>
              )}
            </div>

            {/* Mobile Number */}
            <div className="mb-4">
              <label className="block text-lg font-semibold text-gray-700">
                Mobile Number
              </label>
              <input
                type="text"
                name="mobileNumber"
                value={userData.mobileNumber}
                readOnly
                onClick={() => alert("Mobile number editing is not allowed.")}
                className="w-full px-4 py-2 border rounded-lg bg-gray-200 shadow-sm cursor-not-allowed focus:outline-none"
              />
            </div>

            {/* Gender */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                value={userData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="other">Other</option>
              </select>
              {formErrors.gender && (
                <p className="text-red-500 text-sm">{formErrors.gender}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-teal-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Success Message */}
        {success && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
              <h2 className="text-2xl font-semibold text-green-600 mb-4">
                User Edited Successfully!
              </h2>
              <button
                onClick={() => navigate(-1)}
                className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-300"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UserEditPage;
