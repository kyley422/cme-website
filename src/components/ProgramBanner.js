import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'

const ProgramBanner = () => {

    const [currentDisplay, setCurrentDisplay] = useState(0)
    const router = useRouter();
    const { tab } = router.query;

    useEffect(() => {
        if (tab !== undefined) {
          setCurrentDisplay(parseInt(tab, 10));
        }
      }, [tab]);

    const selectProgram = (index) => {
        console.log("INDEX: " + index)
        setCurrentDisplay(index);
    }

    const banners = [
        {
            class_time:
                "Wednesday: 3-4 PM",
            course_code:
                "ETHNMUS 168C",
            image:
                'https://res.cloudinary.com/dp0f6uqzo/image/upload/v1726729889/cme_ensemble_y9qqei.png',
            text:
                `The beginner and advanced ensemble groups highlight Chinese instrumental music. Featuring more than twenty traditional instruments like the pipa, erhu, and dizi, the ensemble performs classical and folk pieces, offering a rich cultural experience. They present a repertoire that blends ancient and modern styles. Open to students of all levels, the ensemble fosters cultural appreciation through music, bridging traditional Chinese heritage with contemporary influences. ​Students are able to select from a variety of instruments to choose from.`,
            title:
                "Ensemble",
        },
        {
            class_time:
                "Wednesday: 3-4 PM",
            course_code:
                "ETHNMUS 168C",    
            image:
                'https://res.cloudinary.com/dp0f6uqzo/image/upload/v1726729889/cme_zheng_gvlq4v.png',
            text:
                `Kunqu Opera is one of the oldest forms of Chinese opera, dating back to the Yuan Dynasty. Known for its elegance, it blends poetry, dance, music, and drama. Performers use refined gestures and stylized singing, accompanied by instruments like the dizi, pipa, and sheng. Stories are often drawn from classical literature, with famous works like The Peony Pavilion. Recognized by UNESCO, Kunqu preserves China's rich cultural heritage through its graceful, artistic performances. ​​UCLA’s Kunqu Opera allows students to showcase their art in different forms.`,
            title:
                "Zheng",
        },
        {
            class_time:
                "Wednesday: 3-4 PM",
            course_code:
                "ETHNMUS 168C",
            image:
                'https://res.cloudinary.com/dp0f6uqzo/image/upload/v1726729888/cme_kunqu_kobzuy.png',
            text:
                `Kunqu Opera is one of the oldest forms of Chinese opera, dating back to the Yuan Dynasty. Known for its elegance, it blends poetry, dance, music, and drama. Performers use refined gestures and stylized singing, accompanied by instruments like the dizi, pipa, and sheng. Stories are often drawn from classical literature, with famous works like The Peony Pavilion. Recognized by UNESCO, Kunqu preserves China's rich cultural heritage through its graceful, artistic performances. ​​UCLA’s Kunqu Opera allows students to showcase their art in different forms.`,
            title:
                "Kunqu Opera",
        },
        {
            class_time:
                "Wednesday: 3-4 PM",
            course_code:
                "ETHNMUS 168C",
            image:
                'https://res.cloudinary.com/dp0f6uqzo/image/upload/v1725494815/cme_program_guqin_xmht7i.png',
            text:
                `The qin, also known as the guqin, is a traditional Chinese stringed instrument with a history spanning over 3,000 years. It is a zither with seven strings, played by plucking with the fingers, and is known for its deep, tranquil sound. The qin holds a significant place in Chinese culture, often associated with scholars, poets, and philosophers, and is revered for its expressive qualities. Its music is typically slow and meditative, reflecting the Confucian ideals of harmony and balance. The qin is also noted for its intricate playing techniques and the use of harmonics.`, 
            title:
                "Qin",
            
        },
    ]
    return (
        <>
            <Box
            width="full"
            height="600px"
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
            backgroundImage={`linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent), url(${banners[currentDisplay].image})`}
            backgroundColor="black"
            backgroundSize="cover"
            padding="50px"
            >
                <Flex height="90%" width="full" marginLeft="3%">
                    <Box flex="1" display="flex" justifyContent="flex-start" paddingTop="20px" paddingLeft="90px">
                        <Heading 
                        fontWeight="extrabold" 
                        fontSize="64px"
                        textShadow="4px 4px 10px rgba(0, 0, 0, 0.5)"
                        >
                            Programs
                        </Heading>
                    </Box>

                    <Box flex="1" display="flex" justifyContent="center">
                        <Box
                            width="585px" 
                            height="412px"  
                            backgroundColor="rgba(0, 0, 0, 0.5)" 
                            backdropFilter="blur(10px)" 
                            display="flex"
                            flexDirection="column" 
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            borderRadius="10px"   
                            padding="20px"
                        >
                            <Flex
                            width="100%"
                            justifyContent="flex-start"
                            flexDirection="row"
                            flexWrap="wrap"
                            >
                                {banners.map((option, index) => (
                                    <Button 
                                    width="auto" 
                                    height="auto" 
                                    key={index} m={2} 
                                    onClick={() => selectProgram(index)}
                                    border={currentDisplay === index ? "2px solid white" : "none"}
                                    color={currentDisplay === index ? "white" : "gray"}
                                    padding="10px"
                                    >
                                        {banners[index].title}
                                    </Button>
                                ))}
                            </Flex>
                            <Text fontWeight="bold" fontSize="40px" color="white" letterSpacing="20px">{banners[currentDisplay].title.toUpperCase()}</Text>
                            <Text fontWeight="medium" fontSize="18px" color="white">{banners[currentDisplay].text}</Text>
                        </Box>
                    </Box>
                </Flex>

                <Flex height="10%" width="full" flexDirection="row">
                    <Box width="30%" height="full" display="flex" alignitems="center" justifyContent="center" flexDirection="column" paddingLeft="10%">
                        <Text fontWeight="bold" fontSize="12px" color="gray" mb="5px">COURSE CODE(S)</Text>
                        <Text fontWeight="medium" fontSize="24px" color="white">{banners[currentDisplay].course_code}</Text>
                    </Box>
                    <Box width="30%" height="full" display="flex" alignitems="center" justifyContent="center" flexDirection="column" paddingLeft="10%">
                        <Text fontWeight="bold" fontSize="12px" color="gray" mb="5px">CLASS TIME</Text>
                        <Text fontWeight="medium" fontSize="24px" color="white">{banners[currentDisplay].class_time}</Text>
                    </Box>
                    <Box width="40%" height="200px" display="flex" alignitems="center" justifyContent="flex-start" flexDirection="column" paddingLeft="10%">
                        <Text fontWeight="bold" fontSize="12px" color="gray" mb="5px">INSTRUMENTS TAUGHT</Text>
                        <Button width="430px" height="50px" backgroundColor="red.500" fontSize="18px" as="a" href="/instruments">Click here to see what instruments are offered</Button>
                    </Box>
                </Flex>
            </Box>
        </>
    )
}

export default ProgramBanner
