import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Image, Text, Badge, Flex } from '@chakra-ui/react';
import { GET_MOVIES } from '../../utils/queries';
import defaultImage from '../../images/Temp.jpeg'; // Ensure this path is correct, adjust as needed

const MovieCard = () => {
  const { loading, error, data } = useQuery(GET_MOVIES);

  if (loading) return <Text>Loading movies...</Text>;
  if (error) return <Text>Error loading movies: {error.message}</Text>;

  return (
    <Flex overflowX="scroll" padding="4" gap="6" bg='white'>
      {data.movies.map((movie) => (
        <Box key={movie._id} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" >
          <Image
            src={movie.posterPath ? `https://image.tmdb.org/t/p/w500${movie.posterPath}` : defaultImage}
            alt={`Poster for ${movie.title}`}
            fallbackSrc={defaultImage}
          />
          <Box p="6" >
            <Box display="flex" alignItems="baseline" >
              <Box 
                color="black"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                {movie.releaseYear} &bull; {movie.genre}
              </Box>
            </Box>
            <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated >
              {movie.title}
            </Box>
            <Box>
              {movie.description}
              <Box as="span" color="black" fontSize="sm">
                / Director: {movie.director}
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </Flex>
  );
};

export default MovieCard;
