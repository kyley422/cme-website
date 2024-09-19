import Footer from 'components/Footer';
import NavBar from 'components/NavBar';
import React from 'react';
import {Box} from '@chakra-ui/react';
import ProgramBanner from 'components/ProgramBanner';
import ProgramCalendar from 'components/ProgramCalendar';




function Programs() {
  return (
    <Box>
      <NavBar />
      <ProgramBanner/>
      <ProgramCalendar/>
      <Footer/>
    </Box>
  );
}

export default Programs;