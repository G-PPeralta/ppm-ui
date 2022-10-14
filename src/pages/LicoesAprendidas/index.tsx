import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import toast from "react-hot-toast";
import { AiFillPrinter } from "react-icons/ai";
// import {
//   FiChevronLeft,
//   FiChevronRight,
//   FiChevronsLeft,
//   FiChevronsRight,
//   FiSearch,
// } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { MdArrowForwardIos, MdModeEdit } from "react-icons/md";

import {
  Tr,
  Td,
  IconButton,
  Text,
  Table,
  TableContainer,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Box,
  Flex,
  Heading,
  Stack,
  useBreakpointValue,
  useColorModeValue,
  Button,
  FormControl,
  FormLabel,
  Select,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";

import PaginacaoTabela from "components/PaginacaoTabela";
import Sidebar from "components/SideBar";

import { getAllLicoesAprendidas } from "services/get/LicoesAprendidas";
import { getProjetos } from "services/get/Projetos";
import { patchLicaoAprendida } from "services/update/LicoesAprendidas";

import { LicoesAprendidas, ProjetosList } from "../../interfaces/Services";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

export function LicoesAprendidasProjetos() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [licoesAprendidas, setLicoesAprendidas] = useState(
    [] as LicoesAprendidas[]
  );
  const [filteredLicoesAprendidas, setFilteredLicoesAprendidas] = useState(
    [] as LicoesAprendidas[]
  );
  const [projetos, setProjetos] = useState([] as ProjetosList[]);
  const [projetoId, setProjetoId] = useState("");

  const [editLicao, setEditLicao] = useState({} as LicoesAprendidas);

  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);

  const fromTo = {
    from,
    to,
    setFrom,
    setTo,
  };

  async function handleGetLicoesAprendidas() {
    const payload = await getAllLicoesAprendidas();
    setLicoesAprendidas(payload.data);
    setFilteredLicoesAprendidas(payload.data);
  }

  async function handleGetProjetos() {
    const payload = await getProjetos();
    setProjetos(payload.data);
  }

  useEffect(() => {
    handleGetLicoesAprendidas();
    handleGetProjetos();
  }, []);

  const handleClick = () => {
    filterByProject();
  };

  // const print = () => {
  //   window.print();
  // };

  async function handleUpdateLicoes(
    licao: any,
    campo: any,
    payload: any,
    user: any
  ) {
    try {
      await patchLicaoAprendida(licao, campo, payload, user);
      setLicoesAprendidas(
        licoesAprendidas.map((lic) =>
          lic.id == editLicao.id ? editLicao : lic
        )
      );
      await handleGetLicoesAprendidas();
      onClose();
    } catch (error) {
      toast.error("Erro na requisição");
    }
  }

  const tableData = filteredLicoesAprendidas
    .sort((a, b) => a.id - b.id)
    .slice(from, to)
    .map((lessons, index) => (
      <Tr key={index}>
        <Td
          // isNumeric
          fontWeight={"semibold"}
        >
          {lessons.id}
        </Td>

        <Td fontWeight={"semibold"}>{lessons.txt_licao_aprendida}</Td>
        <Td width="506px" height={"36px"}>
          {lessons.txt_acao}
        </Td>
        <Td fontWeight={"semibold"}>
          {new Date(lessons.dat_usu_create)
            .toLocaleString("pt-BR")
            .substring(0, 10)}
        </Td>
        <Td fontWeight={"semibold"}>
          <IconButton
            aria-label="Plus sign"
            icon={<MdModeEdit />}
            background="transparent"
            variant="secondary"
            color="#0047BB"
            // mr={2}
            isRound={true}
            // size="md"
            width={"18px"}
            height={"18px"}
            onClick={() => {
              setEditLicao(lessons);
              onOpen();
            }}
          />
          <DeleteModal />
        </Td>
      </Tr>
    ));

  const filterByProject = () => {
    if (projetoId == "0") {
      return setFilteredLicoesAprendidas(licoesAprendidas);
    }
    const filtered = licoesAprendidas.filter(
      (b) => b.id_projeto.toString() === projetoId
    );
    setFilteredLicoesAprendidas([...filtered]);
  };

  // const rowsPerPage = 8;
  // const totalRegs = filteredLicoesAprendidas.length;
  // const maxPage = Math.ceil(totalRegs / rowsPerPage);

  // const paginate = (pag: number) => {
  //   setPagAtual(pag);

  //   const x = (pag - 1) * rowsPerPage;
  //   const y = (pag - 1) * rowsPerPage + rowsPerPage;
  //   setFrom(x);
  //   setTo(y);
  // };

  // const advance = () => {
  //   if (pagAtual == maxPage) {
  //     return;
  //   }

  //   const _pag = pagAtual + 1;

  //   paginate(_pag);
  // };

  // const back = () => {
  //   if (pagAtual == 1) {
  //     return;
  //   }
  //   const _pag = pagAtual - 1;
  //   paginate(_pag);
  // };

  return (
    <Sidebar>
      <Flex
        // w={"100%"}
        align="center"
        justify="center"
        bg={useBreakpointValue({ base: "white", sm: "#EDF2F7" })}
      >
        <Stack spacing="8">
          <Flex w={"auto"} align="center" justify="center" bg={"#EDF2F7"}>
            <Box
              py={{ base: "6", sm: "8" }}
              px={{ base: "6", sm: "8" }}
              w={"100%"}
              bg={useBreakpointValue({ base: "transparent", sm: "white" })}
              boxShadow={{
                base: "none",
                sm: useColorModeValue("md", "md-dark"),
              }}
              borderRadius={{ base: "none", sm: "xl" }}
              alignItems={"center"}
            >
              <Flex align={"flex-end"} justify={"space-between"}>
                <Heading as="h3" size="md" mt={"-15px"} mb={"25px"}>
                  <Text fontSize={"24px"} fontWeight={"700"}>
                    Lições Aprendidas
                  </Text>
                </Heading>
                <Flex align={"flex-start"} fontWeight={"700"}>
                  <CSVLink data={filteredLicoesAprendidas}>
                    <Button
                      color={"#0239C3"}
                      fontWeight={"700"}
                      variant="ghost"
                      colorScheme="messenger"
                      rightIcon={<AiFillPrinter />}
                      // onClick={print}
                    >
                      Exportar
                    </Button>
                  </CSVLink>
                </Flex>
              </Flex>
              <Flex flexDir={"row"} justify={"space-between"}>
                <Flex align={"flex-end"} gap={3}>
                  <Flex>
                    <FormControl>
                      <FormLabel
                        fontWeight={"700"}
                        fontSize={"12px"}
                        color={"#A7A7A7"}
                        htmlFor="projeto"
                      >
                        PROJETO
                      </FormLabel>
                      <Select
                        mt={"-9px"}
                        borderRadius={"8px"}
                        placeholder="Selecione"
                        id="projeto"
                        name="projeto"
                        onChange={(e) => setProjetoId(e.target.value)}
                        width={"208px"}
                        height={"56px"}
                      >
                        <option color={"#A7A7A7"} value={0}>
                          Todos
                        </option>
                        {projetos &&
                          projetos.map((project, index) => (
                            <option value={project.id} key={index}>
                              {project.nomeProjeto}
                            </option>
                          ))}
                      </Select>
                    </FormControl>
                  </Flex>
                  <Flex align={"flex-end"}>
                    <Button
                      type="button"
                      background="#0047BB"
                      variant="outline"
                      color="white"
                      borderColor="#0047BB"
                      _hover={{
                        background: "white",
                        transition: "all 0.4s",
                        color: "#0047BB",
                      }}
                      rightIcon={<FiSearch />}
                      onClick={handleClick}
                      // alignSelf={"end"}
                      // marginLeft={"-332px"}
                      height={"56px"}
                      width={"101px"}
                      fontSize={"18px"}
                      borderRadius={"8px"}
                    >
                      Filtrar
                    </Button>
                  </Flex>
                </Flex>

                <Flex align={"flex-start"} mt={"22px"}>
                  <Button
                    // onClick={onOpen}
                    background="transparent"
                    color="#0047BB"
                    float={"right"}
                    fontSize="17px"
                    fontWeight={"700"}
                  >
                    Lixeira
                    <Icon
                      as={MdArrowForwardIos}
                      fontSize="16px"
                      fontWeight={"700"}
                      ml={1}
                      color="#0047BB"
                    />
                  </Button>
                </Flex>
              </Flex>

              <Stack spacing="0">
                <Flex
                  flexDirection={useBreakpointValue({
                    base: "column",
                    md: "column",
                  })}
                >
                  <Flex
                    flexDirection={useBreakpointValue({
                      base: "column",
                      md: "row",
                    })}
                    justifyContent={"flex-start"}
                  ></Flex>
                </Flex>
              </Stack>

              <Flex direction={"column"} w={"100%"}>
                <Flex direction={"column"} flex={1}>
                  <TableContainer
                    mt={4}
                    mb={3}
                    borderRadius={"10px"}
                    overflowX={"scroll"}
                  >
                    <Table variant="striped" colorScheme={"strippedGray"}>
                      <Thead>
                        <Tr background="#0047BB" color="white">
                          <Th textAlign={"center"} color={"white"}>
                            ID
                          </Th>

                          <Th color={"white"} textAlign={"center"}>
                            Lições Aprendidas
                          </Th>
                          <Th color={"white"} textAlign={"center"}>
                            Ações e Recomendações
                          </Th>
                          <Th color={"white"} textAlign={"center"}>
                            Data
                          </Th>
                          <Th color={"white"} textAlign={"center"}>
                            Ações
                          </Th>
                        </Tr>
                      </Thead>
                      <Tbody scrollBehavior={"smooth"}>{tableData}</Tbody>
                      <Tfoot>
                        <Tr background={"origem.500"}>
                          <Th color={"white"}>Total</Th>
                          <Th color={"white"}>{tableData.length} Lições</Th>
                          <Th color={"white"}>{tableData.length} Lições</Th>
                          <Th color={"white"}></Th>
                          <Th color={"white"}></Th>
                        </Tr>
                      </Tfoot>
                    </Table>
                  </TableContainer>
                </Flex>
                <PaginacaoTabela data={licoesAprendidas} fromTo={fromTo} />
              </Flex>
            </Box>{" "}
          </Flex>
        </Stack>

        {isOpen && (
          <EditModal
            closeModal={onClose}
            licao={editLicao}
            isOpen={isOpen}
            handleUpdateLicoes={handleUpdateLicoes}
          />
        )}
      </Flex>
    </Sidebar>
  );
}
