import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useParams } from "react-router-dom";

import { Box, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { TabelaCentroDeCusto } from "interfaces/FinanceiroProjetos";

import Sidebar from "components/SideBar";

import { useRequests } from "hooks/useRequests";

import { getCentroDeCustoProjetos } from "services/get/Financeiro";

import ModalAdicionar from "./components/ModalAdicionar";
import Tabela from "./components/Tabela";

export function CentroDeCustoProjetos() {
  const [refresh, setRefresh] = useState(false);

  const { id } = useParams();
  const {
    loading,
    listaCentroCustoProjetos,
    optionsFornecedores,
    optionsClassesDeServico,
  } = useRequests(Number(id));

  const refreshState = {
    refresh,
    setRefresh,
  };

  const options = {
    optionsFornecedores,
    optionsClassesDeServico,
  };

  const [data, setData] = useState<any>(listaCentroCustoProjetos);

  const handleGetAllData = (listaCentroCustoProjetos: any) => {
    setData(listaCentroCustoProjetos);
  };

  const handleRefresh = async () => {
    if (id) {
      const tabelaCentroDeCusto = await getCentroDeCustoProjetos(Number(id));
      const centroDeCustoFormatado = tabelaCentroDeCusto.data.centroDeCusto.map(
        (item: TabelaCentroDeCusto) => ({
          ...item,
          valor: Number(item.valor),
        })
      );
      const data = {
        ...tabelaCentroDeCusto.data,
        centroDeCusto: centroDeCustoFormatado,
      };

      setData(data);
    }
  };

  useEffect(() => {
    handleGetAllData(listaCentroCustoProjetos);
  }, [listaCentroCustoProjetos]);

  useEffect(() => {
    handleRefresh();
  }, [refresh]);

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
                <ModalAdicionar
                  refreshState={refreshState}
                  idProjeto={data.idProjeto}
                  optionsSelects={options}
                />
                <Flex direction={"column"} justify={"end"}>
                  <Text fontWeight={"bold"} fontSize={"12px"} color={"#949494"}>
                    ELEMENTO PEP
                  </Text>
                  <Heading as="h3" size="md">
                    {data.elementoPep ? data.elementoPep : "Não informado"}
                  </Heading>
                </Flex>
              </Flex>
              {data.centroDeCusto && (
                <Tabela
                  data={data.centroDeCusto}
                  refreshState={refreshState}
                  idProjeto={data.idProjeto}
                  optionsSelects={options}
                />
              )}
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
