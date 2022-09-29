import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
import { AiFillEdit, AiOutlineSearch } from "react-icons/ai";

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
    return `${formated[2]}-${formated[1]}-${formated[0]}`;
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
          >
            {task.id}
          </Td>
          <Td
            style={{
              borderBottom: "0.5px solid #A7A7A7",
              borderRight: "0.5px solid #A7A7A7",
            }}
          >
            {task.nome_tarefa}
          </Td>
          <Td
            style={{
              borderBottom: "0.5px solid #A7A7A7",
              borderRight: "0.5px solid #A7A7A7",
            }}
          >
            {task.atividade_relacionada}
          </Td>
          <Td
            style={{
              borderBottom: "0.5px solid #A7A7A7",
              borderRight: "0.5px solid #A7A7A7",
            }}
          >
            {formatDate(task.data_tarefa)}
          </Td>
          <Td
            style={{
              borderBottom: "0.5px solid #A7A7A7",
              borderRight: "0.5px solid #A7A7A7",
            }}
          >
            {task.descricao_tarefa}
          </Td>
          <Td
            style={{
              borderBottom: "0.5px solid #A7A7A7",
              borderRight: "0.5px solid #A7A7A7",
            }}
          >
            {!task.status ? "0%" : task.status}
          </Td>
          <Td style={{ borderBottom: "0.5px solid #A7A7A7" }}>
            <IconButton
              aria-label="Plus sign"
              icon={<AiFillEdit />}
              background="white"
              variant="secondary"
              color="#2D2926"
              mr={2}
              isRound={true}
              size="sm"
              onClick={() => handleEditTarefa(task)}
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
        color={"origem.300"}
        _hover={{
          background: "origem.500",
          color: "white",
          transition: "all 0.4s",
        }}
        px={6}
        py={10}
        borderTopRadius={"0px"}
        borderBottomRadius={"0px"}
      >
        Lista de Tarefas
      </Button>

      <Modal size={"5xl"} isOpen={isOpen} onClose={onClose}>
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
                px={4}
                py={4}
                gap={2}
              >
                <Flex
                  display={"flex"}
                  justifyContent={"space-between"}
                  flex={1}
                >
                  <FormControl>
                    <FormLabel htmlFor="tarefa">TAREFA</FormLabel>
                    <Input
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
                    <FormLabel htmlFor="data">DATA</FormLabel>
                    <Input
                      // placeholder="dd/mm/aaaa"
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
                    color="origem.500"
                    borderColor="origem.500"
                    // border={"2px"}
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
                    onClick={() => setIsModalOpen(true)}
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
                    <Th>ID</Th>
                    <Th>Lista de Tarefas</Th>
                    <Th>Atividade relacionada</Th>
                    <Th>Data</Th>
                    <Th>Descrição</Th>
                    <Th>Status</Th>
                    <Th>Ações</Th>
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
