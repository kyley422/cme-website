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
                'https://i.pinimg.com/originals/74/9e/3d/749e3d3d9dce4f31497c0dd1afec6c97.png',
        },
        {
            title:
                "Guzheng",
            text:
                `A Chinese orchestra comprised of over 20 different traditional Chinese instruments, 
                ranging from the bowed erhu and the plucked pipa.`,
            image:
                'https://wallpapers.com/images/hd/aesthetic-pink-purple-keyboard-upcs1h9i14iu7fn3.jpg',
        },
        {
            title:
                "Kunqu Opera",
            text:
                `A Chinese orchestra comprised of over 20 different traditional Chinese instruments, 
                ranging from the bowed erhu and the plucked pipa.`,
            image:
                'https://res.allmacwallpaper.com/get/Retina-MacBook-Air-13-inch-wallpapers/Commodore-PET-Mini-2560x1600/19046-11.jpg',
        },
        {
            title:
                "Guqin",
            text:
                `A Chinese orchestra comprised of over 20 different traditional Chinese instruments, 
                ranging from the bowed erhu and the plucked pipa.`,
            image:
                'https://wallpapers.com/images/hd/aesthetic-pink-purple-keyboard-upcs1h9i14iu7fn3.jpg',
        },
    ]
  return (
    <>
        <Box position="relative" height="800px" width="full" overflow="hidden" bg={useColorModeValue('white', 'black')}>
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
                height="60%"
                position="relative"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                backgroundImage={`url(${buttonOptions[currentDisplay].image})`}
                className="image-box"
                mt={4}
              >
                    <Container size="lg" height="600px" width="50%" position="relative" left="-20%">
                      <Stack
                        w="full"
                        position="absolute"
                        top="10%"
                        left="0%"
                        spacing={4}
                        p={4}
                      >
                        <Heading fontSize="48px" width="full" left="0%" textAlign="left">
                          {buttonOptions[currentDisplay].title}
                        </Heading>
                        <Text fontSize={{ base: 'md', lg: 'lg' }} textAlign="left">
                          {buttonOptions[currentDisplay].text}
                        </Text>
                        <Button 
                            alignItems="center" width="200px" height="50px" bg="red.600"
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
