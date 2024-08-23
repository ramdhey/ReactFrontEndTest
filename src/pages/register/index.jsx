import React, { useState } from "react";
import {
  useMediaQuery,
  useColorMode,
  Box,
  Button,
  Input,
  Stack,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Text,
  Link,
} from "@chakra-ui/react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import Logo from "../../components/Logo";
import bgImage from "../../assets/images/bgLgn.png";
import Swal from "sweetalert2";
import StoreState from "../../state/store";

const Register = () => {
  const { colorMode } = useColorMode();
  const [isDesktop] = useMediaQuery("(min-width: 768px)");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null); // Menyimpan file foto
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken, setRole } = StoreState();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Buat FormData untuk mengirimkan data form dengan file
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("photo", photo); // Menambahkan file foto ke formData

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/register/user`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.status === 201) {
        Swal.fire({
          title: "Register Successful",
          text: "Welcome!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          setToken(data.token);
          setRole(data.role);
          // Redirect to dashboard after successful registration
          navigate("/sukses-register");
        });
      } else {
        Swal.fire({
          title: "Register Failed",
          text: data.message || "Something went wrong.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Register Error",
        text: "An error occurred during registration. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Register Error:", error);
    } finally {
      setLoading(false);
    }
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

          {/* Bagian kanan (form register) */}
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
                <Stack align="center" spacing={1} mb={1}>
                  <Heading as="h1" size={["md", "lg"]} mt={0}>
                    Register
                  </Heading>
                </Stack>
                <form onSubmit={handleRegister}>
                  <Stack spacing={2}>
                    <FormControl id="fullName">
                      <FormLabel>Full Name</FormLabel>
                      <Input
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </FormControl>
                    <FormControl id="email">
                      <FormLabel>Email Address</FormLabel>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </FormControl>
                    <FormControl id="password">
                      <FormLabel>Password</FormLabel>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </FormControl>
                    <FormControl id="photo">
                      <FormLabel>Photo</FormLabel>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        required
                      />
                    </FormControl>
                    <Button
                      colorScheme="blue"
                      label="Register"
                      type="submit"
                      isLoading={loading}
                    >
                      Register
                    </Button>
                  </Stack>
                </form>
                <Text mt={4}>
                  Sudah punya akun?{" "}
                  <Link
                    as={RouterLink}
                    to="/"
                    color="blue.500"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Masuk
                  </Link>
                </Text>
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
                  <Stack align="center" spacing={1} mb={1}>
                    <Heading as="h1" size={["md", "lg"]} mt={0}>
                      Register
                    </Heading>
                  </Stack>
                  <form onSubmit={handleRegister}>
                    <Stack spacing={2}>
                      <FormControl id="fullName">
                        <FormLabel>Full Name</FormLabel>
                        <Input
                          type="text"
                          placeholder="Enter your full name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                        />
                      </FormControl>
                      <FormControl id="email">
                        <FormLabel>Email Address</FormLabel>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </FormControl>
                      <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </FormControl>
                      <FormControl id="photo">
                        <FormLabel>Photo</FormLabel>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setPhoto(e.target.files[0])}
                          required
                        />
                      </FormControl>
                      <Button
                        colorScheme="blue"
                        size="lg"
                        mt={4}
                        w="full"
                        label="Register"
                        type="submit"
                        isLoading={loading}
                      >
                        Register
                      </Button>
                    </Stack>
                  </form>
                  <Text mt={4}>
                    Sudah punya akun?{" "}
                    <Link
                      as={RouterLink}
                      to="/"
                      color="blue.500"
                      _hover={{ textDecoration: "underline" }}
                    >
                      Masuk
                    </Link>
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Register;
