import React from "react";
import { Box, Heading, useToast } from "@chakra-ui/react";
import FetchAPIService from "../../utils/FecthAPIService";
import StoreState from "../../state/store";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import ApplicationForm from "../../components/ApplicationForm";

const AddLamaran = () => {
  const toast = useToast();
  const { token } = StoreState();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const response = await FetchAPIService({
        url: `${process.env.REACT_APP_BASE_URL}/application`,
        metode: "POST",
        token: token,
        body: formData, // Pastikan formData dikirim sebagai raw JSON
      });

      if (response.status === 201) {
        toast({
          title: "Lamaran berhasil diajukan!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/beranda-user");
      } else {
        toast({
          title: "Gagal mengajukan lamaran.",
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
        description: "Gagal mengajukan lamaran.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8}>
      <Heading as="h1" mb={8}>
        Tambah Lamaran
      </Heading>
      <ApplicationForm onSubmit={handleSubmit} />
    </Box>
  );
};

export default AddLamaran;
