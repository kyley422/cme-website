import MultiStepQuiz from 'components/MultiStepQuiz';
import NavBar from 'components/NavBar';
import React from 'react';
import { Box, Center , Container } from '@chakra-ui/react';


const questions = [
    {
      helperText: 'Some random helper text',
      options: ['Inting Giang in League', 'Stealing Giang\'s Cannon', 'Missing Smite', 'Getting JG diff-ed'],
      questionText: 'What is Dylan\'s favorite activity?',
      type: 'single',
    },
    {
      helperText: '(Select all that apply)',
      image: 'https://res.cloudinary.com/zsa-technology/image/upload/f_auto/q_auto/c_scale,w_710/v1/ergodox-ez-prod/images/keyswitches/keyswitches-1.png?_a=ATFGlMz0',
      imageOptions: true,
      optionHeaders: ['Red', 'Blue', 'Orange', 'Yellow'],
      options: ['blah blah blah 1', 'blah blah blah 2', 'blah blah blah 3', 'blah blah blah 4'],
      questionText: 'Which key switches appeal to you for thier sound?',
      soundOptions: true,
      type: 'multiple'
    },
    {
      helperText: '(Select all that apply)',
      image: 'https://res.cloudinary.com/zsa-technology/image/upload/f_auto/q_auto/c_scale,w_710/v1/ergodox-ez-prod/images/keyswitches/keyswitches-1.png?_a=ATFGlMz0',
      imageOptions: true,
      optionHeaders: ['Red', 'Blue', 'Orange', 'Yellow'],
      options: ['blah blah blah blah blah blah blah 1', 'blah blah blah blah blah blah blah 2', 'blah blah blah blah blah 3', 'blah blah blah 4'],
      questionText: 'Which key switches appeal to you for thier sound?',
      soundOptions: true,
      type: 'single'
    },
    // Add more questions here...
  ];
  
  function Quiz() {
    return (
      <Box>
        <NavBar />
        <Center minH="100vh" bgColor="">
          <Container maxW="xlg" centerContent bgColor="">
            <Box p={4} bgColor="">
              <MultiStepQuiz questions={questions} />
            </Box>
          </Container>
        </Center>
      </Box>
    );
  }
  export default Quiz;
  

  