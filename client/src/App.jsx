import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/Landing';
import AdminPage from './pages/Adminpage';
import MainPage from './pages/Mainpage';
import LoginModal from './components/Modals/LoginModal';
import SignupModal from './components/Modals/SignupModal';
import ProtectedRoute from './components/ProtectedPage/index';
// import Header from './components/Header/index';
// import NavBar from './components/NavBar/index';

function App() {
  // State for controlling login and signup modals
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <Router>

      <Routes>
        <Route exact path="/" element={<LandingPage onOpenLogin={() => setIsLoginOpen(true)} onOpenSignup={() => setIsSignupOpen(true)} />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/admin" element={<ProtectedRoute component={AdminPage} />} />
        {/* Add other routes as needed */}
      </Routes>

      {/* Login and Signup Modals */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
    </Router>
  );
}

export default App;