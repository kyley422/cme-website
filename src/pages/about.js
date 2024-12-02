import ProgramInfo from 'components/ProgramInfo';
import StudentDirectory from 'components/StudentDirectory';
import React from 'react';
import {Box, Divider} from '@chakra-ui/react';
import NavBar from 'components/NavBar';
import Footer from 'components/Footer';




function About() {
  return (
    <Box bgColor="black">
      <NavBar />
      <ProgramInfo/>
      <Divider borderColor="gray.100" borderWidth="2px" my="48px" bgColor="black" mx="auto" width="80%"/>
      <Box id="student-leadership">
        <StudentDirectory />
      </Box>
      <Footer />
    </Box>
  );
}

export default About;