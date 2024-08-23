import React from "react";
import { Image } from "@chakra-ui/react";
import logo1 from "../assets/logo/lgo.png";
import logo2 from "../assets/logo/logo2.png";

const Logo = ({ boxSize = "100px", logoNumber = 1 }) => {
  // Tentukan logo berdasarkan nomor yang dikirimkan sebagai props
  const selectedLogo = logoNumber === 2 ? logo2 : logo1;

  return <Image boxSize={boxSize} src={selectedLogo} alt="Logo" />;
};

export default Logo;
