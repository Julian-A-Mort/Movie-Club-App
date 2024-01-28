import React from 'react';
import { Box, Button, Image, Center, VStack, Heading } from '@chakra-ui/react';

function LandingPage({ onOpenLogin, onOpenSignup }) {
  return (
    <Box>
      {/* Top Banner */}
      <Image src="path_to_your_banner_image.jpg" alt="Banner" width="100%" />

      {/* Logo */}
      <Center py={10}>
        <VStack spacing={4}>
          <Image src="path_to_your_logo.png" alt="Logo" boxSize="150px" />
          <Heading>Goblin Movie Club</Heading>
        </VStack>
      </Center>

      {/* Login and Signup Buttons */}
      <Center py={5}>
        <Button colorScheme="blue" mr={3} onClick={onOpenLogin}>
          Login
        </Button>
        <Button colorScheme="green" onClick={onOpenSignup}>
          Signup
        </Button>
      </Center>
    </Box>
  );
}

export default LandingPage;
