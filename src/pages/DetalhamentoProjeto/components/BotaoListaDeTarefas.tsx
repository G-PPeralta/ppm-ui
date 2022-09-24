import { useState } from "react";
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

import CadastrarTarefasModal from "./CadastroTarefaModal";

const taskList = [
  {
    id: 1,
    tarefa: "tarefa 1",
    atividadeRel: "atividade1",
    data: "24/09/2022",
    descrição: "descrição 1",
    status: "25%",
  },
  {
    id: 2,
    tarefa: "tarefa 2",
    atividadeRel: "atividade2",
    data: "24/09/2022",
    descrição: "descrição 2",
    status: "25%",
  },
  {
    id: 3,
    tarefa: "tarefa 3",
    atividadeRel: "atividade3",
    data: "24/09/2022",
    descrição: "descrição 3",
    status: "25%",
  },
];

function BotaoListadeTarefas() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tarefaFilter, setTarefaFilter] = useState("");

  const tableData = taskList.map((task, index) => (
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
        {task.tarefa}
      </Td>
      <Td
        style={{
          borderBottom: "0.5px solid #A7A7A7",
          borderRight: "0.5px solid #A7A7A7",
        }}
      >
        {task.atividadeRel}
      </Td>
      <Td
        style={{
          borderBottom: "0.5px solid #A7A7A7",
          borderRight: "0.5px solid #A7A7A7",
        }}
      >
        {task.data}
      </Td>
      <Td
        style={{
          borderBottom: "0.5px solid #A7A7A7",
          borderRight: "0.5px solid #A7A7A7",
        }}
      >
        {task.descrição}
      </Td>
      <Td
        style={{
          borderBottom: "0.5px solid #A7A7A7",
          borderRight: "0.5px solid #A7A7A7",
        }}
      >
        {task.status}
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
          // onClick={() => onEdit(lessons)}
        />
      </Td>
    </Tr>
  ));

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

      <Modal size={"1x2"} isOpen={isOpen} onClose={onClose}>
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
                    <FormLabel htmlFor="categoria">TAREFA</FormLabel>
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
                      // value={data}
                      // onChange={(event) => setData(event.target.value)}
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

          <ModalCloseButton />
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
