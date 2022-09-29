import { AiFillEdit } from "react-icons/ai";

import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  IconButton,
} from "@chakra-ui/react";

import { Fornecedor } from "../index";

type TabelaFornecedoresProps = {
  fornecedores: Fornecedor[];
  onEdit: (fornecedor: Fornecedor) => any;
};

export function TabelaFornecedores({
  fornecedores,
  onEdit,
}: TabelaFornecedoresProps) {
  const orcSum = fornecedores
    .map((forn) => forn.orcamento)
    .reduce(
      (acumulador: number, valorAtual: number) => acumulador + valorAtual,
      0
    );
  // console.log(fornecedores.map((forn) => forn.orcamento));

  const realSum = fornecedores
    .map((forn) => forn.realizado)
    .reduce(
      (acumulador: number, valorAtual: number) => acumulador + valorAtual,
      0
    );
  // console.log(realSum);

  const tableData = fornecedores
    .sort((a, b) => a.id - b.id)
    .map((fornecedor, index) => (
      <Tr key={index}>
        <Td
          isNumeric
          style={{
            borderBottom: "0.5px solid #A7A7A7",
            borderRight: "0.5px solid #A7A7A7",
            borderLeft: "0.5px solid #A7A7A7",
          }}
        >
          {fornecedor.id}
        </Td>
        <Td
          style={{
            borderBottom: "0.5px solid #A7A7A7",
            borderRight: "0.5px solid #A7A7A7",
          }}
        >
          {fornecedor.fornecedor}
        </Td>
        <Td
          style={{
            borderBottom: "0.5px solid #A7A7A7",
            borderRight: "0.5px solid #A7A7A7",
          }}
        >
          {fornecedor.orcamento.toLocaleString("pt-br")}
        </Td>
        <Td
          style={{
            borderBottom: "0.5px solid #A7A7A7",
            borderRight: "0.5px solid #A7A7A7",
          }}
        >
          {fornecedor.realizado.toLocaleString("pt-br")}
        </Td>
        <Td
          style={{
            borderBottom: "0.5px solid #A7A7A7",
            borderRight: "0.5px solid #A7A7A7",
          }}
        >
          {fornecedor.responsavel}
        </Td>
        <Td
          style={{
            borderBottom: "0.5px solid #A7A7A7",
            borderRight: "0.5px solid #A7A7A7",
          }}
        >
          {fornecedor.descricao}
        </Td>
        <Td
          style={{
            borderBottom: "0.5px solid #A7A7A7",
            borderRight: "0.5px solid #A7A7A7",
          }}
        >
          <IconButton
            aria-label="Plus sign"
            icon={<AiFillEdit />}
            background="white"
            variant="secondary"
            color="#2D2926"
            mr={2}
            isRound={true}
            size="sm"
            onClick={() => onEdit(fornecedor)}
          />
          {/* <IconButton
          aria-label="Plus sign"
          icon={<FaTrash />}
          background="white"
          variant="secondary"
          color="#F94144"
          mr={2}
          isRound={true}
          size="sm"
        /> */}

          {/* <EditaValorModal /> */}
        </Td>
      </Tr>
    ));

  return (
    <TableContainer mt={4} mb={3} ml={1}>
      <Table variant="unstyled">
        <Thead>
          <Tr background="origem.500" color="white">
            <Th>ID</Th>
            <Th>Fornecedor</Th>
            <Th>Orçamento</Th>
            <Th>Realizado</Th>
            <Th>Responsável</Th>
            <Th>Descrição e justificativa</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>{tableData}</Tbody>
        <Tfoot>
          <Tr background="origem.200" color="white">
            <Th
              style={{
                borderBottom: "0.5px solid #A7A7A7",
                borderRight: "0.5px solid #A7A7A7",
              }}
            >
              Total
            </Th>
            <Th
              style={{
                borderBottom: "0.5px solid #A7A7A7",
                borderRight: "0.5px solid #A7A7A7",
              }}
            ></Th>
            <Th
              style={{
                borderBottom: "0.5px solid #A7A7A7",
                borderRight: "0.5px solid #A7A7A7",
              }}
            >
              {orcSum.toLocaleString("pt-br")}
            </Th>
            <Th
              style={{
                borderBottom: "0.5px solid #A7A7A7",
                borderRight: "0.5px solid #A7A7A7",
              }}
            >
              {realSum.toLocaleString("pt-br")}
            </Th>
            <Th
              style={{
                borderBottom: "0.5px solid #A7A7A7",
                borderRight: "0.5px solid #A7A7A7",
              }}
            ></Th>
            <Th
              style={{
                borderBottom: "0.5px solid #A7A7A7",
                borderRight: "0.5px solid #A7A7A7",
              }}
            ></Th>
            <Th
              style={{
                borderBottom: "0.5px solid #A7A7A7",
                borderRight: "0.5px solid #A7A7A7",
              }}
            ></Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
