import { useState, useEffect } from "react";
import { AiOutlineCaretUp } from "react-icons/ai";

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
  // const [trut, setTrue] = useState(false);
  const handleGetProjetos = async () => {
    const response = await getInfoProjetos();
    // console.log('reponse', response.data);
    setProjetos(response.data);
  };

  useEffect(() => {
    handleGetProjetos();
  }, []);

  // console.log(projetos);

  // const data = {
  //   id: 1,
  //   name: "Nome do Projeto",
  //   orcament: "1.000.000",
  //   cpi: "yellow",
  //   spi: "red",
  // };
  //   {
  //     id: 2,
  //     name: 'Nome do Projeto',
  //     orcament: '1.000.000',
  //     cpi: 'green',
  //     spi: 'red',
  //   },
  //   {
  //     id: 3,
  //     name: 'Nome do Projeto',
  //     orcament: '1.000.000',
  //     cpi: 'yellow',
  //     spi: 'blue',
  //   },
  //   {
  //     id: 4,
  //     name: 'Nome do Projeto',
  //     orcament: '1.000.000',
  //     cpi: 'yellow',
  //     spi: 'red',
  //   },
  //   {
  //     id: 5,
  //     name: 'Nome do Projeto',
  //     orcament: '1.000.000',
  //     cpi: 'yellow',
  //     spi: 'red',
  //   },
  //   {
  //     id: 6,
  //     name: 'Nome do Projeto',
  //     orcament: '1.000.000',
  //     cpi: 'yellow',
  //     spi: 'red',
  //   },
  // ];

  return (
    <Flex align="center" justify="center" bg={"#EDF2F7"} flex={4}>
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
        <Box w={"100%"}>
          <Text
            mb={1}
            sx={{ fontSize: 18, fontWeight: "bold", alignSelf: "center" }}
            color="#000000"
          >
            Projetos
          </Text>
          <TableContainer
            overflowY={"scroll"}
            overflowX={"scroll"}
            height={260}
          >
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Nome do Projeto</Th>
                  <Th>Orçamento</Th>
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
                    <Th color="gray.400" sx={{ fontSize: 11 }}>
                      {projeto.id_projeto_real}
                    </Th>
                    <Th
                      color={"#628EFD"}
                      sx={{ fontSize: 11 }}
                      // onMouseOver={(event) => {
                      //   // console.log(projeto.nomeProjeto);

                      //   setTrue(true);
                      //   return projeto.nome;
                      // }}
                      // onMouseOut={() => {
                      //   setTrue(false);
                      // }}
                    >
                      <Text>{projeto.nome_projeto?.substr(0, 18) + "..."}</Text>
                    </Th>
                    {/* {trut ? <Text> {projeto.nomeProjeto}</Text> : ''} */}
                    <Th color="gray.400" sx={{ fontSize: 11 }}>
                      <Text>
                        {projeto.valor_total_previsto
                          ? Intl.NumberFormat("pt-br", {
                              style: "currency",
                              currency: "BRL",
                            })
                              .format(projeto.valor_total_previsto)
                              .toString()
                              .split(",")[0]
                          : 0}
                      </Text>
                    </Th>
                    <Th>
                      {projeto.vlr_cpi_corrigido == 1 ? (
                        <Box
                          w={5}
                          h={5}
                          bg={"#9FA2B4"}
                          display={"flex"}
                          flexDirection="column"
                          alignItems={"center"}
                          pt={"2px"}
                          sx={{ borderRadius: "100%" }}
                          style={{ backgroundColor: "#008000" }}
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
                          style={{ backgroundColor: "red" }}
                        >
                          <AiOutlineCaretUp color="white" size={14} />
                        </Box>
                      )}
                    </Th>
                    <Th>
                      {projeto.vlr_spi_corrigido == 1 ? (
                        <Box
                          w={5}
                          h={5}
                          bg={"#9FA2B4"}
                          display={"flex"}
                          flexDirection="column"
                          alignItems={"center"}
                          pt={"2px"}
                          sx={{ borderRadius: "100%" }}
                          style={{ backgroundColor: "#008000" }}
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
                          style={{ backgroundColor: "red" }}
                        >
                          <AiOutlineCaretUp color="white" size={14} />
                        </Box>
                      )}
                    </Th>
                    {/* {d.cpi == 'green' ? (
                          <Box
                            w={5}
                            h={5}
                            bg={'#93E01B'}
                            display={'flex'}
                            flexDirection="column"
                            alignItems={'center'}
                            pt={'2px'}
                            sx={{ borderRadius: '100%' }}
                          >
                            <AiOutlineCaretUp color="#ffffff" size={14} />
                          </Box>
                        ) : undefined} */}
                    {/* <Th> */}
                    {/* {d.spi == 'red' ? (
                          <Box
                            w={5}
                            h={5}
                            bg={'#F94144'}
                            display={'flex'}
                            flexDirection="column"
                            alignItems={'center'}
                            pt={'2px'}
                            sx={{ borderRadius: '100%' }}
                          >
                            <AiOutlineCaretUp color="#ffffff" size={14} />
                          </Box>
                        ) : undefined} */}
                    {/* {d.spi == 'blue' ? (
                          <Box
                            w={5}
                            h={5}
                            bg={'#2E69FD'}
                            display={'flex'}
                            flexDirection="column"
                            alignItems={'center'}
                            pt={'2px'}
                            sx={{ borderRadius: '100%' }}
                          >
                            <AiOutlineCaretUp color="#ffffff" size={14} />
                          </Box>
                        ) : undefined} */}
                    {/* </Th> */}
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
