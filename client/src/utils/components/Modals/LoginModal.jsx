import React, { useState } from 'react';
import useLogin from '../../../utils/login';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

function LoginModal({ isOpen, onClose }) {
  const { login, loading, error } = useLogin(); // Use the useLogin hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
      if (!error) {
        onClose(); // Close the modal after successful login
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {error && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              {error.message || 'An error occurred'} {/* Display the error message */}
            </Alert>
          )}
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleLogin} isLoading={loading}>
            Login
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default LoginModal;
