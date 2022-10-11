import { useEffect, useState } from "react";

import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Flex,
  // Tfoot,
} from "@chakra-ui/react";

import PaginacaoTabela from "components/PaginacaoTabela";

import { getOpcoesRankings } from "services/get/Priorizacoes";

import ModalDeletarOpcaoPriorizacao from "./DeletarOpcaoPriorizacao";
import ModalEditarOpcaoPriorizacao from "./EditarOpcaoPriorizacao";

interface TableProps {
  idRanking: any;
  nomeRanking: any;
}

export function TabelaOpcoesPriorizacao(rankingInfos: TableProps) {
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);
  const [data, setData] = useState<any[]>([]);

  const rankingId = rankingInfos.idRanking;
  const rankingNome = rankingInfos.nomeRanking;

  const getData = async () => {
    const priorizacao = await getOpcoesRankings(rankingId);
    setData(priorizacao.data);
  };
  // console.log("data", data);

  useEffect(() => {
    getData();
  }, []);

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
        <Td textAlign={"center"} fontWeight={"semibold"}>
          {op.num_nota}
        </Td>
        <Td
          width={"104px"}
          height={"56px"}
          textAlign={"center"}
          fontWeight={"semibold"}
        >
          <ModalEditarOpcaoPriorizacao
            opcaoId={op.id}
            opcaoName={op.nom_opcao}
            idRanking={rankingInfos}
            nameRanking={rankingNome}
            initialGrade={op.num_nota}
          />
          <ModalDeletarOpcaoPriorizacao />
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
          overflowX={"scroll"}
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
                  {rankingNome}
                </Th>
                <Th color="white" textAlign={"center"}>
                  Nota
                </Th>
                <Th color="white" textAlign={"center"}>
                  Ações
                </Th>
              </Tr>
            </Thead>
            <Tbody scrollBehavior={"smooth"}>{tableData}</Tbody>
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
