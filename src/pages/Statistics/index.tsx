import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";

import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { StatisticsTableData } from "interfaces/Services";

import Sidebar from "components/SideBar";

import { getOperacoesEstatisticas } from "services/get/OperacoesEstatisticas";

import ModalCadastroCronograma from "./components/ModalCadastroCronograma";
import ModalCadastroOperacao from "./components/ModalCadastroOperação";
import { StatisticsTable } from "./components/StatisticsTable";

function Statistics() {
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState<StatisticsTableData[]>([]);
  const [filter, setFilter] = useState<StatisticsTableData[]>();
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");

  const convertReq = (payload: any): StatisticsTableData[] => {
    const newData: StatisticsTableData[] = [];
    payload.forEach((s: { id_sonda: number; sonda: string; pocos: any[] }) =>
      s.pocos.forEach((p) => {
        newData.push({
          sonda: s.sonda,
          id_sonda: s.id_sonda,
          poco: p.poco,
          id_poco: p.id_poco,
          atividades: p.atividades,
        });
      })
    );
    return newData;
  };

  const handleGetAllData = async () => {
    const { data } = await getOperacoesEstatisticas();
    // console.log("data", data);
    const newData = convertReq(data);
    setAllData(newData);
    setFilter(newData);
    setLoading(false);
  };

  const filterData = (text: string) => {
    let filtered;
    if (text && text.length > 1) {
      filtered = allData?.filter(
        (x) => x.sonda.toLowerCase().indexOf(text.toLowerCase()) > -1
      );
    } else {
      filtered = allData;
    }

    if (filtered) {
      setFilter([...filtered]);
    }
  };

  const handleClick = () => {
    filterData(search);
  };

  useEffect(() => {
    handleGetAllData();
  }, []);

  useEffect(() => {
    handleGetAllData();
  }, [refresh]);

  // console.log("filter", filter);
  // console.log("allData", allData);

  return (
    <>
      <Sidebar>
        {!loading ? (
          <Flex w={"auto"} align="center" justify="center" bg={"#EDF2F7"}>
            <Box
              py={{ base: "6", sm: "8" }}
              px={{ base: "6", sm: "8" }}
              w={"100%"}
              bg={"white"}
              borderRadius={{ base: "xl", sm: "xl" }}
            >
              <Flex justify={"space-between"} mb={5} wrap={"wrap"}>
                <Heading as="h3" size="md">
                  Projetos
                </Heading>
                <Heading as="h3" size="md" color={"origem.500"}>
                  Lixeira
                </Heading>
              </Flex>

              <Flex justify={"space-between"} wrap={"wrap"}>
                <Flex direction={"row"} flex={1} align={"end"} gap={2}>
                  <Flex direction={"column"}>
                    <Text
                      fontWeight={"bold"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      Sonda
                    </Text>
                    <Input
                      h={"56px"}
                      isRequired
                      placeholder="Sonda"
                      id="name"
                      type="text"
                      name="name"
                      maxLength={10}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </Flex>
                  <Flex>
                    <Button
                      h={"56px"}
                      borderRadius={"10px"}
                      background={"origem.500"}
                      variant="primary"
                      color="white"
                      onClick={() => handleClick()}
                      _hover={{
                        background: "origem.600",
                        transition: "all 0.4s",
                      }}
                      rightIcon={<BsSearch />}
                      fontWeight={"bold"}
                    >
                      Filtrar
                    </Button>
                  </Flex>
                </Flex>

                <Flex gap={2} flex={2} justify={"end"} align={"end"}>
                  {/* <ModalCadastrarSonda /> */}
                  {/* <ModalCadastroPoco /> */}
                  <ModalCadastroOperacao
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />

                  <ModalCadastroCronograma
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                </Flex>
              </Flex>

              <Flex flex={1}>
                <StatisticsTable data={filter} />
              </Flex>
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

export { Statistics };
