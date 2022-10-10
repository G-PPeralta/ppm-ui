import React, { useLayoutEffect, useState } from "react";

import {
  Box,
  Flex,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

import PieChart from "components/PieChart";
import StackedBarChart from "components/StackedBarChart";

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

export default function PrevistoxRealizadoComponent() {
  const [width] = useWindowSize();
  const grafData = [
    {
      name: "Previsto",
      value: 50,
      color: "#93E01B",
    },
    {
      name: "Realizado",
      value: 50,
      color: "#2E69FD",
    },
  ];

  const dataMock = [
    {
      month: "Jan/22",
      Previsto: 90,
      Realizado: 10,
    },
    {
      month: "Fev/22",
      Previsto: 80,
      Realizado: 20,
    },
    {
      month: "Mar/22",
      Previsto: 70,
      Realizado: 30,
    },
    {
      month: "Abr/22",
      Previsto: 60,
      Realizado: 40,
    },
    {
      month: "Mai/22",
      Previsto: 50,
      Realizado: 50,
    },
    {
      month: "Jun/22",
      Previsto: 40,
      Realizado: 60,
    },
    {
      month: "Jul/22",
      Previsto: 30,
      Realizado: 70,
    },
    {
      month: "Ago/22",
      Previsto: 20,
      Realizado: 80,
    },
    {
      month: "Set/22",
      Previsto: 90,
      Realizado: 10,
    },
    {
      month: "Out/22",
      Previsto: 90,
      Realizado: 10,
    },
    {
      month: "Nov/22",
      Previsto: 90,
      Realizado: 10,
    },
    {
      month: "Dez/22",
      Previsto: 90,
      Realizado: 10,
    },
  ];

  const dataEntries = [
    { name: "Previsto", color: "#93E01B" },
    { name: "Realizado", color: "#2E69FD" },
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
        <Box overflowX={"scroll"} w={width * 0.7} h={260} display={"flex"}>
          <StackedBarChart
            showY={true}
            sizeW={1000}
            sizeH={200}
            data={dataMock}
            dataEntries={dataEntries}
            barW={25}
          />
          <Box ml={5}>
            <Box
              pr={5}
              display={"flex"}
              alignItems="center"
              w={195}
              justifyContent="space-between"
            >
              <Box bg={"#93E01B"} py={1} px={2}>
                <Text
                  mb={1}
                  sx={{ fontSize: 14, fontWeight: "400" }}
                  color="#ffffff"
                >
                  Previsto
                </Text>
              </Box>
              <Box bg={"#2E69FD"} py={1} px={2}>
                <Text
                  mb={1}
                  sx={{ fontSize: 14, fontWeight: "400" }}
                  color="#ffffff"
                >
                  Realizado
                </Text>
              </Box>
            </Box>
            <Text
              mt={2}
              mb={2}
              sx={{ fontSize: 16, fontWeight: "600" }}
              color="#000000"
            >
              Geral
            </Text>
            <Box
              display={"flex"}
              alignItems="center"
              w={190}
              justifyContent="space-evenly"
            >
              <Box>
                <Box mb={2} bg={"#93E01B"} py={1} px={2}>
                  <Text
                    mb={1}
                    sx={{ fontSize: 14, fontWeight: "400" }}
                    color="#ffffff"
                  >
                    50%
                  </Text>
                </Box>
                <Box bg={"#2E69FD"} py={1} px={2}>
                  <Text
                    mb={1}
                    sx={{ fontSize: 14, fontWeight: "400" }}
                    color="#ffffff"
                  >
                    50%
                  </Text>
                </Box>
              </Box>
              <PieChart size={80} data={grafData} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
