import React from "react";
import { Button } from "@chakra-ui/react";

const CustomButton = ({ label, onClick, isLoading }) => {
  return (
    <Button
      colorScheme="blue"
      onClick={onClick}
      isLoading={isLoading}
      loadingText="Logging in..."
    >
      {label}
    </Button>
  );
};

export default CustomButton;
