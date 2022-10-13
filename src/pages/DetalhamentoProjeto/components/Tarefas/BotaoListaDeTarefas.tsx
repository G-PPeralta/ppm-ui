import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
import { AiOutlineSearch } from "react-icons/ai";
import { MdArrowForwardIos, MdModeEdit } from "react-icons/md";
import { useParams } from "react-router-dom";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  // ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  AtividadesProjeto,
  TarefaAtividade,
  TarefaAtividadeComId,
} from "interfaces/Services";

import PaginacaoTabela from "components/PaginacaoTabela";

import { getAtividadesProjeto } from "services/get/Atividades-Projeto";
import { getAtividadesTarefas } from "services/get/Tarefas";

import CadastrarTarefasModal from "./CadastroTarefaModal";
import EditarTarefaModal from "./EditarTarefaModal";

function BotaoListadeTarefas() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tarefaFilter, setTarefaFilter] = useState("");
  const [taskList, setTaskList] = useState([] as TarefaAtividadeComId[]);
  const [editTarefa, setEditTarefa] = useState({} as TarefaAtividade);
  const [atividadesProjeto, setAtividadesProjeto] = useState(
    [] as AtividadesProjeto[]
  );

  const [dataFilter, setDataFiltered] = useState("");

  const [filteredData, setFilteredData] = useState(
    [] as TarefaAtividadeComId[]
  );

  const [render, setRender] = useState(false);
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);

  const fromTo = {
    from,
    to,
    setFrom,
    setTo,
  };

  async function fetchAtividadesProjeto() {
    const { data } = await getAtividadesProjeto(Number(id));
    setAtividadesProjeto(data);
  }

  function formatDate(date: Date) {
    const formated = date.toString().substring(0, 10).split("-");
    return `${formated[2]}/${formated[1]}/${formated[0]}`;
  }

  async function getTaskList() {
    const { data } = await getAtividadesTarefas(Number(id));
    // console.log(data);

    setTaskList(data);
    setFilteredData(data);
  }

  function handleEditTarefa(tarefa: TarefaAtividade) {
    setEditTarefa(tarefa);
    setIsEditModalOpen(true);
  }

  function handleFilter(nome: string, data: string) {
    if (nome) {
      const filtered = taskList.filter((task: any) =>
        task.nome_tarefa.toUpperCase().includes(nome.toUpperCase())
      );
      return setTaskList(filtered);
    }
    if (data) {
      const filtered = taskList.filter((task: any) =>
        task.data_tarefa.includes(data)
      );
      // filtered.length == 0 &&
      //   toast.error("Nenhum dado encontrado com o presente filtro de data");
      return setTaskList(filtered);
    }
    setTaskList(filteredData);
  }

  const tableData =
    taskList &&
    taskList
      .sort((a, b) => a.id - b.id)
      .slice(from, to)
      .map((task, index) => (
        <Tr key={index}>
          <Td textAlign={"center"}>{task.id}</Td>
          <Td textAlign={"center"} fontWeight={"semibold"}>
            {task.nome_tarefa}
          </Td>
          <Td textAlign={"center"} fontWeight={"semibold"}>
            {task.atividade_relacionada}
          </Td>
          <Td textAlign={"center"} fontWeight={"semibold"}>
            {formatDate(task.data_tarefa)}
          </Td>
          <Td textAlign={"center"} fontWeight={"semibold"}>
            {task.descricao_tarefa}
          </Td>
          <Td textAlign={"center"} fontWeight={"semibold"}>
            {task.responsavel}
          </Td>
          <Td textAlign={"center"} fontWeight={"semibold"}>
            {!task.status ? "1" : task.status}%
          </Td>
          <Td>
            <IconButton
              aria-label="Plus sign"
              icon={<MdModeEdit />}
              background="transparent"
              variant="secondary"
              color="#0047BB"
              isRound={true}
              onClick={() => handleEditTarefa(task)}
              width={"18px"}
              height={"18px"}
            />
          </Td>
        </Tr>
      ));

  useEffect(() => {
    getTaskList();
    fetchAtividadesProjeto();
  }, [render]);

  return (
    <>
      <Button
        onClick={onOpen}
        background={"white"}
        color={"#0047BB"}
        _hover={{
          background: "#0047BB",
          color: "white",
          transition: "all 0.4s",
        }}
        p={4}
        borderTopRadius={"0px"}
        borderBottomRadius={"0px"}
        fontSize={"16px"}
        fontWeight={"700"}
        flex={1}
      >
        Lista de Tarefas
      </Button>

      <Modal size={"6xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            backgroundColor={"#2E69FD"}
            borderTopRadius={7}
            display={"flex"}
            justifyContent={"center"}
            color={"white"}
            fontSize={"14px"}
            fontWeight={"700"}
          >
            Lista de Tarefas
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
                px={7}
                py={5}
                gap={4}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Flex justify={"space-between"} gap={3}>
                  <Flex align={"flex-end"}>
                    <FormControl>
                      <FormLabel htmlFor="tarefa">
                        <Text
                          color="#949494"
                          fontSize="12px"
                          fontWeight="700"
                          mt={"6px"}
                        >
                          TAREFA
                        </Text>
                      </FormLabel>
                      <Input
                        maxLength={50}
                        borderRadius={"8px"}
                        border={"1px solid #A7A7A7"}
                        mt={"-9px"}
                        width={"328px"}
                        height={"56px"}
                        _placeholder={{ color: "black" }}
                        placeholder="Nome da tarefa"
                        type="text"
                        id="tarefa"
                        name="tarefa"
                        value={tarefaFilter}
                        onChange={(e) => setTarefaFilter(e.target.value)}
                      />
                    </FormControl>
                  </Flex>
                  <Flex
                    display={"flex"}
                    justifyContent={"space-between"}
                    flex={0}
                  >
                    <FormControl>
                      <FormLabel htmlFor="data">
                        <Text
                          color="#949494"
                          fontSize="12px"
                          fontWeight="700"
                          mt={"6px"}
                        >
                          {" "}
                          DATA
                        </Text>
                      </FormLabel>
                      <Input
                        // placeholder="dd/mm/aaaa"
                        max="9999-12-31"
                        maxLength={1}
                        borderRadius={"8px"}
                        border={"1px solid #A7A7A7"}
                        mt={"-9px"}
                        width={"156px"}
                        height={"56px"}
                        _placeholder={{ color: "black" }}
                        id="data"
                        type="date"
                        // maxLength={6}
                        name="data"
                        // value={dataFilter}
                        onChange={(event) =>
                          setDataFiltered(event.target.value)
                        }
                      />
                    </FormControl>
                    {/* <input
                    type="date"
                    onChange={(event) => setData(event.target.value)}
                  /> */}
                  </Flex>

                  <Flex>
                    <Button
                      type="button"
                      background="white"
                      variant="outline"
                      color="#0047BB"
                      borderColor="#0047BB"
                      border={"2px"}
                      // h={useBreakpointValue({ base: "100%", md: "120%" })}
                      // float={"right"}
                      // onClick={() => {
                      //   handleFilter(categoriaId, data);
                      //   setCategoriaId("");
                      // }}
                      onClick={() => {
                        handleFilter(tarefaFilter, dataFilter);
                      }}
                      _hover={{
                        background: "#0047BB",
                        transition: "all 0.4s",
                        color: "white",
                      }}
                      width={"100px"}
                      height={"56px"}
                      fontWeight={"700"}
                      fontSize="18px"
                      alignSelf={"end"}
                    >
                      Buscar
                      <Icon
                        fontWeight={"900"}
                        as={AiOutlineSearch}
                        fontSize="18px"
                        ml={1}
                        color={"#0047BB"}
                      />
                    </Button>
                  </Flex>
                </Flex>

                <Flex justifyContent={"space-between"}>
                  <Flex align={"flex-start"} gap={10}>
                    <Button
                      type="button"
                      background="origem.500"
                      variant="primary"
                      color="white"
                      // border={"2px"}
                      // h={useBreakpointValue({ base: "100%", md: "120%" })}
                      // float={"right"}
                      onClick={() => setIsModalOpen(true)}
                      _hover={{
                        background: "origem.300",
                        transition: "all 0.4s",
                        color: "white",
                      }}
                      // width={"117px"}
                      height={"56px"}
                    >
                      <Text fontWeight={"700"} fontSize="18px">
                        Adicionar Tarefa
                      </Text>
                    </Button>
                    <Flex alignSelf={"end"} align={"flex-start"}>
                      <Button
                        onClick={onOpen}
                        background="transparent"
                        color="#0047BB"
                        fontSize="18px"
                        fontWeight={"700"}
                      >
                        Lixeira
                        <Icon
                          as={MdArrowForwardIos}
                          fontSize="20px"
                          fontWeight={"700"}
                          color="#0047BB"
                        />
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </FormControl>
          </Stack>

          <ModalCloseButton
            color={"white"}
            onClick={() => {
              setTaskList(filteredData);
              setTarefaFilter("");
            }}
          />
          <ModalBody>
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
                      <Tr background="origem.500">
                        <Th
                          color="white"
                          textAlign={"center"}
                          width="36px"
                          height={"56px"}
                        >
                          ID
                        </Th>
                        <Th color="white" textAlign={"center"}>
                          Tarefa
                        </Th>
                        <Th color="white" textAlign={"center"}>
                          Atividade relacionada
                        </Th>
                        <Th color="white" textAlign={"center"}>
                          Data
                        </Th>
                        <Th color="white" textAlign={"center"}>
                          Descrição
                        </Th>
                        <Th color="white" textAlign={"center"}>
                          Responsável
                        </Th>
                        <Th color="white" textAlign={"center"}>
                          Status
                        </Th>
                        <Th color="white" textAlign={"center"}>
                          Ações
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>{tableData}</Tbody>
                    {/* <Tfoot>
          <Tr background="origem.200" color="white">
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Tfoot> */}
                  </Table>
                </TableContainer>
              </Flex>
              <PaginacaoTabela data={taskList} fromTo={fromTo} />
            </Flex>
          </ModalBody>

          {isModalOpen && (
            <CadastrarTarefasModal
              isModalOpen={setIsModalOpen}
              closeModal={() => setIsModalOpen(false)}
              atividadesProjeto={atividadesProjeto}
              newRender={() => setRender(!render)}
            />
          )}

          {isEditModalOpen && (
            <EditarTarefaModal
              isModalOpen={setIsEditModalOpen}
              editTarefa={editTarefa}
              closeModal={() => setIsEditModalOpen(false)}
              atividadesProjeto={atividadesProjeto}
              newRender={() => setRender(!render)}
            />
          )}

          {/* <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
}

export default BotaoListadeTarefas;
