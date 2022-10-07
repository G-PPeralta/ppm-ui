import { MdModeEdit } from "react-icons/md";

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
          width="48px"
          height={"56px"}
          textAlign={"center"}
        >
          {fornecedor.id}
        </Td>
        <Td
          style={{
            borderBottom: "0.5px solid #A7A7A7",
            borderRight: "0.5px solid #A7A7A7",
          }}
          width="158px"
          height={"56px"}
        >
          {fornecedor.fornecedor}
        </Td>
        <Td
          style={{
            borderBottom: "0.5px solid #A7A7A7",
            borderRight: "0.5px solid #A7A7A7",
          }}
          width="125px"
          height={"56px"}
        >
          {fornecedor.orcamento.toLocaleString("pt-br")}
        </Td>
        <Td
          style={{
            borderBottom: "0.5px solid #A7A7A7",
            borderRight: "0.5px solid #A7A7A7",
          }}
          width="125px"
          height={"56px"}
        >
          {fornecedor.realizado.toLocaleString("pt-br")}
        </Td>
        <Td
          style={{
            borderBottom: "0.5px solid #A7A7A7",
            borderRight: "0.5px solid #A7A7A7",
          }}
          width="125px"
          height={"56px"}
        >
          {fornecedor.responsavel}
        </Td>
        <Td
          style={{
            borderBottom: "0.5px solid #A7A7A7",
            borderRight: "0.5px solid #A7A7A7",
          }}
          width="406px"
          height={"56px"}
        >
          {fornecedor.descricao}
        </Td>
        <Td
          style={{
            borderBottom: "0.5px solid #A7A7A7",
            borderRight: "0.5px solid #A7A7A7",
          }}
          width="101px"
          height={"56px"}
        >
          <IconButton
            aria-label="Plus sign"
            icon={<MdModeEdit />}
            background="white"
            variant="secondary"
            color="#0047BB"
            mr={2}
            isRound={true}
            size="sm"
            onClick={() => onEdit(fornecedor)}
            width={"18px"}
            height={"18px"}
          />
        </Td>
      </Tr>
    ));

  return (
    <TableContainer mt={4} mb={3} ml={1}>
      <Table variant="unstyled">
        <Thead>
          <Tr background="#0047BB" color="white">
            <Th
              style={{
                borderBottom: "0.5px solid #A7A7A7",
                border: "0.5px solid #A7A7A7",
              }}
              width="48px"
              height={"36px"}
              textAlign={"center"}
            >
              ID
            </Th>
            <Th
              style={{
                borderBottom: "0.5px solid #A7A7A7",
                borderRight: "0.5px solid #A7A7A7",
              }}
            >
              Fornecedor
            </Th>
            <Th
              style={{
                borderBottom: "0.5px solid #A7A7A7",
                borderRight: "0.5px solid #A7A7A7",
              }}
            >
              Orçamento
            </Th>
            <Th
              style={{
                borderBottom: "0.5px solid #A7A7A7",
                borderRight: "0.5px solid #A7A7A7",
              }}
            >
              Realizado
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
              Descrição e justificativa
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
        <Tfoot>
          <Tr background="#0047BB" color="white">
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
