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
} from "@chakra-ui/react";

import PaginacaoTabela from "components/PaginacaoTabela";

import { getPriorizacoes } from "services/get/Priorizacoes";

import ModalPriorizacao from "../ModaisDinamicosPriorizacao/ModalPriorizacao";
import ModalDeletarPriorizacao from "./DeletarPriorizacao";

export function TabelaPriorizacao() {
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);
  const [data, setData] = useState<any[]>([]);

  const getData = async () => {
    const priorizacao = await getPriorizacoes();
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
    .map((prio) => (
      <Tr key={prio.id}>
        <Td
          width={"48px"}
          height={"56px"}
          isNumeric
          style={{
            borderBottom: "0.5px solid #A7A7A7",
            borderRight: "0.5px solid #A7A7A7",
          }}
          fontSize={"13px"}
          fontWeight={"600"}
          color={"#2D2926"}
        >
          {prio.id}
        </Td>
        <Td
          width={"600px"}
          style={{
            borderBottom: "0.5px solid #A7A7A7",
            borderRight: "0.5px solid #A7A7A7",
          }}
          fontSize={"13px"}
          fontWeight={"600"}
          color={"#2D2926"}
        >
          {prio.nom_ranking}
        </Td>
        {/* <Td
        textAlign={"center"}
        style={{
          borderBottom: "0.5px solid #A7A7A7",
          borderRight: "0.5px solid #A7A7A7",
        }}
      >
        {prio.nome_area}
      </Td> */}
        <Td
          textAlign={"center"}
          style={{
            borderBottom: "0.5px solid #A7A7A7",
            borderRight: "0.5px solid #A7A7A7",
          }}
          width={"104px"}
          height={"56px"}
        >
          <ModalPriorizacao
            nomeRanking={prio.nom_ranking}
            idRanking={prio.id}
          />
          <ModalDeletarPriorizacao />
        </Td>
      </Tr>
    ));

  return (
    <>
      <Flex direction={"column"}>
        <TableContainer mt={4} mb={4}>
          <Table
            variant="striped"
            style={{
              borderBottom: "0.5px solid #A7A7A7",
              border: "0.5px solid #A7A7A7",
            }}
          >
            <Thead>
              <Tr background="origem.500" color="white">
                <Th
                  style={{
                    borderBottom: "0.5px solid #A7A7A7",
                    borderRight: "0.5px solid #A7A7A7",
                  }}
                  width={"48px"}
                  height={"36px"}
                  color="white"
                >
                  ID
                </Th>
                <Th
                  style={{
                    borderBottom: "0.5px solid #A7A7A7",
                    borderRight: "0.5px solid #A7A7A7",
                  }}
                  width={"944px"}
                  height={"36px"}
                  color="white"
                >
                  Priorizações
                </Th>
                {/* <Th
                  textAlign={"center"}
                  style={{
                    borderBottom: "0.5px solid #A7A7A7",
                    borderRight: "0.5px solid #A7A7A7",
                  }}
                >
                  Área responsável
                </Th> */}
                <Th
                  textAlign={"center"}
                  style={{
                    borderBottom: "0.5px solid #A7A7A7",
                    borderRight: "0.5px solid #A7A7A7",
                  }}
                  width={"104px"}
                  height={"36px"}
                  color="white"
                >
                  Ações
                </Th>
              </Tr>
            </Thead>
            <Tbody>{tableData}</Tbody>
          </Table>
        </TableContainer>

        <Flex>
          <PaginacaoTabela data={data} fromTo={fromTo} />
        </Flex>
      </Flex>
    </>
  );
}
