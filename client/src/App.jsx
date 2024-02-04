import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing';
import AdminPage from './pages/Adminpage'; 
import MainPage from './pages/Mainpage'; 
import AllMovies from './pages/AllMovies'; 
import Userdetails from './pages/Userdetails';
import Membership from './pages/Membership';
import LoginModal from './components/Modals/LoginModal';
import SignupModal from './components/Modals/SignupModal';
import ProtectedRoute from './components/ProtectedPage';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const stripePromise = loadStripe('pk_live_3w8Ofr6RzBcFvQESz5CIOdn7');

  return (
    <Router>
      <Elements stripe={stripePromise}>

      <Routes>
        <Route path="/" element={<LandingPage onOpenLogin={() => setIsLoginOpen(true)} onOpenSignup={() => setIsSignupOpen(true)} />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/allmovies" element={<AllMovies />} />
        <Route path="/user" element={<Userdetails />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/admin" element={<ProtectedRoute element={<AdminPage />} />} />
      </Routes>

      {/* Login and Signup Modals */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
      </Elements>
    </Router>
  );
}

export default App;
