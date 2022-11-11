import { useEffect, useState } from "react";
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
import { LicoesAprendidasNew } from "interfaces/Services";

import { useToast } from "contexts/Toast";

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
  const [editLicao, setEditLicao] = useState({} as LicoesAprendidasNew);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalRegister, setOpenModalRegister] = useState(false);
  const [categoriaId, setCategoriaId] = useState("");
  const [data, setData] = useState("");

  const [filteredTable, setFilteredTable] = useState(licoes);

  function handleEditLicao(licao: LicoesAprendidasNew): void {
    setEditLicao(licao);
    setOpenModalEdit(true);
  }

  async function handleUpdateLicoes() {
    try {
      await callBack();
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

  function handleFilter() {
    if (categoriaId || data) {
      const filter = licoes
        .filter((lic: any) =>
          lic.licao_aprendida.toUpperCase().includes(categoriaId.toUpperCase())
        )
        .filter((lic: any) => lic.data.includes(data));

      setFilteredTable(filter);
    } else {
      setFilteredTable(licoes);
    }
  }

  useEffect(() => {
    handleFilter();
  }, [licoes]);

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
        p={4}
        borderRadius={"0px"}
        fontSize={"16px"}
        fontWeight={"700"}
        flex={1}
      >
        Lições Aprendidas
      </Button>

      <Modal size={"6xl"} isOpen={isOpen} onClose={onClose}>
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
              >
                <Flex ml={"-11px"} gap={6}>
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
                        maxLength={50}
                        borderRadius={"8px"}
                        fontSize={"14px"}
                        fontWeight={"400"}
                        fontFamily={"Mulish"}
                        border={"1px solid #949494"}
                        mt={"-9px"}
                        width={"208px"}
                        height={"56px"}
                        _placeholder={{ color: "#949494" }}
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
                        _placeholder={{ color: "#949494" }}
                        fontSize={"14px"}
                        fontWeight={"400"}
                        fontFamily={"Mulish"}
                        borderRadius={"8px"}
                        max="9999-12-31"
                        maxLength={1}
                        border={"1px solid #A7A7A7"}
                        mt={"-9px"}
                        width={"156px"}
                        height={"56px"}
                        id="data"
                        type="Date"
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

                  <Flex>
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
                        handleFilter();
                      }}
                      _hover={{
                        background: "origem.500",
                        transition: "all 0.4s",
                        color: "white",
                      }}
                      width={"94px"}
                      height={"56px"}
                      fontWeight={"700"}
                      alignSelf={"end"}
                    >
                      Filtrar
                      <Icon
                        as={AiOutlineSearch}
                        fontSize="18px"
                        fontWeight={"700"}
                        ml={1}
                      />
                    </Button>
                    <Flex>
                      <Button
                        borderRadius={"8px"}
                        type="button"
                        background="origem.500"
                        variant="primary"
                        color="white"
                        alignSelf={"end"}
                        // border={"2px"}
                        // h={useBreakpointValue({ base: "100%", md: "120%" })}
                        // float={"right"}
                        onClick={() => setOpenModalRegister(true)}
                        _hover={{
                          background: "origem.600",
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

          <ModalCloseButton
            color={"white"}
            onClick={() => setFilteredTable(licoes)}
          />
          <ModalBody>
            <TabelaLicoesAprendidas
              onEdit={handleEditLicao}
              licoes={filteredTable}
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
