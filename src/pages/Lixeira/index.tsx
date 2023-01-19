//  CRIADO EM: 9/2022
//  AUTOR: Geovana Augusta.
//  DESCRIÇÃO DO ARQUIVO: Lixeira para informações obsoletas

import { useEffect, useState } from "react";

import {
  Box,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Lixeira } from "interfaces/Lixeira";

import PaginacaoTabela from "components/PaginacaoTabela";
import Sidebar from "components/SideBar";

import { getLixeira } from "services/get/Lixeira";

import { DeleteModal } from "./ModalDeletar";
import { RestoreModal } from "./ModalRestaurar";

export function TabelaLixeira() {
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);
  const [data, setData] = useState<Lixeira[]>();
  const [render, setRender] = useState(false);

  const fromTo = {
    from,
    to,
    setFrom,
    setTo,
  };

  const getData = async () => {
    const lixeira = await getLixeira();
    setData(lixeira.data);
  };

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1000);
  }, [render]);

  useEffect(() => {
    getData();
  }, []);

  const tableData =
    data &&
    data?.length > 0 &&
    data
      .sort((a, b) => a.id - b.id)
      .slice(from, to)
      .map((row) => (
        <Tr textColor={"#2D2926"} fontWeight={"semibold"}>
          <Td textAlign={"center"}>{row.id}</Td>
          <Td textAlign={"center"}>{row.local_deletado}</Td>
          <Td textAlign={"center"}>{row.criado}</Td>
          <Td textAlign={"center"}>{row.exclusao}</Td>
          <Td textAlign={"center"}>
            <RestoreModal
              id={Number(row.id)}
              tableName={row.table_name}
              newRender={() => setRender(!render)}
            />
            <DeleteModal
              id={Number(row.id)}
              tableName={row.table_name}
              newRender={() => setRender(!render)}
            />
          </Td>
        </Tr>
      ));

  return (
    <>
      <Sidebar>
        <Box
          paddingTop={{ base: "5", sm: "10" }}
          paddingBottom={{ base: "5", sm: "10" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "white", sm: "white" }}
          boxShadow={{
            base: "none",
          }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Flex
            mt={-5}
            ml={-5}
            mr={-5}
            flexDirection={"row"}
            justify={"space-between"}
            mb={1}
            wrap={"wrap"}
          >
            <Heading
              fontFamily={"Mulish"}
              fontWeight={"700"}
              fontSize={"24px"}
              color={"#2D2926"}
            >
              Lixeira
            </Heading>
            {data && (
              <Flex direction={"column"} w={"100%"} mr={-10}>
                <TableContainer mt={4} mb={4} borderRadius={"10px"}>
                  <Table variant="striped" colorScheme={"strippedGray"}>
                    <Thead backgroundColor={"origem.300"}>
                      <Tr background={"origem.500"}>
                        <Th color="white" textAlign={"center"} w={"56px"}>
                          ID
                        </Th>
                        <Th color="white" textAlign={"center"}>
                          Item
                        </Th>
                        <Th color="white" textAlign={"center"} w={"166px"}>
                          Data de Criação
                        </Th>
                        <Th color="white" textAlign={"center"} w={"104px"}>
                          Data de Exclusão
                        </Th>
                        <Th color="white" textAlign={"center"} w={"104px"}>
                          Ações
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>{tableData}</Tbody>
                  </Table>
                </TableContainer>

                <Flex>
                  <PaginacaoTabela
                    data={data && data?.length > 0}
                    fromTo={fromTo}
                  />
                </Flex>
              </Flex>
            )}
          </Flex>
        </Box>
      </Sidebar>
    </>
  );
}
