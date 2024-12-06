import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import "../App.css"; // Include a custom CSS file for font import
import "font-awesome/css/font-awesome.min.css";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsMobileMenuOpen(false); // Close the mobile menu when dropdown is toggled
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <img src={logo} alt="Logo" className="w-12 h-12" />

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center text-dm">
          <Link to="/" className="hover:text-indigo-200 transition duration-300 flex items-center">
            <i className="fa fa-home mr-2"></i> Home
          </Link>
          <Link to="/aboutus" className="hover:text-indigo-200 transition duration-300 flex items-center">
            <i className="fa fa-info-circle mr-2"></i> About Us
          </Link>
          <Link to="/contact" className="hover:text-indigo-200 transition duration-300 flex items-center">
            <i className="fa fa-phone mr-2"></i> Contact Us
          </Link>

          {/* Dropdown Menu */}
          <div className="relative">
            <button
              onClick={handleDropdownToggle}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white transition duration-300"
            >
              <i className="fa fa-user mr-2"></i>
              
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg text-gray-800 z-20">
                <ul>
                <span className="text-center">Login</span>
                  <li>
                    <Link
                      to="/citizenlogin"
                      className="block px-4 py-2 hover:bg-gray-200 rounded-t-lg flex items-center space-x-2"
                    >
                      <i className="fa fa-user text-blue-500"></i>
                      <span>Citizen Login</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/Mnglogin"
                      className="block px-4 py-2 hover:bg-gray-200 rounded-b-lg flex items-center space-x-2"
                    >
                      <i className="fa fa-users-cog text-green-500"></i>
                      <span>Management Login</span>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <i className="fa fa-bars text-2xl"></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-teal-500 text-white z-20 flex flex-col space-y-6 p-6">
          {/* Close Button */}
          <button
            className="self-end text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <i className="fa fa-times text-2xl"></i>
          </button>

          <Link
            to="/"
            className="hover:text-indigo-200 transition duration-300 flex items-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <i className="fa fa-home mr-3"></i> Home
          </Link>
          <Link
            to="/aboutus"
            className="hover:text-indigo-200 transition duration-300 flex items-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <i className="fa fa-info-circle mr-3"></i> About
          </Link>
          <Link
            to="/contact"
            className="hover:text-indigo-200 transition duration-300 flex items-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <i className="fa fa-phone mr-3"></i> Contact
          </Link>
          
          {/* Mobile Login Button */}
          <button
            onClick={handleDropdownToggle}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white transition duration-300"
          >
            <i className="fa fa-sign-in mr-2"></i> Login
          </button>

          {/* Mobile Dropdown Menu */}
          {isDropdownOpen && (
            <div className="flex flex-col space-y-4 mt-4">
              <Link
                to="/citizenlogin"
                className="flex items-center space-x-2 px-4 py-2 bg-white text-teal-500 hover:bg-teal-100 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className="fa fa-user text-blue-500"></i>
                <span>Citizen Login</span>
              </Link>
              <Link
                to="/Mnglogin"
                className="flex items-center space-x-2 px-4 py-2 bg-white text-teal-500 hover:bg-teal-100 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className="fa fa-users-cog text-green-500"></i>
                <span>Management Login</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
