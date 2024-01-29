import React, { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import EditModal from '../components/EditModal';

// Dummy data for demonstration
const movies = [{ id: 1, name: 'Movie 1' }, { id: 2, name: 'Movie 2' }];
const events = [{ id: 1, name: 'Event 1' }, { id: 2, name: 'Event 2' }];
const users = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
const memberships = [{ id: 1, name: 'Membership 1' }, { id: 2, name: 'Membership 2' }];

const AdminPage = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditItems, setCurrentEditItems] = useState([]);
  const [currentEditTitle, setCurrentEditTitle] = useState('');

  const handleOpenEditModal = (title, items) => {
    setCurrentEditTitle(title);
    setCurrentEditItems(items);
    setIsEditModalOpen(true);
  };

  return (
    <Box>
      <Header />
      <NavBar />
      <Box p={4}>
        <Button colorScheme="blue" m={2} onClick={() => handleOpenEditModal('Movies', movies)}>Edit Movies</Button>
        <Button colorScheme="green" m={2} onClick={() => handleOpenEditModal('Events', events)}>Edit Events</Button>
        <Button colorScheme="purple" m={2} onClick={() => handleOpenEditModal('Users', users)}>Edit Users</Button>
        <Button colorScheme="orange" m={2} onClick={() => handleOpenEditModal('Memberships', memberships)}>Edit Memberships</Button>
      </Box>
      <EditModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        title={currentEditTitle} 
        items={currentEditItems} 
        onEdit={(item) => console.log('Edit item:', item)}
      />
    </Box>
  );
};

export default AdminPage;
