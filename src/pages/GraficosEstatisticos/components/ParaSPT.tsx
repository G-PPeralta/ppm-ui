import { useEffect, useLayoutEffect, useState } from "react";
// import { FiPlus } from "react-icons/fi";

import { Box, Flex, Stack, Text, useBreakpointValue } from "@chakra-ui/react";

import StackedBarChart from "components/StackedBarChartGraphic";

import { getGraficoPorCadaSonda } from "services/get/GraficosEstatisticos";

export function GraficoSPT() {
  const [chartData, setChartData] = useState<any[]>([]);

  const dataEntries2 = [{ name: "Durações", color: "#0047BB" }];

  const reqGet = async () => {
    const res = await getGraficoPorCadaSonda();

    const newData = res.data.map((e) => ({
      key: e.nom_sonda,
      Durações: Number(e.hrs_totais),
    }));

    setChartData(newData);
  };

  useEffect(() => {
    reqGet();
  }, []);

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  const [width] = useWindowSize();
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // projectsForm.handleSubmit(e);
        }}
      >
        <Stack spacing="3">
          <Flex
            flexDirection={useBreakpointValue({
              base: "column",
              md: "column",
            })}
            gap={4}
          >
            <Flex direction={"column"}>
              <Flex>
                <Text fontSize={"24px"} fontWeight={"700"} color={"#2D2926"}>
                  Relatório para cada SPT
                </Text>
              </Flex>
            </Flex>
            <Box
              overflowX={"scroll"}
              w={innerWidth > 428 ? width * 0.7 : width * 0.85}
              display={"flex"}
              overflowY={"hidden"}
            >
              <Flex>
                <StackedBarChart
                  showY={true}
                  sizeW={1000}
                  sizeH={352}
                  data={chartData}
                  dataEntries={dataEntries2}
                  barW={56}
                />
              </Flex>
            </Box>
          </Flex>
        </Stack>
      </form>
    </>
  );
}
