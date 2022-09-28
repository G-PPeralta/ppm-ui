import { useState, useEffect } from "react";

import {
  Box,
  Flex,
  FormControl,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { StatisticsTableData } from "interfaces/Services";

import Sidebar from "components/SideBar";

// import { getStatisticsTasks } from "services/get/StatisticsTasks";
import ModalNovoCronograma from "./components/ModalNovoCronograma";
import { StatisticsTable } from "./components/StatisticsTable";
import { atividades } from "./projeto";

function Statistics() {
  // const [op, setOp] = useState("0");
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState<StatisticsTableData[]>([]);
  const [filter, setFilter] = useState<StatisticsTableData[]>();

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
      {!loading && (
        <Sidebar>
          <Stack spacing="8">
            <Box
              py={{ base: "0", sm: "10" }}
              px={{ base: "4", sm: "10" }}
              w={"100%"}
              bg={"white"}
              // bg={useBreakpointValue({ base: "transparent", sm: "white" })}
              boxShadow={{
                base: "none",
                sm: "md-dark",
                // sm: useColorModeValue("md", "md-dark"),
              }}
              borderRadius={{ base: "none", sm: "xl" }}
            >
              <Heading as="h3" size="md" mb={5}>
                Operações
              </Heading>
              <Stack spacing="5">
                <Flex
                // flexDirection={useBreakpointValue({
                //   base: "column",
                //   md: "row",
                // })}
                >
                  <FormControl>
                    <Input
                      isRequired
                      placeholder="Operacao"
                      id="name"
                      type="text"
                      name="name"
                      onChange={(e) => filterData(e.target.value)}
                      width={300}
                    />
                  </FormControl>
                  <ModalNovoCronograma
                  // refresh={refresh}
                  // setRefresh={setRefresh}
                  />
                </Flex>
              </Stack>
              <Stack spacing="8">
                <Flex>
                  {filter && <StatisticsTable data={filter}></StatisticsTable>}
                </Flex>
              </Stack>
            </Box>
          </Stack>
        </Sidebar>
      )}
    </>
  );
}

export { Statistics };
