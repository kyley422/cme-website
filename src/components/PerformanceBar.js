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
  import PerformanceCard from './PerformanceCard';
  
const PerformanceBar = () => {

  const performance_items = [
    {
      image_url: 'https://res.cloudinary.com/dp0f6uqzo/image/upload/v1725497285/cme_spring_festival_qtkwft.png',
      title: 'Spring Festival of Music',
      date: 'Sat, 18 May 2024',
      time: '7:00 PM',
      location: 'Schoenberg Hall',
      price: 'Free',
    },
    {
      image_url: 'https://res.cloudinary.com/dp0f6uqzo/image/upload/v1725497285/cme_cacn_jg89uu.png',
      title: 'CACN Culture Night',
      date: 'Sat, 4 May 2024',
      time: '7:00 PM',
      location: 'Royce Hall',
      price: 'Free',
    },
    {
      image_url: 'https://res.cloudinary.com/dp0f6uqzo/image/upload/v1725494814/cme_program_kunqu_c7jqre.png',
      title: 'Music of China Concert',
      date: 'Sat, 2 December 2024',
      time: '7:00 PM',
      location: 'Schoenberg Hall',
      price: 'Free',
    },
    {
      image_url: 'https://res.cloudinary.com/dp0f6uqzo/image/upload/v1725497285/cme_spring_festival_qtkwft.png',
      title: 'Celebration of Aland',
      date: 'Sat, 3 Jan 2004',
      time: '1:00 AM',
      location: 'Ronald Reagan Medical Center',
      price: '16.00',
    },
  ]
  return (
    <>
      <Box position="relative" height="600px" width="full" overflow="hidden" bg={useColorModeValue('white', 'black')}>
        <Flex 
          direction="column"
          height="100%" 
          width="100%" 
          paddingLeft="10%" 
          paddingRight="100px" 
          paddingTop="20px" 
          paddingBottom="20px"
          gap="30px"
          justifyContent="center"
        >
          <Heading>Upcoming Performances</Heading>
          <Box
            as="section"
            display="flex"
            overflowX="auto"
            sx={{
              '&::-webkit-scrollbar': {
                display: 'none'
              },
              scrollbarWidth: 'none'
            }}
            gap="20px"
          >
            {performance_items.map((item, ind) => (
              <PerformanceCard
              key={ind}
              image_url={item.image_url}
              title={item.title}
              date={item.date}
              time={item.time}
              location={item.location}
              price={item.price}
              />
            ))}
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default PerformanceBar
