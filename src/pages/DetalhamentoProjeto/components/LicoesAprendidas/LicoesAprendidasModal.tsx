import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  // Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { LicoesAprendidas } from "interfaces/Services";

import { useToast } from "contexts/Toast";

import { patchLicaoAprendida } from "services/update/LicoesAprendidas";

import CadastrarLicoesAprendidasModal from "./CadastrarLicoesAprendidasModal";
import EditarLicoesAprendidasModal from "./EditarLicoesAprendidasModal";
import TabelaLicoesAprendidas from "./TabelaLicoesAprendidas";

function LicoesAprendidasModal({
  licoes,
  setLicoes,
  categorias,
  callBack,
}: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toast } = useToast();
  const [editLicao, setEditLicao] = useState({} as LicoesAprendidas);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalRegister, setOpenModalRegister] = useState(false);
  const [categoriaId, setCategoriaId] = useState("");
  const [data, setData] = useState("");
  const [filteredTable, setFilteredTable] = useState([]);

  function handleEditLicao(licao: LicoesAprendidas): void {
    setEditLicao(licao);
    setOpenModalEdit(true);
  }

  async function handleUpdateLicoes(
    licao: any,
    campo: any,
    payload: any,
    user: any
  ) {
    try {
      await patchLicaoAprendida(licao, campo, payload, user);
      callBack();
      setFilteredTable([]);
      setOpenModalEdit(false);
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  // console.log(data);
  // console.log(licoes);
  // console.log(
  //   licoes.filter(
  //     (lic: any) =>
  //       lic.id_categoria == categoriaId || lic.dat_usu_create.includes(data)
  //   )
  // );

  function handleFilter(categoriaId: string, data: string) {
    if (categoriaId) {
      const filtered = licoes.filter(
        (lic: any) => lic.id_categoria == categoriaId
      );
      filtered.length == 0 &&
        toast.error(
          "Nenhum dado encontrado com o presente filtro de categoria"
        );
      return setFilteredTable(filtered);
    }
    if (data) {
      const filtered = licoes.filter((lic: any) =>
        lic.dat_usu_create.includes(data)
      );
      filtered.length == 0 &&
        toast.error("Nenhum dado encontrado com o presente filtro de data");
      return setFilteredTable(filtered);
    }
    setFilteredTable(licoes);
  }

  return (
    <>
      <Button
        onClick={onOpen}
        background={"white"}
        color={"origem.300"}
        _hover={{
          background: "origem.500",
          color: "white",
          transition: "all 0.4s",
        }}
        px={6}
        py={9}
        borderTopRadius={"0px"}
        borderBottomRadius={"6px"}
      >
        Lições Aprendidas
      </Button>

      <Modal size={"4xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            backgroundColor={"#2E69FD"}
            borderTopRadius={7}
            display={"flex"}
            justifyContent={"center"}
            color={"white"}
            fontSize={"1em"}
          >
            Lições Aprendidas
          </ModalHeader>

          <Stack spacing={5} mt={"3.5"}>
            <FormControl>
              <Flex
                flexDirection={useBreakpointValue({
                  base: "column",
                  md: "row",
                })}
                alignItems={useBreakpointValue({
                  base: "center",
                  md: "flex-end",
                })}
                px={4}
                py={4}
                gap={2}
              >
                <Flex
                  display={"flex"}
                  justifyContent={"space-between"}
                  flex={3}
                >
                  <FormControl>
                    <FormLabel htmlFor="categoria">CATEGORIA</FormLabel>
                    <Select
                      id="categoria"
                      name="categoria"
                      onChange={(e) => setCategoriaId(e.target.value)}
                    >
                      <option value="">Selecione</option>
                      {categorias.map((cat: any, index: number) => (
                        <option value={cat.id} key={index}>
                          {cat.nom_categoria}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Flex>
                <Flex
                  display={"flex"}
                  justifyContent={"space-between"}
                  flex={1}
                >
                  <FormControl>
                    <FormLabel htmlFor="data">DATA</FormLabel>
                    <Input
                      // placeholder="dd/mm/aaaa"
                      id="data"
                      type="date"
                      name="data"
                      // value={data}
                      onChange={(event) => setData(event.target.value)}
                    />
                  </FormControl>
                  {/* <input
                    type="date"
                    onChange={(event) => setData(event.target.value)}
                  /> */}
                </Flex>

                <Flex
                  display={"flex"}
                  justifyContent={"space-between"}
                  flex={1.5}
                >
                  <Button
                    type="button"
                    background="white"
                    variant="outline"
                    color="origem.500"
                    borderColor="origem.500"
                    // border={"2px"}
                    // h={useBreakpointValue({ base: "100%", md: "120%" })}
                    // float={"right"}
                    onClick={() => {
                      handleFilter(categoriaId, data);
                      setCategoriaId("");
                    }}
                    _hover={{
                      background: "origem.300",
                      transition: "all 0.4s",
                      color: "white",
                    }}
                  >
                    Buscar
                    <Icon as={AiOutlineSearch} fontSize="20px" ml={1} />
                  </Button>

                  <Button
                    type="button"
                    background="origem.500"
                    variant="primary"
                    color="white"
                    // border={"2px"}
                    // h={useBreakpointValue({ base: "100%", md: "120%" })}
                    // float={"right"}
                    onClick={() => setOpenModalRegister(true)}
                    _hover={{
                      background: "origem.300",
                      transition: "all 0.4s",
                      color: "white",
                    }}
                  >
                    Adicionar
                  </Button>
                </Flex>
              </Flex>
            </FormControl>
          </Stack>

          <ModalCloseButton color={"white"} />
          <ModalBody>
            <TabelaLicoesAprendidas
              onEdit={handleEditLicao}
              licoes={filteredTable.length > 0 ? filteredTable : licoes}
            />
            {openModalEdit && (
              <EditarLicoesAprendidasModal
                closeModal={() => setOpenModalEdit(false)}
                licao={editLicao}
                handleUpdateLicoes={handleUpdateLicoes}
              />
            )}

            {openModalRegister && (
              <CadastrarLicoesAprendidasModal
                closeModal={() => setOpenModalRegister(false)}
                onCloseModal={() => setOpenModalRegister(false)}
                callBack={callBack}
              />
            )}
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LicoesAprendidasModal;
