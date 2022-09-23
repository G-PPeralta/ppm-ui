import { FiChevronDown, FiPrinter } from "react-icons/fi";

import {
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import { BudgetDetail } from "models/Budget.model";
import "./expansiveTable.css";

export function BudgetDetailTable(props: { data: BudgetDetail[] }) {
  const { data } = props;

  const color = "rgb(46, 105, 253)";

  /*  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);
  const [pagAtual, setPagAtual] = useState(1);

  const rowsPerPage = 5;
  const totalRegs = data.length;
  const maxPage = Math.ceil(totalRegs / rowsPerPage);
*/
  const brl = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  /* const paginate = (pag: number) => {
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
*/
  const toggleAcordion = (id: number) => {
    const elements = document.getElementsByClassName("item-" + id);
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.toggle("hide");
    }
  };

  const tableData = data.map((detail, key) => (
    <>
      <Tr backgroundColor={color} key={detail.id} color="white">
        <Td>{detail.data}</Td>
        <Td>{detail.brt}</Td>
        <Td onClick={() => toggleAcordion(key)}>
          <Flex alignItems={"center"} justifyContent="space-between">
            {detail.servico} <FiChevronDown size={"18px"} />{" "}
          </Flex>
        </Td>
        <Td></Td>
        <Td>{brl.format(detail.total)}</Td>
        <Td>{brl.format(detail.previsto)}</Td>
        <Td>{brl.format(detail.realizado)}</Td>
        <Td></Td>
      </Tr>
      {detail.filhos &&
        detail.filhos.map((filho) => (
          <Tr className={"hide item-" + key} key={filho.id}>
            <Td></Td>
            <Td>{filho.brt}</Td>
            <Td>{filho.servico}</Td>
            <Td>{filho.fornecedor}</Td>
            <Td>{brl.format(filho.total)}</Td>
            <Td>{brl.format(filho.previsto)}</Td>
            <Td>{brl.format(filho.realizado)}</Td>
            <Td align="center">{filho.gap}%</Td>
          </Tr>
        ))}
    </>
  ));

  return (
    <>
      <TableContainer mt={4} mb={3} ml={1}>
        <Table variant="unstyled">
          <Thead>
            <Tr backgroundColor={"blue"} color="white">
              <Th colSpan={6} borderTopLeftRadius="10px">
                Atividade
              </Th>
              <Th borderTopRightRadius={"10px"} colSpan={2}>
                <Text className={"noprint"}>
                  Imprimir
                  <IconButton
                    color={"white"}
                    backgroundColor="transparent"
                    aria-label="imprimir"
                    icon={<FiPrinter />}
                    onClick={() => window.print()}
                  />
                </Text>
              </Th>
            </Tr>
            <Tr backgroundColor={"blue"} color="white">
              <Th>Data</Th>
              <Th>BRT</Th>
              <Th>Serviço/Compra</Th>
              <Th>Fornecedor</Th>
              <Th>R$ Total</Th>
              <Th>R$ Previsto</Th>
              <Th>R$ Realizado</Th>
              <Th>% Gap</Th>
            </Tr>
          </Thead>
          <Tbody scrollBehavior={"smooth"}>{tableData}</Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
