import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
import { AiOutlineSearch } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";

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

import { getAtividadesProjeto } from "services/get/Atividades-Projeto";
import { getAtividadesTarefas } from "services/get/Tarefas";

import CadastrarTarefasModal from "./CadastroTarefaModal";
import EditarTarefaModal from "./EditarTarefaModal";

function BotaoListadeTarefas() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  async function fetchAtividadesProjeto() {
    const { data } = await getAtividadesProjeto();
    setAtividadesProjeto(data);
  }

  function formatDate(date: Date) {
    const formated = date.toString().substring(0, 10).split("-");
    return `${formated[2]}/${formated[1]}/${formated[0]}`;
  }

  async function getTaskList() {
    const { data } = await getAtividadesTarefas();
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
        task.nome_tarefa.includes(nome)
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
      .map((task, index) => (
        <Tr key={index}>
          <Td
            isNumeric
            style={{
              borderBottom: "0.5px solid #A7A7A7",
              borderRight: "0.5px solid #A7A7A7",
            }}
            width="48px"
            height={"56px"}
            textAlign={"center"}
          >
            {task.id}
          </Td>
          <Td
            style={{
              borderBottom: "0.5px solid #A7A7A7",
              borderRight: "0.5px solid #A7A7A7",
            }}
            width="166px"
            height={"56px"}
          >
            {task.nome_tarefa}
          </Td>
          <Td
            style={{
              borderBottom: "0.5px solid #A7A7A7",
              borderRight: "0.5px solid #A7A7A7",
            }}
            width="166px"
            height={"56px"}
          >
            {task.atividade_relacionada}
          </Td>
          <Td
            style={{
              borderBottom: "0.5px solid #A7A7A7",
              borderRight: "0.5px solid #A7A7A7",
            }}
            width="112px"
            height={"56px"}
          >
            {formatDate(task.data_tarefa)}
          </Td>
          <Td
            style={{
              borderBottom: "0.5px solid #A7A7A7",
              borderRight: "0.5px solid #A7A7A7",
            }}
            width="200px"
            height={"56px"}
          >
            {task.descricao_tarefa}
          </Td>
          <Td
            style={{
              borderBottom: "0.5px solid #A7A7A7",
              borderRight: "0.5px solid #A7A7A7",
            }}
            width="200px"
            height={"56px"}
          >
            Responsável
          </Td>
          <Td
            style={{
              borderBottom: "0.5px solid #A7A7A7",
              borderRight: "0.5px solid #A7A7A7",
            }}
            width="96px"
            height={"56px"}
            color={"#059502"}
            textAlign={"center"}
          >
            {!task.status ? "0%" : task.status}
            <IconButton
              aria-label="Plus sign"
              icon={<MdModeEdit />}
              background="white"
              variant="secondary"
              color="#0047BB"
              isRound={true}
              // onClick={() => onEdit(lessons)}
              width={"18px"}
              height={"18px"}
            />
          </Td>
          <Td
            style={{ borderBottom: "0.5px solid #A7A7A7" }}
            width="104px"
            height={"56px"}
          >
            <IconButton
              aria-label="Plus sign"
              icon={<MdModeEdit />}
              background="white"
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
                <Flex>
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
                      borderRadius={"8px"}
                      border={"1px solid #A7A7A7"}
                      mt={"-9px"}
                      width={"328px"}
                      height={"56px"}
                      color="#949494"
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
                      borderRadius={"8px"}
                      border={"1px solid #A7A7A7"}
                      mt={"-9px"}
                      width={"120px"}
                      height={"56px"}
                      color="#949494"
                      id="data"
                      type="date"
                      name="data"
                      // value={dataFilter}
                      onChange={(event) => setDataFiltered(event.target.value)}
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
                  <Flex
                    display={"flex"}
                    justifyContent={"space-between"}
                    flex={2.5}
                    ml={"15px"}
                  >
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
                      width={"117px"}
                      height={"56px"}
                    >
                      <Text fontWeight={"700"} fontSize="18px">
                        Adicionar
                      </Text>
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </FormControl>
          </Stack>

          <ModalCloseButton
            color={"white"}
            onClick={() => setTaskList(filteredData)}
          />
          <ModalBody>
            <TableContainer mt={4} mb={3} ml={1}>
              <Table
                variant="unstyled"
                style={{ border: "0.5px solid #A7A7A7" }}
              >
                <Thead>
                  <Tr background="origem.500" color="white">
                    <Th
                      style={{
                        borderBottom: "0.5px solid #A7A7A7",
                        borderRight: "0.5px solid #A7A7A7",
                      }}
                      width="36px"
                      height={"56px"}
                    >
                      ID
                    </Th>
                    <Th
                      style={{
                        borderBottom: "0.5px solid #A7A7A7",
                        borderRight: "0.5px solid #A7A7A7",
                      }}
                    >
                      Lista de Tarefas
                    </Th>
                    <Th
                      style={{
                        borderBottom: "0.5px solid #A7A7A7",
                        borderRight: "0.5px solid #A7A7A7",
                      }}
                    >
                      Atividade relacionada
                    </Th>
                    <Th
                      style={{
                        borderBottom: "0.5px solid #A7A7A7",
                        borderRight: "0.5px solid #A7A7A7",
                      }}
                    >
                      Data
                    </Th>
                    <Th
                      style={{
                        borderBottom: "0.5px solid #A7A7A7",
                        borderRight: "0.5px solid #A7A7A7",
                      }}
                    >
                      Descrição
                    </Th>
                    <Th
                      style={{
                        borderBottom: "0.5px solid #A7A7A7",
                        borderRight: "0.5px solid #A7A7A7",
                      }}
                    >
                      Responsável
                    </Th>
                    <Th
                      style={{
                        borderBottom: "0.5px solid #A7A7A7",
                        borderRight: "0.5px solid #A7A7A7",
                      }}
                    >
                      Status
                    </Th>
                    <Th
                      style={{
                        borderBottom: "0.5px solid #A7A7A7",
                        borderRight: "0.5px solid #A7A7A7",
                      }}
                    >
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
