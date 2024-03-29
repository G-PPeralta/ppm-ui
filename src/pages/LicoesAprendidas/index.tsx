//  CRIADO EM: 9/2022
//  AUTOR: Geovana Augusta.
//  DESCRIÇÃO DO ARQUIVO: Tabela de lições aprendidas

import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import toast from "react-hot-toast";
import { FaFileCsv } from "react-icons/fa";
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
  useBreakpointValue,
  useColorModeValue,
  Button,
  FormControl,
  FormLabel,
  Select,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";
import moment from "moment";

import PaginacaoTabela from "components/PaginacaoTabela";
import Sidebar from "components/SideBar";

import { formatDate } from "utils/formatDate";

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
  const [render, setRender] = useState(false);

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

  useEffect(() => {
    setTimeout(() => {
      handleGetLicoesAprendidas();
      handleGetProjetos();
    }, 1000);
  }, [render]);

  const handleClick = () => {
    filterByProject();
  };

  async function handleUpdateLicoes(
    licao: any,
    campo: any,
    payload: any,
    user: any
  ) {
    try {
      await patchLicaoAprendida(licao, campo, payload, user);
      await handleGetLicoesAprendidas();
      setProjetoId("0");
      onClose();
    } catch (error) {
      toast.error("Erro na requisição");
    }
  }

  function Body() {
    return (
      <>
        {filteredLicoesAprendidas.length > 0 ? (
          filteredLicoesAprendidas
            .sort((a, b) => a.id - b.id)
            .slice(from, to)
            .map((lessons, index) => (
              <Tr key={index}>
                <Td fontWeight={"semibold"} textAlign={"center"}>
                  {lessons.id}
                </Td>

                <Td textAlign={"center"} fontWeight={"semibold"}>
                  {lessons.txt_licao_aprendida}
                </Td>
                <Td
                  fontWeight={"semibold"}
                  textAlign={"center"}
                  width="406px"
                  height={"36px"}
                >
                  {lessons.txt_acao}
                </Td>
                <Td fontWeight={"semibold"} textAlign={"center"}>
                  {new Date(lessons.dat_usu_create)
                    .toLocaleString("pt-BR")
                    .substring(0, 10)}
                </Td>
                <Td fontWeight={"semibold"} textAlign={"center"}>
                  <IconButton
                    aria-label="Plus sign"
                    icon={<MdModeEdit />}
                    background="transparent"
                    variant="secondary"
                    color="#0047BB"
                    _hover={{ background: "origem.500", color: "white" }}
                    onClick={() => {
                      setEditLicao(lessons);
                      onOpen();
                    }}
                  />
                  <DeleteModal
                    id={lessons.id}
                    newRender={() => setRender(!render)}
                  />
                </Td>
              </Tr>
            ))
        ) : (
          <Tr>
            <Td textAlign={"start"}>
              <Text textAlign={"start"} fontWeight={"semibold"}>
                Não há dados
              </Text>
            </Td>
          </Tr>
        )}
      </>
    );
  }

  const tableData = filteredLicoesAprendidas
    .sort((a, b) => a.id - b.id)
    .slice(from, to)
    .map((lessons, index) => (
      <Tr key={index}>
        <Td fontWeight={"semibold"} textAlign={"center"}>
          {lessons.id}
        </Td>

        <Td textAlign={"center"} fontWeight={"semibold"}>
          {lessons.txt_licao_aprendida}
        </Td>
        <Td
          fontWeight={"semibold"}
          textAlign={"center"}
          width="506px"
          height={"36px"}
        >
          {lessons.txt_acao}
        </Td>
        <Td fontWeight={"semibold"} textAlign={"center"}>
          {new Date(lessons.dat_usu_create)
            .toLocaleString("pt-BR")
            .substring(0, 10)}
        </Td>
        <Td fontWeight={"semibold"} textAlign={"center"}>
          <IconButton
            aria-label="Plus sign"
            icon={<MdModeEdit />}
            background="transparent"
            variant="secondary"
            color="#0047BB"
            _hover={{ background: "origem.500", color: "white" }}
            onClick={() => {
              setEditLicao(lessons);
              onOpen();
            }}
          />
          <DeleteModal id={lessons.id} newRender={() => setRender(!render)} />
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

  const headers = [
    { label: "Projeto", key: "projeto" },
    { label: "Lições Aprendidas", key: "licao_aprendida" },
    { label: "Ações e Recomendações", key: "acao_e_recomendacao" },
    { label: "Data", key: "data" },
  ];

  return (
    <Sidebar>
      <Flex
        w="auto"
        align="center"
        justify="center"
        bg={useBreakpointValue({ base: "white", sm: "#EDF2F7" })}
      >
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
            <Flex mt={-3} ml={-3} mr={-5} mb={6}>
              <Heading
                fontFamily={"Mulish"}
                fontWeight={"700"}
                fontSize={"24px"}
                color={"#2D2926"}
              >
                <Text>Lições Aprendidas</Text>
              </Heading>
            </Flex>
            <Flex
              align={"flex-start"}
              fontWeight={"700"}
              fontSize={"18px"}
              color="#0239C3"
              mr={-2}
              mt={-1}
            >
              <CSVLink
                filename={`licoes_aprendidas${moment().format(
                  "DDMMYYYY_hhmmss"
                )}`}
                data={filteredLicoesAprendidas.map((lic) => ({
                  ...lic,
                  projeto: projetos.find(
                    (project) => project.id == lic.id_projeto
                  )?.nomeProjeto,
                  data: formatDate(lic.dat_usu_create),
                }))}
                headers={headers}
              >
                <Button
                  fontWeight={"700"}
                  fontSize="18px"
                  color={"#0047BB"}
                  variant="ghost"
                  rightIcon={<FaFileCsv size={18} />}
                >
                  Exportar
                </Button>
              </CSVLink>
            </Flex>
          </Flex>
          <Flex flexDir={"row"} justify={"space-between"}>
            <Flex align={"flex-end"} gap={3} wrap={"wrap"} flex={1}>
              <Flex ml={-3}>
                <FormControl>
                  <FormLabel
                    fontWeight={"700"}
                    fontSize={"12px"}
                    color={"#949494"}
                    htmlFor="projeto"
                  >
                    PROJETO
                  </FormLabel>
                  <Select
                    fontSize={"14px"}
                    fontFamily={"Mulish"}
                    fontWeight={"400"}
                    mt={"-9px"}
                    borderRadius={"8px"}
                    placeholder="Selecione"
                    id="projeto"
                    name="projeto"
                    onChange={(e) => setProjetoId(e.target.value)}
                    width={"208px"}
                    height={"56px"}
                    value={projetoId}
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
                  borderRadius={"8px"}
                  fontWeight={"700"}
                  background={"origem.500"}
                  variant="outline"
                  color="white"
                  borderColor="#0047BB"
                  _hover={{
                    background: "origem.600",
                    transition: "all 0.4s",
                  }}
                  rightIcon={<FiSearch />}
                  onClick={handleClick}
                  height={"56px"}
                  width={"101px"}
                  fontSize={"18px"}
                >
                  Filtrar
                </Button>
              </Flex>
            </Flex>

            <Flex align={"flex-start"} alignSelf={"center"} mr={-3}>
              <Button
                variant="ghost"
                color="#0047BB"
                fontWeight={"700"}
                fontSize={"18px"}
              >
                Lixeira
                <Icon
                  as={MdArrowForwardIos}
                  fontSize="20px"
                  fontWeight={"700"}
                  ml={1}
                  color="#0047BB"
                />
              </Button>
            </Flex>
          </Flex>

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

          <Flex direction={"column"} ml={-3} mr={-3} mt={1}>
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
                  <Tbody scrollBehavior={"smooth"}>{<Body />}</Tbody>
                  <Tfoot>
                    <Tr background={"origem.500"}>
                      <Th color={"white"}>Total</Th>
                      <Th textAlign={"center"} color={"white"}>
                        {tableData.length > 1
                          ? `${tableData.length} lições`
                          : `${tableData.length} lição `}{" "}
                      </Th>
                      <Th color={"white"}> </Th>
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

      {isOpen && (
        <EditModal
          closeModal={onClose}
          licao={editLicao}
          isOpen={isOpen}
          handleUpdateLicoes={handleUpdateLicoes}
        />
      )}
    </Sidebar>
  );
}
