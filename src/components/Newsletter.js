import React from 'react'
import {
    Avatar,
    Box,
    Button,
    Center,
    Collapse,
    Flex,
    Heading,
    Icon,
    IconButton,
    Image,
    Input,
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
import { BiMailSend } from 'react-icons/bi';

const Newsletter = () => {
  return (
    <>
        <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        height="700px"
        width="100%"
        overflow="hidden"
        bgImage={`url(${"https://res.cloudinary.com/dp0f6uqzo/image/upload/v1723091339/DSC_6805_3_iah2z3.png"})`}
        bgPosition="center 200px"
        bgRepeat="no-repeat"
        bgColor="black"
        >
          <Stack 
          position="absolute"
          top="100px"
          align={'flex-start'} 
          display="flex" 
          alignItems="center" 
          justifyContent="center"
          maxWidth="500px"
          >
            <Heading 
            textAlign="center">Join Our Newsletter</Heading>
            <Text
            textAlign="center"
            marginBottom="25px"
            w={{base: '85%', md: '400px'}}
            >
              Stay updated with our upcoming performances once they're announced and find out about our special events!
            </Text>
            <Stack direction={'row'}>
              <Input
                placeholder={'Your email address'}
                bg="white"
                border={0}
                _focus={{
                  bg: 'whiteAlpha.300',
                }}
                w={{base: '80%', md: '400px'}}
                _placeholder={{
                  color: 'gray.500',
                  opacity: 1
                }}
              />
              <IconButton
                bg="red.500"
                color={useColorModeValue('white', 'white')}
                _hover={{
                  bg: 'red.400',
                }}
                aria-label="Subscribe"
                icon={<BiMailSend style={{fontSize: "24px"}} />}
                width= "60px"
              />
            </Stack>
          </Stack>
        </Box>
    </>
  )
}

export default Newsletter
