import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="teal.500"
      p={4}
      color="white"
      textAlign="center"
      mt={8}
    >
      <Text>
        &copy; {new Date().getFullYear()} RamdheyTech. All Rights Reserved.
      </Text>
    </Box>
  );
};

export default Footer;
