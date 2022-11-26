import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { TabelaCentroDeCusto } from "interfaces/FinanceiroProjetos";

import Sidebar from "components/SideBar";
import TituloPagina from "components/TituloPagina";

// import { formatDate } from "utils/formatDate";

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
  const [dataInicial, setDataInicial] = useState<any>();

  const handleGetAllData = (listaCentroCustoProjetos: any) => {
    setData(listaCentroCustoProjetos);
  };

  // console.log(data);

  const handleRefresh = async () => {
    if (id) {
      const tabelaCentroDeCusto = await getCentroDeCustoProjetos(Number(id));
      const centroDeCustoFormatado =
        tabelaCentroDeCusto &&
        tabelaCentroDeCusto.data &&
        tabelaCentroDeCusto.data.centroDeCusto.map(
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

  const handleCentro = async () => {
    if (id) {
      const inicial = await getCentroDeCustoProjetos(Number(id));
      setDataInicial(inicial.data.data_inicio);
    }
  };

  useEffect(() => {
    handleCentro();
  }, []);

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
                    <TituloPagina botaoVoltar={true}>
                      Centro de Custo
                    </TituloPagina>
                  </Flex>
                  <Text
                    as="h4"
                    size="sm"
                    textAlign={"start"}
                    fontWeight={"semibold"}
                    mt={-5}
                    fontSize={"20px"}
                    ml={12}
                  >
                    {data.nomeProjeto}
                  </Text>
                </Flex>
              </Flex>
              <Flex justify={"space-between"} flex={1}>
                <ModalAdicionar
                  refreshState={refreshState}
                  idProjeto={id ? +id : 0}
                  optionsSelects={options}
                  mes={0}
                  dataInicial={dataInicial}
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
              <Tabela
                data={data.centroDeCusto}
                refreshState={refreshState}
                idProjeto={id ? +id : 0}
                optionsSelects={options}
                mes={0}
              />
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
