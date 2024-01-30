import React, { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import EditModal from '../components/Modals/EditModal';

const AdminPage = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modelType, setModelType] = useState('');

  const handleOpenEditModal = (type) => {
    setModelType(type);
    setIsEditModalOpen(true);
  };

  return (
    <Box>
      <Header />
      <NavBar />
      <Box p={4}>
        <Button colorScheme="blue" m={2} onClick={() => handleOpenEditModal('movies')}>Edit Movies</Button>
        <Button colorScheme="green" m={2} onClick={() => handleOpenEditModal('events')}>Edit Events</Button>
        <Button colorScheme="purple" m={2} onClick={() => handleOpenEditModal('users')}>Edit Users</Button>
        <Button colorScheme="orange" m={2} onClick={() => handleOpenEditModal('memberships')}>Edit Memberships</Button>
      </Box>
      <EditModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        modelType={modelType} 
      />
    </Box>
  );
};

export default AdminPage;
