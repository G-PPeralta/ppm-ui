import { useEffect, useState } from "react";
// import { GrAddCircle } from "react-icons/gr";
import ReactDatePicker from "react-datepicker";
import { BsSearch } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import Moment from "react-moment";
import "moment/locale/pt-br";

import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  // ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  ModalCloseButton,
  TableContainer,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { CustoDiario } from "interfaces/Budgets";
import moment from "moment";

import Empty from "components/TableEmpty/empty";

import { formatReal } from "utils/formatReal";

import { getCustoDiario } from "services/get/GetBudget";

function ModalCustoDiario(props: { id: string | undefined }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true); // Loading
  const [data, setData] = useState<CustoDiario[]>([]);
  const { id } = props;

  const wd = window.innerWidth;

  const getCustosDiariosInicial = async () => {
    const localStartDate = new Date(
      parseInt(moment(new Date()).format("YYYY")),
      parseInt(moment(new Date()).format("MM")) - 1,
      1
    );
    const localEndDate = new Date();
    const data = await getCustoDiario(id, localStartDate, localEndDate);
    setStartDate(localStartDate);
    setEndDate(localEndDate);
    setData(data);
    setLoading(false);
  };

  const filterByProject = async () => {
    setLoading(false);

    const data = await getCustoDiario(id, startDate, endDate);
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    getCustosDiariosInicial();
  }, [id]);

  const onChange = (dates: [any, any]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const toggleAcordion = (id: number) => {
    const elements = document.getElementsByClassName("item2-" + id);
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.toggle("hide");
    }
  };

  const tableData = data.map((dia, key) => (
    <>
      <Tr background={"origem.200"} key={dia.id}>
        <Td>{dia.index}</Td>
        <Td onClick={() => toggleAcordion(key)}>
          <Flex alignItems={"center"} justifyContent="space-between">
            <Moment format="DD/MM/YYYY">{dia.date}</Moment>
            <FiChevronDown size={"18px"} />{" "}
          </Flex>
        </Td>
        <Td>{dia.fornecedor}</Td>
        <Td align="center">{formatReal(dia.realizado)} </Td>
      </Tr>
      {dia.filhos &&
        dia.filhos.map((filho) => (
          <Tr className={"hide item2-" + key} key={"f" + filho.id}>
            <Td>{filho.index}</Td>
            <Td>{filho.atividade}</Td>
            <Td>{filho.fornecedor}</Td>
            <Td textAlign="center">
              <Flex alignItems={"center"} justifyContent="center">
                {formatReal(filho.realizado)}
              </Flex>
            </Td>
          </Tr>
        ))}
    </>
  ));

  return (
    <>
      <Button
        h={"56px"}
        borderRadius={"10px"}
        background={"white"}
        border={"2px solid"}
        color={"origem.500"}
        _hover={{
          border: "2px solid",
          borderColor: "origem.500",
          background: "origem.500",
          transition: "all 0.4s",
          color: "white",
        }}
        textColor={"origem.500"}
        onClick={onOpen}
      >
        Modal Custo Diário
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
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
            fontFamily={"Mulish"}
          >
            Custo Diário
          </ModalHeader>
          <ModalCloseButton color={"white"} />

          <ModalBody mt={3}>
            {!loading ? (
              <>
                <Flex
                  direction={wd > 600 ? "row" : "column"}
                  wrap={"wrap"}
                  alignItems="flex-end"
                  justify={"space-between"}
                  gap={4}
                  flex={1}
                >
                  <Flex align={"end"} gap={4} wrap={"wrap"} flex={1}>
                    <Flex direction={"column"} w={"208px"}>
                      <ReactDatePicker
                        selectsRange={true}
                        selected={startDate}
                        onChange={onChange}
                        startDate={startDate}
                        endDate={endDate}
                        locale="pt-BR"
                        dateFormat="dd/MM/yyyy"
                      />
                    </Flex>
                    <Flex flex={1}>
                      <Button
                        h={"56px"}
                        borderRadius={"8px"}
                        background={"origem.500"}
                        variant="primary"
                        color="white"
                        _hover={{
                          background: "origem.600",
                          transition: "all 0.4s",
                        }}
                        rightIcon={<BsSearch />}
                        fontWeight={"bold"}
                        onClick={filterByProject}
                      >
                        Filtrar
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>
                <TableContainer mt={4} mb={3} ml={1} borderRadius={"10px"}>
                  <Table
                    variant="striped"
                    colorScheme={"strippedGray"}
                    align={"center"}
                  >
                    <Thead>
                      <Tr background={"origem.500"} color="white">
                        <Th color={"white"}></Th>
                        <Th color={"white"}>Serviço/Compra</Th>
                        <Th color={"white"}>Fornecedor</Th>
                        <Th color={"white"}>R$ Realizado</Th>
                      </Tr>
                    </Thead>
                    {data.length ? (
                      <Tbody scrollBehavior={"smooth"}>{tableData}</Tbody>
                    ) : (
                      <Empty />
                    )}
                  </Table>
                </TableContainer>
              </>
            ) : (
              <Flex
                display={"flex"}
                align={"center"}
                justify={"center"}
                h={"90vh"}
              >
                <Ring speed={2} lineWeight={5} color="blue" size={64} />
              </Flex>
            )}
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Flex gap={2}>
              <Button
                variant="ghost"
                color="red"
                onClick={() => onClose()}
                _hover={{
                  background: "red.500",
                  transition: "all 0.4s",
                  color: "white",
                }}
              >
                Fechar
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalCustoDiario;
