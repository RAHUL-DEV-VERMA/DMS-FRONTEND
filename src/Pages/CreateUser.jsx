import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Define validation schema with Yup
const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  emailId: yup
    .string()
    .email("Must be a valid email")
    .matches(/^.*@gmail\.com$/, "Email must be a Gmail address")
    .required("Email Address is required"),
  mobile: yup
    .string()
    .length(10, "Mobile number must be 10 digits")
    .matches(/^\d+$/, "Mobile number must contain only digits")
    .required("Mobile Number is required"),
  gender: yup.string().required("Gender is required"),
  aadharNo: yup
    .string()
    .length(12, "Aadhar number must be 12 digits")
    .matches(/^\d+$/, "Aadhar number must contain only digits")
    .required("Aadhar Card Number is required"),
  role: yup.string().required("Role is required"),
});

const CreateUser = () => {
  const navigate = useNavigate();

  const [showSuccessModal, setShowSuccessModal] = useState(false); // Success modal visibility
  const [errorMsg, setErrorMsg] = useState(""); // Custom error message

  // Initialize react-hook-form with validation schema from Yup
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: yupResolver(schema),
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const loginId = user ? user.id : null; 
  const loginName = user ? user.firstName + " " +user.lastName : null; 

  // Handle form submission
  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${BACKEND_URL}/user/create-user`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        // Show success modal on successful submission
        setShowSuccessModal(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        if (error.response.data.message.includes("email") || error.response.data.message.includes("mobile")) {
          setErrorMsg("User Already Exists with these Details. Please register with unique ID.");
        } else {
          setErrorMsg(error.response.data.message); // General error message
        }
      } else {
        setErrorMsg("An unexpected error occurred. Please try again later.");
      }
    }
  };

  // Handle Done button click (navigate back)
  const handleDone = () => {
    setShowSuccessModal(false); // Close success modal
    navigate(-1); // Navigate back to previous page
  };

  return (
    <>


      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed p-4 inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50  ">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h2 className="text-lg font-semibold text-green-600">User Created Successfully!</h2>
            <button
              onClick={handleDone}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-500 transition-all"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Full Width Container */}
      <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="flex-none md:w-64">
        <AdminSidebar userName={loginName} id={loginId} />
        </div>

        {/* Main Content */}
        <div className="flex-grow w-full  ">
          <div className="bg-white mt-3 shadow-lg rounded-lg p-8 w-full max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
              Create User Form
            </h1>

            {/* Display error message if present */}
            {errorMsg && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p>{errorMsg}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* First Name */}
              <div className="mb-2 flex space-x-4">
                {/* First Name */}
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    {...register("firstName")}
                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
                    placeholder="Enter First Name"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                </div>

                {/* Last Name */}
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    {...register("lastName")}
                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
                    placeholder="Enter Last Name"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                </div>
              </div>


              {/* Mobile Number */}
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                <input
                  type="tel"
                  {...register("mobile")}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
                  placeholder="Enter Mobile Number"
                />
                {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
              </div>

              {/* Email Address */}
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  {...register("emailId")}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
                  placeholder="Enter Email Address"
                />
                {errors.emailId && <p className="text-red-500 text-sm">{errors.emailId.message}</p>}
              </div>

              {/* Gender */}
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  {...register("gender")}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
              </div>

              {/* Aadhar Number */}
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Aadhar Card Number</label>
                <input
                  type="text"
                  {...register("aadharNo")}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
                  placeholder="Enter Aadhar Card Number"
                />
                {errors.aadharNo && <p className="text-red-500 text-sm">{errors.aadharNo.message}</p>}
              </div>

              {/* Role Selection */}
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  {...register("role")}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
                >
                  <option value="">Select Role</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="DM">DM</option>
                  <option value="CITIZEN">CITIZEN</option>
                </select>
                {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600 hover:scale-105 transition-transform duration-200"
              >
                Submit
              </button>

            </form>
          </div>
        </div>
      </div>

    </>
  );
};

export default CreateUser;
