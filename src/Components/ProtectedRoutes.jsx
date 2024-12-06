import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";  // Corrected import

const ProtectedRoutes = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');

  // If there is no token, redirect to login
  if (!token) {
    return <Navigate to="/citizenlogin" />;
  }

  // If token exists, decode and check the role
  try {
    const decoded = jwtDecode(token); // Decode the token
    const userRole = decoded.role; // Get the user's role from the decoded token

    // Admin can access Admin, DM, and Citizen routes
    if (requiredRole === 'ADMIN') {
      if (userRole === 'ADMIN') {
        return children; // Allow access only for ADMIN
      }
    }

    // DM can access DM and Citizen routes, but not Admin
    else if (requiredRole === 'DM') {
      if (userRole === 'DM' || userRole === 'ADMIN') {
        return children; // Allow access for DM and CITIZEN
      }
    }

    // Citizen can only access their own routes
    else if (requiredRole === 'CITIZEN') {
      if (userRole === 'CITIZEN' || userRole === 'DM' || userRole === 'ADMIN') {
        return children; // Allow access for CITIZEN
      }
    }

    // If the user's role doesn't match the required role, redirect to home
    return <Navigate to="/" />;

  } catch (error) {
    // If token decoding fails, redirect to login
    return <Navigate to="/" />;
  }
};

export default ProtectedRoutes;
