import { useEffect, useState } from "react";
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
} from "@chakra-ui/react";

import Sidebar from "components/SideBar";

import { getAllLicoesAprendidas } from "services/get/LicoesAprendidas";
import { getProjetos } from "services/get/Projetos";

import { LicoesAprendidas, ProjetosList } from "../../interfaces/Services";

export function LicoesAprendidasProjetos() {
  const [licoesAprendidas, setLicoesAprendidas] = useState(
    [] as LicoesAprendidas[]
  );
  const [filteredLicoesAprendidas, setFilteredLicoesAprendidas] = useState(
    [] as LicoesAprendidas[]
  );
  const [projetos, setProjetos] = useState([] as ProjetosList[]);
  const [projetoId, setProjetoId] = useState("");

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

  const tableData = filteredLicoesAprendidas
    .sort((a, b) => a.id - b.id)
    .map((lessons) => (
      <Tr key={lessons.id_projeto}>
        <Td isNumeric>{lessons.id}</Td>
        <Td>{lessons.txt_licao_aprendida}</Td>
        <Td>{lessons.txt_acao}</Td>
        <Td>
          {new Date(lessons.dat_usu_create)
            .toLocaleString("pt-BR")
            .substring(0, 10)}
        </Td>
        <Td>
          <IconButton
            aria-label="Plus sign"
            icon={<AiFillEdit />}
            background="white"
            variant="secondary"
            color="#2D2926"
            mr={2}
            isRound={true}
            size="sm"
            // onClick={() => onEdit(lessons)}
          />
        </Td>
      </Tr>
    ));

  const filterByProject = () => {
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
              <Heading as="h3" size="md" mt={"-50px"} mb={"15px"}>
                Lições Aprendidas
              </Heading>

              <Flex>
                <FormControl>
                  <FormLabel htmlFor="projeto">PROJETO</FormLabel>
                  <Select
                    id="projeto"
                    name="projeto"
                    onChange={(e) => setProjetoId(e.target.value)}
                    width={300}
                  >
                    <option value="0">Todos</option>
                    {projetos &&
                      projetos.map((project) => (
                        <option value={project.id} key={project.id}>
                          {project.nomeProjeto}
                        </option>
                      ))}
                  </Select>
                </FormControl>
                <FormControl className="toBottom">
                  <Button
                    color="white"
                    background="origem.300"
                    variant="primary"
                    _hover={{
                      background: "origem.500",
                      transition: "all 0.4s",
                    }}
                    rightIcon={<FiSearch />}
                    onClick={filterByProject}
                  >
                    Buscar
                  </Button>
                </FormControl>
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
                <Table variant="unstyled">
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
                      <Th>Total</Th>
                      <Th></Th>
                      <Th></Th>
                      <Th></Th>
                      <Th></Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
              <Stack spacing="6" alignItems={"center"}></Stack>
            </Box>{" "}
          </Flex>
        </Stack>
      </Flex>
    </Sidebar>
  );
}
