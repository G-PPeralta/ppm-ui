//  CRIADO EM: 07/2022
//  AUTOR: Felipe Mateus
//  DESCRIÇÃO DO ARQUIVO: Tabela area orçamento detalhado.

import { FiChevronDown } from "react-icons/fi";

import "./expansiveTable.css";
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
  const toggleAcordion = (id: number) => {
    const elements = document.getElementsByClassName("item-" + id);
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.toggle("hide");
    }
  };

  const tableData = data.map((detail, key) => (
    <>
      <Tr background={"origem.200"} key={detail.id} color="white">
        <Td>{detail.brt}</Td>
        <Td onClick={() => toggleAcordion(key)}>
          <Flex alignItems={"center"} justifyContent="space-between">
            {detail.projeto.nome} <FiChevronDown size={"18px"} />{" "}
          </Flex>
        </Td>
        <Td textAlign="right">{formatReal(detail.planejado)}</Td>
        <Td textAlign="right">
          <ModalCustoDiario
            pai={detail}
            toogleRender={toogleRender}
            showButton={false}
          />
        </Td>
        <Td></Td>
      </Tr>
      {detail.filhos &&
        detail.filhos.map((filho) => (
          <Tr className={"hide item-" + key} key={filho.id}>
            <Td>{filho.brt}</Td>
            <Td>{filho.projeto.nome}</Td>
            <Td textAlign="right">
              <ModalValorPrevisto
                projeto={filho.projeto}
                toogleRender={toogleRender}
                value={filho.planejado.toFixed(2).toString() || ""}
              />
              {formatReal(filho.planejado)}{" "}
            </Td>
            <Td textAlign="right">
              <ModalAdicionarGestaoDeCusto
                projeto={filho.projeto}
                toogleRender={toogleRender}
              />
              <ModalCustoDiario
                filho={filho}
                toogleRender={toogleRender}
                showButton={true}
              />
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
              <Th borderTopRightRadius={"10px"} colSpan={2}></Th>
            </Tr>
            <Tr background={"origem.500"} color="white">
              {/* <Th>Data</Th> */}
              <Th color={"white"}>BRT</Th>
              <Th color={"white"}>Serviço/Compra</Th>
              {/* <Th color={"white"}>Fornecedor</Th> */}
              <Th color={"white"} textAlign="right">
                R$ Previsto
              </Th>
              <Th color={"white"} textAlign="right">
                R$ Realizado
              </Th>
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
