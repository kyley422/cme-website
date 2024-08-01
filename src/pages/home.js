import Carousel from 'components/Carousel';
import Footer from 'components/Footer';
import NavBar from 'components/NavBar';
import ProgramsBar from 'components/ProgramsBar';
import PerformanceBar from 'components/PerformanceBar';
import React from 'react';
import {Box} from '@chakra-ui/react';




function Home() {
  return (
    <Box>
      <NavBar />
      <Carousel />
      <ProgramsBar />
      <PerformanceBar />
      <Footer />
    </Box>
  );
}

export default Home;