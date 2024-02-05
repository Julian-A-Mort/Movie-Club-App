import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing';
import AdminPage from './pages/Adminpage'; 
import MainPage from './pages/Mainpage'; 
import AllMovies from './pages/AllMovies'; 
// import Userdetails from './pages/Userdetails';
import Membership from './pages/Membership';
import LoginModal from './components/Modals/LoginModal';
import SignupModal from './components/Modals/SignupModal';
import ProtectedRoute from './components/ProtectedPage';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import '@stripe/stripe-js';
import '@stripe/react-stripe-js';

// Define the appearance customization for Stripe Elements
// Define the appearance customization for Stripe Elements
const appearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#0570de',
    colorBackground: '#ffffff',
    colorText: '#30313d',
    colorDanger: '#df1b41',
    fontFamily: 'Ideal Sans, system-ui, sans-serif',
    spacingUnit: '2px',
    borderRadius: '4px',
  },
  rules: {
    '.Input': {
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    },
    '.Input--invalid': {
      borderColor: 'var(--colorDanger)',
      boxShadow: '0 0 0 1px var(--colorDanger)',
    },
  }
};

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const stripePromise = loadStripe('pk_live_3w8Ofr6RzBcFvQESz5CIOdn7');

  return (
    <Router>
      <Elements stripe={stripePromise} options={appearance}>

      <Routes>
        <Route path="/" element={<LandingPage onOpenLogin={() => setIsLoginOpen(true)} onOpenSignup={() => setIsSignupOpen(true)} />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/allmovies" element={<AllMovies />} />
        {/* <Route path="/user" element={<Userdetails />} /> */}
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
