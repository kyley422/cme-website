import React, { useState } from 'react'
import {
    Avatar,
    Box,
    Button,
    Center,
    Collapse,
    Container,
    Flex,
    Heading,
    Icon,
    IconButton,
    Link,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Stack,
    Text,
    useBreakpointValue,
    useColorMode,
    useColorModeValue,
    useDisclosure,
  } from '@chakra-ui/react';

const ProgramsBar = () => {
    const { colorMode } = useColorMode();
    const [currentDisplay, setCurrentDisplay] = useState(0)

    const selectProgram = (index) => {
        console.log("INDEX: " + index)
        setCurrentDisplay(index);
    }

    const buttonOptions = [
        {
            title:
                "Ensemble",
            text:
                `A Chinese orchestra comprised of over 20 different traditional Chinese instruments, 
                ranging from the bowed erhu and the plucked pipa.`,
            image:
                'https://res.cloudinary.com/dp0f6uqzo/image/upload/v1725494814/cme_program_ensemble_w6c5x6.png',
        },
        {
            title:
                "Zheng",
            text:
                `A zheng unison featuring the zheng, or guzheng, an ancient Chinese plucked zither with a rich history.`,
            image:
                'https://res.cloudinary.com/dp0f6uqzo/image/upload/v1725494814/cme_program_guzheng_udj0rj.png',
        },
        {
            title:
                "Kunqu Opera",
            text:
                `An opera performing one of the oldest extant forms of Chinese opera where students learn the ancient lurical and dances.`,
            image:
                'https://res.cloudinary.com/dp0f6uqzo/image/upload/v1725494814/cme_program_kunqu_c7jqre.png',
        },
        {
            title:
                "Qin",
            text:
                `A qin unison class that offers hands-on practice with the qin, or guqin, the ancient Chinese seven-string zither.`,
            image:
                'https://res.cloudinary.com/dp0f6uqzo/image/upload/v1725494815/cme_program_guqin_xmht7i.png',
        },
    ]
  return (
    <>
        <Box position="relative" height="900px" width="full" overflow="hidden" bg={useColorModeValue('white', 'black')}>
            <Flex 
            direction="column"
            height="100%" 
            width="100%" 
            paddingLeft="10%" 
            paddingRight="100px" 
            paddingTop="10px" 
            paddingBottom="20px"
            gap="30px"
            justifyContent="center"
            spacing={4}
            >
                <Heading>Our Programs</Heading>
                <Flex direction="row" wrap="wrap" justifyContent="left" width="full">
                    {buttonOptions.map((option, index) => (
                        <Button 
                        width="280px" 
                        height="65px" 
                        key={index} m={2} 
                        onClick={() => selectProgram(index)}
                        border={currentDisplay === index ? "2px solid white" : "none"}
                        color={currentDisplay === index ? "white" : "gray"}
                        >
                            {buttonOptions[index].title}
                        </Button>
                    ))}
                </Flex>

                <Box
                height="600px"
                position="relative"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                backgroundImage={`linear-gradient(to bottom, rgba(0, 0, 0, 0.7), transparent), url(${buttonOptions[currentDisplay].image})`}
                className="image-box"
                mt={4}
              >
                    <Container size="lg" height="800px" width="50%" position="relative" left="-25%">
                      <Stack
                        w="full"
                        position="absolute"
                        top="0%"
                        left="0%"
                        spacing={4}
                        p={2}
                      >
                        <Heading 
                        fontSize="40px" 
                        fontWeight="bold"
                        letterSpacing="10px"
                        width="full" left="0%" 
                        textAlign="left"
                        >
                          {buttonOptions[currentDisplay].title.toUpperCase()}
                        </Heading>
                        <Text fontSize={{ base: 'md', lg: 'lg' }} textAlign="left">
                          {buttonOptions[currentDisplay].text}
                        </Text>
                        <Button 
                            alignItems="center" width="200px" height="50px" bg="red.500"
                        >
                            Learn More
                        </Button>
                            
                      </Stack>
                    </Container>
              </Box>
            </Flex>
        </Box>
    </>
  )
}

export default ProgramsBar
