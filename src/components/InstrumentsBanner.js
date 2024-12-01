import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

const InstrumentsBanner = () => {
    return (
        <>
            <Box
            width="full"
            height="600px"
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
            backgroundImage={`linear-gradient(to top, rgba(0, 0, 0, 1), transparent), url(https://res.cloudinary.com/dp0f6uqzo/image/upload/v1725494814/cme_program_ensemble_w6c5x6.png)`}
            backgroundColor="black"
            backgroundSize="cover"
            padding="50px"
            >
                <Flex height="90%" width="560px">
                    <Box flex="1" flexDirection="column" display="flex" justifyContent="flex-start" paddingTop="20px" paddingLeft="10%">
                        <Heading 
                        fontWeight="extrabold" 
                        fontSize="64px"
                        textShadow="4px 4px 10px rgba(0, 0, 0, 0.5)"
                        >
                            Instruments
                        </Heading>
                        <Text
                        fontWeight="medium"
                        fontSize="18px"
                        mt="18px"
                        width="550px"
                        >
                            The UCLA Chinese Music Ensemble offers students the opportunity to play more than thirty instruments from the rich history of traditional Chinese music. Here, you'll find the catalog of all the instruments offered within each of our programs.
                        </Text>
                    </Box>  
                </Flex>
            </Box>
        </>
    )
}

export default InstrumentsBanner
