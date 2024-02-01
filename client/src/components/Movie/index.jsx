import React from 'react';
import { Box, Image, Text, Badge } from '@chakra-ui/react';

const MovieCard = ({ movie }) => {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      {/* Use posterPath for the image source */}
      <Image src="/images/tempimage.jpeg"  alt={`Cover for ${movie.title}`} />

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

export default MovieCard;
