import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Icon,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Link,
} from "@chakra-ui/react";
import { HiOutlineHand } from "react-icons/hi";
import { ChevronDownIcon } from "@chakra-ui/icons";
import adminIcon from "../assets/images/admin.png";
import { useNavigate } from "react-router-dom";
import StoreState from "../state/store";

const Header = ({ name = "admin", icon }) => {
  const profileIcon = icon || adminIcon;
  const navigate = useNavigate();
  const setLogout = StoreState((state) => state.setLogout);
  const handleLogout = () => {
    setLogout();
    navigate("/"); // Redirect to login page
  };

  return (
    <Box as="header" bg="white" p={4} boxShadow="sm" width="100%">
      <Flex justifyContent="space-between" alignItems="center">
        {/* Bagian kiri: Teks ucapan selamat datang */}
        <Flex alignItems="center">
          <Icon as={HiOutlineHand} boxSize={6} mr={2} color="yellow.400" />
          <Text fontSize="lg" color="blue.600">
            Halo, Selamat Datang {name}
          </Text>
        </Flex>

        {/* Bagian kanan: Logo dan profil pengguna */}
        <Flex alignItems="center">
          <Avatar src={profileIcon} size="sm" mr={2} crossOrigin="anonymous" />
          <Menu>
            <MenuButton
              as={Text}
              fontWeight="medium"
              cursor="pointer"
              color="gray.700"
            >
              {name} <ChevronDownIcon />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
