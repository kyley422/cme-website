import React from 'react'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'

const PerformanceBanner = () => {
    return (
        <>
            <Box
            width="full"
            height="600px"
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
            backgroundImage={`linear-gradient(to top, rgba(0, 0, 0, 1), transparent), url(https://res.cloudinary.com/dp0f6uqzo/image/upload/v1727068050/cme_performance_banner_hddavq.png)`}
            backgroundColor="black"
            backgroundSize="cover"
            padding="50px"
            >
                <Flex height="90%" width="560px" marginLeft="5%">
                    <Box flex="1" flexDirection="column" display="flex" justifyContent="flex-start" paddingTop="20px" paddingLeft="10%">
                        <Heading 
                        fontWeight="extrabold" 
                        fontSize="64px"
                        textShadow="4px 4px 10px rgba(0, 0, 0, 0.5)"
                        >
                            Performances
                        </Heading>
                        <Text
                        fontWeight="medium"
                        fontSize="18px"
                        mt="18px"
                        >
                            The UCLA Chinese Music Ensemble performs at the end of every fall, winter, and spring quarter as well as many miscellaneous performances in and around our community.
                        </Text>
                    </Box>  
                </Flex>
            </Box>
        </>
    )
}

export default PerformanceBanner
