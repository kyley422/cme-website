import { Box, Flex, Heading, useColorModeValue, Text, Image, Grid, Button } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useState } from 'react'
import PlayerCard from './PlayerCard'

const PlayerDirectory = ({ players }) => {
    const [currentFilter, setCurrentFilter] = useState(0)
    const [displayPlayers, setDisplayPlayers] = useState(players)

    const selectFilter = (index) => {
        console.log("INDEX: " + index)
        setCurrentFilter(index);
        filterPlayers(filterOptions[index].filter)
    }

    const filterPlayers = (status) => {
        setDisplayPlayers(players.filter((player) => {
            if (status === "Alumni") {
                return player.year === "Alumna";
            }
            else if (status !== "All") {
                return player.year !== "Alumna";
            }
            return true;
        }))
    }

    const filterOptions = [
        {
            filter: "All"
        },
        {
            filter: "Current"
        },
        {
            filter: "Alumni"
        }, 
    ]

  return (
    <Box
    width="full"
    height={`${(displayPlayers.length / 3) * 300 + 500}px`}
    paddingTop="50px"
    paddingBottom="50px"
    paddingLeft="5%"
    paddingRight="5%"
    bg={useColorModeValue('white', 'black')}
    >
        <Text
        fontWeight="bold"
        fontSize="40px"
        mb="8px"
        >
                Our Performers
        </Text>
        <Flex direction="row" wrap="wrap" justifyContent="left" width="full">
            {filterOptions.map((option, index) => (
                <Button 
                width="200px" 
                height="50px" 
                key={index} 
                m={2} 
                onClick={() => selectFilter(index)}
                border={currentFilter === index ? "2px solid white" : "none"}
                color={currentFilter === index ? "white" : "gray"}
                >
                    {filterOptions[index].filter}
                </Button>
            ))}
        </Flex>
        
        <Grid
        templateColumns="repeat(2, 1fr)"
        gap={12}
        width="full"
        marginTop="50px"
        justifyItems="center"
        >
          {displayPlayers.map((p, idx) => (
            <PlayerCard player={p}/>
          ))}
        </Grid>
    </Box>
  )
}

export default PlayerDirectory
