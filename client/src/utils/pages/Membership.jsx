import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Flex, Heading, Text, Image, Spacer } from '@chakra-ui/react';
import Banner from '../components/Header/index';
import NavBar from '../components/NavBar/index';
import { GET_MEMBERSHIPS } from '../../utils/queries';
import CheckoutComponent from '../components/CheckoutComponent/index';
import logoImage from '../images/GFS Logo1.jpeg';


const Membership = () => {
  const { loading, error, data } = useQuery(GET_MEMBERSHIPS);

  if (loading) return <Text>Loading memberships...</Text>;
  if (error) return <Text>Error fetching memberships: {error.message}</Text>;

  const memberships = data?.memberships || [];

  return (
    <Box bg="#DEDBD2" minHeight="100vh" pb={10}> 
      <Banner /> {/* Banner at the top */}
      <NavBar /> {/* Navigation Bar below the banner */}

      <Flex direction="column" justify="center" align="center" py={4}>
        <Heading as="h1" size="xl" mb={4}>Memberships!</Heading>
        <Text fontSize="lg" px={4} textAlign="center">
          Choose the membership that best fits your needs. Enjoy exclusive benefits and access to premium content.
        </Text>
      </Flex>

      <Spacer />

{/* Membership Cards Section */}
<Flex direction="column" align="center" w="100%" bg="DEDBD2">
  {memberships.map((membership) => (
    <Box key={membership._id} bg="white" boxShadow="md" p={4} borderRadius="lg" mb={4} w="80%" maxW="500px">
      <Image src={logoImage} alt="Membership Image" borderRadius="md" boxSize="100%" objectFit="cover" />
      <Heading as="h3" size="md" mt={4} textAlign="center">{membership.title}</Heading>
      <Text mt={2} textAlign="center">{membership.description}</Text>
    </Box>
  ))}
          <CheckoutComponent />
</Flex>
</Box>
);
};

export default Membership;