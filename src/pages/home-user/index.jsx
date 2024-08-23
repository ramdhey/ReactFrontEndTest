import React, { useEffect } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import UserTable from "../../components/Table";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import StoreState from "../../state/store";
import { useNavigate } from "react-router-dom";
import FetchAPIService from "../../utils/FecthAPIService";

const Home = () => {
  const {
    token,
    setToken,
    setRole,
    role,
    applications,
    setApplications,
    profile,
    setProfile,
  } = StoreState();
  const navigate = useNavigate();
  const fetchApplications = async () => {
    const response = await FetchAPIService({
      url: `${process.env.REACT_APP_BASE_URL}/applications`,
      metode: "GET",
      token: token,
    });
    setApplications(response);
  };

  // Fungsi untuk fetch data profil
  const fetchProfile = async () => {
    const response = await FetchAPIService({
      url: `${process.env.REACT_APP_BASE_URL}/profile`,
      metode: "GET",
      token: token,
    });
    setProfile(response);
  };

  useEffect(() => {
    // Fetch data saat pertama kali komponen dirender
    fetchApplications();
    fetchProfile();

    // Update data aplikasi setiap 10 detik
    const interval = setInterval(fetchApplications, 10000);

    // Cleanup interval ketika komponen di-unmount
    return () => clearInterval(interval);
  }, [token]);

  console.log({ applications });
  //   console.log({ profile });
  const nameUser = profile?.data?.fullname;
  const avaProfile = profile?.data?.photo;
  //   console.log({ avaProfile });
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Header name={nameUser} icon={avaProfile} />
      <Box flex="1" p={4}>
        <Flex justifyContent="flex-end" mb={4}>
          <Button
            colorScheme="blue"
            size="md"
            onClick={() => navigate("/add-lamaran")}
          >
            Tambah Lamaran
          </Button>
        </Flex>
        {applications?.status === 404 ? (
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
        ) : applications?.status === 200 || applications?.status === 201 ? (
          <UserTable users={applications?.data} icn={avaProfile} />
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
