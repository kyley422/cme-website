import Footer from 'components/Footer';
import NavBar from 'components/NavBar';
import React from 'react';
import {Box} from '@chakra-ui/react';
import PerformanceBanner from 'components/PerformanceBanner';
import PerformanceCarousel from 'components/PerformanceCarousel';
import PastPerformance from 'components/PastPerformance';




function Performances() {
  return (
    <Box>
      <NavBar />
      <PerformanceBanner/>
      <PerformanceCarousel />
      <Box id="past-performances">
        <PastPerformance /> 
      </Box>
      <Footer />
    </Box>
  );
}

export default Performances;