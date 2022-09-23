import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillEdit } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";

import {
  Tr,
  Td,
  IconButton,
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
} from "@chakra-ui/react";

import Sidebar from "components/SideBar";

import { getAllLicoesAprendidas } from "services/get/LicoesAprendidas";
import { getProjetos } from "services/get/Projetos";
import { patchLicaoAprendida } from "services/update/LicoesAprendidas";

import { LicoesAprendidas, ProjetosList } from "../../interfaces/Services";
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
    .map((lessons, index) => (
      <Tr key={index}>
        <Td
          isNumeric
          style={{
            borderBottom: "0.5px solid #A7A7A7",
            borderRight: "0.5px solid #A7A7A7",
          }}
        >
          {lessons.id}
        </Td>
        <Td
          style={{
            borderBottom: "0.5px solid #A7A7A7",
            borderRight: "0.5px solid #A7A7A7",
          }}
        >
          {lessons.txt_licao_aprendida}
        </Td>
        <Td
          style={{
            borderBottom: "0.5px solid #A7A7A7",
            borderRight: "0.5px solid #A7A7A7",
          }}
        >
          {lessons.txt_acao}
        </Td>
        <Td
          style={{
            borderBottom: "0.5px solid #A7A7A7",
            borderRight: "0.5px solid #A7A7A7",
          }}
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
        >
          <IconButton
            aria-label="Plus sign"
            icon={<AiFillEdit />}
            background="white"
            variant="secondary"
            color="#2D2926"
            mr={2}
            isRound={true}
            size="md"
            onClick={() => {
              setEditLicao(lessons);
              onOpen();
            }}
          />
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

  return (
    <Sidebar>
      <Flex
        w={"100%"}
        align="center"
        justify="center"
        bg={useBreakpointValue({ base: "white", sm: "#EDF2F7" })}
      >
        <Stack spacing="8">
          <Flex>
            <Box
              py={{ base: "0", sm: "16" }}
              px={{ base: "4", sm: "10" }}
              w={"100%"}
              bg={useBreakpointValue({ base: "transparent", sm: "white" })}
              boxShadow={{
                base: "none",
                sm: useColorModeValue("md", "md-dark"),
              }}
              borderRadius={{ base: "none", sm: "xl" }}
            >
              <Heading as="h3" size="md" mt={"-50px"} mb={"25px"}>
                Lições Aprendidas
              </Heading>

              <Flex>
                <FormControl
                  // style={{ border: "1px solid blue" }}
                  display="flex"
                  flexDir={"row"}
                  justifyContent={"flex-start"}
                >
                  <Flex flexDir={"column"}>
                    <FormLabel htmlFor="projeto">PROJETO</FormLabel>
                    <Select
                      id="projeto"
                      name="projeto"
                      onChange={(e) => setProjetoId(e.target.value)}
                      width={300}
                      // value={projetoId}
                    >
                      <option value={0}>Todos</option>
                      {projetos &&
                        projetos.map((project, index) => (
                          <option value={project.id} key={index}>
                            {project.nomeProjeto}
                          </option>
                        ))}
                    </Select>
                  </Flex>

                  <Button
                    type="button"
                    background="white"
                    variant="outline"
                    color="origem.500"
                    borderColor="origem.500"
                    _hover={{
                      background: "origem.300",
                      transition: "all 0.4s",
                      color: "white",
                    }}
                    rightIcon={<FiSearch />}
                    onClick={filterByProject}
                    alignSelf={"end"}
                    marginLeft={"5"}
                  >
                    Buscar
                  </Button>
                </FormControl>
                {/* <FormControl
                  className="toBottom"
                  style={{ border: "4px solid green" }}
                ></FormControl> */}
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
                  variant="unstyled"
                  style={{ border: "0.5px solid #A7A7A7" }}
                >
                  <Thead>
                    <Tr background="origem.500" color="white">
                      <Th>ID</Th>
                      <Th>Lições Aprendidas</Th>
                      <Th>Ações e Recomendações</Th>
                      <Th>Data</Th>
                      <Th>Validar</Th>
                    </Tr>
                  </Thead>
                  <Tbody>{tableData}</Tbody>
                  <Tfoot>
                    <Tr background="origem.200" color="white">
                      <Th
                        style={{
                          borderBottom: "0.5px solid #A7A7A7",
                          borderRight: "0.5px solid #A7A7A7",
                        }}
                      >
                        Total
                      </Th>
                      <Th
                        style={{
                          borderBottom: "0.5px solid #A7A7A7",
                          borderRight: "0.5px solid #A7A7A7",
                        }}
                      >
                        {tableData.length} Lições
                      </Th>
                      <Th
                        style={{
                          borderBottom: "0.5px solid #A7A7A7",
                          borderRight: "0.5px solid #A7A7A7",
                        }}
                      >
                        {tableData.length} Lições
                      </Th>
                      <Th
                        style={{
                          borderBottom: "0.5px solid #A7A7A7",
                          borderRight: "0.5px solid #A7A7A7",
                        }}
                      ></Th>
                      <Th
                        style={{
                          borderBottom: "0.5px solid #A7A7A7",
                          borderRight: "0.5px solid #A7A7A7",
                        }}
                      ></Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
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
      </Flex>
    </Sidebar>
  );
}
