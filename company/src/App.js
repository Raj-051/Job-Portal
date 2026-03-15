import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";
import ViewJobcategory from "./pages/viewjobcategory";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Logout from "./pages/logout";
import ManageCandidates from "./pages/managecandidates";
import ChatWithJobSeeker from "./pages/chatwithjobseeker";
import ScheduleInterview from "./pages/scheduleinterview";
import ManageProfile from "./pages/manageprofile";
import AddJobCategory from "./pages/addjobcategory";
import Addjoblist from "./pages/addjoblist";
import Viewjoblist from "./pages/viewjoblist";
import EditJobCategory from "./pages/editjobcategory";
import Dashboard from "./pages/dashboard";
import Editjoblist from "./pages/editjoblist";







import "./App.css";

/* ===== DASHBOARD LAYOUT ===== */
const DashboardLayout = ({ children }) => (
  <>
    <Header />

    <div className="dashboard-wrapper">
      <Sidebar />

      <div className="page-content">
        {children}
      </div>
    </div>

    <Footer />
  </>
);


function App() {
  return (
    <BrowserRouter>

        {/* Default Home Page */}
        <Routes>

  {/* Default Page → Login */}
  <Route path="/" element={<Login />} />

  {/* Auth Pages */}
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/logout" element={<Logout />} />

  {/* Dashboard Pages */}
  <Route path="/dashboard" element={<DashboardLayout><Dashboard/></DashboardLayout>} />
  <Route path="/addjobcategory" element={<DashboardLayout><AddJobCategory /></DashboardLayout>} />
  <Route path="/viewjobcategory" element={<DashboardLayout><ViewJobcategory /></DashboardLayout>} />
  <Route path="/editjobcategory" element={<DashboardLayout><EditJobCategory /></DashboardLayout>} />
  <Route path="/viewjoblist" element={<DashboardLayout><Viewjoblist /></DashboardLayout>} />
  <Route path="/addjoblist" element={<DashboardLayout><Addjoblist /></DashboardLayout>} />
  <Route path="/editjoblist" element={<DashboardLayout><Editjoblist /></DashboardLayout>} />
  <Route path="/managecandidates" element={<DashboardLayout><ManageCandidates /></DashboardLayout>} />
  <Route path="/scheduleinterview" element={<DashboardLayout><ScheduleInterview /></DashboardLayout>} />
  <Route path="/chatwithjobseeker" element={<DashboardLayout><ChatWithJobSeeker /></DashboardLayout>} />
  <Route path="/profile" element={<DashboardLayout><ManageProfile /></DashboardLayout>} />

</Routes>

    </BrowserRouter>
  );
}

export default App;