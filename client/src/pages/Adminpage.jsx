import React, { useState } from 'react';
import Banner from '../components/Header/index';
import NavBar from '../components/NavBar/index';
import { Box, Heading, Input, Button, VStack, HStack, List, ListItem, Text } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { GET_MOVIES, GET_USERS, GET_MEMBERSHIPS } from '../utils/queries';

const AdminPage = () => {
  const [showMovies, setShowMovies] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showMemberships, setShowMemberships] = useState(false);

  const { data: moviesData, loading: moviesLoading, error: moviesError } = useQuery(GET_MOVIES);
  const { data: usersData, loading: usersLoading, error: usersError } = useQuery(GET_USERS);
  const { data: membershipsData, loading: membershipsLoading, error: membershipsError } = useQuery(GET_MEMBERSHIPS);

  // Function to handle "View All" button click for movies, users, and memberships
  const handleViewAllMovies = () => setShowMovies(true);
  const handleViewAllUsers = () => setShowUsers(true);
  const handleViewAllMemberships = () => setShowMemberships(true);

  // Functions to render movies, users, and memberships
  const renderMovies = () => renderList(moviesData.movies, moviesLoading, moviesError, "movies");
  const renderUsers = () => renderList(usersData.users, usersLoading, usersError, "users");
  const renderMemberships = () => renderList(membershipsData.memberships, membershipsLoading, membershipsError, "memberships");

  // Common function to render list items
  const renderList = (data, loading, error, type) => {
    console.log(data); // Log the data to see its structure
  
    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;
    if (!data || !data[type] || data[type].length === 0) return <Text>None at the moment</Text>;
  
    return (
      <List spacing={2}>
        {data[type].map(item => (
          <ListItem key={item._id}>{item.title || item.userName || item.description}</ListItem>
        ))}
      </List>
    );
  };
  

  return (
    <Box>
      <Banner />
      <NavBar />
      {/* Movies Section */}
      <Box border="1px" borderColor="gray.200" borderRadius="md" p={4} m={4} display="flex" flexDirection="column" alignItems="center">
        <Heading mb={4}>Movie</Heading>
        <VStack spacing={4} width="100%">
          <Box>
            <Heading size="sm" mb={2}>Search by Name</Heading>
            <Input placeholder="Enter movie name" />
          </Box>
          <HStack spacing={4}>
            <Button colorScheme="blue" onClick={handleViewAllMovies}>View All</Button>
            <Button colorScheme="teal">Add New</Button>
          </HStack>
          {showMovies && renderMovies()}
        </VStack>
      </Box>
      {/* Users Section */}
      <Box border="1px" borderColor="gray.200" borderRadius="md" p={4} m={4} display="flex" flexDirection="column" alignItems="center">
        <Heading mb={4}>Users</Heading>
        <VStack spacing={4} width="100%">
          <Box>
            <Heading size="sm" mb={2}>Search by Name</Heading>
            <Input placeholder="Enter user name" />
          </Box>
          <HStack spacing={4}>
            <Button colorScheme="blue" onClick={handleViewAllUsers}>View All</Button>
            <Button colorScheme="teal">Add New</Button>
          </HStack>
          {showUsers && renderUsers()}
        </VStack>
      </Box>
      {/* Memberships Section */}
      <Box border="1px" borderColor="gray.200" borderRadius="md" p={4} m={4} display="flex" flexDirection="column" alignItems="center">
        <Heading mb={4}>Memberships</Heading>
        <VStack spacing={4} width="100%">
          <Box>
            <Heading size="sm" mb={2}>Search by Name</Heading>
            <Input placeholder="Enter membership title" />
          </Box>
          <HStack spacing={4}>
            <Button colorScheme="blue" onClick={handleViewAllMemberships}>View All</Button>
            <Button colorScheme="teal">Add New</Button>
          </HStack>
          {showMemberships && renderMemberships()}
        </VStack>
      </Box>
    </Box>
  );
};

export default AdminPage;
