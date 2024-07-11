import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import {
  Box,
  Container,
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
        "The project board is an exclusive resource for contract work. It's perfect for freelancers, agencies, and moonlighters.",
      title: 'Design Projects 1',
    },
    {
      image:
        'https://wallpapers.com/images/hd/aesthetic-pink-purple-keyboard-upcs1h9i14iu7fn3.jpg',
      text:
        "The project board is an exclusive resource for contract work. It's perfect for freelancers, agencies, and moonlighters.",
      title: 'Design Projects 2',
    },
    {
      image:
        'https://res.allmacwallpaper.com/get/Retina-MacBook-Air-13-inch-wallpapers/Commodore-PET-Mini-2560x1600/19046-11.jpg',
      text:
        "The project board is an exclusive resource for contract work. It's perfect for freelancers, agencies, and moonlighters.",
      title: 'Design Projects 3',
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
    <Box position="relative" height="600px" width="full" overflow="hidden">
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
          <Box
            key={index}
            height="6xl"
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${card.image})`}
            className="image-box"
          >
            {/* This is the block you need to change, to customize the caption */}
            <Container size="lg" height="600px" position="relative">
              <Stack
                spacing={6}
                w="full"
                maxW="lg"
                position="absolute"
                top="50%"
                transform="translate(0, -50%)"
              >
                <Heading fontSize={{ base: '3xl', lg: '5xl', md: '4xl' }}>
                  {card.title}
                </Heading>
                <Text fontSize={{ base: 'md', lg: 'lg' }} color="GrayText">
                  {card.text}
                </Text>
              </Stack>
            </Container>
          </Box>
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
