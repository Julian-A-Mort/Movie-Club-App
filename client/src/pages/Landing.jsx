import React, { useState } from 'react';
import { Box, Button, VStack } from '@chakra-ui/react';
import Header from '../components/Header/index';
import LoginModal from '../components/Modals/LoginModal';
import SignupModal from '../components/Modals/SignupModal';

function LandingPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);

  const openSignupModal = () => setIsSignupOpen(true);
  const closeSignupModal = () => setIsSignupOpen(false);

  return (
    <Box bg="#194C31" minHeight="100vh">
      <Header />
      <VStack spacing={4} p={8} >
        <Button colorScheme="blue" bg="#14213D" onClick={openLoginModal}>
          Login
        </Button>
        <Button colorScheme="green" bg="#A4031F" onClick={openSignupModal}>
          Signup
        </Button>
      </VStack>
      <LoginModal isOpen={isLoginOpen} onClose={closeLoginModal} />
      <SignupModal isOpen={isSignupOpen} onClose={closeSignupModal} />
    </Box>
  );
}

export default LandingPage;