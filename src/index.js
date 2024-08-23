import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import theme from "./config/theme"; // Import tema khusus jika Anda punya

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      {" "}
      {/* Optional: Custom theme */}
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
