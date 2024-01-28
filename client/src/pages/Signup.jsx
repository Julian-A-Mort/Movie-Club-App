import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { SIGNUP_MUTATION } from '../utils/mutations';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure
} from '@chakra-ui/react';

function Signup() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // State for form fields
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION);

  const handleSubmit = async () => {
    try {
      await signup({ variables: { userName, firstName, lastName, email, password } });
      onClose(); // Close modal
      // Handle response, set user context, redirect, etc.
    } catch (error) {
      console.error('Signup failed:', error);
      // Handle errors in UI
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Sign Up</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Up!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input 
                placeholder='Choose a Username' 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input 
                placeholder='Enter first name' 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input 
                placeholder='Enter last name' 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input 
                placeholder='Enter your email' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input 
                placeholder='Choose a password' 
                type='password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Button
              mt={4}
              colorScheme="teal"
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Signup;
