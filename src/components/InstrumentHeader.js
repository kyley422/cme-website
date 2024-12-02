import { Box, Flex, Heading, Text, Image, useColorModeValue, Divider, Icon } from '@chakra-ui/react'
import React from 'react'
import VidBox from './VidBox'
import { FaStar } from 'react-icons/fa'

const InstrumentHeader = ({ instrument }) => {

    const getEmbedUrl = (url) => {
        const vidId = url.split('v=')[1]?.split('&')[0];
        return `https://www.youtube.com/embed/${vidId}`;
    }

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
                <Heading fontWeight="extrabold" mb="4" fontSize="64px">{instrument.title}</Heading>
                <Text fontWeight="normal" fontSize="18px" mb="8">
                {instrument.description}
                </Text>
                <Flex flexDirection="row" alignItems="flex-end">
                    <Text fontWeight="bold" fontSize="24px">Difficulty: </Text>
                    <Flex>
                        {Array.from({ length: 5 }).map((_, index) => (
                        <Box key={index} ml="2px">
                            <Icon as={FaStar} color={index < instrument.diff ? 'gold' : 'gray.400'} boxSize="24px"/>
                        </Box>
                        ))}
                    </Flex>
                </Flex>
            </Box>

            <Box width="50%">
                <VidBox videoUrl={getEmbedUrl(instrument.link)} instrument={instrument}/>
            </Box>
        </Flex>
    </Box>
  )
}

export default InstrumentHeader
