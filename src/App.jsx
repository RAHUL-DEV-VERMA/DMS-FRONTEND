import React from 'react';
import LoaderWrapper from './Pages/LoaderWrapper';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';  // Ensure you import your Tailwind CSS styles

// Import Pages
import LandingPage from './Pages/LandingPage';
import AboutUs from './Pages/AboutUs';
import ContactForm from './Pages/ContactForm';
import CitizenLogin from './Pages/CitizenLogin';
import Mnglog from './Pages/Mnglog'
import AdminLanding from './Pages/AdminLanding';
import DmLandingPage from './Pages/DmLandingPage';
import DmNavbar from './Pages/DmNavbar';
import CitizenLandingPage from './Pages/CitizenLandingPage';
import CreateUser from './Pages/CreateUser';
import DeviceIssueForm from './Pages/DeviceIssueForm';
import AdminDmView from './Pages/AdminDmView';
import AdminCitizenView from './Pages/AdminCitizenView';
import CitizenProfile from './Pages/CitizenProfile';
import UserEditPage from './Pages/UserEditPage';
import ChangePasswordPage from './Pages/ChangePasswordPage';
import AddDeviceForm from './Pages/AddDeviceForm';
import DeviceTable from './Pages/DeviceTable';
import ErrorPage from './Pages/ErrorPage';
import Footer from './Pages/Footer';
import ChangePasswordNavbar from './Pages/ChangePasswordNavbar';
import Editdevice from './Pages/Editdevice';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import Showadmin from './Pages/Showadmin'



// Import ProtectedRoutes component
import ProtectedRoutes from './components/ProtectedRoutes';  // Ensure the path is correct
import ResetPasswordPage from './Pages/ResetPasswordPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LoaderWrapper>
          <Routes>

            {/* Navbar */}
            <Route path='/dmnavbar' element={<DmNavbar />} />

            {/* Public Pages */}
            <Route path='/citizenlogin' element={<CitizenLogin />} />
            <Route path='/Mnglogin' element={<Mnglog />} />
            <Route path='/' element={<LandingPage />} />
            <Route path='/aboutus' element={<AboutUs />} />
            <Route path='/contact' element={<ContactForm />} />

            <Route path='/forgot-password' element={<ForgotPasswordPage />} />
            <Route path='/reset-password/:id/:token' element={<ResetPasswordPage />} />

            {/* Protected Routes for Landing and Specific Pages */}
            <Route path='/citizenlandingpage/:id' element={<ProtectedRoutes requiredRole="CITIZEN"><CitizenLandingPage /></ProtectedRoutes>} />
            <Route path='/adminlandingpage/:id' element={<ProtectedRoutes requiredRole="ADMIN"><AdminLanding /></ProtectedRoutes>} />
            <Route path='/dmlandingpage/:id' element={<ProtectedRoutes requiredRole="DM"><DmLandingPage /></ProtectedRoutes>} />

            {/* Form Pages - Protected */}
            <Route path='/createuser' element={<ProtectedRoutes requiredRole="ADMIN"><CreateUser /></ProtectedRoutes>} />
            <Route path='/device-issue/:id' element={<ProtectedRoutes requiredRole="ADMIN"><DeviceIssueForm /></ProtectedRoutes>} />

            {/* Admin Views - Protected */}
            <Route path='/adminDmView' element={<ProtectedRoutes requiredRole="ADMIN"><AdminDmView /></ProtectedRoutes>} />
            <Route path='/showadmin' element={<ProtectedRoutes requiredRole="ADMIN"><Showadmin /></ProtectedRoutes>} />
            <Route path='/adminCitizenView' element={<ProtectedRoutes requiredRole="ADMIN"><AdminCitizenView /></ProtectedRoutes>} />
            <Route path='/adminCitizenProfile/:id' element={<ProtectedRoutes requiredRole="ADMIN"><CitizenProfile /></ProtectedRoutes>} />
            <Route path='/showadmin/:id' element={<ProtectedRoutes requiredRole="ADMIN"><Showadmin /></ProtectedRoutes>} />


            {/* Edit Pages - Protected */}
            <Route path='/editpage/:id' element={<ProtectedRoutes requiredRole="ADMIN"><UserEditPage /></ProtectedRoutes>} />
            <Route path='/changepassword/:id' element={<ProtectedRoutes requiredRole="CITIZEN"><ChangePasswordPage /></ProtectedRoutes>} />
            <Route path='/edit-device/:id' element={<ProtectedRoutes requiredRole="ADMIN"><Editdevice /></ProtectedRoutes>} />

            {/* Device Management - Protected */}
            <Route path="/add-device" element={<ProtectedRoutes requiredRole="ADMIN"><AddDeviceForm /></ProtectedRoutes>} />
            <Route path="/view-device" element={<ProtectedRoutes requiredRole="DM"><DeviceTable /></ProtectedRoutes>} />

            {/* Footer Page */}
            <Route path="/footer" element={<Footer />} />
            <Route path="/changepasswordnavbar" element={<ChangePasswordNavbar />} />

            {/* Error Page for non-matching paths */}
            <Route path="*" element={<ErrorPage />} />

          </Routes>
        </LoaderWrapper>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
