import Footer from 'components/Footer';
import NavBar from 'components/NavBar';
import ProgramBanner from 'components/ProgramBanner';
import ProgramCalendar from 'components/ProgramCalendar';
import ProgramCalendarMobile from 'components/ProgramCalendarMobile';
import React, {useState,useEffect} from 'react';
import {Box} from '@chakra-ui/react';

function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    function handleResize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}


function Programs() {
  const { width } = useWindowSize();
  const isMobile = width < 768;

  return (
    <Box>
      <NavBar />
      <ProgramBanner/>
      <Box id="course-calendar">
        {isMobile ? <ProgramCalendarMobile /> : <ProgramCalendar />}
      </Box>
      <Footer/>
    </Box>
  );
}

export default Programs;