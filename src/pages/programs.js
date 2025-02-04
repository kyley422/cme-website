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
      <Box id="course-calendar">
        <ProgramCalendar/>
      </Box>
      <Footer/>
    </Box>
  );
}

export default Programs;