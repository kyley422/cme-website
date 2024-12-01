import Footer from 'components/Footer';
import NavBar from 'components/NavBar';
import React from 'react';
import {Box} from '@chakra-ui/react';
import InstrumentsBanner from 'components/InstrumentsBanner';
import PerformanceCarousel from 'components/PerformanceCarousel';
import PastPerformance from 'components/PastPerformance';
import InstrumentCatalog from 'components/InstrumentCatalog';




function Instruments() {
  return (
    <Box>
      <NavBar />
      <InstrumentsBanner />
      <InstrumentCatalog />
      <Footer />
    </Box>
  );
}

export default Instruments;