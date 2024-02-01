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
      <Box>
        {/* Other navigation items */}
        {profile && profile.role === 'admin' && (
          <Button as={Link} to="/admin" colorScheme="teal" variant="ghost" mr={3}>
            Admin Page
          </Button>
        )}
        {/* Other buttons */}
        <Button as={Link} to="/user" colorScheme="teal" variant="ghost" mr={3}>
            User
          </Button>
          <Button as={Link} to="/allmovies" colorScheme="teal" variant="ghost" mr={3}>
            All Movies
          </Button>
          <Button as={Link} to="/membership" colorScheme="teal" variant="ghost" mr={3}>
            Membership
          </Button>
        <Button onClick={handleLogout} colorScheme="red" variant="ghost" mr={3}>
          Logout
        </Button>
      </Box>
    </Flex>
  );
};

export default NavBar;
