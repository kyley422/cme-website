import React from 'react'
import {
    Avatar,
    Box,
    Button,
    Center,
    Collapse,
    Flex,
    Heading,
    Icon,
    IconButton,
    Link,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Stack,
    Text,
    useBreakpointValue,
    useColorMode,
    useColorModeValue,
    useDisclosure,
  } from '@chakra-ui/react';
  import { MdLocationOn, MdAccessTime, MdEvent, MdAttachMoney } from 'react-icons/md';

const PerformanceCard = ({ image_url, title, date, time, location, price }) => {
  return (
    <>
        <Box
        width="400px"
        minWidth="400px"
        height="360px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        bg="gray.900"
        >
            <Flex direction="column" height="100%">
                <Box
                height="70%"
                bgImage={`url(${image_url})`}
                bgPosition="center"
                bgSize="cover"
                position="relative"
                >
                    <Heading
                    position="absolute"
                    bottom="4"
                    left="4"
                    fontSize="24px"
                    fontWeight="bold"
                    color="white"
                    p="2"
                    >
                        {title}
                    </Heading>
                </Box>

                <Flex
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                height="30%"
                p="10"
                >
                    <Flex direction="column" width="60%" justifyContent="center" alignItems="flex-start" gap="4">
                        <Flex direction="row" height="50%" alignItems="center" justifyContent="center">
                            <Icon as={MdEvent} mr="2" w={8} h={8} />
                            <Text fontSize="lg">{date}</Text>
                        </Flex>
                        <Flex direction="row" height="50%" alignItems="center" justifyContent="center">
                            <Icon as={MdLocationOn} mr="2" w={8} h={8} />
                            <Text fontSize="lg">{location}</Text>
                        </Flex>
                    </Flex>

                    {/* Second Column (40%) */}
                    <Flex direction="column" width="40%" justifyContent="center" alignItems="flex-start" gap="4">
                        <Flex direction="row" height="50%" alignItems="center" justifyContent="center">
                            <Icon as={MdAccessTime} mr="2" w={8} h={8} />
                            <Text fontSize="lg">{time}</Text>
                        </Flex>
                        <Flex direction="row" height="50%" alignItems="center" justifyContent="center">
                            <Icon as={MdAttachMoney} mr="2" w={8} h={8} />
                            <Text fontSize="lg">{price}</Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Button m="2" h="50px" bg="red.600">View Details</Button>
            </Flex>
        </Box>
    </>
  )
}

export default PerformanceCard
