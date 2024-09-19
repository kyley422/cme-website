import { Box, Flex, Heading, Text, Image, useColorModeValue, Divider } from '@chakra-ui/react'
import React from 'react'

const ProgramInfo = () => {
  return (
    <Box
    width="full"
    height="full"
    bg={useColorModeValue('white', 'black')}
    >
        <Flex 
        width="full" 
        height="500px"
        paddingLeft="10%"
        paddingRight="10%"
        gap={5}
        bg={useColorModeValue('white', 'black')}
        >
            <Box 
            width="40%"
            minWidth="400px" 
            p="20px" 
            marginRight="5%"
            >
                <Heading fontWeight="extrabold" mb="4" fontSize="64px">About</Heading>
                <Text fontWeight="normal" fontSize="18px">
                The UCLA Herb Alpert School of Music's Chinese Music Department was established in 1958, by the late Professor Tsun-Yuen Lui and in 1997, the UCLA Chinese Music Ensemble was formed and directed by Professor Chi Li. We strive to promote Chinese arts and culture at UCLA and in the greater Los Angeles community. Each year, over 100 UCLA students from all departments of campus join the ensemble to perform arias from Kun opera, silk-and-bamboo music from the Shanghai area, folk dances for festive celebration, zheng zither music in the Keijia style from Canton Province, and modern compositions for an ensemble of traditional Chinese wind and string instruments.
                </Text>
            </Box>

            <Box width="60%">
                <Image src="https://res.cloudinary.com/dp0f6uqzo/image/upload/v1726712106/cme_about_df1a3t.png" alt="Program Image" objectFit="cover" />
            </Box>
        </Flex>

        <Divider borderColor="gray.100" borderWidth="2px" my="48px" bgColor="black" mx="auto" width="80%"/>

        <Flex 
        width="full" 
        height="full"
        paddingLeft="10%"
        paddingRight="10%"
        gap={5}
        bg={useColorModeValue('white', 'black')}
        >
            <Box width="45%" minWidth="300px">
                <Flex direction="row" gap="2">
                    <Image src="https://res.cloudinary.com/dp0f6uqzo/image/upload/v1725505603/cme_chi_1_iidzh0.png" alt="Professor li" objectFit="cover" />
                    <Image src="https://res.cloudinary.com/dp0f6uqzo/image/upload/v1725505603/cme_chi_2_mw4moh.png" alt="Professor li" objectFit="cover" />
                </Flex>
            </Box>
            
            <Box 
            width="45%"
            minWidth="400px" 
            p="20px" 
            marginLeft="10%"
            >
                <Heading as="h1" size="xl" mb="4" fontSize="36px">Our Director</Heading>
                <Text fontSize="md">
                Professor Chi Li is a highly accomplished performing artist on the erhu and a prolific educator of Chinese music. After graduating from the Conservatory of Chinese Music (Beijing), she served as the erhu soloist at the National Traditional Orchestra of China (the most renowned orchestra of Chinese musical instruments) and frequently performed in presidential concerts in Beijing during the 80s. In the U.S., she has been featured in concerts held at prestigious venues such as Madison Square Garden (New York), Ronald Reagan Building (Washington D.C.), and Avery Fisher Hall/Lincoln Center (New York). She was a recording soloist for the 2019 Oscar winner short film "Bao".
                </Text>
            </Box>
        </Flex>
    </Box>
  )
}

export default ProgramInfo
