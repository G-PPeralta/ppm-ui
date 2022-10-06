import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiPrinter,
  FiSearch,
} from "react-icons/fi";
import { MdArrowForwardIos, MdModeEdit } from "react-icons/md";
import ReactToPrint from "react-to-print";

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

  const [pagAtual, setPagAtual] = useState(1);
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(8);

  async function handleGetLicoesAprendidas() {
    const payload = await getAllLicoesAprendidas();
    setLicoesAprendidas(payload.data);
    setFilteredLicoesAprendidas(payload.data);
  }

  const componentRef = useRef<HTMLDivElement>(null);

  async function handleGetProjetos() {
    const payload = await getProjetos();
    setProjetos(payload.data);
  }

  useEffect(() => {
    handleGetLicoesAprendidas();
    handleGetProjetos();
  }, []);

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
          isNumeric
          style={{
            borderBottom: "0.5px solid #A7A7A7",
            border: "0.5px solid #A7A7A7",
          }}
          width="48px"
          height={"56px"}
          textAlign={"center"}
        >
          {lessons.id}
        </Td>

        <Td
          style={{
            borderBottom: "0.5px solid #A7A7A7",
            borderRight: "0.5px solid #A7A7A7",
          }}
          width="284px"
          height={"56px"}
        >
          {lessons.txt_licao_aprendida}
        </Td>
        <Td
          style={{
            borderBottom: "0.5px solid #A7A7A7",
            borderRight: "0.5px solid #A7A7A7",
          }}
          width="506px"
          height={"36px"}
        >
          {lessons.txt_acao}
        </Td>
        <Td
          style={{
            borderBottom: "0.5px solid #A7A7A7",
            borderRight: "0.5px solid #A7A7A7",
          }}
          width="150px"
          height={"36px"}
        >
          {new Date(lessons.dat_usu_create)
            .toLocaleString("pt-BR")
            .substring(0, 10)}
        </Td>
        <Td
          style={{
            borderBottom: "0.5px solid #A7A7A7",
            borderRight: "0.5px solid #A7A7A7",
          }}
          width="96px"
          height={"56px"}
        >
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

  const rowsPerPage = 8;
  const totalRegs = filteredLicoesAprendidas.length;
  const maxPage = Math.ceil(totalRegs / rowsPerPage);

  const paginate = (pag: number) => {
    setPagAtual(pag);

    const x = (pag - 1) * rowsPerPage;
    const y = (pag - 1) * rowsPerPage + rowsPerPage;
    setFrom(x);
    setTo(y);
  };

  const advance = () => {
    if (pagAtual == maxPage) {
      return;
    }

    const _pag = pagAtual + 1;

    paginate(_pag);
  };

  const back = () => {
    if (pagAtual == 1) {
      return;
    }
    const _pag = pagAtual - 1;
    paginate(_pag);
  };

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
                  <ReactToPrint
                    trigger={() => (
                      <Button
                        color={"#0239C3"}
                        fontWeight={"700"}
                        variant="ghost"
                        colorScheme="messenger"
                        rightIcon={<FiPrinter />}
                      >
                        Exportar
                      </Button>
                    )}
                    content={() => componentRef.current}
                  />
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
                      onClick={filterByProject}
                      alignSelf={"end"}
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

              <TableContainer mt={4} mb={3} ml={1}>
                <Table
                  variant="striped"
                  // style={{ border: "0.5px solid #A7A7A7" }}
                >
                  <Thead>
                    <Tr background="#0047BB" color="white">
                      <Th
                        style={{
                          borderBottom: "0.5px solid #A7A7A7",
                          border: "0.5px solid #A7A7A7",
                        }}
                        width="48px"
                        height={"36px"}
                        textAlign={"center"}
                        color={"white"}
                      >
                        ID
                      </Th>

                      <Th
                        style={{
                          borderBottom: "0.5px solid #A7A7A7",
                          borderRight: "0.5px solid #A7A7A7",
                        }}
                        color={"white"}
                      >
                        Lições Aprendidas
                      </Th>
                      <Th
                        style={{
                          borderBottom: "0.5px solid #A7A7A7",
                          borderRight: "0.5px solid #A7A7A7",
                        }}
                        color={"white"}
                      >
                        Ações e Recomendações
                      </Th>
                      <Th
                        style={{
                          borderBottom: "0.5px solid #A7A7A7",
                          borderRight: "0.5px solid #A7A7A7",
                        }}
                        color={"white"}
                      >
                        Data
                      </Th>
                      <Th
                        style={{
                          borderBottom: "0.5px solid #A7A7A7",
                          borderRight: "0.5px solid #A7A7A7",
                        }}
                        color={"white"}
                      >
                        Ações
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>{tableData}</Tbody>
                  <Tfoot>
                    <Tr background="#0047BB" color="white">
                      <Th
                        style={{
                          borderBottom: "0.5px solid #A7A7A7",
                          borderRight: "0.5px solid #A7A7A7",
                        }}
                        color={"white"}
                      >
                        Total
                      </Th>
                      <Th
                        style={{
                          borderBottom: "0.5px solid #A7A7A7",
                          borderRight: "0.5px solid #A7A7A7",
                        }}
                        color={"white"}
                      >
                        {tableData.length} Lições
                      </Th>
                      <Th
                        style={{
                          borderBottom: "0.5px solid #A7A7A7",
                          borderRight: "0.5px solid #A7A7A7",
                        }}
                        color={"white"}
                      >
                        {tableData.length} Lições
                      </Th>
                      <Th
                        color={"white"}
                        style={{
                          borderBottom: "0.5px solid #A7A7A7",
                          borderRight: "0.5px solid #A7A7A7",
                        }}
                      ></Th>
                      <Th
                        color={"white"}
                        style={{
                          borderBottom: "0.5px solid #A7A7A7",
                          borderRight: "0.5px solid #A7A7A7",
                        }}
                      ></Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
              <Flex justifyContent={"center"}>
                <Flex
                  width={"300px"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <IconButton
                    aria-label=""
                    icon={<FiChevronsLeft />}
                    onClick={() => paginate(1)}
                  />
                  <IconButton
                    aria-label=""
                    icon={<FiChevronLeft onClick={back} />}
                  />

                  <Text>Página atual: {pagAtual}</Text>

                  <IconButton
                    aria-label=""
                    icon={<FiChevronRight />}
                    onClick={advance}
                  />
                  <IconButton
                    aria-label=""
                    icon={<FiChevronsRight />}
                    onClick={() => paginate(maxPage)}
                  />
                </Flex>
              </Flex>
              <Stack spacing="6" alignItems={"center"}></Stack>
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
        <Flex ref={componentRef}></Flex>
      </Flex>
    </Sidebar>
  );
}
