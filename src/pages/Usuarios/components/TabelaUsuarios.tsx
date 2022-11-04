import { useState } from "react";

import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Flex,
} from "@chakra-ui/react";

import PaginacaoTabela from "components/PaginacaoTabela";

export function TabelaOpcoesPriorizacao() {
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);
  const [data] = useState<any[]>([]);

  const fromTo = {
    from,
    to,
    setFrom,
    setTo,
  };

  const tableData = data
    .sort((a, b) => a.id - b.id)
    .slice(from, to)
    .map((op) => (
      <Tr key={op.id}>
        <Td textAlign={"center"} fontWeight={"semibold"}>
          {op.id}
        </Td>
        <Td textAlign={"center"} fontWeight={"semibold"}>
          {op.nom_opcao}
        </Td>
        <Td
          textAlign={"center"}
          fontWeight={"semibold"}
          width={"186px"}
          height={"56px"}
        >
          {op.num_nota}
        </Td>
        <Td
          width={"74px"}
          height={"56px"}
          textAlign={"center"}
          fontWeight={"semibold"}
        >
          ações
        </Td>
      </Tr>
    ));

  return (
    <>
      <Flex direction={"column"} w={"100%"}>
        <TableContainer
          mt={4}
          mb={3}
          borderRadius={"10px"}
          // overflowX={"scroll"}
        >
          <Table
            variant="striped"
            colorScheme={"strippedGray"}
            align={"center"}
          >
            <Thead>
              <Tr background="origem.500">
                <Th color="white" textAlign={"center"}>
                  ID
                </Th>
                <Th color="white" textAlign={"center"}>
                  xx
                </Th>
                <Th color="white" textAlign={"center"}>
                  Nota
                </Th>
                <Th color="white" textAlign={"center"}>
                  Ações
                </Th>
              </Tr>
            </Thead>
            <Tbody
            // scrollBehavior={"smooth"}
            >
              {tableData}
            </Tbody>
            {/* <Tfoot>
              <Tr background={"origem.500"}>
                <Th color="transparent">Total</Th>
                <Th></Th>
                <Th></Th>
                <Th color="transparent"></Th>
              </Tr>
            </Tfoot> */}
          </Table>
        </TableContainer>

        <Flex>
          <PaginacaoTabela data={data} fromTo={fromTo} />
        </Flex>
      </Flex>
    </>
  );
}
