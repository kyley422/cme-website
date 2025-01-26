import { Box, Flex, Heading, useColorModeValue, Text, Image, Grid } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

const PastPerformance = () => {

  const past_performances = [
    {
        image: "https://res.cloudinary.com/dp0f6uqzo/image/upload/v1732951024/springfest_hhvoyp.png",
        name: "Spring Festival of Music 2024",
        link: "",
    },
    {
        image: "https://res.cloudinary.com/dp0f6uqzo/image/upload/v1732951024/musicchinaconc24_vey81t.png",
        name: "Music of China Concert Winter 2024",
        link: "",
    },
    {
        image: "https://res.cloudinary.com/dp0f6uqzo/image/upload/v1732951024/musicchinaconc23_xx2gni.png",
        name: "Music of China Concert Fall 2023",
        link: "",
    },
    {
        image: "https://res.cloudinary.com/dp0f6uqzo/image/upload/v1732951024/fowler_eekwtm.png",
        name: "Fowler Out Loud: Lunar New Year",
        link: "",
    },
    {
        image: "https://res.cloudinary.com/dp0f6uqzo/image/upload/v1732951024/cssa_vwkxmf.png",
        name: "CSSA Chinese New Year",
        link: "",
    },
    {
        image: "https://res.cloudinary.com/dp0f6uqzo/image/upload/v1732951024/springfest23_jp5nba.png",
        name: "Spring Festival of Music 2023",
        link: "",
    },
    {
        image: "https://res.cloudinary.com/dp0f6uqzo/image/upload/v1732951099/concwinter23_myjssp.png",
        name: "Music of China Winter 2023",
        link: "",
    },
    {
        image: "https://res.cloudinary.com/dp0f6uqzo/image/upload/v1732951024/concfall22_frdisb.png",
        name: "Music of China Concert Fall 2023",
        link: "",
    },
    {
        image: "https://res.cloudinary.com/dp0f6uqzo/image/upload/v1732951024/amnight_h4pkz8.png",
        name: "Chinese American Culture Night 2023",
        link: "",
    },
  ]

  return (
    <Box
    width="full"
    height="full"
    bg={useColorModeValue('white', 'black')}
    >
        <Flex 
        direction="column"
        width="full" 
        paddingBottom="36px"
        paddingLeft="10%"
        paddingRight="10%"
        gap={5}
        bg={useColorModeValue('white', 'black')}
        >
            <Heading fontWeight="bold" fontSize="40px">Past Performances</Heading>
        </Flex>

        <Grid
        paddingLeft="5%"
        paddingBottom="200px"
        templateColumns="repeat(3, 1fr)"
        gap={12}
        width="full"
        marginTop="20px"
        justifyItems="center"
        >
          {past_performances.map((perf, idx) => (
            <Box key={idx} textAlign="center">
              <Link href={perf.link} isExternal>
                <Image
                src={perf.image}
                alt={perf.name}
                height="270px"
                width="375px"
                objectFit="cover"
                mb="4px"
                _hover={{ transform: 'scale(1.05)' }}
                />
              </Link>
              <Text fontWeight="medium" fontSize="20px" paddingTop="5px">{perf.name}</Text>
            </Box>
          ))}
        </Grid>
      </Box>
  )
}

export default PastPerformance
