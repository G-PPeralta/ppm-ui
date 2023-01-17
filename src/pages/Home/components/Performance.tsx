//  CRIADO EM: 6/2022
//  AUTOR: Bruno Fracaro, Geovana Augusta.
//  DESCRIÇÃO DO ARQUIVO: Cards de performance dashboard.

import { useEffect, useState } from "react";

import {
  Box,
  Flex,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

import { getProjetosPrevistoRealizado } from "services/get/Dashboard";

import BarChartGraphic from "./BarChart";
import PieChartGraphic from "./PieChartGraph";
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

export default function Performance() {
  const previstoRealizado = useGetData().slice(-6);

  return (
    <Flex flex={1} w={"80%"} align="center" justify="center" bg={"#EDF2F7"}>
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
      >
        <Flex
          bg={"white"}
          justifyContent="space-between"
          dir="column"
          w={"100%"}
        >
          <Flex
            direction={"row"}
            justify={"center"}
            align={"flex-start"}
            gap={12}
            w={"100%"}
          >
            <Flex direction={"column"}>
              <Text
                sx={{
                  fontSize: 24,
                  fontWeight: "700",
                  fontFamily: "Mulish",
                  width: "100%",
                  textAlign: "flex-end",
                }}
                color="black"
              >
                Performance
              </Text>
              <Flex mt={10} w={"100%"} flex={1}>
                <PieChartGraphic />
              </Flex>
            </Flex>
            <Flex direction={"column"} mb={20}>
              <Text
                sx={{
                  fontSize: 24,
                  fontWeight: "700",
                  fontFamily: "Mulish",
                  width: "100%",
                  textAlign: "flex-start",
                }}
                color="black"
              >
                Últimos 6 Meses
              </Text>
              <Flex mt={30} mb={-20} ml={-10} w={"100%"}>
                <BarChartGraphic data={previstoRealizado} />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
