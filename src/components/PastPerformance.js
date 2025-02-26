import Link from 'next/link'
import React from 'react'
import { Box, Flex, Grid, Heading, Image, Text, useColorModeValue} from '@chakra-ui/react'

const PastPerformance = () => {

  const past_performances = [
    {
        image: "https://res.cloudinary.com/dp0f6uqzo/image/upload/v1732951024/springfest_hhvoyp.png",
        link: "",
        name: "Spring Festival of Music 2024",
    },
    {
        image: "https://res.cloudinary.com/dp0f6uqzo/image/upload/v1732951024/musicchinaconc24_vey81t.png",
        link: "",
        name: "Music of China Concert Winter 2024",
    },
    {
        image: "https://res.cloudinary.com/dp0f6uqzo/image/upload/v1732951024/musicchinaconc23_xx2gni.png",
        link: "",
        name: "Music of China Concert Fall 2023",
    },
    {
        image: "https://res.cloudinary.com/dp0f6uqzo/image/upload/v1732951024/fowler_eekwtm.png",
        link: "",
        name: "Fowler Out Loud: Lunar New Year",
    },
    {
        image: "https://res.cloudinary.com/dp0f6uqzo/image/upload/v1732951024/cssa_vwkxmf.png",
        link: "",
        name: "CSSA Chinese New Year",
    },
    {
        image: "https://res.cloudinary.com/dp0f6uqzo/image/upload/v1732951024/springfest23_jp5nba.png",
        link: "",
        name: "Spring Festival of Music 2023",
    },
    {
        image: "https://res.cloudinary.com/dp0f6uqzo/image/upload/v1732951099/concwinter23_myjssp.png",
        link: "",
        name: "Music of China Winter 2023",
    },
    {
        image: "https://res.cloudinary.com/dp0f6uqzo/image/upload/v1732951024/concfall22_frdisb.png",
        link: "",
        name: "Music of China Concert Fall 2023",
    },
    {
        image: "https://res.cloudinary.com/dp0f6uqzo/image/upload/v1732951024/amnight_h4pkz8.png",
        link: "",
        name: "Chinese American Culture Night 2023",
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
        paddingLeft="6%"
        paddingBottom="200px"
        templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gap={2}
        width="full"
        marginTop="20px"
        justifyItems="center"
        >
          {past_performances.map((perf, idx) => (
            <Box key={idx} textAlign="center" maxWidth="300px">
              <Link href={perf.link} isExternal>
                <Image
                src={perf.image}
                alt={perf.name}
                height="270px"
                width="100%"
                objectFit="cover"
                mb="8px"
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
