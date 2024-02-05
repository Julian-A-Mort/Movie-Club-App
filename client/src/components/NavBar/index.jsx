import React from 'react';
import { Flex, Button, Spacer } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../utils/auth'; 

const NavBar = () => {
  const navigate = useNavigate(); // Used for navigation after logout
  const profile = AuthService.getProfile();

  const handleLogout = () => {
    AuthService.logout();
    navigate('/'); // Navigate to home after logout
  };

  return (
    <Flex bg="black" p={4} color="#C9F2C7" alignItems="center">
      {/* Left-side navigation items */}
     
         <Spacer />

        {profile && profile.role === 'admin' && (
          <Button as={Link} to="/admin" colorScheme="#EFF1ED" variant="ghost" mr={3}>
            ADMIN PAGE
          </Button>
        )}

        {/* <Button as={Link} to="/user" colorScheme="#EFF1ED" variant="ghost" mr={3}>
          User
        </Button> */}

        <Button as={Link} to="/main" colorScheme="#EFF1ED" variant="ghost" mr={3}>
          MAIN PAGE
        </Button>

        <Button as={Link} to="/allmovies" colorScheme="#EFF1ED" variant="ghost" mr={3}>
          UPCOMING MOVIES
        </Button>

        <Button as={Link} to="/membership" colorScheme="#EFF1ED" variant="ghost" mr={3}>
          MEMBERSHIP
        </Button>

        <Button onClick={handleLogout} colorScheme="#EFF1ED" variant="ghost">
          LOGOUT
        </Button>

      <Spacer />

    </Flex>
  );
};

export default NavBar;
