import { useState } from "react";
// import { AiFillEdit } from "react-icons/ai";
// import { FaTrash } from "react-icons/fa";
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
  // IconButton,
} from "@chakra-ui/react";
import "../statistics.css";
import { StatisticsTableData } from "interfaces/Services";

import PaginacaoTabela from "components/PaginacaoTabela";

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

  return (
    <Flex direction={"column"} w={"100%"}>
      <TableContainer mt={4} mb={3} borderRadius={"10px"} overflowX={"scroll"}>
        <Table variant="striped" colorScheme={"strippedGray"}>
          <Thead>
            <Tr background={"origem.500"}>
              <Th color="white" textAlign={"center"}>
                Sonda
              </Th>
              <Th color="white" textAlign={"center"}>
                Poço
              </Th>
              <Th color="white" textAlign={"center"}></Th>
            </Tr>
          </Thead>
          <Tbody scrollBehavior={"smooth"}>
            {data ? (
              data.slice(from, to).map((projeto, key) => (
                <Tr key={key}>
                  <Td textAlign={"center"} fontWeight={"semibold"}>
                    <Link
                      to={`/estatisticas/cronograma/${projeto.id_sonda}/${projeto.id_poco}`}
                      state={{ data: projeto }}
                    >
                      <Text>{projeto.sonda}</Text>
                    </Link>
                  </Td>
                  <Td textAlign={"center"} fontWeight={"semibold"}>
                    <Link
                      to={`/estatisticas/cronograma/${projeto.id_sonda}/${projeto.id_poco}`}
                      state={{ data: projeto }}
                    >
                      <Text>{projeto.poco}</Text>
                    </Link>
                  </Td>
                  <Td textAlign={"center"} fontWeight={"semibold"}>
                    {/* <IconButton
                          aria-label="Plus sign"
                          icon={<AiFillEdit />}
                          background="white"
                          variant="secondary"
                          color="#2D2926"
                          mr={2}
                          isRound={true}
                          size="sm"
                        />
                      <IconButton
                          aria-label="Plus sign"
                          icon={<FaTrash />}
                          background="white"
                          variant="secondary"
                          color="#F94144"
                          mr={2}
                          isRound={true}
                          size="sm"
                        />
                      <EditaValorModal /> */}
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Text>Não há dados</Text>
                </Td>
              </Tr>
            )}
          </Tbody>
          <Tfoot>
            <Tr background={"origem.500"}>
              <Th color="white">Total</Th>
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
