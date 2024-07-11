import React, { useEffect, useState } from 'react'
import dimensions from 'utils/dimensions'
import keyColors from 'utils/colors'
import useSound from 'use-sound'
import { AiOutlineAudioMuted, AiTwotoneAudio } from 'react-icons/ai'
import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  Heading,
  Icon,
  IconButton,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Wrap,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
const soundPath = '/sounds/keyboardSounds.mp3'



const HEADER_FONT_BREAKPOINTS = 40;




function MultiStepQuiz({ questions }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill([]))
  const [selectedOptions, setSelectedOptions] = useState([])
  const [isMobile, setIsMobile] = useState(false);
  const [playing, setPlaying] = useState(
    questions[currentQuestionIndex]
    ? Array(questions[currentQuestionIndex].options.length).fill(false) 
    : null);
  let currentQuestion = questions[currentQuestionIndex]
  const subheadingColor = useColorModeValue(keyColors.keyGrayLight, keyColors.keyGrayDark)
  const headerOptionsColor = useColorModeValue("facebook.700", "#e2e8f0")
  const { colorMode } = useColorMode();

  const [play, { stop }] = useSound(soundPath)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < dimensions.mobile)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    };
  }, []);

  const handleSoundToggle = (index) => {
    const updatedPlaying = new Array(playing.length).fill(false);
    stop();
    if (playing.indexOf(true) !== index) {
      play();
      updatedPlaying[index] = true;
    }
    setPlaying(updatedPlaying);
  };
  
  
  const saveAnswerState = () => {
    const updatedUserAnswers = [...userAnswers];
    if (currentQuestion.type === 'single' && selectedOptions.length === 1) {
      updatedUserAnswers[currentQuestionIndex] = selectedOptions[0];
    } else if (currentQuestion.type === 'multiple' && selectedOptions.length > 0) {
      updatedUserAnswers[currentQuestionIndex] = selectedOptions;
    }
    setUserAnswers(updatedUserAnswers);
  }

  const setOptionsForQuestion = (index) => {
    const previousSelections = userAnswers[index] || [];
    if (questions[index].type === 'single') {
      setSelectedOptions([previousSelections]);
    } else {
      setSelectedOptions(previousSelections);
    }
  };

  const handleForward = () => {
    saveAnswerState();
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex >= questions.length) {
      setCurrentQuestionIndex(null);
      return;
    }
    setCurrentQuestionIndex(nextIndex);
    setOptionsForQuestion(nextIndex);
  };

  const handleBackward = () => {
    saveAnswerState();
    if (currentQuestionIndex > 0) {
      const nextIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(nextIndex);
      setOptionsForQuestion(nextIndex);
    }
  };

  const determineHeaderFontSize = (questionTextLength) => {
    const questionFontSize = {
      base: questionTextLength < HEADER_FONT_BREAKPOINTS ? '3xl' : '2xl',
      lg: questionTextLength < HEADER_FONT_BREAKPOINTS ? '5xl' : '4xl',
      md: questionTextLength < HEADER_FONT_BREAKPOINTS ? '4xl' : '3xl',
    };

    const subheadingFontSize = {
      base: questionTextLength < HEADER_FONT_BREAKPOINTS ? 'lg' : 'md',
      lg: questionTextLength < HEADER_FONT_BREAKPOINTS ? 'xl' : 'lg',
      md: questionTextLength < HEADER_FONT_BREAKPOINTS ? 'xl' : 'lg',
    };
    return { questionFontSize, subheadingFontSize };
  }

  const handleOptionClick = (option) => {
    if (currentQuestion.type === 'single') {
      // If it's a single-choice question, set the selected option
      setSelectedOptions([option]);
    } else {
      // If it's a multiple-choice question, toggle the selected option
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter((item) => item !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    }
  };

  const renderQuestion = () => {
    if (currentQuestion) {
      const { helperText, image, imageOptions, optionHeaders, options, questionText, soundOptions, type } = currentQuestion;
      const { questionFontSize, subheadingFontSize } = determineHeaderFontSize(questionText.length);

      return (
        <Box flex={1}>
        <Stack spacing={10} alignItems="center">
          
            {image && (
              <Box mt={10} mb={6} border="4px solid" borderColor="gray.200" p={10} maxW="lg">
                <Image src={image} alt={`Question ${currentQuestionIndex + 1}`} />
              </Box>
            )}
          
          <FormControl as="fieldset">
            <Stack spacing={10} alignItems="center">
              <Stack textAlign="center" mb={4} spacing={5} maxW="lg">
                <Heading as="legend" fontSize={questionFontSize}>
                  {questionText}
                </Heading>
                <Heading
                  as="subheading"
                  fontSize={subheadingFontSize}
                  color={subheadingColor}
                >
                  {helperText}
                </Heading>
              </Stack>
              <Stack spacing={4} minW="lg">
              {type === "single" ? (
                <RadioGroup
                  value={selectedOptions[0]}
                  onChange={(value) => setSelectedOptions([value])}
                >
                  <Wrap spacing={imageOptions ? 8 : 5} maxW="4xl" justify="center">
                  {options.map((option, index) => (
                    <Box 
                      key={index}
                      borderWidth="2px"
                      borderRadius="md"
                      p={4}
                      borderColor={
                        selectedOptions[0] === option ? "facebook.400" : "#e2e8f0"
                      }
                      onClick={() => handleOptionClick(option)}
                      cursor="pointer"
                      w={imageOptions && !isMobile ? "40%" : "100%"}
                      maxW={imageOptions && !isMobile ? "xlg" : "lg"}
                      position={imageOptions ? "relative" : undefined}
                      textAlign={imageOptions ? "center" : undefined}
                    >
                      {imageOptions && (
                        <>
                        <Flex alignItems="flex-start" flexDir="column">
                          <Flex width="100%" alignItems="flex-start" justifyContent="space-between">
                            <Radio style={{ 
                                background: `${selectedOptions[0] === option ? "#4267b2" : "white"}`, 
                                borderColor: "#4267b2", 

                                color: `${selectedOptions[0] === option ? "#ffffff" : "transparent"}`,
                                height: '35px',
                                width: '35px',
                                
                              }}
                              value={option}
                              zIndex="1"
                            >
                              <Text ml={1} textColor={headerOptionsColor} fontSize={18} fontWeight="bold">
                                {optionHeaders?.[index]}
                              </Text>
                            </Radio>
                            {soundOptions && (
                              <IconButton
                                icon={playing[index] ? <Icon as={AiOutlineAudioMuted} /> : <Icon as={AiTwotoneAudio} /> }
                                onClick={() => handleSoundToggle(index)}
                              />
                            )}
                          </Flex>
                          <Flex width="100%" mt={5} alignItems="flex-start" justifyContent="space-around">
                            <Image 
                              src={'https://m.media-amazon.com/images/I/61XeIAa4inL._AC_UF1000,1000_QL80_.jpg'}
                              alt={`Question ${currentQuestionIndex + 1}, Image Option ${index}`} 
                              borderRadius="md"
                              width="45%"
                              objectFit="cover"  
                              border={`2px solid ${colorMode === "dark" ? "#4267b2": "#e2e8f0"}`}
                              p={2}
                              mb={3}       
                            />
                              <Text
                                  marginBottom={1}
                                  fontSize="16px"
                                  fontWeight={500}
                                  borderBottomRadius="md"
                                  textColor={`${colorMode === "dark" ? "#e2e8f0":  "RGBA(0,0,0,0.70)"}`}
                                  pl={5}
                                  
                                >
                                  {option}
                              </Text>
                          </Flex>
                        
                        </Flex>
                        </>
                      )}

                      {!imageOptions && (
                        <Radio value={option} colorScheme="facebook">
                          {option}
                        </Radio>
                      )}
                    </Box>
                  ))}
                  </Wrap>
                </RadioGroup>
              ) : (
                <Wrap spacing={imageOptions ? 8 : 5} maxW="4xl" justify="center">
                {options.map((option, index) => (
                  <Box 
                    key={index}
                    borderWidth="2px"
                    borderRadius="md"
                    p={4}
                    borderColor={
                      selectedOptions.includes(option) ? "facebook.400" : "#e2e8f0"
                    }
                    onClick={() => handleOptionClick(option)}
                    cursor="pointer"
                    w={imageOptions && !isMobile ? "40%" : "100%"}
                    maxW={imageOptions && !isMobile ? "xlg" : "lg"}
                    position={imageOptions ? "relative" : undefined}
                    textAlign={imageOptions ? "center" : undefined}
                  >
                    {imageOptions && (
                        
                        <Flex alignItems="flex-start" flexDir="column">
                          <Flex width="100%" alignItems="flex-start" justifyContent="space-between">
                            <Checkbox
                              size="lg"
                              value={option}
                              isChecked={selectedOptions.includes(option)}
                              onChange={() => handleCheckboxChange(option)}
                              colorScheme="facebook"
                              zIndex="1"
                            >
                              <Text ml={1} textColor={headerOptionsColor} fontSize={18} fontWeight="bold">
                                {optionHeaders?.[index]}
                              </Text>
                            </Checkbox>
                            {soundOptions && (
                              <IconButton
                                icon={playing[index] ? <Icon as={AiOutlineAudioMuted} /> : <Icon as={AiTwotoneAudio} /> }
                                onClick={() => handleSoundToggle(index)}
                              />
                            )}
                          </Flex>
                          <Flex width="100%" mt={5} alignItems="flex-start" justifyContent="space-around">
                            <Image 
                              src={'https://m.media-amazon.com/images/I/61XeIAa4inL._AC_UF1000,1000_QL80_.jpg'}
                              alt={`Question ${currentQuestionIndex + 1}, Image Option ${index}`} 
                              borderRadius="md"
                              width="45%"
                              objectFit="cover"  
                              border={`2px solid ${colorMode === "dark" ? "#4267b2": "#e2e8f0"}`}
                              p={2}
                              mb={3}       
                            />
                            <Text
                                marginBottom={1}
                                fontSize="16px"
                                fontWeight={500}
                                borderBottomRadius="md"
                                textColor={`${colorMode === "dark" ? "#e2e8f0":  "RGBA(0,0,0,0.70)"}`}
                                pl={5}
                                
                              >
                                {option}
                            </Text>
                          </Flex>
                        
                        </Flex>
                        
                      )}
                    {!imageOptions && (
                      <Checkbox
                        value={option}
                        isChecked={selectedOptions.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                        colorScheme="facebook"
                     >
                       {option}
                     </Checkbox>
                    )}
                   
                  </Box>
                ))}
                </Wrap>
              )}
              
            </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <IconButton
                  icon={<ChevronLeftIcon />}
                  onClick={handleBackward}
                  isDisabled={currentQuestionIndex === 0}
                />
                <IconButton
                  icon={<ChevronRightIcon />}
                  onClick={handleForward}
                  isDisabled={currentQuestionIndex === questions.length - 1 && selectedOptions.length <= 0}
                  colorScheme={selectedOptions.length > 0 ? 'facebook' : undefined}
                />
              </Stack>
            </Stack>
          </FormControl>
        </Stack>
        </Box>
      );
    } else {
      return (
        <Box>
          <Text fontSize="xl" mb={4}>
            Quiz Completed
          </Text>
          {userAnswers.length > 0 && (
            <Box>
              <Text fontSize="lg" mb={2}>Your Answers:</Text>
              <ul>
                {userAnswers.map((answers, index) => (
                  <li key={index}>{questions[index].questionText}: {answers}</li>
                ))}
              </ul>
            </Box>
          )}
        </Box>
      );
    }
  };

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <Box>
      {renderQuestion()}
    </Box>
  );
}

export default MultiStepQuiz;
