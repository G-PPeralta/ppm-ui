import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";

import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { StatisticsTableData } from "interfaces/Services";

import Sidebar from "components/SideBar";

import ModalCadastrarSonda from "./components/ModalCadastrarSonda";
import ModalCadastroCronograma from "./components/ModalCadastroCronograma";
import ModalCadastroOperacao from "./components/ModalCadastroOperação";
import ModalCadastroPoco from "./components/ModalCadastroPoco";
import { StatisticsTable } from "./components/StatisticsTable";
import { atividades } from "./projeto";

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
        const hrs_reais = p.atividades.map((e: any) => Number(e.hrs_reais));
        const med =
          hrs_reais.reduce((a: any, b: any) => a + b, 0) / hrs_reais.length;
        const dp = Math.sqrt(
          hrs_reais
            .map((x: any) => Math.pow(x - med, 2))
            .reduce((a: any, b: any) => a + b) / hrs_reais.length
        );
        // TODO use deve ser p/ cada atividade
        const use = ["max", "min", "med", "dp"][Math.floor(Math.random() * 4)];
        newData.push({
          sonda: s.sonda,
          id_sonda: s.id_sonda,
          poco: p.poco,
          id_poco: p.id_poco,
          atividades: p.atividades,
          max: Math.max(...hrs_reais),
          min: Math.min(...hrs_reais),
          med: Math.floor(med),
          dp: Math.floor(dp),
          use,
        });
      })
    );
    return newData;
  };

  const handleGetAllData = async () => {
    // const req = await getStatisticsTasks();
    const data = atividades; // TODO set req to data
    if (!data) return;
    const newData = convertReq(data);
    setAllData(newData);
    setFilter(newData);
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
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    handleGetAllData();
  }, []);

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
                      PROJETOS
                    </Text>
                    <Input
                      h={"56px"}
                      isRequired
                      placeholder="Projeto"
                      id="name"
                      type="text"
                      name="name"
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
                  <ModalCadastrarSonda />
                  <ModalCadastroPoco />
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
                {filter && <StatisticsTable data={filter} />}
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
