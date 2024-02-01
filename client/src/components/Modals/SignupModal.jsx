import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import AuthService from '../../utils/auth';
import { SIGNUP_MUTATION } from '../../utils/mutations';
import { useNavigate } from 'react-router-dom';
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
  Box,
} from '@chakra-ui/react';

function SignupModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signup] = useMutation(SIGNUP_MUTATION);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignup = async () => {
    try {
      const { data } = await signup({ variables: { userName, firstName, lastName, email, password } });
      if (data.signup.token) {
        AuthService.login(data.signup.token); // Store the token and redirect
        setSuccessMsg('Thank you for signing up!');
        setErrorMsg('');
        navigate('/main'); // Redirect to main page after successful signup
      }
    } catch (err) {
      console.error('Signup error:', err);
      setSuccessMsg('');
      setErrorMsg('Error signing up. Please try again.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign Up</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="Choose a username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>First Name</FormLabel>
            <Input
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Last Name</FormLabel>
            <Input
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
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
              placeholder="Choose a password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        {successMsg && <Box color="green.500" p={2}>{successMsg}</Box>}
        {errorMsg && <Box color="red.500" p={2}>{errorMsg}</Box>}

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSignup}>
            Sign Up
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SignupModal;
