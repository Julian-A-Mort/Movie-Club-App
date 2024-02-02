import React, { useState } from 'react';
import { Box, Button, Center, VStack } from '@chakra-ui/react';
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
    <Box>
      <Header />
      <Center py={5}>
        <VStack spacing={4}>
          <Button colorScheme="blue" onClick={openLoginModal}>
            Login
          </Button>
          <Button colorScheme="green" onClick={openSignupModal}>
            Signup
          </Button>
        </VStack>
      </Center>
      <LoginModal isOpen={isLoginOpen} onClose={closeLoginModal} />
      <SignupModal isOpen={isSignupOpen} onClose={closeSignupModal} />
    </Box>
  );
}

export default LandingPage;
