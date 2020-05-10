import React from "react";
import { useColorMode, Box, Heading, Flex, Text, Button } from "@chakra-ui/core";
import LoginButton from "./login/login";
import Home from "./templates/home";
import Profile from "./templates/profile";
import Docs from "./templates/docs";
import Examples from "./templates/examples";
import Blog from "./templates/blog";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

const Header = props => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
  const { colorMode, toggleColorMode } = useColorMode();

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
          <Link to="/">Learn Design</Link>
        </Heading>
      </Flex>

      <Box display={{ sm: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems><Link to="/docs">Docs</Link></MenuItems>
        <MenuItems><Link to="/examples">Examples</Link></MenuItems>
        <MenuItems><Link to="/blog">Blog</Link></MenuItems>
        <MenuItems><Link to="/profile">Profile</Link></MenuItems>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <LoginButton />
        <Button bg="transparent" border="1px" onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>
      </Box>
    </Flex>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/docs">
        <Docs />
      </Route>
      <Route path="/examples">
        <Examples />
      </Route>
      <Route path="/blog">
        <Blog />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
    </Switch>
    </Router>
  );
};

export default Header;