import React from "react";
//import { useColorMode, Box, Heading, Flex, Text, Button } from "@chakra-ui/core";
import { Box, Heading, Flex, Text } from "@chakra-ui/core";
import LoginButton from "./login/login";
import Home from "./templates/home";
import Profile from "./templates/profile";
import Docs from "./templates/docs";
import Examples from "./templates/examples";
import Blog from "./templates/blog";
import Critique from "./templates/critique";
import Inspiration from "./templates/inspiration";
import data from "../data/class/site.json";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const Supported = {
  Blog,
  Critique,
  Docs,
  Examples,
  Inspiration,
  Profile
};

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

/**
* Creates a React element based on an explicitly supported list of components
* for this type of component. See Supported above.
*/

const createElement = ( component, props = component.props ) => {
  return( React.createElement(
    Supported[component],
    props
  ) );
}

function Header( props ) {
  //const { colorMode, toggleColorMode } = useColorMode( "light" );

      return (
          <Router>
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg">
          <Link to="/">{data.title}</Link>
        </Heading>
      </Flex>

      <Box display={{ xs: "block", md: "none" }}>
        <svg
          fill="white"
          width="20px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ xs: "block", md: "flex" }}
        width={{ xs: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        {data.pages.map((page, index) =>
          <MenuItems key={index.toString()}>
            <Link to={ "/" + page.name}>{page.template}</Link>
          </MenuItems>
        )}
      </Box>

      <Box
        display={{ xs: "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <LoginButton />
        {/*
        <Button bg="transparent" border="1px" onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>*/}
      </Box>
    </Flex>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      {data.pages.map((page, index) =>
        <Route key={index.toString()} exact path={ "/" + page.name}>
          { createElement( page.template ) }
        </Route>
      )}
    </Switch>
    </Router>
    );
}

export default Header;