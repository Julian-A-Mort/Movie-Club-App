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
  const [editableItem, setEditableItem] = useState(null);

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

  // Mutations based on modelType
  const [updateItem] = useMutation(
    modelType === 'movies' ? UPDATE_MOVIE :
    modelType === 'users' ? UPDATE_USER :
    modelType === 'memberships' ? UPDATE_MEMBERSHIP : UPDATE_EVENT
  );

  const [deleteItem] = useMutation(
    modelType === 'movies' ? DELETE_MOVIE :
    modelType === 'users' ? DELETE_USER :
    modelType === 'memberships' ? DELETE_MEMBERSHIP : DELETE_EVENT
  );

  // Function to handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableItem(prev => ({ ...prev, [name]: value }));
  };

  // Function to submit update
  const handleSubmitUpdate = async () => {
    await updateItem({ variables: { id: editableItem._id, ...editableItem } });
    setEditableItem(null); // Reset editable item
    onClose(); // Close modal
  };

  // Function to handle delete
  const handleDelete = async (id) => {
    await deleteItem({ variables: { id } });
    onClose();
  };

  // Function to open edit form for a specific item
  const openEditForm = (item) => {
    setEditableItem(item);
    onOpen();
  };

  // Filter items based on searchTerm
  const filteredItems = data ? data[modelType].filter(item => {
    const itemValue = item.title || item.userName || item.description || "";
    return itemValue.toLowerCase().includes(searchTerm.toLowerCase());
  }) : [];

  // Render items
  const renderItems = () => {
    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    return filteredItems.map((item) => (
      <VStack key={item._id} align="stretch" spacing={2}>
        <Text>{item.title || item.userName || item.description}</Text>
        <Button colorScheme="blue" onClick={() => openEditForm(item)}>Edit</Button>
        <Button colorScheme="red" onClick={() => handleDelete(item._id)}>Delete</Button>
      </VStack>
    ));
  };

  return (
    <>
      <Button onClick={onOpen}>Edit {modelType}</Button>
      <Modal isOpen={isOpen} onClose={() => { onClose(); setEditableItem(null); }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit {modelType}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {editableItem ? (
              // Form for editing the selected item
              <Box as="form" onSubmit={(e) => e.preventDefault()}>
                {/* Generate input fields based on editableItem properties */}
                <Input name="title" value={editableItem.title || ''} onChange={handleChange} />
                {/* Similar inputs for other properties */}
                <Button mt={4} colorScheme="blue" onClick={handleSubmitUpdate}>Update</Button>
              </Box>
            ) : (
              <>
                <Input
                  placeholder={`Search ${modelType}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {renderItems()}
              </>
            )}
          </ModalBody>
          <ModalFooter>
            {!editableItem && <Button colorScheme="blue" onClick={onClose}>Close</Button>}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;
