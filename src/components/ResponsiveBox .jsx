import React from "react";
import { Box } from "@chakra-ui/react";

const ResponsiveBox = () => {
  return (
    <Box w={["100%", "50%", "25%"]} p={4} bg="tomato">
      This box is responsive!
    </Box>
  );
};

export default ResponsiveBox;
