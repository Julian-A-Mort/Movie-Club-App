import React, { useState } from 'react';
import Banner from '../components/Header/index';
import NavBar from '../components/NavBar/index';
import {
  Box, Heading, Input, Button, VStack, HStack, Text, Flex,
  FormControl, FormLabel, Modal, ModalOverlay,
  ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, useToast
} from '@chakra-ui/react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_MOVIES, GET_USERS, GET_MEMBERSHIPS } from '../utils/queries';
import { UPDATE_USER, ADD_USER, ADD_MOVIE } from '../utils/mutations';

const AdminPage = () => {
  // State initialization
  const [showMovies, setShowMovies] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showMemberships, setShowMemberships] = useState(false);
  const [movieSearchTerm, setMovieSearchTerm] = useState('');
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [membershipSearchTerm, setMembershipSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState({});
  const [newMovie, setNewMovie] = useState({
    title: '', description: '', releaseYear: '', genre: '', director: '', posterPath: '', tmdbId: ''
  });
  const [modalType, setModalType] = useState('');

  // Modal and toast control
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // GraphQL hooks
  const { loading: moviesLoading, error: moviesError, data: moviesData } = useQuery(GET_MOVIES);
  const { loading: usersLoading, error: usersError, data: usersData } = useQuery(GET_USERS);
  const { loading: membershipsLoading, error: membershipsError, data: membershipsData } = useQuery(GET_MEMBERSHIPS);

  const [updateUser] = useMutation(UPDATE_USER);
  const [addUser] = useMutation(ADD_USER);
  const [addMovie] = useMutation(ADD_MOVIE);

  // Modal handler
  const handleOpenModalForNew = (type) => {
    if (type === 'user') {
      setSelectedUser({ userName: '', email: '', firstName: '', lastName: '', password: '' });
    } else if (type === 'movie') {
      setNewMovie({ title: '', description: '', releaseYear: '', genre: '', director: '', posterPath: '', tmdbId: '' });
    }
    setModalType(type);
    onOpen();
  };

  // Handle changes
  const handleMovieChange = (e) => {
    const { name, value } = e.target;
    setNewMovie(prev => ({ ...prev, [name]: value }));
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setModalType('user'); // Ensure modal type is set for editing user
    onOpen();
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    if (modalType === 'user') {
      const operation = selectedUser?._id ? updateUser : addUser;
      try {
        await operation({
          variables: { ...selectedUser },
        });
        toast({ title: `User ${selectedUser?._id ? 'updated' : 'added'} successfully.`, status: 'success' });
      } catch (error) {
        toast({ title: `Error ${selectedUser?._id ? 'updating' : 'adding'} user.`, description: error.message, status: 'error' });
      }
    } else if (modalType === 'movie') {
      try {
        await addMovie({
          variables: { ...newMovie },
        });
        toast({ title: 'Movie added successfully.', status: 'success' });
      } catch (error) {
        toast({ title: 'Error adding movie.', description: error.message, status: 'error' });
      }
    }
    onClose();
    setModalType('');
    setSelectedUser({});
    setNewMovie({ title: '', description: '', releaseYear: '', genre: '', director: '', posterPath: '', tmdbId: '' });
  };

  // Reset form state
  const resetFormState = () => {
    setModalType('');
    setSelectedUser({});
    setNewMovie({ title: '', description: '', releaseYear: '', genre: '', director: '', posterPath: '', tmdbId: '' });
  };


  //view and search
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
      <VStack spacing={4} align="stretch">
        {filteredData.map(item => (
          <Flex key={item._id} border="1px" borderColor="gray.200" borderRadius="md" p={4} align="center">
            {type === 'movies' && (
              <>
                <Text flex={1} fontWeight="bold">{item.title}</Text>
           i     <Text flex={3}>Description: {item.description}</Text>
              </>
            )}
            {type === 'users' && (
              <>
                <Text flex={1} fontWeight="bold">{item.userName}</Text>
                <Text flex={3}>Email: {item.email}</Text>
                <Text flex={3}>First Name: {item.firstName}</Text>
                <Text flex={3}>Last Name: {item.lastName}</Text>
                <Button colorScheme="teal" ml="auto" onClick={() => handleEditUser(item)}>Edit</Button>

              </>
            )}
            {type === 'memberships' && (
              <>
                <Text flex={1} fontWeight="bold">{item.title}</Text>
                <Text flex={3}>Description: {item.description}</Text>
              </>
            )}

          </Flex>
        ))}
      </VStack>
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
            <Button colorScheme="teal" onClick={() => { setModalType('movie'); onOpen(); }}>Add New Movie</Button>
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
            <Button colorScheme="teal" onClick={handleOpenModalForNew}>Add New User</Button>
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

{/* User Edit/Add Modal */}
<Modal isOpen={isOpen} onClose={resetFormState}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>{modalType === 'user' ? (selectedUser?._id ? 'Edit User' : 'Add New User') : 'Add New Movie'}</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      {modalType === 'user' ? (
        <>
          <FormControl isRequired>
            <FormLabel>User Name</FormLabel>
            <Input 
              name="userName" 
              value={selectedUser?.userName || ''} 
              onChange={handleUserChange} 
              placeholder="Username" 
            />
          </FormControl>
          
          <FormControl mt={4} isRequired>
            <FormLabel>Email</FormLabel>
            <Input 
              name="email" 
              value={selectedUser?.email || ''} 
              onChange={handleUserChange} 
              placeholder="Email" 
              type="email" 
            />
          </FormControl>
          
          <FormControl mt={4} isRequired>
            <FormLabel>First Name</FormLabel>
            <Input 
              name="firstName" 
              value={selectedUser?.firstName || ''} 
              onChange={handleUserChange} 
              placeholder="First Name" 
            />
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input 
              name="lastName" 
              value={selectedUser?.lastName || ''} 
              onChange={handleUserChange} 
              placeholder="Last Name" 
            />
          </FormControl>   

          {/* Include password field for new user only */}
          {!selectedUser?._id && (
            <FormControl mt={4} isRequired>
              <FormLabel>Password</FormLabel>
              <Input 
                name="password" 
                value={selectedUser?.password || ''} 
                onChange={handleUserChange} 
                placeholder="Password" 
                type="password" 
              />
            </FormControl>
          )}
        </>
      ) : (
        <>
         <FormControl isRequired>
  <FormLabel>Title</FormLabel>
  <Input 
    name="title" 
    value={newMovie.title} 
    onChange={handleMovieChange}
    placeholder="Movie Title" 
  />
</FormControl>
<FormControl mt={4} isRequired>
  <FormLabel>Description</FormLabel>
  <Input 
    name="description" 
    value={newMovie.description}
    onChange={handleMovieChange}
    placeholder="Description" 
  />
</FormControl>
<FormControl mt={4} isRequired>
  <FormLabel>Release Year</FormLabel>
  <Input 
    name="releaseYear" 
    value={newMovie.releaseYear}
    onChange={handleMovieChange}
    type="number" 
    placeholder="Release Year"
  />
</FormControl>
<FormControl mt={4} isRequired>
  <FormLabel>Genre</FormLabel>
  <Input 
    name="genre" 
    value={newMovie.genre}
    onChange={handleMovieChange}
    placeholder="Genre" 
  />
</FormControl>
<FormControl mt={4} isRequired>
  <FormLabel>Director</FormLabel>
  <Input 
    name="director" 
    value={newMovie.director}
    onChange={handleMovieChange}
    placeholder="Director" 
  />
</FormControl>
<FormControl mt={4}>
  <FormLabel>Poster Path (optional)</FormLabel>
  <Input 
    name="posterPath" 
    value={newMovie.posterPath}
    onChange={handleMovieChange}
    placeholder="Poster Path" 
  />
</FormControl>
<FormControl mt={4}>
  <FormLabel>TMDb ID (optional)</FormLabel>
  <Input 
    name="tmdbId" 
    value={newMovie.tmdbId}
    onChange={handleMovieChange}
    placeholder="TMDb ID" 
  />
</FormControl>

        </>
      )}
    </ModalBody>
    <ModalFooter>
      <Button colorScheme="blue" mr={3} onClick={() => handleSaveChanges()}>
        {modalType === 'user' ? (selectedUser?._id ? 'Save Changes' : 'Add User') : 'Add Movie'}
      </Button>
      <Button onClick={() => { onClose(); setModalType(''); }}>Cancel</Button>
    </ModalFooter>
  </ModalContent>
</Modal>

    </Box>
  );
};

export default AdminPage;
