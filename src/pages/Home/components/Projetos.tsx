//  CRIADO EM: 6/2022
//  AUTOR: Bruno Fracaro, Geovana Augusta.
//  DESCRIÇÃO DO ARQUIVO: Card projetos dashboard.

import { useState, useEffect } from "react";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import { Link } from "react-router-dom";

import {
  Box,
  Flex,
  Text,
  useBreakpointValue,
  useColorModeValue,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
} from "@chakra-ui/react";
import { Projetos } from "interfaces/Projetos";

import { getInfoProjetos } from "services/get/Infograficos";

export default function NaoPrevistoComponent() {
  const [projetos, setProjetos] = useState<Projetos[]>([] as Projetos[]);
  const handleGetProjetos = async () => {
    const response = await getInfoProjetos();
    setProjetos(response.data);
  };

  useEffect(() => {
    handleGetProjetos();
  }, []);

  return (
    <Flex align="center" justify="center" bg={"#EDF2F7"} flex={4} w={"100%"}>
      <Box
        py={useBreakpointValue({ base: 8, sm: 8, md: 6 })}
        px={useBreakpointValue({ base: 8, sm: 8, md: 6 })}
        w={"100%"}
        bg={"white"}
        boxShadow={{
          base: "none",
          sm: useColorModeValue("md", "md-dark"),
        }}
        borderRadius={"xl"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        flex={1}
        gap={4}
      >
        <Box w={"100%"} mb={-2}>
          <Text
            mb={3}
            sx={{
              fontSize: 18,
              fontWeight: "700",
              fontFamily: "Mulish",
              alignSelf: "center",
            }}
            color="#000000"
          >
            Projetos
          </Text>
          <TableContainer
            overflowY={"scroll"}
            overflowX={innerWidth > 428 ? "hidden" : "scroll"}
            height={220}
          >
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>ID Origem</Th>
                  <Th>Nome do Projeto</Th>
                  <Th>Orçamento</Th>
                  <Th>Polo</Th>
                  <Th>CPI</Th>
                  <Th>SPI</Th>
                </Tr>
              </Thead>
              <Tbody
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {projetos.map((projeto, index) => (
                  <Tr mt={1} key={index}>
                    <Th mr={-10} color={"#628EFD"} sx={{ fontSize: 12 }}>
                      <Text>{projeto.campo_id}</Text>
                    </Th>
                    <Th mr={-10} color={"#628EFD"} sx={{ fontSize: 12 }}>
                      <Link to={`/detalhamento/${projeto.id_projeto_real}`}>
                        <Text>{projeto.nome_projeto}</Text>
                      </Link>
                    </Th>
                    <Th color="gray.400" sx={{ fontSize: 12 }}>
                      <Flex flexGrow={1} align={"center"}>
                        <Text textAlign={"center"}>
                          {projeto.vlr_orcado
                            ? Intl.NumberFormat("pt-br", {
                                style: "currency",
                                currency: "BRL",
                              })
                                .format(projeto.vlr_orcado)
                                .toString()
                                .split(",")[0]
                            : 0}
                        </Text>
                      </Flex>
                    </Th>
                    <Th color="gray.400" sx={{ fontSize: 12 }}>
                      {projeto.polo}
                    </Th>
                    <Th>
                      {projeto.vlr_cpi == 1 ? (
                        <Box
                          w={5}
                          h={5}
                          bg={"#9FA2B4"}
                          display={"flex"}
                          flexDirection="column"
                          alignItems={"center"}
                          pt={"2px"}
                          sx={{ borderRadius: "100%" }}
                          style={{ backgroundColor: "#9EE09E" }}
                        >
                          <AiOutlineCaretUp color="white" size={14} />
                        </Box>
                      ) : (
                        <Box
                          w={5}
                          h={5}
                          bg={"#9FA2B4"}
                          display={"flex"}
                          flexDirection="column"
                          alignItems={"center"}
                          pt={"2px"}
                          sx={{ borderRadius: "100%" }}
                          style={{ backgroundColor: "#FF6663" }}
                          textAlign={"center"}
                          alignContent={"center"}
                          justifyContent={"center"}
                        >
                          <AiOutlineCaretDown color="white" size={14} />
                        </Box>
                      )}
                    </Th>

                    <Th>
                      {projeto.vlr_spi == 1 ? (
                        <Box
                          w={5}
                          h={5}
                          bg={"#9FA2B4"}
                          display={"flex"}
                          flexDirection="column"
                          alignItems={"center"}
                          pt={"2px"}
                          sx={{ borderRadius: "100%" }}
                          style={{ backgroundColor: "#9EE09E" }}
                        >
                          <AiOutlineCaretUp color="white" size={14} />
                        </Box>
                      ) : (
                        <Box
                          w={5}
                          h={5}
                          bg={"#9FA2B4"}
                          display={"flex"}
                          flexDirection="column"
                          alignItems={"center"}
                          pt={"2px"}
                          sx={{ borderRadius: "100%" }}
                          style={{ backgroundColor: "#FF6663" }}
                          textAlign={"center"}
                          alignContent={"center"}
                          justifyContent={"center"}
                        >
                          <AiOutlineCaretDown color="white" size={14} />
                        </Box>
                      )}
                    </Th>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Flex>
  );
}
