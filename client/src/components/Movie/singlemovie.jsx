//not used but started if needed later

import React from 'react';
import { Box, Image, Badge } from '@chakra-ui/react';
import DefaultImage from '../../images/Temp.jpeg';

const SingleMovieCard = ({ movie }) => {
  const posterURL = movie.posterPath ? `https://image.tmdb.org/t/p/w500${movie.posterPath}` : DefaultImage;

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image 
        src={posterURL}  
        alt={`Cover for ${movie.title}`} 
        fallbackSrc={DefaultImage}
      />

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {movie.releaseYear} &bull; {movie.genre}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {movie.title}
        </Box>

        <Box>
          {movie.description}
          <Box as="span" color="gray.600" fontSize="sm">
            / Director: {movie.director}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SingleMovieCard;
