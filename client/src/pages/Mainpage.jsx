import React from 'react';
import { Box, Grid, Flex, Heading, Spacer } from '@chakra-ui/react';
import Banner from '../components/Header/index';
import NavBar from '../components/NavBar/index';
import MovieCard from '../components/Movie/index';

// Dummy data for movie cards
const movies = [
  { id: 1, title: 'Movie 1', imageUrl: 'path_to_image1', description: 'Description 1' },
  { id: 2, title: 'Movie 2', imageUrl: 'path_to_image2', description: 'Description 2' },
  // ... more movies
];

const MainPage = () => {
  return (
    <Box>
      <Banner /> {/* Banner at the top */}
      <NavBar /> {/* Navigation Bar below the banner */}
      
      <Flex justify="center" align="center" bg="#DEDBD2" py={4}>
        <Heading as="h1" size="xl">
          Upcoming Movies!
        </Heading>
      </Flex>

      {/* Movie Cards Section */}
      <Spacer />
      <Grid templateColumns="repeat(auto-fill, minmax(240px, 1fr))" gap={6} p={6}  bg="#DEDBD2">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
      <Spacer />

    </Box>


  );
};

export default MainPage;
