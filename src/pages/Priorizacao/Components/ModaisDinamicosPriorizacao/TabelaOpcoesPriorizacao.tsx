//  CRIADO EM: 10/2022
//  AUTOR: Geovana Augusta.
//  DESCRIÇÃO DO ARQUIVO: Tabela mostrando as opção priorizadas

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
  Tfoot,
} from "@chakra-ui/react";

import PaginacaoTabela from "components/PaginacaoTabela";

import { getOpcoesRankings } from "services/get/Priorizacoes";

import ModalDeletarOpcaoPriorizacao from "./DeletarOpcaoPriorizacao";
import ModalEditarOpcaoPriorizacao from "./EditarOpcaoPriorizacao";

interface TableProps {
  idRanking: any;
  nomeRanking: any;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export function TabelaOpcoesPriorizacao(rankingInfos: TableProps) {
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);
  const [data, setData] = useState<any[]>([]);
  const [render, setRender] = useState(false);

  const rankingId = rankingInfos.idRanking;
  const rankingNome = rankingInfos.nomeRanking;

  const getData = async () => {
    const priorizacao = await getOpcoesRankings(rankingId);
    setData(priorizacao.data);
    setRender(!render);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1000);
  }, [rankingInfos.refresh]);

  const fromTo = {
    from,
    to,
    setFrom,
    setTo,
  };

  const header = ["ID", "Benefícios", "Nota", "Ações"];

  const footer = [""];

  if (footer && footer.length < header.length) {
    const diferenca = header.length - footer.length;
    for (let index = 0; index < diferenca; index += 1) {
      footer.push("");
    }
  }

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
          <ModalEditarOpcaoPriorizacao
            refresh={rankingInfos.refresh}
            setRefresh={rankingInfos.setRefresh}
            opcaoId={op.id}
            opcaoName={op.nom_opcao}
            idRanking={rankingInfos}
            nameRanking={rankingNome}
            initialGrade={op.num_nota}
          />
          <ModalDeletarOpcaoPriorizacao
            id={op.id}
            refresh={rankingInfos.refresh}
            setRefresh={rankingInfos.setRefresh}
          />
        </Td>
      </Tr>
    ));

  return (
    <>
      <Flex direction={"column"} w={"100%"}>
        <TableContainer mt={4} mb={3} borderRadius={"10px"}>
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
            <Tbody>{tableData}</Tbody>
            <Tfoot>
              <Tr background={"origem.500"}>
                {footer.map((item: string, index: number) => (
                  <Th color="white" key={index}>
                    {item}
                  </Th>
                ))}
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
