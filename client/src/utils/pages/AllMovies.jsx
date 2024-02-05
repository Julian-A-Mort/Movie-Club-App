import React from 'react'; 
import { Box, Grid, Spacer,Text } from '@chakra-ui/react';
import Banner from '../components/Header/index';
import NavBar from '../components/NavBar/index';
import MovieCard from '../components/Movie/moviecard';

const AllMovies = () => {

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

    <Spacer />
  
    <MovieCard />
    <Spacer />
    </Box>


  );
};

export default AllMovies;
