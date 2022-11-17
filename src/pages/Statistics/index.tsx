import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";

import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { StatisticsTableData } from "interfaces/Services";

import ModalCadastrarSonda from "pages/Infographics/Components/ModalCadastrarSonda";
import ModalCadastroPoco from "pages/Infographics/Components/ModalCadastroPoco";

import Sidebar from "components/SideBar";

import { getOperacoesEstatisticas } from "services/get/OperacoesEstatisticas";

import ModalCadastroCronograma from "./components/ModalCadastroCronograma";
import ModalCadastroOperacao from "./components/ModalCadastroOperacao";
import { StatisticsTable } from "./components/StatisticsTable";

function Statistics() {
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState<StatisticsTableData[]>([]);
  const [filter, setFilter] = useState<StatisticsTableData[]>();
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");
  const [render, setRender] = useState(false);
  const windowInnerWidth = window.innerWidth;

  const convertReq = (payload: any): StatisticsTableData[] => {
    const newData: StatisticsTableData[] = [];
    payload.forEach((s: { id_sonda: number; sonda: string; pocos: any[] }) =>
      s.pocos.forEach((p) => {
        newData.push({
          sonda: s.sonda,
          id_sonda: s.id_sonda,
          poco: p.poco,
          id_poco: p.id_poco,
          dat_inicio: p.dat_inicio,
          dat_final: p.dat_final,
          pct_real: p.pct_real,
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

  useEffect(() => {
    setTimeout(() => {
      handleGetAllData();
    }, 1000);
  }, [render]);

  // console.log("filter", filter);
  // console.log("allData", allData);

  return (
    <>
      <Sidebar>
        {!loading ? (
          <Flex w={"auto"} align="center" justify="center" bg={"#EDF2F7"}>
            <Box
              py={{ base: "6", sm: "6" }}
              px={{ base: "6", sm: "6" }}
              w={"100%"}
              bg={"white"}
              borderRadius={{ base: "xl", sm: "xl" }}
            >
              <Flex
                justify={"space-between"}
                mb={6}
                wrap={"wrap"}
                align={"center"}
                mt={-1}
                ml={-1}
              >
                <Heading
                  fontFamily={"Mulish"}
                  fontWeight={"700"}
                  fontSize={"24px"}
                  color={"#2D2926"}
                >
                  Projetos
                </Heading>
                {/* <Heading as="h3" size="md" color={"origem.500"}>
                  Lixeira
                </Heading> */}
              </Flex>

              <Flex
                direction={windowInnerWidth > 600 ? "row" : "column"}
                wrap={"wrap"}
                alignItems="flex-end"
                justify={"space-between"}
                gap={4}
                flex={2}
              >
                <Flex align={"end"} gap={4} wrap={"wrap"} flex={1}>
                  <Flex direction={"column"} flex={1} ml={-1}>
                    <Text
                      fontWeight={"bold"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      SONDA
                    </Text>
                    <Input
                      h={"56px"}
                      _placeholder={{ color: "#949494" }}
                      fontSize={"14px"}
                      fontWeight={"400"}
                      color={"black"}
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
                      fontSize={"18px"}
                      fontWeight={"700"}
                      borderRadius={"8px"}
                      background={"origem.500"}
                      variant="primary"
                      color="white"
                      onClick={() => handleClick()}
                      _hover={{
                        background: "origem.600",
                        transition: "all 0.4s",
                      }}
                      rightIcon={<BsSearch />}
                    >
                      Filtrar
                    </Button>
                  </Flex>
                </Flex>

                <Flex
                  gap={4}
                  flex={2}
                  justify={windowInnerWidth > 600 ? "end" : "start"}
                  align={"end"}
                  wrap={"wrap"}
                >
                  <ModalCadastrarSonda
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                  <ModalCadastroPoco
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
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

              <Flex flex={1} ml={-1}>
                <StatisticsTable
                  data={filter}
                  render={render}
                  setRender={setRender}
                />
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
