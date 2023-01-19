//  CRIADO EM: 10/2022
//  AUTOR: Geovana Augusta.
//  DESCRIÇÃO DO ARQUIVO: Tabela que mostra toda as priorizações

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

import { getPriorizacoes } from "services/get/Priorizacoes";

import ModalPriorizacao from "../ModaisDinamicosPriorizacao/ModalPriorizacao";
import ModalDeletarPriorizacao from "./DeletarPriorizacao";

interface TableProps {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export function TabelaPriorizacao({ refresh, setRefresh }: TableProps) {
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);
  const [data, setData] = useState<any[]>([]);

  const getData = async () => {
    const priorizacao = await getPriorizacoes();
    setData(priorizacao.data);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1000);
  }, [refresh]);

  const fromTo = {
    from,
    to,
    setFrom,
    setTo,
  };

  const header = ["ID", "Priorizações", "Ações"];

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
    .map((prio) => (
      <Tr key={prio.id}>
        <Td fontWeight={"semibold"} textAlign={"center"} color={"#2D2926"}>
          {prio.id}
        </Td>
        <Td textAlign={"center"} fontWeight={"semibold"} color={"#2D2926"}>
          {prio.nom_ranking}
        </Td>
        <Td textAlign={"center"} width={"104px"} height={"56px"}>
          <ModalPriorizacao
            nomeRanking={prio.nom_ranking}
            idRanking={prio.id}
          />
          <ModalDeletarPriorizacao
            id={prio.id}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        </Td>
      </Tr>
    ));

  return (
    <>
      <Flex direction={"column"} w={"100%"}>
        <Flex direction={"column"} flex={1}>
          <TableContainer mt={4} mb={4} borderRadius={"10px"}>
            <Table variant="striped" colorScheme={"strippedGray"}>
              <Thead>
                <Tr background={"origem.500"}>
                  <Th color="white" textAlign={"center"}>
                    ID
                  </Th>
                  <Th color="white" textAlign={"center"}>
                    Priorizações
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
      </Flex>
    </>
  );
}
