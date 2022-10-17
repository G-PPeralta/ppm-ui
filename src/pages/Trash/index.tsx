import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Flex,
  Heading,
  IconButton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";

import PaginacaoTabela from "components/PaginacaoTabela";
import Sidebar from "components/SideBar";

export function RegisteredList() {
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);
  const navigate = useNavigate();

  const fromTo = {
    from,
    to,
    setFrom,
    setTo,
  };

  const rows = [
    {
      id: "1",
      nome: "Projetos",
      qtd: "1000",
    },
    {
      id: "2",
      nome: "spt",
      qtd: "1000",
    },
  ];

  return (
    <>
      <Sidebar>
        <Stack>
          <Box
            paddingTop={{ base: "5", sm: "10" }}
            paddingBottom={{ base: "5", sm: "10" }}
            px={{ base: "4", sm: "10" }}
            bg={{ base: "white", sm: "white" }}
            boxShadow={{
              base: "none",
              sm: useColorModeValue("md", "md-dark"),
            }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Heading
              mb={"24px"}
              fontSize={"24px"}
              color={"#2D2926"}
              fontWeight={"700"}
              fontFamily={"Mulish"}
            >
              Lista de cadastros
            </Heading>
            <Flex direction={"column"} w={"100%"}>
              <TableContainer
                mt={4}
                mb={4}
                borderRadius={"10px"}
                overflowX={"scroll"}
              >
                <Table variant="striped" colorScheme={"strippedGray"}>
                  <Thead backgroundColor={"origem.300"}>
                    <Tr background={"origem.500"}>
                      <Th color="white" textAlign={"center"} w={"56px"}>
                        ID
                      </Th>
                      <Th color="white" textAlign={"center"}>
                        Listas
                      </Th>
                      <Th color="white" textAlign={"center"} w={"166px"}>
                        Cadastrados
                      </Th>
                      <Th color="white" textAlign={"center"} w={"104px"}>
                        Ações
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody scrollBehavior={"smooth"}>
                    {rows &&
                      rows.map((row) => (
                        <Tr textColor={"#2D2926"} fontWeight={"semibold"}>
                          <Td textAlign={"center"}>{row.id}</Td>
                          <Td>{row.nome}</Td>
                          <Td textAlign={"center"}>{row.qtd}</Td>
                          <Td textAlign={"center"}>
                            <IconButton
                              onClick={() => {
                                navigate("/actions/:" + row.id);
                              }}
                              variant="outline"
                              aria-label="open menu"
                              color={"origem.500"}
                              backgroundColor={"transparent"}
                              border={"none"}
                              textAlign={"center"}
                              _hover={{
                                backgroundColor: "origem.500",
                                color: "white",
                              }}
                              icon={<IoIosArrowForward size={"24px"} />}
                            />
                          </Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </TableContainer>

              <Flex>
                <PaginacaoTabela data={rows} fromTo={fromTo} />
              </Flex>
            </Flex>
          </Box>
        </Stack>
      </Sidebar>
    </>
  );
}
