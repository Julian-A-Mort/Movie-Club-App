import React from 'react';
import { Box, Image, Center } from '@chakra-ui/react';
import logoImage from '../../images/GFS Logo1.jpeg';


const Header = () => {
    return (
      <Box as="header">
        {/* Banner Image */}
        <Image src="/images/tempimage.jpeg" alt="Banner" width="100%" />
  
        {/* Centered Logo on Green Background */}
        <Center bg="#194C31" p={4}>
        <Image src={logoImage} alt="Logo"  />
        </Center>
      </Box>
    );
  };

export default Header;
