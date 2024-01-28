import React from 'react';
import { Box, Flex, Button, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <Flex bg="blue.500" p={4} color="white">
      <Box>Movie Club</Box>
      <Spacer />
      <Box>
        <Button as={Link} to="/user-details" colorScheme="teal" variant="ghost" mr={3}>
          User Details
        </Button>
        <Button as={Link} to="/upcoming-movies" colorScheme="teal" variant="ghost" mr={3}>
          Upcoming Movies
        </Button>
        <Button as={Link} to="/past-movies" colorScheme="teal" variant="ghost" mr={3}>
          Past Movies
        </Button>
        <Button as={Link} to="/subscribe" colorScheme="teal" variant="ghost">
          Subscribe
        </Button>
      </Box>
    </Flex>
  );
}

export default NavBar;
