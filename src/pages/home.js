import Carousel from 'components/Carousel';
import Footer from 'components/Footer';
import NavBar from 'components/NavBar';
import React from 'react';
import {Box} from '@chakra-ui/react';




function Home() {
  return (
    <Box>
      <NavBar />
      <Carousel />
      <Footer />
    </Box>
  );
}

export default Home;