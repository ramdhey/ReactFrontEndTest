import React from "react";
import { Button, useColorMode } from "@chakra-ui/react";

const ThemeToggleButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode}>
      Switch to {colorMode === "light" ? "Dark" : "Light"} Mode
    </Button>
  );
};

export default ThemeToggleButton;
