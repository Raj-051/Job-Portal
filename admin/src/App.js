import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";

import Dashboard from "./pages/dashboard";
import ViewEmployer from "./pages/ViewEmployer";
import ViewJob from "./pages/ViewJob";
import MonitorJobSeeker from "./pages/managejobseeker";
import ManageProfile from "./pages/manageprofile";
import Login from "./pages/login";

import "./App.css";

/* ✅ PROTECTED ROUTE COMPONENT */
const PrivateRoute = ({ children }) => {
  const admin = sessionStorage.getItem("admin");
  return admin ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ✅ DEFAULT REDIRECT */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* ✅ LOGIN PAGE */}
        <Route path="/login" element={<Login />} />

        {/* ✅ DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <>
                <Header />
                <div className="d-flex align-items-stretch">
                  <Sidebar />
                  <Dashboard />
                </div>
                <Footer />
              </>
            </PrivateRoute>
          }
        />

        {/* ✅ VIEW EMPLOYERS */}
        <Route
          path="/employers"
          element={
            <PrivateRoute>
              <>
                <Header />
                <div className="d-flex align-items-stretch">
                  <Sidebar />
                  <ViewEmployer />
                </div>
                <Footer />
              </>
            </PrivateRoute>
          }
        />

        {/* ✅ VIEW JOBS */}
        <Route
          path="/jobs"
          element={
            <PrivateRoute>
              <>
                <Header />
                <div className="d-flex align-items-stretch">
                  <Sidebar />
                  <ViewJob />
                </div>
                <Footer />
              </>
            </PrivateRoute>
          }
        />

        {/* ✅ PROFILE */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <>
                <Header />
                <div className="d-flex align-items-stretch">
                  <Sidebar />
                  <ManageProfile />
                </div>
                <Footer />
              </>
            </PrivateRoute>
          }
        />

        {/* ✅ JOB SEEKERS */}
        <Route
          path="/seekers"
          element={
            <PrivateRoute>
              <>
                <Header />
                <div className="d-flex align-items-stretch">
                  <Sidebar />
                  <MonitorJobSeeker />
                </div>
                <Footer />
              </>
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;