import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  useColorMode,
} from '@chakra-ui/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { MdLocationOn, MdAccessTime, MdEvent, MdAttachMoney } from 'react-icons/md';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const settings = {
  arrows: false,
  autoplay: true,
  autoplaySpeed: 5000,
  dots: true,
  fade: false,
  infinite: true,
  slidesToScroll: 1,
  slidesToShow: 1,
  speed: 1000,
  adaptiveHeight: true,
};

export default function PerformanceCarousel({ autoScroll = true }) {
  const [slider, setSlider] = useState(null);
  const { colorMode } = useColorMode();
  const swiperRef = useRef(null);

  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '40px' });

  const cards = [
    {
        image:
            'https://res.cloudinary.com/dp0f6uqzo/image/upload/v1727073619/cme_perf_1_hbgphp.png',
        title:
            'Fall 2024 Music of China Concert',
        date: 
            'Saturday, 18 May 2024',
        location:
            'Schoenberg Hall',
        time: 
            '7:00 PM - 9:00 PM',
        price:
            'Free',
        description:
            'Join for a wonderful night at UCLA Music School and get to know more about traditional Chinese Music! We will be featuring a qin unison, a zheng unison, a kun opera aria, and silk & bamboo music.',
        link:
            '',
    },

  ];

  // useEffect(() => {
  //   if (autoScroll && slider) {
  //     const intervalId = setInterval(() => {
  //       slider.slickNext();
  //     }, settings.autoplaySpeed);

  //     return () => {
  //       clearInterval(intervalId);
  //     };
  //   }
  // }, [autoScroll, slider]);

  return (
    <Box position="relative" height="700px" width="full" overflow="hidden" bg="black">
        <Text paddingLeft="10%" fontWeight="Bold" fontSize="40px">Upcoming Performances</Text>
        {/* Left Icon */}
        <IconButton
          icon={<ChevronLeftIcon boxSize="60px"/>}
          variant="ghost"
          position="absolute"
          left={side}
          top={top}
          transform="translate(0%, -50%)"
          zIndex={2}
          onClick={() => swiperRef.current?.slidePrev()}
          _hover={{bg: 'transparent'}}
        >
          <BiLeftArrowAlt size="40px" />
        </IconButton>
        <IconButton
          icon={<ChevronRightIcon boxSize="60px"/>}
          variant="ghost"
          position="absolute"
          right={side}
          top={top}
          transform="translate(0%, -50%)"
          zIndex={2}
          onClick={() => swiperRef.current?.slideNext()}
          _hover={{ bg: 'transparent' }}
        >
          <BiRightArrowAlt size="40px" />
        </IconButton>
          <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          slidesPreview={1}
          navigation={false}
          pagination={{ clicakble: true }}
          autoplay={autoScroll ? {delay: 5000, disableOnInteraction: false} : false}
          loop={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          style={{ height: '100%'}}
          >
          {cards.map((card, index) => (
            <SwiperSlide key={index}>
              <Box 
              w="full"  
              display="flex" 
              flexDirection="row"
              alignItems="center"
              gap={8}
              px={8}
              boxsizing="border-box"
              >
                  <Flex 
                  w="50%" 
                  display="flex" 
                  justifyContent="center"
                  alignItems="center"
                  flexShrink={0}
                  >
                      <Image 
                      src={card.image} 
                      alt={card.title || "Event image"} 
                      objectFit="contain"
                      maxW="100%"
                      maxH="100%"
                      />
                  </Flex>
                  <Flex 
                  w="40%"  
                  display="flex" 
                  justifyContent="flex-start"
                  flexDir="column" 
                  alignItems="center"
                  >
                      <Text 
                      fontSize="40px" 
                      fontWeight="bold"
                      textAlign="center"
                      textDecoration="underline"
                      sx={{
                        textUnderlineOffset: '8px',
                        textDecorationThickness: '2px',
                      }}
                      >
                        {card.title}
                      </Text>

                      <Flex
                      direction="row"
                      justifyContent="space-around"
                      alignItems="center"
                      height="35%"
                      width="95%"
                      p="13"
                      >
                          <Flex direction="column" width="55%" justifyContent="center" alignItems="flex-start" gap="4">
                              <Flex direction="row" height="50%" alignItems="center" justifyContent="center">
                                  <Icon as={MdEvent} mr="2" w={8} h={8} />
                                  <Text fontSize="16px">{card.date}</Text>
                              </Flex>
                              <Flex direction="row" height="50%" alignItems="center" justifyContent="center">
                                  <Icon as={MdAccessTime} mr="2" w={8} h={8} />
                                  <Text fontSize="16px">{card.time}</Text>
                              </Flex>
                          </Flex>

                          <Flex direction="column" width="45%" justifyContent="center" alignItems="flex-start" gap="4">
                          <Flex direction="row" height="50%" alignItems="center" justifyContent="center">
                                  <Icon as={MdLocationOn} mr="2" w={8} h={8} />
                                  <Text fontSize="16px">{card.location}</Text>
                              </Flex>
                              <Flex direction="row" height="50%" alignItems="center" justifyContent="center">
                                  <Icon as={MdAttachMoney} mr="2" w={8} h={8} />
                                  <Text fontSize="16px">{card.price}</Text>
                              </Flex>
                          </Flex>
                      </Flex>
                      <Text
                      alignItems="center"
                      fontSize="20px"
                      fontWeight="light"
                      width="90%"
                      >
                        {card.description}
                      </Text>

                      <Button
                        marginTop="25px"
                        marginLeft="5%"
                        padding="20px"
                        width="240px"
                        bg="red.500"
                        alignSelf="flex-start"
                      >
                        Register Now!
                      </Button>
                  </Flex>
              </Box>
            </SwiperSlide>
          ))}
          </Swiper>
    </Box>
  );
}
