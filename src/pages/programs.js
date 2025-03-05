import Footer from 'components/Footer';
import NavBar from 'components/NavBar';
import ProgramBanner from 'components/ProgramBanner';
import ProgramCalendar from 'components/ProgramCalendar';
import React, {useEffect} from 'react';
import {Box} from '@chakra-ui/react';




function Programs() {
  useEffect(() => {
    document.title = 'Programs | UCLA Chinese Music';
  }, []);
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