import Link from 'next/link'
import React from 'react'
import { Box, Flex, Grid, Heading, Image, Text, useColorModeValue} from '@chakra-ui/react'

const StudentDirectory = () => {

  const student_staff = [
    {
      image: "https://res.cloudinary.com/dp0f6uqzo/image/upload/v1726716459/cme_adeng_i3auq6.png",
      name: "Alice Deng",
      position: "Producer",
      link: "",
    },
    {
      image: "https://res.cloudinary.com/dp0f6uqzo/image/upload/v1726716458/cme_cpoon_ve2p4h.png",
      name: "Cory Poon",
      position: "Associate Producer & Designer",
      link: "",
    },
    {
      image: "https://res.cloudinary.com/dp0f6uqzo/image/upload/v1726716459/cme_sli_oxc4um.png",
      name: "Shitong Li",
      position: "Associate Producer",
      link: "",
    },
    {
      image: "https://res.cloudinary.com/dp0f6uqzo/image/upload/v1726716459/cme_ydong_g9anjy.png",
      name: "Yizhou Dong",
      position: "Associate Producer",
      link: "",
    },
    {
      image: "https://res.cloudinary.com/dp0f6uqzo/image/upload/v1726716459/cme_chu_inhxsx.png",
      name: "Catherine Hu",
      position: "Stage Manager",
      link: "",
    },
    {
      image: "https://res.cloudinary.com/dp0f6uqzo/image/upload/v1726716459/cme_imautner_izt5iq.png",
      name: "Ian Mautner",
      position: "Stage Manager",
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
            <Heading fontWeight="bold" fontSize="40px">Student Leadership</Heading>
            <Text fontSize="md">
            The success of the UCLA Chinese Music Ensemble is driven by dedicated student leaders who ensure smooth operations and a vibrant presence. They secure funding for costs like instrument maintenance and guest artist performances, keeping our programs accessible and high-quality. Talented students design our programs and posters, reflecting our performance essence. The social media team engages the community with updates and behind-the-scenes content. Stage managers handle logistics, coordinating setups, performers, and technical aspects. Producers and associate producers organize rehearsals, schedules, and oversee program details, bringing our artistic vision to life. These diverse roles make our ensemble thrive, fostering appreciation for Chinese music and culture at UCLA and beyond.
            </Text>
        </Flex>

      <Box
        width="80%"
        height="auto"
        bg="gray.300"  
        borderRadius="15px"  
        padding="40px"
        display="flex"  
        justifyContent="center"
        alignItems="flex-start"
        textAlign="center"
        marginLeft="10%"
        flexDirection="column"
      >
        <Box width="100%" display="flex" justifyContent="center" mb="25px">
          <Text fontWeight="bold" fontSize="24px" color="gray.100" letterSpacing="2px" mx="auto">
            FALL 2023 | WINTER 2024 | SPRING 2024
          </Text>
        </Box>
        
        <Grid
        templateColumns="repeat(3, 1fr)"
        gap={12}
        width="full"
        marginTop="20px"
        justifyItems="center"
        >
          {student_staff.map((student, idx) => (
            <Box key={idx} textAlign="center">
              <Link href={student.link} isExternal>
                <Image
                src={student.image}
                alt={student.name}
                borderRadius="full"
                boxSize="300px"
                objectFit="cover"
                mb="4px"
                _hover={{ transform: 'scale(1.05)' }}
                />
              </Link>
              <Text fontWeight="extrabold" fontSize="24px">{student.name}</Text>
              <Text fontWeight="medium" fontSize="18px">{student.position}</Text>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default StudentDirectory
