import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Footer from './Footer';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const fetchCitizenDevices = async (id) => {
  const response = await fetch(`${BACKEND_URL}/user/device/${id}`);
  console.log(response);
  if (!response.ok) {
    throw new Error('Failed to fetch devices');
  }
  return response.json();
};

const DeviceView = () => {
  const { id } = useParams(); // Get citizen ID from route params
  const navigate = useNavigate();

  // Use react-query to fetch devices
  const { data, isLoading, error } = useQuery({
    queryKey: ['devices', id], // The query key
    queryFn: () => fetchCitizenDevices(id), // The fetch function
    enabled: !!id, // Only fetch if id is available
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error.message}</div>;
  }

  return (
    <>
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Devices for Citizen: {id}</h2>
      <table className="min-w-full border-collapse table-auto">
        <thead>
          <tr>
            <th className="border p-2 text-left">Device No</th>
            <th className="border p-2 text-left">Model</th>
            <th className="border p-2 text-left">Info</th>
          </tr>
        </thead>
        <tbody>
          {data?.devices?.map((device) => (
            <tr key={device._id}>
              <td className="border p-2">{device.deviceNo}</td>
              <td className="border p-2">{device.deviceMdl}</td>
              <td className="border p-2">{device.deviceInfo}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button to navigate back to Profile */}
      <button
        onClick={() => navigate(`/profile/${id}`)}
        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-blue-600"
      >
        Back to Profile
      </button>
    </div>
    <Footer/>
    </>
  );
};

export default DeviceView;
