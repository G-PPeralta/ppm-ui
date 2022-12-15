import React, { useEffect, useLayoutEffect, useState } from "react";

import {
  Box,
  Flex,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

// import PieChart from "components/PieChart";
import StackedBarChartPrevisto from "components/StackedBarChartPrevisto";

import { getProjetosPrevistoRealizado } from "services/get/Dashboard";

import Estatisticas from "./BarChartPrevisto";

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
  const [width] = useWindowSize();
  const innerWidth = window.innerWidth;

  const previstoRealizado = useGetData();

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
    <Flex w={"100%"} align="center" justify="center" bg={"#EDF2F7"}>
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
        flex={1}
        gap={4}
      >
        <Text
          mb={1}
          sx={{
            fontSize: 18,
            fontWeight: "bold",
            width: "100%",
            textAlign: "flex-start",
          }}
          color="#000000"
        >
          Previsto x Realizado
        </Text>
        <Box
          overflowX={"scroll"}
          w={innerWidth > 428 ? width * 0.7 : width * 0.85}
          h={260}
          display={"flex"}
        >
          <StackedBarChartPrevisto
            showY={true}
            sizeW={100}
            sizeH={200}
            data={previstoRealizado}
            dataEntries={dataEntries}
            barW={25}
          />
          <Flex w={"61%"} ml={10} mr={-20}>
            <Estatisticas />
          </Flex>

          <Box justifyContent={"center"}>
            <Text
              mt={2}
              mb={2}
              sx={{ fontSize: 16, fontWeight: "600" }}
              color="#000000"
            >
              %
            </Text>
            <Box
              display={"flex"}
              alignItems="center"
              w={190}
              justifyContent="space-evenly"
            >
              <Box mt={21}>
                <Box mb={2} bg={"#FEB144"} py={1} px={2}>
                  <Text
                    mb={1}
                    sx={{ fontSize: 14, fontWeight: "400" }}
                    color="#ffffff"
                  >
                    {/* {(graphPrevisto * 100).toFixed(0)}% */}
                    83%
                  </Text>
                </Box>
                <Box bg={"#9EC1CF"} py={1} px={2}>
                  <Text
                    mb={1}
                    sx={{ fontSize: 14, fontWeight: "400" }}
                    color="#ffffff"
                  >
                    {/* {(graphRealizado * 100).toFixed(0)}% */}
                    67%
                  </Text>
                </Box>
              </Box>
              {/* <PieChart size={80} data={grafData} /> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
