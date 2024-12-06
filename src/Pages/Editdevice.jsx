import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import AdminSidebar from "./AdminSidebar";
import Footer from "./Footer";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const EditDevice = () => {
  const { id } = useParams(); // Device ID from URL
  const navigate = useNavigate(); // Navigation hook

  const user = JSON.parse(localStorage.getItem("user"));
  const loginId = user ? user.id : null; 
  const loginName = user ? user.firstName + " " +user.lastName : null; 

  const [deviceData, setDeviceData] = useState({
    deviceNo: "",
    deviceMdl: "",
    deviceInfo: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Success Modal state
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // Confirmation Modal state
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch device data
  useEffect(() => {
    const fetchDeviceData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please log in first.");
        localStorage.removeItem("token");
        navigate("/"); // Redirect to login
        return;
      }

      try {
        const response = await axios.get(`${BACKEND_URL}/user/get-device/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const device = response.data.device || {};
        setDeviceData({
          deviceNo: device.deviceNo || "", // Prefill deviceNo
          deviceMdl: device.deviceMdl || "",
          deviceInfo: device.deviceInfo || "",
        });

        setLoading(false);
      } catch (err) {
        setError("Failed to load device data.");
        setLoading(false);
      }
    };

    fetchDeviceData();
  }, [id, navigate]);

  // Validation schema with Yup
  const validationSchema = Yup.object().shape({
    deviceMdl: Yup.string().required("Device model is required."),
    deviceInfo: Yup.string().required("Device information is required."),
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeviceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(deviceData, { abortEarly: false });

      // Show confirmation modal before submission
      setShowConfirmationModal(true);
    } catch (err) {
      if (err.name === "ValidationError") {
        const errors = err.inner.reduce((acc, curr) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {});
        setFormErrors(errors);
      } else {
        setError("An error occurred while updating the device.");
      }
    }
  };

  const handleConfirmEdit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first.");
      navigate("/"); // Redirect to login
      return;
    }

    try {
      // Don't send deviceNo, just send deviceMdl and deviceInfo
      const { deviceNo, ...updateData } = deviceData;

      await axios.put(`${BACKEND_URL}/user/update-device/${id}`, updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccessMessage("Device Edited Successfully!");
      setShowSuccessModal(true); // Show success modal
      setShowConfirmationModal(false); // Close confirmation modal
    } catch (err) {
      setError("An error occurred while updating the device.");
      setShowConfirmationModal(false); // Close confirmation modal
    }
  };

  const handleCancelEdit = () => {
    setShowConfirmationModal(false); // Close confirmation modal
  };

  const handleDone = () => {
    setShowSuccessModal(false); // Close success modal
    navigate(-1); // Go back to previous page
  };

  if (loading) {
    return <div className="text-center text-2xl mt-10">Loading device data...</div>;
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
            Edit Device
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Device No (Read-Only) */}
            <div className="mb-4">
              <label className="block text-lg font-semibold text-gray-700">
                Device No
              </label>
              <input
                type="text"
                name="deviceNo"
                value={deviceData.deviceNo}
                readOnly
                className="w-full px-4 py-2 border rounded-lg bg-gray-200 shadow-sm cursor-not-allowed focus:outline-none"
              />
            </div>

            {/* Device Model */}
            <div className="mb-4">
              <label className="block text-lg font-semibold text-gray-700">
                Device Model
              </label>
              <input
                type="text"
                name="deviceMdl"
                value={deviceData.deviceMdl}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
              {formErrors.deviceMdl && (
                <p className="text-red-500 text-sm">{formErrors.deviceMdl}</p>
              )}
            </div>

            {/* Device Information */}
            <div className="mb-4">
              <label className="block text-lg font-semibold text-gray-700">
                Device Information
              </label>
              <input
                type="text"
                name="deviceInfo"
                value={deviceData.deviceInfo}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
              {formErrors.deviceInfo && (
                <p className="text-red-500 text-sm">{formErrors.deviceInfo}</p>
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
      </div>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h2 className="text-lg font-semibold text-blue-600 mb-4">
              Are you sure you want to edit this device?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={handleConfirmEdit}
                className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
              >
                Yes, Edit
              </button>
              <button
                onClick={handleCancelEdit}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Message Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h2 className="text-lg font-semibold text-green-600 mb-4">
              {successMessage}
            </h2>
            <button
              onClick={handleDone}
              className="mt-4 bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
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

export default EditDevice;
