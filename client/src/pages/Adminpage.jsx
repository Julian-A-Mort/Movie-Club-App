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
import { UPDATE_USER, ADD_USER } from '../utils/mutations';

const AdminPage = () => {
  // State for UI control
  const [showMovies, setShowMovies] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showMemberships, setShowMemberships] = useState(false);
  const [movieSearchTerm, setMovieSearchTerm] = useState('');
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [membershipSearchTerm, setMembershipSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState({});

  // Modal control
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // GraphQL hooks
  const { data: moviesData, loading: moviesLoading, error: moviesError } = useQuery(GET_MOVIES);
  const { data: usersData, loading: usersLoading, error: usersError } = useQuery(GET_USERS);
  const { data: membershipsData, loading: membershipsLoading, error: membershipsError } = useQuery(GET_MEMBERSHIPS);

  const [updateUser] = useMutation(UPDATE_USER);
  const [addUser] = useMutation(ADD_USER);

  // Handlers
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    onOpen();
  };

  const handleOpenModalForNew = () => {
    setSelectedUser({ userName: '', email: '', firstName: '', lastName: '', password: '' }); // Set fields to empty for new user
    onOpen();
  };

  const handleSaveChanges = async () => {
    if (selectedUser?._id) {
      // Existing user
      try {
        await updateUser({
          variables: {
            _id: selectedUser._id,
            userName: selectedUser.userName,
            email: selectedUser.email,
            firstName: selectedUser.firstName,
            lastName: selectedUser.lastName
          },
        });
        toast({ title: 'User updated', status: 'success', duration: 5000, isClosable: true });
        onClose(); 
        setSelectedUser({});
      } catch (error) {
        toast({ title: 'Error updating user', description: error.message, status: 'error' });
      }
    } else {
      // New user
      try {
        await addUser({
          variables: {
            userName: selectedUser.userName,
            email: selectedUser.email,
            firstName: selectedUser.firstName,
            lastName: selectedUser.lastName,
            password: selectedUser.password 
          },
        });
        toast({ title: 'User added', status: 'success', duration: 5000, isClosable: true });
        onClose(); 
        setSelectedUser({});
      } catch (error) {
        toast({ title: 'Error adding user', description: error.message, status: 'error' });
      }
    }
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
<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>{selectedUser?._id ? 'Edit User' : 'Add New User'}</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
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
    </ModalBody>
    <ModalFooter>
      <Button colorScheme="blue" mr={3} onClick={handleSaveChanges}>
        {selectedUser?._id ? 'Save Changes' : 'Add User'}
      </Button>
      <Button onClick={onClose}>Cancel</Button>
    </ModalFooter>
  </ModalContent>
</Modal>

    </Box>
  );
};

export default AdminPage;
