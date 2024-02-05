import React from 'react';
import { Box, Grid, Flex, Heading, Spacer, Text } from '@chakra-ui/react';
import Banner from '../components/Header/index';
import NavBar from '../components/NavBar/index';
import MovieCard from '../components/Movie/index';

// Dummy data for movie cards
const movies = [
  { id: 1, title: 'Movie 1', imageUrl: 'path_to_image1', description: 'Description 1' },
];

const MainPage = () => {
  return (
    <Box bg="#DEDBD2">
      <Banner /> {/* Banner at the top */}
      <NavBar /> {/* Navigation Bar below the banner */}
      
      <Flex direction="column" justify="center" color="Black" align="center" py={4}>
        {/* <Heading as="h1" size="xl" mb={4}>WELCOME</Heading> */}
        <Text fontSize="lg" px={4} textAlign="center">
          we are a small film society based in marrickville
          l
        </Text>
      </Flex>

      {/* Movie Cards Section */}
      <Spacer />
      <Grid templateColumns="repeat(auto-fill, minmax(240px, 1fr))" gap={6} p={6}  bg="#194C31">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
      <Spacer />

    </Box>


  );
};

export default MainPage;
