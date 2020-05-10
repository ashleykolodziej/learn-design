import React from "react";
import { Box, Heading, Flex, Text, Button } from "@chakra-ui/core";

const Home = props => {
  return (
  	<Box backgroundImage="linear-gradient(#2D3748, #2D3748, #285E61)">
    <Heading as="h1" size="2xl" textAlign="center" p={100} color="gray.50">Welcome to Learn Design!</Heading>
    </Box>
  );
};

export default Home;