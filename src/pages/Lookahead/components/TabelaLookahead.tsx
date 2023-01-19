//  CRIADO EM: 10/2022
//  AUTOR: Maxwell.
//  DESCRIÇÃO DO ARQUIVO: Tabela da tela lookahead

import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Text,
  Flex,
} from "@chakra-ui/react";
import { AtividadesLookahead } from "interfaces/lookahead";

import PaginacaoTabela from "components/PaginacaoTabela";

interface TableProps {
  data: AtividadesLookahead[];
  projetos: any;
}

export function TabelaLookahead(props: TableProps) {
  const { data } = props;
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);

  const total = data.length;
  const fromTo = {
    from,
    to,
    setFrom,
    setTo,
  };

  const tableData = data
    .sort((a, b) => a.id - b.id)
    .slice(from, to)
    .map((act, index) => (
      <Tr key={index}>
        <Td fontWeight={"semibold"} textAlign={"center"} color={"#2D2926"}>
          {act.id}
        </Td>
        <Td textAlign={"center"} color={"#2D2926"}>
          <Link to={`/lookahead-detalhamento/${act.id}`}>
            <Text color="blue"> {act.nom_atividade}</Text>
          </Link>
        </Td>
        <Td fontWeight={"semibold"} textAlign={"center"} color={"#2D2926"}>
          {" "}
          -{" "}
        </Td>
      </Tr>
    ));

  return (
    <>
      <Flex direction="column" width="100%">
        <TableContainer mt={4} mb={4} borderRadius="10px">
          <Table variant="striped" width="100%" colorScheme={"strippedGray"}>
            <Thead>
              <Tr background="origem.500" color="white">
                <Th color="white" textAlign={"center"}>
                  item
                </Th>
                <Th color="white" textAlign={"center"}>
                  Projeto
                </Th>
                <Th color="white" textAlign={"center"}>
                  Descrição e Justificativa
                </Th>
              </Tr>
            </Thead>
            <Tbody scrollBehavior={"smooth"}>{tableData}</Tbody>
            <Tfoot>
              <Tr backgroundColor="#0047BB" color="white">
                <Th color="white" textAlign={"center"}>
                  Total
                </Th>
                <Th color="white" textAlign={"center"}>
                  {total} Projetos
                </Th>
                <Th color="white" textAlign={"center"}></Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
        <Flex>
          <PaginacaoTabela data={data} fromTo={fromTo} />
        </Flex>
      </Flex>
    </>
  );
}
