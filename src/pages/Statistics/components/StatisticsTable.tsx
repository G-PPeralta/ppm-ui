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
import "../statistics.css";
import { StatisticsTableData } from "interfaces/Services";

import PaginacaoTabela from "components/PaginacaoTabela";

import ModalDeletar from "./AtividadesCadastroCronograma/ModalDeletar";

interface Props {
  data: StatisticsTableData[] | undefined;
}

export function StatisticsTable({ data }: Props) {
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(10);

  const fromTo = {
    from,
    to,
    setFrom,
    setTo,
  };

  const formatDecimal = (pct: any) => {
    if (!pct || pct == "") return "0,00";
    const toNumber = +pct;
    return toNumber.toFixed(2).replace(".", ",");
  };

  function Body() {
    return (
      <>
        {data && data.length > 0 ? (
          data.slice(from, to).map((projeto, key) => (
            <Tr key={key}>
              <Td textAlign={"center"} fontWeight={"semibold"}>
                <Link
                  to={`/estatisticas/cronograma/${projeto.id_sonda}/${projeto.id_poco}`}
                  state={{ data: projeto }}
                >
                  <Text color="origem.500">{projeto.sonda}</Text>
                </Link>
              </Td>
              <Td textAlign={"center"} fontWeight={"semibold"}>
                <Text>{projeto.poco}</Text>
              </Td>
              <Td textAlign={"center"} fontWeight={"semibold"}>
                <Text>
                  {projeto.dat_inicio
                    ? new Date(projeto.dat_inicio || "").toLocaleString(
                        "pt-BR",
                        {
                          timeZone: "UTC",
                        }
                      )
                    : ""}
                </Text>
              </Td>
              <Td textAlign={"center"} fontWeight={"semibold"}>
                <Text>
                  {projeto.dat_final
                    ? new Date(projeto.dat_final || "").toLocaleString(
                        "pt-BR",
                        {
                          timeZone: "UTC",
                        }
                      )
                    : ""}
                </Text>
              </Td>
              <Td textAlign={"center"} fontWeight={"semibold"}>
                <Text>{formatDecimal(projeto.pct_real)}</Text>
              </Td>
              <Td textAlign={"center"} fontWeight={"semibold"}>
                <ModalDeletar id={projeto.id_sonda} />
              </Td>
            </Tr>
          ))
        ) : (
          <Tr>
            <Td textAlign={"start"} fontWeight={"semibold"}>
              <Text>Não há dados</Text>
            </Td>
          </Tr>
        )}
      </>
    );
  }

  return (
    <Flex direction={"column"} w={"100%"}>
      <TableContainer mt={4} mb={3} borderRadius={"10px"} overflowX={"scroll"}>
        <Table variant="striped" colorScheme="strippedGray">
          <Thead>
            <Tr background={"origem.500"}>
              <Th color="white" textAlign={"center"}>
                Sonda
              </Th>
              <Th color="white" textAlign={"center"}>
                Poço
              </Th>
              <Th color="white" textAlign={"center"}>
                Data Início
              </Th>
              <Th color="white" textAlign={"center"}>
                Data Fim
              </Th>
              <Th color="white" textAlign={"center"}>
                % Realizado
              </Th>
              <Th color="white" textAlign={"center"}>
                Ações
              </Th>
            </Tr>
          </Thead>
          <Tbody scrollBehavior={"smooth"}>{<Body />}</Tbody>
          <Tfoot>
            <Tr background={"origem.500"}>
              <Th color="white">Total</Th>
              <Th color="white"></Th>
              <Th color="white"></Th>
              <Th color="white"></Th>
              <Th color="white"></Th>
              <Th color="white"></Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <PaginacaoTabela data={data} fromTo={fromTo} />
    </Flex>
  );
}
