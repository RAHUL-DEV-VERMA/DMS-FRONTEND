import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ChangePasswordNavbar from "./ChangePasswordNavbar";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Yup validation schema
const schema = Yup.object({
  oldPassword: Yup.string()
    .required("Old password is required")
    .min(6, "Password must be at least 6 characters"),
  newPassword: Yup.string()
    .required("New password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
}).required();

const ChangePasswordPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(""); // For error messages
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [citizen, setCitizen] = useState(null); // State to store citizen's data
  const [showSuccessModal, setShowSuccessModal] = useState(false); // For success modal

  const navigate = useNavigate();
  const { id } = useParams();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // Fetch citizen data
  useEffect(() => {
    const fetchCitizenData = async () => {
      try {
        const token = localStorage.getItem("token");
        const citizenResponse = await axios.get(
          `${BACKEND_URL}/user/profile/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCitizen(citizenResponse.data.user); // Save user data to state
      } catch (error) {
        console.error("Error fetching citizen data", error);
        setError("Failed to load user data.");
      }
    };

    fetchCitizenData();
  }, [id]);

  const onSubmit = async (data) => {
    const { oldPassword, newPassword } = data;
    const token = localStorage.getItem("token");

    if (!id) {
      setError("User not found.");
      return;
    }

    if (oldPassword === newPassword) {
      setError("Old password and new password should not be the same.");
      return;
    }

    try {
      const response = await axios.put(
        `${BACKEND_URL}/user/change-password/${id}`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setShowSuccessModal(true); // Show success modal
        setTimeout(() => {
          navigate(`/citizenlandingpage/${id}`);
        }, 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to change password.");
      console.log(error);
    }
  };

  return (
    <>
      {/* Pass citizen's name to the navbar */}
      <ChangePasswordNavbar userName={citizen?.firstName} id={id} />

      <div className="flex bg-gray-100 justify-center items-center pt-24">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">
            Change Password
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Old Password */}
            <div>
              <label htmlFor="oldPassword" className="block text-gray-700 font-medium">
                Old Password
              </label>
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  id="oldPassword"
                  placeholder="Enter old password"
                  className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("oldPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-6"
                >
                  {showOldPassword ? "🙈" : "👁️"}
                </button>
              </div>
              <p className="text-red-500 text-sm mt-1">{errors.oldPassword?.message}</p>
            </div>

            {/* New Password */}
            <div>
              <label htmlFor="newPassword" className="block text-gray-700 font-medium">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  placeholder="Enter new password"
                  className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("newPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-6 "
                >
                  {showNewPassword ? "🙈" : "👁️"}
                </button>
              </div>
              <p className="text-red-500 text-sm mt-1">{errors.newPassword?.message}</p>
            </div>

            {/* Confirm New Password */}
            <div>
              <label htmlFor="confirmNewPassword" className="block text-gray-700 font-medium">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmNewPassword ? "text" : "password"}
                  id="confirmNewPassword"
                  placeholder="Confirm new password"
                  className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("confirmNewPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                  className="absolute right-3 top-6 "
                >
                  {showConfirmNewPassword ? "🙈" : "👁️"}
                </button>
              </div>
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmNewPassword?.message}
              </p>
            </div>

            {/* Error message */}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none transition"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h2 className="text-lg font-semibold text-green-600">
              Password Changed Successfully!
            </h2>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none transition"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangePasswordPage;
