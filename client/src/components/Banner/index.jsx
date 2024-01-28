import React from 'react';
import { Image } from '@chakra-ui/react';

const BannerComponent = ({ imageUrl, altText }) => {
  return (
    <Image src={imageUrl} alt={altText} width="100%" />
  );
}

export default BannerComponent;


// change this to import from file
