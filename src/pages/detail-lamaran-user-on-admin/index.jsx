import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Grid,
  GridItem,
  Divider,
  VStack,
  Flex,
  Spinner,
  Center,
} from "@chakra-ui/react";
import StoreState from "../../state/store";
import FetchAPIService from "../../utils/FecthAPIService";
import Logo from "../../components/Logo";
import AdminState from "../../state/admin";

const DetailLamaranUser = () => {
  const { id } = useParams();

  const { tokenAdmin, setTokenAdmin, applicationsAdmin, setApplicationsAdmin } =
    AdminState();
  console.log({ tokenAdmin });
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

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  // Dapatkan tanggal hari ini
  const currentDate = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Box p={8}>
      <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
        <Logo boxSize={["150px", "200px"]} logoNumber={2} />
      </Box>
      <Heading as="h1" mb={4} textAlign="center">
        DATA PRIBADI PELAMAR
      </Heading>
      {applicationDetail ? (
        <Box>
          <Grid templateColumns="1fr 3fr" gap={4}>
            <GridItem>1. POSISI YANG DILAMAR</GridItem>
            <GridItem>: {applicationDetail.position_applied}</GridItem>

            <GridItem>2. NAMA</GridItem>
            <GridItem>: {applicationDetail.name}</GridItem>

            <GridItem>3. NO. KTP</GridItem>
            <GridItem>: {applicationDetail.ktp_number}</GridItem>

            <GridItem>4. TEMPAT, TANGGAL LAHIR</GridItem>
            <GridItem>
              : {applicationDetail.place_of_birth},{" "}
              {applicationDetail.date_of_birth}
            </GridItem>

            <GridItem>5. JENIS KELAMIN</GridItem>
            <GridItem>: {applicationDetail.gender}</GridItem>

            <GridItem>6. AGAMA</GridItem>
            <GridItem>: {applicationDetail.religion}</GridItem>

            <GridItem>7. GOLONGAN DARAH</GridItem>
            <GridItem>: {applicationDetail.blood_type}</GridItem>

            <GridItem>8. STATUS</GridItem>
            <GridItem>: {applicationDetail.marital_status}</GridItem>

            <GridItem>9. ALAMAT KTP</GridItem>
            <GridItem>: {applicationDetail.address_ktp}</GridItem>

            <GridItem>10. ALAMAT TINGGAL</GridItem>
            <GridItem>: {applicationDetail.address_current}</GridItem>

            <GridItem>11. EMAIL</GridItem>
            <GridItem>: {applicationDetail.email}</GridItem>

            <GridItem>12. NO. TELP</GridItem>
            <GridItem>: {applicationDetail.phone_number}</GridItem>

            <GridItem>13. ORANG TERDEKAT YANG DAPAT DIHUBUNGI</GridItem>
            <GridItem>: {applicationDetail.emergency_contact}</GridItem>
          </Grid>

          <Divider my={4} />

          <Text mb={2}>14. PENDIDIKAN TERAKHIR:</Text>
          <Table
            variant="simple"
            size="sm"
            my={2}
            border="1px"
            borderColor="gray.500"
          >
            <Thead bg="gray.200">
              <Tr>
                <Th>Jenjang Pendidikan Terakhir</Th>
                <Th>Nama Institusi Akademik</Th>
                <Th>Jurusan</Th>
                <Th>Tahun Lulus</Th>
                <Th>IPK</Th>
              </Tr>
            </Thead>
            <Tbody>
              {applicationDetail.education_details.map((education, index) => (
                <Tr key={index}>
                  <Td>{education.jenjang}</Td>
                  <Td>{education.institusi}</Td>
                  <Td>{education.jurusan}</Td>
                  <Td>{education.tahun_lulus}</Td>
                  <Td>{education.ipk}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Divider my={4} />

          <Text mb={2}>15. RIWAYAT PELATIHAN:</Text>
          <Table
            variant="simple"
            size="sm"
            my={2}
            border="1px"
            borderColor="gray.500"
          >
            <Thead bg="gray.200">
              <Tr>
                <Th>Nama Kursus/Seminar</Th>
                <Th>Sertifikat (Ada/Tidak)</Th>
                <Th>Periode Tahun</Th>
              </Tr>
            </Thead>
            <Tbody>
              {applicationDetail.training_history.map((training, index) => (
                <Tr key={index}>
                  <Td>{training.nama_kursus}</Td>
                  <Td>{training.sertifikat}</Td>
                  <Td>{training.periode_tahun}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Divider my={4} />

          <Text mb={2}>16. RIWAYAT PEKERJAAN:</Text>
          <Table
            variant="simple"
            size="sm"
            my={2}
            border="1px"
            borderColor="gray.500"
          >
            <Thead bg="gray.200">
              <Tr>
                <Th>Nama Perusahaan</Th>
                <Th>Posisi Terakhir</Th>
                <Th>Pendapatan Terakhir</Th>
                <Th>Periode Tahun</Th>
              </Tr>
            </Thead>
            <Tbody>
              {applicationDetail.work_experience.map((work, index) => (
                <Tr key={index}>
                  <Td>{work.nama_perusahaan}</Td>
                  <Td>{work.posisi_terakhir}</Td>
                  <Td>{work.pendapatan_terakhir}</Td>
                  <Td>{work.periode_tahun}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Divider my={4} />

          <VStack align="stretch" spacing={3}>
            <Grid templateColumns="1fr 3fr" gap={4}>
              <GridItem>17. SKILL</GridItem>
              <GridItem>: {applicationDetail.skills.join(", ")}</GridItem>
            </Grid>

            <Grid templateColumns="1fr 3fr" gap={4}>
              <GridItem>
                18. BERSEDIA DITEMPATKAN DI SELURUH KANTOR PERUSAHAAN
              </GridItem>
              <GridItem>: {applicationDetail.relocation}</GridItem>
            </Grid>

            <Grid templateColumns="1fr 3fr" gap={4}>
              <GridItem>19. PENGHASILAN YANG DIHARAPKAN</GridItem>
              <GridItem>: {applicationDetail.expected_salary} / Bulan</GridItem>
            </Grid>
          </VStack>

          <Divider my={8} />

          <Flex justifyContent="flex-end" alignItems="center">
            <Box textAlign="center">
              <Text mb={8}>........................, {currentDate}</Text>
              <Text>(...............................................)</Text>
              <Text>{applicationDetail.name}</Text>
            </Box>
          </Flex>
        </Box>
      ) : (
        <Text color="gray.500">Detail lamaran tidak ditemukan.</Text>
      )}
    </Box>
  );
};

export default DetailLamaranUser;
