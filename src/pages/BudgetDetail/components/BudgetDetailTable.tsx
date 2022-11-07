import { FiChevronDown } from "react-icons/fi";

import "./expansiveTable.css";
// import ModalCadastrarOrcamentoPrevisto from "./ModalCadastrarOrcamentoPrevisto";
import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { BudgetDetail } from "interfaces/Budgets";

import Empty from "components/TableEmpty/empty";

import { formatReal } from "utils/formatReal";

import ModalAdicionarGestaoDeCusto from "./ModalAdicionarGestaoDeCusto";
import ModalCustoDiario from "./ModalCustoDiario";
import ModalValorPrevisto from "./ModalValorPrevisto";

interface PropsInterface {
  data: BudgetDetail[];
  toogleRender: () => void;
}

export function BudgetDetailTable(props: PropsInterface) {
  const { data, toogleRender } = props;

  //  const color = "rgb(46, 105, 253)";

  /*  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);
  const [pagAtual, setPagAtual] = useState(1);

  const rowsPerPage = 5;
  const totalRegs = data.length;
  const maxPage = Math.ceil(totalRegs / rowsPerPage);
*/

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
      <Tr background={"origem.200"} key={detail.id} color="white">
        {/* <Td>{detail.data}</Td> */}
        <Td>{detail.brt}</Td>
        <Td onClick={() => toggleAcordion(key)}>
          <Flex alignItems={"center"} justifyContent="space-between">
            {detail.projeto.nome} <FiChevronDown size={"18px"} />{" "}
          </Flex>
        </Td>
        <Td></Td>
        <Td align="center">{formatReal(detail.planejado)}</Td>
        <Td align="center">
          <ModalCustoDiario pai={detail} toogleRender={toogleRender} />
        </Td>
        <Td></Td>
      </Tr>
      {detail.filhos &&
        detail.filhos.map((filho) => (
          <Tr className={"hide item-" + key} key={filho.id}>
            {/* <Td></Td> */}
            <Td>{filho.brt}</Td>
            <Td>{filho.projeto.nome}</Td>
            <Td>{filho.fornecedor}</Td>
            <Td textAlign="center">
              <Flex alignItems={"center"} justifyContent="center">
                {formatReal(filho.planejado)}{" "}
                <ModalValorPrevisto
                  projeto={filho.projeto}
                  toogleRender={toogleRender}
                  value={filho.planejado.toFixed(2).toString() || ""}
                />
              </Flex>
            </Td>
            <Td textAlign="center">
              <Flex
                alignItems={"center"}
                justifyContent="center"
                textAlign="center"
                align="center"
              >
                <ModalCustoDiario filho={filho} toogleRender={toogleRender} />
                <ModalAdicionarGestaoDeCusto
                  projeto={filho.projeto}
                  toogleRender={toogleRender}
                />
              </Flex>
            </Td>
            <Td align="center">{filho.gap}%</Td>
          </Tr>
        ))}
    </>
  ));

  return (
    <>
      <TableContainer mt={4} mb={3} ml={1}>
        <Table>
          <Thead>
            <Tr background={"origem.500"} color="white">
              <Th colSpan={4} color={"white"} borderTopLeftRadius="10px">
                Atividade
              </Th>
              <Th borderTopRightRadius={"10px"} colSpan={2}>
                {/* <Button
                  className={"noprint"}
                  variant="outline"
                  onClick={() => window.print()}
                >
                  Imprimir
                  <IconButton
                    color={"white"}
                    backgroundColor="transparent"
                    aria-label="imprimir"
                    icon={<FiPrinter />}
                  />
                </Button> */}
              </Th>
            </Tr>
            <Tr background={"origem.500"} color="white">
              {/* <Th>Data</Th> */}
              <Th color={"white"}>BRT</Th>
              <Th color={"white"}>Serviço/Compra</Th>
              <Th color={"white"}>Fornecedor</Th>
              <Th color={"white"}>R$ Previsto</Th>
              <Th color={"white"}>R$ Realizado</Th>
              <Th color={"white"}>% Gap</Th>
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
  );
}
