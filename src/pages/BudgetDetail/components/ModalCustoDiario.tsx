/* eslint-disable no-nested-ternary */
import { useEffect, useState } from "react";
// import { GrAddCircle } from "react-icons/gr";
import { BsSearch } from "react-icons/bs";
// import { FiChevronDown } from "react-icons/fi";
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
  // ModalFooter,
  useDisclosure,
  Button,
  ModalCloseButton,
  TableContainer,
  Table,
  Text,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
  Input,
} from "@chakra-ui/react";
// import { Ring } from "@uiball/loaders";
import { BudgetDetail, CustoDiario } from "interfaces/Budgets";

import Empty from "components/TableEmpty/empty";

import { formatReal } from "utils/formatReal";

import { getCustoDiarioFilho, getCustoDiarioPai } from "services/get/GetBudget";

import "./modalCustoDiario.css";
import ModalDeleteCustoDiario from "./ModalDeleteCustoDiario";
import ModalEditarGestaoDeCusto from "./ModalEditarGestaoDeCusto";

function ModalCustoDiario(props: {
  filho?: BudgetDetail;
  pai?: BudgetDetail;
  toogleRender: () => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<Date | string | null>(null);
  // const [loading, setLoading] = useState(true); // Loading
  const [data, setData] = useState<CustoDiario[]>([]);
  const { filho, pai, toogleRender } = props;

  const wd = window.innerWidth;

  const getCustosDiariosInicial = async () => {
    if (filho) {
      const data = await getCustoDiarioFilho(filho.projeto.id, null, null);
      setData(data);
    } else if (pai) {
      const data = await getCustoDiarioPai(pai.projeto.id, null, null);
      setData(data);
    }
    // setLoading(false);
  };

  useEffect(() => {
    getCustosDiariosInicial();
  }, []);

  const FilterByDate = async () => {
    //  setLoading(true);
    if (filho) {
      const data = await getCustoDiarioFilho(
        filho.projeto.id,
        startDate,
        endDate
      );
      setData(data);
    } else if (pai) {
      const data = await getCustoDiarioPai(pai.projeto.id, startDate, endDate);
      setData(data);
    }
    // setLoading(false);
  };

  const closeOnSuccess = () => {
    onClose();
    toogleRender();
  };

  /* const onChange = (dates: [any, any]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  }; */

  /* const toggleAcordion = (id: number) => {
    const elements = document.getElementsByClassName("item2-" + id);
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.toggle("hide");
    }
  }; */

  const tableData = data.map((dia, key) => (
    <>
      <Tr key={dia.id}>
        <Td textAlign={"center"} fontWeight={"semibold"}>
          <Moment format="DD/MM/YYYY">{dia.date}</Moment>
        </Td>
        <Td textAlign={"center"} fontWeight={"semibold"}>
          {dia.atividade}
        </Td>
        <Td textAlign={"center"} fontWeight={"semibold"}>
          {dia.fornecedor}
        </Td>
        <Td textAlign={"center"} fontWeight={"semibold"}>
          {dia.pedido}
        </Td>
        <Td textAlign={"center"} fontWeight={"semibold"}>
          <Text className="description">{dia.txt_pedido}</Text>
        </Td>
        <Td textAlign={"center"} fontWeight={"semibold"}>
          {formatReal(dia.realizado)}{" "}
        </Td>
        <Td textAlign={"center"} fontWeight={"semibold"}>
          <ModalEditarGestaoDeCusto id={dia.id} toogleRender={closeOnSuccess} />
          <ModalDeleteCustoDiario id={dia.id} toogleRender={closeOnSuccess} />
        </Td>
      </Tr>
    </>
  ));

  return (
    <>
      <Text style={{ cursor: "pointer" }} onClick={onOpen}>
        {formatReal(filho ? filho.realizado : pai ? pai.realizado : 0)}
      </Text>

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
          >
            {/* {filho ? filho.projeto.nome : pai?.projeto.nome} */}
            Custo Diário
          </ModalHeader>
          <ModalCloseButton color={"white"} />

          <ModalBody mt={3}>
            <>
              <Flex
                direction={wd > 600 ? "row" : "column"}
                wrap={"wrap"}
                alignItems="flex-end"
                justify={"space-between"}
                flex={1}
              >
                <Flex direction={"row"}>
                  <Flex
                    align={"end"}
                    gap={3}
                    wrap={"wrap"}
                    flex={1}
                    direction={"row"}
                  >
                    <Flex direction={"column"}>
                      <Flex>
                        <Text
                          fontWeight={"700"}
                          fontSize={"12px"}
                          color={"#949494"}
                          mb={2}
                        >
                          DATA INÍCIO
                        </Text>
                      </Flex>
                      <Input
                        // placeholder="dd/mm/aaaa"
                        _placeholder={{ color: "#949494" }}
                        fontSize={"14px"}
                        fontWeight={"400"}
                        fontFamily={"Mulish"}
                        borderRadius={"8px"}
                        max="9999-12-31"
                        maxLength={1}
                        border={"1px solid #A7A7A7"}
                        mt={"-9px"}
                        width={"156px"}
                        height={"58px"}
                        id="data"
                        type="Date"
                        name="data"
                        // value={startDate}
                        onChange={(event) => setStartDate(event.target.value)}
                      />
                    </Flex>
                    <Flex direction={"column"}>
                      <Flex>
                        <Text
                          fontWeight={"bold"}
                          fontSize={"12px"}
                          color={"#949494"}
                          mb={2}
                        >
                          DATA FIM
                        </Text>
                      </Flex>
                      <Input
                        // placeholder="dd/mm/aaaa"
                        _placeholder={{ color: "#949494" }}
                        fontSize={"14px"}
                        fontWeight={"400"}
                        fontFamily={"Mulish"}
                        borderRadius={"8px"}
                        max="9999-12-31"
                        maxLength={1}
                        border={"1px solid #A7A7A7"}
                        mt={"-9px"}
                        width={"156px"}
                        height={"58px"}
                        id="data"
                        type="Date"
                        name="data"
                        // value={endDate}
                        onChange={(event) => setEndDate(event.target.value)}
                      />
                    </Flex>

                    <Flex flex={1}>
                      <Button
                        h={"57px"}
                        w={"117px"}
                        borderRadius={"8px"}
                        background={"origem.500"}
                        variant="primary"
                        color="white"
                        _hover={{
                          background: "origem.600",
                          transition: "all 0.4s",
                        }}
                        rightIcon={<BsSearch />}
                        fontSize="18px"
                        fontWeight={"700"}
                        fontFamily={"Mulish"}
                        onClick={FilterByDate}
                      >
                        Filtrar
                      </Button>
                    </Flex>
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
                      <Th color={"white"}>Data</Th>
                      <Th color={"white"}>Serviço/Compra</Th>
                      <Th color={"white"}>Fornecedor</Th>
                      <Th color={"white"}>Pedido</Th>
                      <Th color={"white"}>Texto Pedido</Th>
                      <Th color={"white"}>R$ Realizado</Th>
                      <Th color={"white"}>Ações</Th>
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
          </ModalBody>
          {/* }ModalFooter justifyContent={"center"}>
            <Flex gap={2}>
              <Button
                h={"56px"}
                borderRadius={"10px"}
                variant="ghost"
                color="red"
                _hover={{
                  background: "red.500",
                  transition: "all 0.4s",
                  color: "white",
                }}
                onClick={() => onClose()}
              >
                Fechar
              </Button>
            </Flex>
              </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalCustoDiario;
