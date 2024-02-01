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
  const [movieSearchTerm, setMovieSearchTerm] = useState('');
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [membershipSearchTerm, setMembershipSearchTerm] = useState('');

  const { data: moviesData, loading: moviesLoading, error: moviesError } = useQuery(GET_MOVIES);
  const { data: usersData, loading: usersLoading, error: usersError } = useQuery(GET_USERS);
  const { data: membershipsData, loading: membershipsLoading, error: membershipsError } = useQuery(GET_MEMBERSHIPS);

  const handleViewAllMovies = () => setShowMovies(true);
  const handleViewAllUsers = () => setShowUsers(true);
  const handleViewAllMemberships = () => setShowMemberships(true);

  const handleSearchMovies = (e) => setMovieSearchTerm(e.target.value.toLowerCase());
  const handleSearchUsers = (e) => setUserSearchTerm(e.target.value.toLowerCase());
  const handleSearchMemberships = (e) => setMembershipSearchTerm(e.target.value.toLowerCase());

  const filterList = (list, searchTerm) => {
    return list.filter(item => {
      const searchField = item.title || item.userName || item.description || "";
      return searchField.toLowerCase().includes(searchTerm);
    });
  };

  const renderList = (data, loading, error, type, searchTerm) => {
    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;
    if (!data || !data[type] || data[type].length === 0) return <Text>None at the moment</Text>;

    const filteredData = filterList(data[type], searchTerm);

    return (
      <List spacing={2}>
        {filteredData.map(item => (
          <ListItem key={item._id}>
            {type === 'movies' && (
              <>
                <Text>Title: {item.title}</Text>
                <Text>Description: {item.description}</Text>
              </>
            )}
            {type === 'users' && (
              <>
                <Text>User Name: {item.userName}</Text>
                <Text>Email: {item.email}</Text>
              </>
            )}
            {type === 'memberships' && (
              <>
                <Text>Title: {item.title}</Text>
                <Text>Description: {item.description}</Text>
              </>
            )}
          </ListItem>
        ))}
      </List>
    );
  };

  const renderMovies = () => renderList(moviesData, moviesLoading, moviesError, 'movies', movieSearchTerm);
  const renderUsers = () => renderList(usersData, usersLoading, usersError, 'users', userSearchTerm);
  const renderMemberships = () => renderList(membershipsData, membershipsLoading, membershipsError, 'memberships', membershipSearchTerm);


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
            <Input placeholder="Enter movie name" onChange={handleSearchMovies} />
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
            <Input placeholder="Enter user name" onChange={handleSearchUsers} />
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
            <Input placeholder="Enter membership title" onChange={handleSearchMemberships} />
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
