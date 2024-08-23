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
import FetchAPIService from "../../utils/FecthAPIService";
import StoreState from "../../state/store";
import AdminState from "../../state/admin";

const Login = () => {
  const { colorMode } = useColorMode();
  const [isDesktop] = useMediaQuery("(min-width: 768px)");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token, setToken, setRole, role } = StoreState();
  const {tokenAdmin, setTokenAdmin } = AdminState();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await FetchAPIService({
        url: `${process.env.REACT_APP_BASE_URL}/login`,
        metode: "POST",
        body: { email, password },
        contentType: "application/json",
      });

      console.log(JSON.stringify(response));
      if (response.status === 200) {
        Swal.fire({
          title: "Login Successful",
          text: "Welcome back!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          response?.role === "user"
            ? setToken(response?.token)
            : setTokenAdmin(response?.token);
          setRole(response?.role);

          response?.role === "user"
            ? navigate("/beranda-user")
            : navigate("/beranda-admin");
          // Redirect to dashboard after successful login
        });
      } else {
        Swal.fire({
          title: "Login Failed",
          text: response.message || "Invalid email or password.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Login Error",
        text: "An error occurred during login. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Login Error:", error);
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

          {/* Bagian kanan (form login) */}
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
                    Login
                  </Heading>
                </Stack>
                <form onSubmit={handleLogin}>
                  <Stack spacing={2}>
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
                    <Button
                      colorScheme="blue"
                      label="Login"
                      onClick={handleLogin}
                      isLoading={loading}
                    >
                      Login
                    </Button>
                  </Stack>
                </form>
                <Text mt={4}>
                  Belum punya akun?{" "}
                  <Link
                    as={RouterLink}
                    to="/register"
                    color="blue.500"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Daftar
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
                      Login
                    </Heading>
                  </Stack>
                  <form>
                    <Stack spacing={2}>
                      <FormControl id="email">
                        <FormLabel>Email Address</FormLabel>
                        <Input type="email" placeholder="Enter your email" />
                      </FormControl>
                      <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                        />
                      </FormControl>
                      <Button
                        colorScheme="blue"
                        size="lg"
                        mt={4}
                        w="full"
                        label="Login"
                        onClick={handleLogin}
                        isLoading={loading}
                      >
                        Login
                      </Button>
                    </Stack>
                  </form>
                  <Text mt={4}>
                    Belum punya akun?{" "}
                    <Link
                      as={RouterLink}
                      to="/register"
                      color="blue.500"
                      _hover={{ textDecoration: "underline" }}
                    >
                      Daftar
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

export default Login;
