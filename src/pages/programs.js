import Footer from 'components/Footer';
import NavBar from 'components/NavBar';
import React from 'react';
import {Box} from '@chakra-ui/react';
import ProgramBanner from 'components/ProgramBanner';




function Programs() {
  return (
    <Box>
      <NavBar />
      <ProgramBanner/>
      <Footer/>
    </Box>
  );
}

export default Programs;