import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './pages/Landing';
import AdminPage from './pages/Adminpage';
import LoginModal from './components/Modals/LoginModal';
import SignupModal from './components/Modals/SignupModal';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header/index';
import NavBar from './components/NavBar/index';

function App() {
  // State for controlling login and signup modals
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <Router>
      <Header />
      <NavBar />

      <Switch>
        <Route exact path="/" render={() => (
          <LandingPage 
            onOpenLogin={() => setIsLoginOpen(true)} 
            onOpenSignup={() => setIsSignupOpen(true)} 
          />
        )} />
        <ProtectedRoute path="/admin" component={AdminPage} />
        <Route path="/main" component={MainPage} />

        {/* Add other routes as needed */}
      </Switch>

      {/* Login and Signup Modals */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
    </Router>
  );
}

export default App;