import React from "react";
import { Text, useColorModeValue } from "@chakra-ui/react";

const Txt = ({
  children,
  ellipsizeMode = "tail", // Mode ellipsis default
  numberOfLines,
  fontSize = "md", // Ukuran font default
  fontFamily = "body", // Font family default dari theme Chakra
  fontWeight = "regular", // Berat font default
  color, // Warna font, jika tidak ditentukan akan menyesuaikan dengan tema
  ...rest // Sisa props lainnya
}) => {
  // Warna teks akan otomatis menyesuaikan dengan mode warna
  const textColor = useColorModeValue("#000", "#FFF");

  // Properti ellipsis dan jumlah baris
  const lineClampStyle = numberOfLines
    ? {
        display: "-webkit-box",
        WebkitLineClamp: numberOfLines,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textOverflow: ellipsizeMode === "tail" ? "ellipsis" : "clip",
      }
    : {};

  // Penyesuaian font weight
  const weightMap = {
    regular: "normal",
    bold: "bold",
    semiBold: "600",
  };

  return (
    <Text
      fontSize={fontSize}
      fontFamily={fontFamily}
      fontWeight={weightMap[fontWeight] || "normal"}
      color={color || textColor} // Gunakan warna yang diberikan atau default ke textColor
      {...lineClampStyle}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default Txt;
