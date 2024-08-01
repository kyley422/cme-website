import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  useBreakpointValue,
  useColorMode,
} from '@chakra-ui/react';

const settings = {
  arrows: false,
  autoplay: true,
  autoplaySpeed: 5000,
  dots: true,
  fade: true,
  infinite: true,
  slidesToScroll: 1,
  slidesToShow: 1,
  speed: 1000,
};

export default function CaptionCarousel({ autoScroll = true }) {
  const [slider, setSlider] = useState(null);
  const { colorMode } = useColorMode();

  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '40px' });

  const cards = [
    {
      image:
        'https://i.pinimg.com/originals/74/9e/3d/749e3d3d9dce4f31497c0dd1afec6c97.png',
      text:
        `Beginners and experienced musicians are welcome to join the UCLA Chinese Music Ensemble.
        We offer students the opportunity to explore traditional Chinese music through performance.
        Directed by Professor Chi Li, the ensemble features a variety of traditional Chinese instruments.
        We provide a cultural bridge, promoting appreciation and understanding of Chinese musical heritage within the 
        UCLA community and beyond.`,
      title: 'The UCLA Chinese Music Ensemble',
    },
    {
      image:
        'https://wallpapers.com/images/hd/aesthetic-pink-purple-keyboard-upcs1h9i14iu7fn3.jpg',
      text:
        `Beginners and experienced musicians are welcome to join the UCLA Chinese Music Ensemble.
        We offer students the opportunity to explore traditional Chinese music through performance.
        Directed by Professor Chi Li, the ensemble features a variety of traditional Chinese instruments.
        We provide a cultural bridge, promoting appreciation and understanding of Chinese musical heritage within the 
        UCLA community and beyond.`,
      title: 'The UCLA Chinese Music Ensemble',
    },
    {
      image:
        'https://res.allmacwallpaper.com/get/Retina-MacBook-Air-13-inch-wallpapers/Commodore-PET-Mini-2560x1600/19046-11.jpg',
      text:
        `Beginners and experienced musicians are welcome to join the UCLA Chinese Music Ensemble.
        We offer students the opportunity to explore traditional Chinese music through performance.
        Directed by Professor Chi Li, the ensemble features a variety of traditional Chinese instruments.
        We provide a cultural bridge, promoting appreciation and understanding of Chinese musical heritage within the 
        UCLA community and beyond.`,
      title: 'The UCLA Chinese Music Ensemble',
    },
  ];

  useEffect(() => {
    if (autoScroll && slider) {
      const intervalId = setInterval(() => {
        slider.slickNext();
      }, settings.autoplaySpeed);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [autoScroll, slider]);

  return (
    <Box position="relative" height="600px" width="full" overflow="hidden" left="0">
        {/* CSS files for react-slick */}
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        {/* Left Icon */}
        <IconButton
          aria-label="left-arrow"
          variant="ghost"
          position="absolute"
          left={side}
          top={top}
          transform="translate(0%, -50%)"
          zIndex={2}
          onClick={() => slider?.slickPrev()}
        >
          <BiLeftArrowAlt size="40px" />
        </IconButton>
        {/* Right Icon */}
        <IconButton
          aria-label="right-arrow"
          variant="ghost"
          position="absolute"
          right={side}
          top={top}
          transform="translate(0%, -50%)"
          zIndex={2}
          onClick={() => slider?.slickNext()}
        >
          <BiRightArrowAlt size="40px" />
        </IconButton>
        {/* Slider */}
          {/* Slider */}
          <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {cards.map((card, index) => (
            <Flex direction="column" align="start" width="full" heigh="full">
              <Box
                key={index}
                height="6xl"
                position="relative"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                backgroundImage={`url(${card.image})`}
                className="image-box"
                left="0"
              >
                <Box
                  position="absolute"
                  top="-10%"
                  right="-90%"
                  bottom="40%"
                  left="-40%"
                  bgGradient="radial-gradient(circle, transparent 140px, rgba(0, 0, 0, 1) 300px)"
                  backdropFilter="blur(2px)"
                />
                <Flex height="full">
                  {/* This is the block you need to change, to customize the caption */}
                    <Container size="lg" height="600px" width="50%" position="relative" left="-20%">
                      <Stack
                        w="full"
                        position="absolute"
                        top="10%"
                        left="0%"
                        spacing={4}
                        p={4}
                      >
                        <Heading fontSize="48px" width="full" left="0%" textAlign="left">
                          {card.title}
                        </Heading>
                        <Text fontSize={{ base: 'md', lg: 'lg' }} textAlign="left">
                          {card.text}
                        </Text>

                        <Flex
                        direction="row"
                        height="100%"
                        width="100%"
                        gap="30px"
                        >
                            <Button 
                              alignItems="center" width="200px" height="50px" bg="red.600"
                            >
                            Join Today
                            </Button>
                            <Button 
                              alignItems="center" width="200px" height="50px" bg="transparent" border="2px solid" borderColor="red.600" _hover={{ bg: "red.100", borderColor: "red.700" }}
                            >
                            Learn More
                          </Button>
                        </Flex>
                      </Stack>
                    </Container>
                </Flex>
              </Box>
              
            </Flex>
          ))}
        </Slider>
        {/* Custom styles for image-box */}
        <style jsx global>
          {`
            .image-box::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: ${colorMode === 'light'
                ? 'rgba(255, 255, 255, 0.2)'
                : 'none'};
            }
          `}
        </style>
    </Box>
  );
}
