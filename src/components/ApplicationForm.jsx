import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Stack,
  Select,
  FormControl,
  FormLabel,
  Textarea,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { useForm, useFieldArray } from "react-hook-form";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import CurrencyInput from "react-currency-input-field";

const ApplicationForm = ({ onSubmit, defaultValues }) => {
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: defaultValues || {},
  });

  const {
    fields: educationFields,
    append: addEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education_details",
  });

  const {
    fields: trainingFields,
    append: addTraining,
    remove: removeTraining,
  } = useFieldArray({
    control,
    name: "training_history",
  });

  const {
    fields: workFields,
    append: addWork,
    remove: removeWork,
  } = useFieldArray({
    control,
    name: "work_experience",
  });

  const [page, setPage] = useState(0);

  const onSubmitForm = (data) => {
    // Pastikan `data.skills` adalah string sebelum memanggil split
    if (typeof data.skills === "string") {
      data.skills = data.skills.split(",").map((skill) => skill.trim());
    }

    onSubmit(data);
  };

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => prev - 1);

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <Stack spacing={4}>
          {page === 0 && (
            <>
              <FormControl isRequired>
                <FormLabel>Position Applied</FormLabel>
                <Input {...register("position_applied", { required: true })} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input {...register("name", { required: true })} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>KTP Number</FormLabel>
                <Input {...register("ktp_number", { required: true })} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Place of Birth</FormLabel>
                <Input {...register("place_of_birth", { required: true })} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Date of Birth</FormLabel>
                <Input
                  type="date"
                  {...register("date_of_birth", { required: true })}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Gender</FormLabel>
                <Select {...register("gender", { required: true })}>
                  <option value="Laki-Laki">Laki-Laki</option>
                  <option value="Perempuan">Perempuan</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Religion</FormLabel>
                <Input {...register("religion", { required: true })} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Blood Type</FormLabel>
                <Input {...register("blood_type", { required: true })} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Marital Status</FormLabel>
                <Select {...register("marital_status", { required: true })}>
                  <option value="Menikah">Menikah</option>
                  <option value="Single">Single</option>
                  <option value="Janda">Janda</option>
                  <option value="Duda">Duda</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Address (KTP)</FormLabel>
                <Textarea {...register("address_ktp", { required: true })} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Address (Current)</FormLabel>
                <Textarea
                  {...register("address_current", { required: true })}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  {...register("email", { required: true })}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input {...register("phone_number", { required: true })} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Emergency Contact</FormLabel>
                <Input {...register("emergency_contact", { required: true })} />
              </FormControl>
            </>
          )}

          {page === 1 && (
            <>
              {educationFields.map((field, index) => (
                <Box
                  key={field.id}
                  borderWidth="1px"
                  borderRadius="lg"
                  p={4}
                  mb={4}
                >
                  <FormControl isRequired>
                    <FormLabel>Jenjang</FormLabel>
                    <Input
                      {...register(`education_details[${index}].jenjang`, {
                        required: true,
                      })}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Institusi</FormLabel>
                    <Input
                      {...register(`education_details[${index}].institusi`, {
                        required: true,
                      })}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Jurusan</FormLabel>
                    <Input
                      {...register(`education_details[${index}].jurusan`, {
                        required: true,
                      })}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Tahun Lulus</FormLabel>
                    <Input
                      type="number"
                      {...register(`education_details[${index}].tahun_lulus`, {
                        required: true,
                      })}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>IPK</FormLabel>
                    <Input
                      type="number"
                      step="0.01"
                      {...register(`education_details[${index}].ipk`, {
                        required: true,
                      })}
                    />
                  </FormControl>

                  <IconButton
                    mt={2}
                    colorScheme="red"
                    icon={<DeleteIcon />}
                    onClick={() => removeEducation(index)}
                  />
                </Box>
              ))}

              <Button
                mt={4}
                colorScheme="blue"
                onClick={() =>
                  addEducation({
                    jenjang: "",
                    institusi: "",
                    jurusan: "",
                    tahun_lulus: "",
                    ipk: "",
                  })
                }
              >
                Tambah Pendidikan
              </Button>

              {trainingFields.map((field, index) => (
                <Box
                  key={field.id}
                  borderWidth="1px"
                  borderRadius="lg"
                  p={4}
                  mb={4}
                >
                  <FormControl isRequired>
                    <FormLabel>Nama Kursus</FormLabel>
                    <Input
                      {...register(`training_history[${index}].nama_kursus`, {
                        required: true,
                      })}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Sertifikat</FormLabel>
                    <Input
                      {...register(`training_history[${index}].sertifikat`, {
                        required: true,
                      })}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Periode Tahun</FormLabel>
                    <Input
                      {...register(`training_history[${index}].periode_tahun`, {
                        required: true,
                      })}
                    />
                  </FormControl>

                  <IconButton
                    mt={2}
                    colorScheme="red"
                    icon={<DeleteIcon />}
                    onClick={() => removeTraining(index)}
                  />
                </Box>
              ))}

              <Button
                mt={4}
                colorScheme="blue"
                onClick={() =>
                  addTraining({
                    nama_kursus: "",
                    sertifikat: "",
                    periode_tahun: "",
                  })
                }
              >
                Tambah Pelatihan
              </Button>
            </>
          )}

          {page === 2 && (
            <>
              {workFields.map((field, index) => (
                <Box
                  key={field.id}
                  borderWidth="1px"
                  borderRadius="lg"
                  p={4}
                  mb={4}
                >
                  <FormControl isRequired>
                    <FormLabel>Nama Perusahaan</FormLabel>
                    <Input
                      {...register(
                        `work_experience[${index}].nama_perusahaan`,
                        { required: true }
                      )}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Posisi Terakhir</FormLabel>
                    <Input
                      {...register(
                        `work_experience[${index}].posisi_terakhir`,
                        { required: true }
                      )}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Pendapatan Terakhir</FormLabel>
                    <CurrencyInput
                      id={`work_experience[${index}].pendapatan_terakhir`}
                      name={`work_experience[${index}].pendapatan_terakhir`}
                      defaultValue=""
                      decimalsLimit={2}
                      prefix="Rp "
                      intlConfig={{ locale: "id-ID", currency: "IDR" }}
                      onValueChange={(value) =>
                        setValue(
                          `work_experience[${index}].pendapatan_terakhir`,
                          value
                        )
                      }
                      required
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Periode Tahun</FormLabel>
                    <Input
                      type="text"
                      {...register(`work_experience[${index}].periode_tahun`, {
                        required: true,
                      })}
                    />
                  </FormControl>

                  <IconButton
                    mt={2}
                    colorScheme="red"
                    icon={<DeleteIcon />}
                    onClick={() => removeWork(index)}
                  />
                </Box>
              ))}

              <Button
                mt={4}
                colorScheme="blue"
                onClick={() =>
                  addWork({
                    nama_perusahaan: "",
                    posisi_terakhir: "",
                    pendapatan_terakhir: "",
                    periode_tahun: "",
                  })
                }
              >
                Tambah Pengalaman Kerja
              </Button>

              <FormControl isRequired>
                <FormLabel>Skills</FormLabel>
                <Textarea
                  {...register("skills", { required: true })}
                  placeholder="Pisahkan setiap skill dengan koma"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Relocation</FormLabel>
                <Select {...register("relocation", { required: true })}>
                  <option value="Ya">Ya</option>
                  <option value="Tidak">Tidak</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Expected Salary</FormLabel>
                <CurrencyInput
                  id="expected_salary"
                  name="expected_salary"
                  defaultValue=""
                  decimalsLimit={2}
                  prefix="Rp "
                  intlConfig={{ locale: "id-ID", currency: "IDR" }}
                  onValueChange={(value) => setValue("expected_salary", value)}
                  required
                />
              </FormControl>
            </>
          )}
        </Stack>

        <HStack mt={8} justifyContent="space-between">
          {page > 0 && (
            <Button onClick={prevPage} colorScheme="blue">
              Kembali
            </Button>
          )}
          {page < 2 ? (
            <Button onClick={nextPage} colorScheme="blue">
              Lanjut
            </Button>
          ) : (
            <Button type="submit" colorScheme="blue">
              Submit
            </Button>
          )}
        </HStack>
      </form>
    </Box>
  );
};

export default ApplicationForm;
