import React from 'react';
import { Box, Grid } from '@chakra-ui/react';
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
      
      {/* Movie Cards Section */}
      <Grid templateColumns="repeat(auto-fill, minmax(240px, 1fr))" gap={6} p={6}>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
    </Box>
  );
};

export default MainPage;
