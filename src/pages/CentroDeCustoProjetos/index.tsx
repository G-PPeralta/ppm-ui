import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

import { Box, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import Sidebar from "components/SideBar";

import { useFinanceiroProjetos } from "hooks/useFinanceiroProjetos";

import ModalAdicionar from "./components/ModalAdicionar";
import Tabela from "./components/Tabela";

export function CentroDeCustoProjetos() {
  const [refresh, setRefresh] = useState(false);

  const refreshState = {
    refresh,
    setRefresh,
  };

  const mock = {
    idProjeto: 1, // id do projeto pai
    nomeProjeto: "Carteira de Projetos", // Nome do projeto pai
    elementoPep: "OGAL.P0029.FS", // Esse elemento Pep é o que está no pai
    centroDeCusto: [
      {
        idCusto: 1,
        prestadorDeServico: "Prestador de Serviço",
        classeDoServico: "Classe do Serviço",
        dataPagamento: "01/01/2021",
        previsto: 10000.4,
        realizado: 10000.4,
        descricaoDoServico: "Descrição do Serviço",
      },
      {
        idCusto: 2,
        prestadorDeServico: "Prestador de Serviço",
        classeDoServico: "Classe do Serviço",
        dataPagamento: "01/01/2021",
        previsto: 10000.4,
        realizado: 10000.4,
        descricaoDoServico: "Descrição do Serviço",
      },
      {
        idCusto: 3,
        prestadorDeServico: "Prestador de Serviço",
        classeDoServico: "Classe do Serviço",
        dataPagamento: "01/01/2021",
        previsto: 10000.4,
        realizado: 10000.4,
        descricaoDoServico: "Descrição do Serviço",
      },
    ],
  };
  const { loading } = useFinanceiroProjetos();
  const [data, setData] = useState<any>(mock);

  const handleGetAllData = async () => {
    setData(mock);
  };

  useEffect(() => {
    handleGetAllData();
  }, []);

  return (
    <>
      <Sidebar>
        {!loading ? (
          <Flex w={"auto"} align="center" justify="center" bg={"#EDF2F7"}>
            <Box
              py={{ base: "6", sm: "6" }}
              px={{ base: "6", sm: "8" }}
              w={"100%"}
              bg={"white"}
              borderRadius={{ base: "xl", sm: "xl" }}
            >
              <Flex mb={4} wrap={"wrap"} align={"center"} gap={2}>
                <Flex direction={"column"}>
                  <Flex align={"center"} gap={2} h={"56px"}>
                    <IconButton
                      aria-label="Botão Voltar"
                      icon={<IoIosArrowBack size={20} />}
                      borderRadius={"10px"}
                      background={"white"}
                      color={"origem.500"}
                      _hover={{
                        background: "origem.500",
                        transition: "all 0.4s",
                        color: "white",
                      }}
                      onClick={() => {
                        window.history.back();
                      }}
                    />
                    <Heading as="h3" size="md" textAlign={"center"}>
                      Centro de Custo
                    </Heading>
                  </Flex>
                  <Text
                    as="h4"
                    size="sm"
                    textAlign={"end"}
                    fontWeight={"semibold"}
                    mt={-3}
                  >
                    Carteira de Projetos
                  </Text>
                </Flex>
              </Flex>
              <Flex justify={"space-between"} flex={1}>
                <ModalAdicionar refreshState={refreshState} />
                <Flex direction={"column"} justify={"end"}>
                  <Text fontWeight={"bold"} fontSize={"12px"} color={"#949494"}>
                    ELEMENTO PEP
                  </Text>
                  <Heading as="h3" size="md">
                    {data.elementoPep}
                  </Heading>
                </Flex>
              </Flex>

              <Tabela data={data.centroDeCusto} />
            </Box>
          </Flex>
        ) : (
          <Flex display={"flex"} align={"center"} justify={"center"} h={"90vh"}>
            <Ring speed={2} lineWeight={5} color="blue" size={64} />
          </Flex>
        )}
      </Sidebar>
    </>
  );
}
