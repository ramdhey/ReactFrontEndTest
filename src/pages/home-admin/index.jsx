import React, { useEffect, useState } from "react";
import StoreState from "../../state/store";
import FetchAPIService from "../../utils/FecthAPIService";
import AdminTable from "../../components/TableAdmin";
import Footer from "../../components/Footer";
import { Box, Text, Button, Flex, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import AdminState from "../../state/admin";

const Home = () => {
  const navigate = useNavigate();
  const { tokenAdmin, setTokenAdmin, applicationsAdmin, setApplicationsAdmin } =
    AdminState();
  console.log({ tokenAdmin });
  const [searchQuery, setSearchQuery] = useState("");
  const fetchApplications = async () => {
    const response = await FetchAPIService({
      url: `${process.env.REACT_APP_BASE_URL}/admin/applications`,
      metode: "GET",
      token: tokenAdmin,
    });
    setApplicationsAdmin(response);
    console.log({ response });
  };

  useEffect(() => {
    // Fetch data saat pertama kali komponen dirender
    fetchApplications();

    // Update data aplikasi setiap 10 detik
    const interval = setInterval(fetchApplications, 10000);

    // Cleanup interval ketika komponen di-unmount
    return () => clearInterval(interval);
  }, [tokenAdmin]);
  console.log({ tokenAdmin });

  const filteredApplications = applicationsAdmin?.data?.filter((app) => {
    return (
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.position_applied.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.education_details.some((edu) =>
        edu.institusi.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Header />
      <Box flex="1" p={4}>
        <Flex mb={4} justify="space-between">
          <Input
            placeholder="Cari berdasarkan nama, posisi, atau institusi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Flex>
        {applicationsAdmin?.status === 404 ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flex="1"
            mx="auto"
            mt={20}
          >
            <Text color="gray.500" textAlign="center" fontSize="lg">
              Kamu belum memasukkan lamaran, silahkan mulai melamar.
            </Text>
          </Box>
        ) : applicationsAdmin?.status === 200 ||
          applicationsAdmin?.status === 201 ? (
          <AdminTable users={filteredApplications} />
        ) : (
          <Text color="red.500" textAlign="center" mt={4}>
            Terjadi kesalahan saat memuat data.
          </Text>
        )}
      </Box>
      <Footer />
    </Box>
  );
};
export default Home;
