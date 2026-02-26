import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN ROUTE (No Header / Sidebar / Footer) */}
        <Route path="/login" element={<Login />} />
         {/* VIEW EMPLOYER PAGE (with header/sidebar/footer if needed) */}

         {/* VIEWEMPLOYER LAYOUT */}
        <Route
          path="/employers"
          element={
            <>
              <Header />
              <div className="d-flex align-items-stretch">
                <Sidebar />
                <ViewEmployer />
              </div>
              <Footer />
            </>
          }
        />
        {/* VIEW JOB LAYOUT */}
        <Route
          path="/jobs"
          element={
            <>
              <Header />
              <div className="d-flex align-items-stretch">
                <Sidebar />
                <ViewJob />
              </div>
              <Footer />
            </>
          }
        />

        {/* DASHBOARD LAYOUT */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <div className="d-flex align-items-stretch">
                <Sidebar />
                <Dashboard />
              </div>
              <Footer />
            </>
          }
        />

        {/* MANAGE PROFILE LAYOUT */}
        <Route
          path="/profile"
          element={
            <>
              <Header />
              <div className="d-flex align-items-stretch">
                <Sidebar />
                <ManageProfile />
              </div>
              <Footer />
            </>
          }
        />
          {/* MANAGE JOBSEEKER LAYOUT */}
        <Route
          path="/seekers"
          element={
            <>
              <Header />
              <div className="d-flex align-items-stretch">
                <Sidebar />
                <MonitorJobSeeker />
              </div>
              <Footer />
            </>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;