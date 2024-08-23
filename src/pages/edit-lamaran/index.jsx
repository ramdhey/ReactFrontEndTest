import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  useToast,
  Center,
  HStack,
  Spinner,
  Button,
  Flex,
} from "@chakra-ui/react";
import FetchAPIService from "../../utils/FecthAPIService";
import { useNavigate, useParams } from "react-router-dom";
import ApplicationForm from "../../components/ApplicationForm";
import AdminState from "../../state/admin";

const EditLamaran = () => {
  const { id } = useParams();
  const toast = useToast();
  const { tokenAdmin } = AdminState();
  const navigate = useNavigate();

  const [applicationDetail, setApplicationDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicationDetail = async () => {
      try {
        const response = await FetchAPIService({
          url: `${process.env.REACT_APP_BASE_URL}/admin/application/${id}`,
          metode: "GET",
          token: tokenAdmin,
        });

        if (response.status === 200) {
          setApplicationDetail(response.data);
        } else {
          setError("Data tidak ditemukan atau terjadi kesalahan.");
        }
      } catch (error) {
        setError("Terjadi kesalahan saat mengambil data.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationDetail();
  }, [id, tokenAdmin]);

  const handleSubmit = async (formData) => {
    try {
      const response = await FetchAPIService({
        url: `${process.env.REACT_APP_BASE_URL}/admin/application/edit/${id}`,
        metode: "PUT", // Gunakan metode PUT untuk update data
        token: tokenAdmin,
        body: formData,
      });

      if (response.status === 200) {
        toast({
          title: "Lamaran berhasil diperbarui!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/beranda-admin");
      } else {
        toast({
          title: "Gagal memperbarui lamaran.",
          description:
            response.message || "Terjadi kesalahan, coba lagi nanti.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal memperbarui lamaran.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/admin/application/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenAdmin}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        toast({
          title: `Lamaran berhasil ${
            newStatus === "approved" ? "disetujui" : "ditolak"
          }!`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setApplicationDetail((prev) => ({
          ...prev,
          status: newStatus,
        }));
      } else {
        toast({
          title: "Gagal mengubah status lamaran.",
          description:
            (await response.json()).message ||
            "Terjadi kesalahan, coba lagi nanti.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengubah status lamaran.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/admin/application/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${tokenAdmin}`,
          },
        }
      );

      if (response.ok) {
        toast({
          title: "Lamaran berhasil dihapus!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/beranda-admin");
      } else {
        toast({
          title: "Gagal menghapus lamaran.",
          description:
            (await response.json()).message ||
            "Terjadi kesalahan, coba lagi nanti.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus lamaran.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }

  const isActionDisabled =
    applicationDetail.status === "approved" ||
    applicationDetail.status === "rejected";
  return (
    <Box p={8}>
      <Flex justify="space-between" align="center" mb={8}>
        <Heading as="h1">Edit Lamaran</Heading>

        <Button colorScheme="red" onClick={handleDelete}>
          Delete Lamaran
        </Button>
      </Flex>
      <Button colorScheme="gray" onClick={() => navigate("/beranda-admin")}>
        Cancel
      </Button>
      <Flex mt={4} justify="flex-end">
        <Button
          colorScheme="green"
          onClick={() => handleStatusChange("approved")}
          disabled={isActionDisabled}
          opacity={isActionDisabled ? 0.5 : 1}
          mr={2}
        >
          Approve
        </Button>
        <Button
          colorScheme="red"
          onClick={() => handleStatusChange("rejected")}
          disabled={isActionDisabled}
          opacity={isActionDisabled ? 0.5 : 1}
        >
          Reject
        </Button>
      </Flex>
      <ApplicationForm
        onSubmit={handleSubmit}
        defaultValues={applicationDetail}
      />
    </Box>
  );
};

export default EditLamaran;
