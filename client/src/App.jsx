import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing';
import AdminPage from './pages/Adminpage'; // Ensure correct import
import MainPage from './pages/Mainpage'; // Ensure correct import
import LoginModal from './components/Modals/LoginModal';
import SignupModal from './components/Modals/SignupModal';
import ProtectedRoute from './components/ProtectedPage';
// Optional: import NavBar from './components/NavBar';

function App() {
  // State for controlling login and signup modals
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <Router>
      {/* Optional: NavBar component can be placed here if it should be displayed across all pages */}

      <Routes>
        <Route path="/" element={<LandingPage onOpenLogin={() => setIsLoginOpen(true)} onOpenSignup={() => setIsSignupOpen(true)} />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/admin" element={<ProtectedRoute element={<AdminPage />} />} />
        {/* Add other routes as needed */}
      </Routes>

      {/* Login and Signup Modals */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
    </Router>
  );
}

export default App;
