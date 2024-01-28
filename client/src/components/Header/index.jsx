import React from 'react';
import { Box, Image, Center } from '@chakra-ui/react';

const Header = ({ bannerSrc, logoSrc }) => {
    return (
      <Box as="header">
        {/* Banner Image */}
        <Image src={bannerSrc} alt="Banner" width="100%" />
  
        {/* Centered Logo on Green Background */}
        <Center bg="green.500" p={4}>
          <Image src={logoSrc} alt="Logo" boxSize="150px" />
        </Center>
      </Box>
    );
  };

export default Header;
