import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../utils/queries'; // Ensure this path is correct
import authService from '../utils/auth'; // Ensure this path is correct
import Banner from '../components/Header/index';
import NavBar from '../components/NavBar/index';
import { Box, Heading, Text, Flex, Button } from '@chakra-ui/react';

const Userdetails = () => {
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const currentUser = authService.getCurrentUser(); // Retrieve current user's profile
        if (currentUser && currentUser._id) {
            console.log("User ID:", currentUser._id); // Log to check the ID
            setUserId(currentUser._id); // Set the userId state if _id is available
        }
    }, []);

    const { data, loading, error } = useQuery(GET_USER, {
        variables: { userId: userId }, // Use state variable for userId
        skip: !userId, // Skip the query if userId is not set
    });

    if (loading) return <Text>Loading user details...</Text>;
    if (error) return <Text>Error loading user details: {error.message}</Text>;

    const user = data?.user; // Adjust to match your GraphQL query response structure

    return (
        <Box bg="#DEDBD2" minHeight="100vh">
            <Banner />
            <NavBar />
            <Flex direction="column" align="center" mt={10} >
                <Heading as="h2" size="xl" mb={4}>User Details</Heading>
                <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg='white' >
                    <Heading as="h3" size="lg">{user?.userName || "No Name"}</Heading>
                    <Text mt={4}>Email: {user?.email || "No Email"}</Text>
                    <Text mt={2}>Username: {user?.username || "No Username"}</Text>
                    {/* Include other details you wish to display */}
                    <Button mt={4} colorScheme="blue">Edit Details</Button>
                </Box>
            </Flex>
        </Box>
    );
};

export default Userdetails;
