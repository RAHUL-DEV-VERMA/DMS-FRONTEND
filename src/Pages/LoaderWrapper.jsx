// src/components/LoaderWrapper.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";

const LoaderWrapper = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Trigger loading state on route change
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Simulate a delay of 500ms

    // Cleanup timeout on unmount or before next render
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div>
      {loading ? <Loader /> : children}
    </div>
  );
};

export default LoaderWrapper;
