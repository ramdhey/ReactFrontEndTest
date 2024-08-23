import React from "react";
import {
  useMediaQuery,
  useColorMode,
  Box,
  Button,
  Text,
  Stack,
  Heading,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import Logo from "../../components/Logo";
import bgImage from "../../assets/images/bgLgn.png";

const RegisterSuccess = () => {
  const { colorMode } = useColorMode();
  const [isDesktop] = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();

  // Menggunakan confetti untuk efek ulang tahun
  React.useEffect(() => {
    confetti({
      particleCount: 200,
      spread: 150,
      origin: { y: 0.6 },
    });
  }, []);

  const handleLoginClick = () => {
    navigate("/");
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      h={["auto", "100vh"]}
      flexDirection={["column", "row"]}
      alignItems="center"
      justifyContent="center"
      bg={colorMode === "light" ? "gray.100" : "gray.700"}
    >
      {isDesktop ? (
        <>
          <Box
            display={["none", "flex"]}
            w={["0", "40%"]}
            h={["auto", "110vh"]}
            position="relative"
          >
            <Image
              src={bgImage}
              alt="Background"
              objectFit="cover"
              boxSize="full"
            />
          </Box>

          {/* Bagian kanan (Pesan sukses registrasi) */}
          <Box
            maxW={["90%", "60%"]}
            w="full"
            h={["auto", "100vh"]}
            bg={colorMode === "light" ? "gray.100" : "gray.700"}
            boxShadow="md"
            borderRadius="md"
            p={[4, 2]}
            display="flex"
            flexDirection="column"
            position="relative"
          >
            <Box
              w="100%"
              mx="auto"
              justifyContent="center"
              textAlign="center"
              alignSelf="center"
            >
              <Logo boxSize={["150px", "200px"]} />
              <Box
                alignSelf="center"
                w="80%"
                mx="auto"
                justifyContent="center"
                textAlign="center"
              >
                <Stack align="center" spacing={4} mb={6}>
                  <Heading as="h1" size={["md", "lg"]} mt={0}>
                    Registrasi Berhasil!
                  </Heading>
                  <Text fontSize={["sm", "md"]} color="gray.500">
                    Silahkan cek email Anda untuk konfirmasi.
                  </Text>
                </Stack>
                <Button
                  colorScheme="blue"
                  label="Login"
                  onClick={handleLoginClick}
                  size="lg"
                >
                  Login
                </Button>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Box position="relative" h={["100vh", "110vh"]} w="100%">
            <Image
              src={bgImage}
              alt="Background"
              objectFit="cover"
              boxSize="full"
              position="absolute"
              top="0"
              left="0"
              w="100%"
              h="100%"
            />
            <Box
              maxW={["90%", "60%"]}
              w="full"
              h={["auto", "100vh"]}
              bg={colorMode === "light" ? "gray.100" : "gray.700"}
              boxShadow="md"
              borderRadius="md"
              p={[4, 2]}
              display="flex"
              flexDirection="column"
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              justifyContent="center"
              alignItems="center"
            >
              <Box w="100%" textAlign="center">
                <Logo boxSize={["150px", "200px"]} />
                <Box w="80%" mx="auto" textAlign="center">
                  <Stack align="center" spacing={4} mb={6}>
                    <Heading as="h1" size={["md", "lg"]} mt={0}>
                      Registrasi Berhasil!
                    </Heading>
                    <Text fontSize={["sm", "md"]} color="gray.500">
                      Silahkan cek email Anda untuk konfirmasi.
                    </Text>
                  </Stack>
                  <Button
                    colorScheme="blue"
                    size="lg"
                    mt={4}
                    w="full"
                    label="Login"
                    onClick={handleLoginClick}
                  >
                    Login
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default RegisterSuccess;
