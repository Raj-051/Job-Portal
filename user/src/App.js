import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/header";
import Footer from "./components/footer";

import Home from "./pages/home";
import Browsejob from "./pages/browsejob";
import Login from "./pages/login";
import Signup from "./pages/signup";
import UserDashboard from "./pages/UserDashboard"; 
import Resume from "./pages/Resume";
import UploadResume from "./pages/UploadResume";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    
    <Router>

      <Routes>

        {/* Login Page (No Header / Footer) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* All Pages With Header + Footer */}
        <Route
          path="*"
          element={
            <>
              <Header />

              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/About" element={<About/>} />
                <Route path="/browsejob" element={<Browsejob />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/UploadResume" element={<UploadResume/>} />
                <Route path="/UserDashboard" element={<UserDashboard />} />
                <Route path="/Resume" element ={<Resume/>} />

              </Routes>

              <Footer />
            </>
          }
        />

      </Routes>

    </Router>
  );
}

export default App;