import React, { useEffect, useState } from "react";

import {
  Box,
  Flex,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

// import PieChart from "components/PieChart";
// import StackedBarChartPrevisto from "components/StackedBarChartPrevisto";

import {
  getDadosPrevistoBarras,
  getProjetosPrevistoRealizado,
} from "services/get/Dashboard";

import Estatisticas from "./BarChartPrevisto";
import PrevistoNovo from "./PrevistoBarChar";

// function useWindowSize() {
//   const [size, setSize] = useState([0, 0]);
//   useLayoutEffect(() => {
//     function updateSize() {
//       setSize([window.innerWidth, window.innerHeight]);
//     }
//     window.addEventListener("resize", updateSize);
//     updateSize();
//     return () => window.removeEventListener("resize", updateSize);
//   }, []);
//   return size;
// }

function useGetData() {
  const [previstoRealizado, setPrevistoRealizado] = useState<any[]>([]);

  const loadData = async () => {
    const { data } = await getProjetosPrevistoRealizado();

    const renderPayload: any[] = [];
    data.map((val: any) =>
      renderPayload.push({
        ...val,
        Realizado: val.capexRealizado,
        Previsto: val.capexPrevisto,
      })
    );
    setPrevistoRealizado(renderPayload);
  };

  useEffect(() => {
    loadData();
  }, []);

  return previstoRealizado;
}

// interface PrevistoChart {
//   tot_previsto_percent: string;
//   tot_realizado_percent: string;
//   tot_realizado: string;
//   tot_previsto_base_periodo: string;
// }

function useGetDataBarras() {
  const [totalPrevisto, setTotalPrevisto] = useState<any[]>([]);
  const [totalPrevistoPercent, setTotalPrevistoPercent] = useState();
  const [totalRealizado, setTotalRealizado] = useState();
  const [totalRealizadoPercent, setTotalRealizadoPercent] = useState();

  const loadData = async () => {
    const { data } = await getDadosPrevistoBarras();

    setTotalPrevisto(data[0].tot_previsto_base_periodo);
    setTotalPrevistoPercent(data[0].tot_previsto_percent);
    setTotalRealizado(data[0].tot_realizado);
    setTotalRealizadoPercent(data[0].tot_realizado_percent);
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    totalPrevisto,
    totalPrevistoPercent,
    totalRealizado,
    totalRealizadoPercent,
  };
}

// function useGetGraph(previstoRealizado: any) {
//   const initialValue = 0;

//   const totalPrevisto = previstoRealizado.reduce(
//     (previousValue: number, currentValue: { capexPrevisto: number }) =>
//       previousValue + +currentValue.capexPrevisto,
//     initialValue
//   );

//   const totalRealizado = previstoRealizado.reduce(
//     (previousValue: number, currentValue: { capexRealizado: any }) =>
//       previousValue + +currentValue.capexRealizado,
//     initialValue
//   );

//   const total = totalPrevisto + totalRealizado;
//   const graphPrevisto = totalPrevisto / total || 0;
//   const graphRealizado = totalRealizado / total || 0;

//   return {
//     total,
//     graphPrevisto,
//     graphRealizado,
//   };
// }

export default function PrevistoxRealizadoComponent() {
  // const [width] = useWindowSize();
  // const innerWidth = window.innerWidth;

  const previstoRealizado = useGetData();
  const previstoXRealizadoBarras = useGetDataBarras();
  console.log("DATA", previstoXRealizadoBarras);
  // console.log(previstoRealizado);

  // const { graphPrevisto, graphRealizado } = useGetGraph(previstoRealizado);

  // const grafData = [
  //   {
  //     name: "Previsto",
  //     value: graphPrevisto,
  //     color: "#FEB144",
  //   },
  //   {
  //     name: "Realizado",
  //     value: graphRealizado,
  //     color: "#9EC1CF",
  //   },
  // ];

  const dataEntries = [
    { name: "Realizado", color: "#9EC1CF" },
    { name: "Previsto", color: "#FEB144" },
  ];

  return (
    <Flex w={"100%"} align="center" justify="center" bg={"#EDF2F7"} flex={3}>
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
        flex={3}
      >
        <Text
          mb={1}
          sx={{
            fontSize: 18,
            fontWeight: "700",
            width: "100%",
            textAlign: "flex-start",
          }}
          color="#000000"
        >
          Previsto x Realizado
        </Text>
        <Box
          overflowX={"scroll"}
          // w={"100%"}
          h={260}
          w={"100%"}
          flex={1}
          justifyContent={"center"}
        >
          {/* <StackedBarChartPrevisto
            showY={true}
            sizeW={100}
            sizeH={200}
            data={previstoRealizado}
            dataEntries={dataEntries}
            barW={25}
          /> */}

          <Flex justifyContent={"center"}>
            <PrevistoNovo dataX={previstoRealizado} dataEntries={dataEntries} />
            <Flex
              direction={"column"}
              // gap={2}
              justify={"space-between"}
              mb={50}
            >
              <Flex w={"100px"} alignSelf={"center"}>
                <Text
                  mt={4}
                  mb={2}
                  sx={{
                    flexFamily: "Mulish",
                    fontSize: 18,
                    fontWeight: "700",
                  }}
                  w={100}
                >
                  Estatísticas de Renda
                </Text>
              </Flex>
              <Flex direction={"column"}>
                <Flex
                  gap={2}
                  // align={"center"}

                  justify={"left"}
                >
                  <Flex w={"20px"} bg={"#FEB144"} h={"20px"} gap={4}></Flex>
                  <Text
                    fontSize={"16px"}
                    fontFamily={"Mulish"}
                    fontWeight={"400"}
                  >
                    Previsto
                  </Text>
                </Flex>
                <Flex
                  gap={2}
                  // align={"center"}

                  justify={"left"}
                >
                  <Flex w={"20px"} bg={"#9EC1CF"} h={"20px"} gap={4}></Flex>
                  <Text
                    fontSize={"16px"}
                    fontFamily={"Mulish"}
                    fontWeight={"400"}
                  >
                    Realizado
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex justifyContent={"center"} ml={5} mt={3}>
              <Estatisticas />
              <Box justifyContent={"center"}>
                <Box display={"flex"} alignItems="center">
                  <Flex
                    mt={87}
                    direction={"column"}
                    justifyContent={"flex-start"}
                    align={"center"}
                  >
                    <Flex justify={"center"} align={"center"}>
                      <Text
                        mb={2}
                        sx={{
                          flexFamily: "Mulish",
                          fontSize: 18,
                          fontWeight: "700",
                        }}
                        color="#000000"
                      >
                        %
                      </Text>
                    </Flex>
                    <Box
                      mb={2}
                      bg={"#FEB144"}
                      py={1}
                      px={3}
                      justifyContent={"center"}
                      flex={3}
                    >
                      <Text
                        mb={1}
                        mt={1}
                        sx={{ fontSize: 14, fontWeight: "400" }}
                        color="#ffffff"
                      >
                        {/* {(graphPrevisto * 100).toFixed(0)}% */}
                        83%
                      </Text>
                    </Box>
                    <Box bg={"#9EC1CF"} py={1} px={3}>
                      <Text
                        mb={1}
                        mt={1}
                        sx={{ fontSize: 14, fontWeight: "400" }}
                        color="#ffffff"
                      >
                        {/* {(graphRealizado * 100).toFixed(0)}% */}
                        67%
                      </Text>
                    </Box>
                  </Flex>
                  {/* <PieChart size={80} data={grafData} /> */}
                </Box>
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
