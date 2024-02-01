import React from 'react';
import { Box, Flex, Button, Spacer } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../utils/auth'; // Ensure this path matches where AuthService is defined

const NavBar = () => {
  const navigate = useNavigate(); // Used for navigation after logout
  const profile = AuthService.getProfile(); // Correct variable name used here

  const handleLogout = () => {
    AuthService.logout();
    navigate('/'); // Navigate to home after logout if AuthService.logout doesn't handle redirection
  };

  return (
    <Flex bg="blue.500" p={4} color="white">
      {/* Other navigation items */}
      {profile && profile.role === 'admin' && (
        <Button as={Link} to="/admin" colorScheme="teal" variant="ghost" mr={3}>
          Admin Page
        </Button>
      )}
      {/* Other buttons */}
      <Button onClick={handleLogout} colorScheme="red" variant="ghost" mr={3}>
        Logout
      </Button>
    </Flex>
  );
};

export default NavBar;
