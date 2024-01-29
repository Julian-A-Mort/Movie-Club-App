import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
  Box,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useQuery, useMutation } from '@apollo/client';
import {
  UPDATE_MOVIE,
  DELETE_MOVIE,
  UPDATE_USER,
  DELETE_USER,
  UPDATE_MEMBERSHIP,
  DELETE_MEMBERSHIP,
  UPDATE_EVENT,
  DELETE_EVENT
} from '../../utils/mutations';
import {
    GET_MOVIES,
    GET_USERS,
    GET_MEMBERSHIPS,
    GET_EVENTS
  } from '../../utils/queries';

const EditModal = ({ modelType }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch data based on modelType
  let query;
  switch (modelType) {
    case 'movies':
      query = GET_MOVIES;
      break;
    case 'users':
      query = GET_USERS;
      break;
    case 'memberships':
      query = GET_MEMBERSHIPS;
      break;
    case 'events':
      query = GET_EVENTS;
      break;
    default:
      query = null;
  }
  const { data, loading, error } = useQuery(query);

  // Update and delete handlers (placeholders)
  const [updateItem] = useMutation(UPDATE_MOVIE); // Replace with actual mutations
  const [deleteItem] = useMutation(DELETE_MOVIE); // Replace with actual mutations

  const handleUpdate = async (id, updatedData) => {
    await updateItem({ variables: { id, ...updatedData } });
    onClose();
  };

  const handleDelete = async (id) => {
    await deleteItem({ variables: { id } });
    onClose();
  };

  // Render items
  const renderItems = () => {
    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    let items;
    switch (modelType) {
      case 'movies':
        items = data.movies;
        break;
      case 'users':
        items = data.users;
        break;
      case 'memberships':
        items = data.memberships;
        break;
      case 'events':
        items = data.events;
        break;
      default:
        items = [];
    }

    return items.map((item) => (
      <VStack key={item._id} align="stretch" spacing={2}>
        <Text>{item.title || item.userName || item.description}</Text>
        <Button colorScheme="blue" onClick={() => handleUpdate(item._id, {})}>Edit</Button>
        <Button colorScheme="red" onClick={() => handleDelete(item._id)}>Delete</Button>
      </VStack>
    ));
  };

  return (
    <>
      <Button onClick={onOpen}>Edit {modelType}</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit {modelType}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder={`Search ${modelType}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {renderItems()}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;
