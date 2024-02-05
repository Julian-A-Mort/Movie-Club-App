import React from 'react'; 
import { Box, Grid, Spacer,Text } from '@chakra-ui/react';
import Banner from '../components/Header/index';
import NavBar from '../components/NavBar/index';
import MovieCard from '../components/Movie/index';
import { useQuery } from '@apollo/client';
import { GET_MOVIES } from '../utils/queries';

const AllMovies = () => {
  const { loading: moviesLoading, error: moviesError, data: moviesData } = useQuery(GET_MOVIES);

  return (
    <Box>
      <Banner />
      <NavBar />
        {/* Scrolling Banner Text */}
        <Box bg="black" width="100%" overflow="hidden">
        <Text className="scrolling-text" color="#EEB902" fontSize="lg" p={2}>
            NOW SHOWING ***** NOW SHOWING ***** NOW SHOWING *****
        </Text>
        </Box>

      {/* Movie Cards Section */}
    <Spacer />
    
    <Grid templateColumns="repeat(auto-fill, minmax(240px, 1fr))" gap={6} p={6} bg="#194C31">
    {moviesLoading ? (
      <Text>Loading movies...</Text>
    ) : moviesError ? (
      <Text>Error fetching movies: {moviesError.message}</Text>
    ) : (
      moviesData.movies.map(movie => (
        <MovieCard key={movie._id} movie={movie} />
      ))
    )}
    </Grid>
    <Spacer />
    </Box>


  );
};

export default AllMovies;
