//  CRIADO EM: 10/2022
//  AUTOR: Geovana Augusta.
//  DESCRIÇÃO DO ARQUIVO: Gtráfico CIP.

import { useEffect, useLayoutEffect, useState } from "react";

import { Box, Flex, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { CIP } from "interfaces/GraficoCIP";

import StackedBarChart from "components/StackedBarChartGraphic";

import { getGraficoParaCIP } from "services/get/GraficosEstatisticos";
interface Props {
  de: string;
  ate: string;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
}

interface Params {
  de: string;
  a: string;
  sonda: string;
}

export function GraficoCIP({ de, ate, refresh, setRefresh }: Props) {
  const [chartData, setChartData] = useState<CIP[]>([]);

  const dataEntries2 = [{ name: "Taxa", color: "#0047BB" }];

  const reqGet = async () => {
    const params: Params | any = {};
    if (de && ate) {
      params.de = de;
      params.a = ate;
    }
    const res = await getGraficoParaCIP(params);

    const newData = res.data.map((e) => ({
      key: e.nom_poco,
      Taxa: Number(e.taxa),
    }));

    setChartData(newData);
  };

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

  useEffect(() => {
    reqGet();
  }, [refresh]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
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
                  Relatório para a CIP
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
