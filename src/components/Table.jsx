import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Avatar,
  Text,
  Center,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, WarningIcon, ViewIcon } from "@chakra-ui/icons";
import { FaHeart, FaUser, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserTable = ({ users, icn }) => {
  const navigate = useNavigate();
  console.log({ icn });
  const profileIcon = icn;
  const handleViewClick = (id) => {
    // Navigasi ke halaman DetailLamaranUser dengan ID sebagai parameter URL
    navigate(`/detail-lamaran/${id}`);
  };
  return (
    <Box p={4} overflowX="auto">
      <Table variant="simple" colorScheme="teal">
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Name</Th>
            <Th>Posisi di Lamar</Th>
            <Th>Status</Th>
            <Th>Lihat</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user, index) => (
            <Tr key={user.id}>
              <Td>
                <Avatar
                  src={profileIcon}
                  size="sm"
                  mr={2}
                  crossOrigin="anonymous"
                />
              </Td>
              <Td>{user?.name}</Td>
              <Td>{user?.position_applied}</Td>
              <Td>
                <Center
                  bg={
                    user?.status === "approved"
                      ? "green.500"
                      : user?.status === "rejected"
                      ? "red.500"
                      : user?.status === "waiting"
                      ? "orange.500"
                      : "gray.500"
                  }
                  color="white"
                  px={1}
                  py={1}
                  borderRadius="lg"
                >
                  {user?.status.charAt(0).toUpperCase() + user?.status.slice(1)}
                </Center>
              </Td>
              <Td>
                <IconButton
                  aria-label="View"
                  icon={<ViewIcon />}
                  mr={2}
                  size="sm"
                  colorScheme="blue"
                  onClick={() => handleViewClick(user.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default UserTable;
