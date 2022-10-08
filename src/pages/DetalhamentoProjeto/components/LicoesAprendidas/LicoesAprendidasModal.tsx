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
  // Select,
  Stack,
  Text,
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

  function handleFilter(search: string, data: string) {
    // if (categoriaId) {
    //   const filtered = licoes.filter(
    //     (lic: any) => lic.id_categoria == categoriaId
    //   );
    //   filtered.length == 0 &&
    //     toast.error(
    //       "Nenhum dado encontrado com o presente filtro de categoria"
    //     );
    //   return setFilteredTable(filtered);
    // }

    if (search) {
      const filtered = licoes.filter(
        (lic: any) =>
          lic.txt_licao_aprendida.includes(search) ||
          lic.txt_acao.includes(search)
      );
      filtered.length == 0 &&
        toast.error("Nenhum dado encontrado com o presente filtro de data");
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
        color={"#0047BB"}
        _hover={{
          background: "origem.500",
          color: "white",
          transition: "all 0.4s",
        }}
        px={6}
        py={9}
        borderTopRadius={"0px"}
        borderBottomRadius={"6px"}
        fontSize={"16px"}
        fontWeight={"700"}
      >
        Lições Aprendidas
      </Button>

      <Modal size={"3xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            backgroundColor={"#2E69FD"}
            borderTopRadius={"8px"}
            display={"flex"}
            justifyContent={"center"}
            color={"white"}
            fontSize={"14px"}
            fontWeight={"700"}
            h={"48px"}
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
                px={9}
                py={2}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Flex
                  display={"flex"}
                  justifyContent={"space-between"}
                  align={"flex-end"}
                  gap={6}
                >
                  <Flex>
                    <FormControl>
                      <FormLabel htmlFor="categoria">
                        <Text
                          color="#949494"
                          fontSize="12px"
                          fontWeight="700"
                          mt={"6px"}
                        >
                          PESQUISAR
                        </Text>
                      </FormLabel>
                      <Input
                        borderRadius={"8px"}
                        border={"1px solid #A7A7A7"}
                        mt={"-9px"}
                        width={"208px"}
                        height={"56px"}
                        color="#949494"
                        id="categoria"
                        name="categoria"
                        placeholder="Digite"
                        onChange={(e) => setCategoriaId(e.target.value)}
                      >
                        {/* <option value="">Selecione</option>
                      {categorias.map((cat: any, index: number) => (
                        <option value={cat.id} key={index}>
                          {cat.nom_categoria}
                        </option>
                      ))} */}
                      </Input>
                    </FormControl>
                  </Flex>

                  <Flex display={"flex"}>
                    <FormControl>
                      <FormLabel htmlFor="data">
                        <Text
                          color="#949494"
                          fontSize="12px"
                          fontWeight="700"
                          mt={"6px"}
                        >
                          DATA
                        </Text>
                      </FormLabel>
                      <Input
                        // placeholder="dd/mm/aaaa"
                        borderRadius={"8px"}
                        border={"1px solid #A7A7A7"}
                        mt={"-9px"}
                        width={"146px"}
                        height={"56px"}
                        color="#949494"
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

                  <Flex display={"flex"}>
                    <Button
                      mr={"25px"}
                      borderRadius={"8px"}
                      type="button"
                      background="white"
                      variant="outline"
                      color="#0047BB"
                      borderColor="#0047BB"
                      border={"2px"}
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
                      width={"94px"}
                      height={"56px"}
                      fontWeight={"700"}
                    >
                      Filtrar
                      <Icon
                        as={AiOutlineSearch}
                        fontSize="18px"
                        fontWeight={"700"}
                        ml={1}
                      />
                    </Button>
                    <Flex display={"flex"}>
                      <Button
                        borderRadius={"8px"}
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
                        width={"200px"}
                        height={"56px"}
                      >
                        Adicionar
                      </Button>
                    </Flex>
                  </Flex>
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
