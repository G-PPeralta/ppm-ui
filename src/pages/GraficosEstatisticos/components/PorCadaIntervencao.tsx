import { useEffect, useLayoutEffect, useState } from "react";
// import { FiPlus } from "react-icons/fi";

import {
  Box,
  // Box,
  // Button,
  Flex,
  Stack,
  Text,
  useBreakpointValue,
  // useColorModeValue,
} from "@chakra-ui/react";
// import { Ring } from "@uiball/loaders";

import StackedBarChart from "components/StackedBarChartGraphic";

import { getGraficoPorCadaIntervencao } from "services/get/GraficosEstatisticos";

import StatusIntervencao from "./StatusIntervencao";

export function GraficoPorCadaIntervencao() {
  const [chartData, setChartData] = useState<any[]>([]);

  // const [listaSondas, setListaSondas] = useState<any[]>([]);

  const dataEntries2 = [
    { name: "Aguardando Outros", color: "#7030a0" },
    { name: "Informações Técnicas", color: "#00b0f0" },
    { name: "Condições Climáticas", color: "#00b050" },
    { name: "Recurso Cia", color: "#778bd7" },
    { name: "Recurso Origem", color: "#0047bb" },
    { name: "Manutenção", color: "#f4dd06" },
  ];

  const intervençoes = [
    {
      id: 4,
      status: "Manutenção 36hrs/36%",
      color: "#f4dd06",
    },
    {
      id: 2,
      status: "Recurso Origem 6hrs/6%",
      color: "#0047bb",
    },
    {
      id: 5,
      status: "Recurso Cia de Serviço 8hrs/8%",
      color: "#778bd7",
    },
    {
      id: 3,
      status: "Condições Climáticas 10hrs/10%",
      color: "#00b050",
    },
    {
      id: 1,
      status: "Informações Técnicas 23hrs/23%",
      color: "#00b0f0",
    },
    {
      id: 6,
      status: "Aguardando Outros 18hrs/18%",
      color: "#7030a0",
    },
  ];

  const reqGet = async () => {
    const res = await getGraficoPorCadaIntervencao();

    const newData = res.data.map((e) => ({
      key: e.nom_poco,
      Manutenção: Number(e.hrs_manutencao),
      "Recurso Origem": Number(e.hrs_recursos_origem),
      "Recurso Cia": Number(e.hrs_recursos_cia),
      "Condições Climáticas": Number(e.hrs_mudanca_climatica),
      "Informações Técnicas": Number(e.hrs_info_tecnicas),
      "Aguardando Outros": Number(e.hrs_outros),
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
      {/* {loading && (
          <Flex display={"flex"} align={"center"} justify={"center"} h={"90vh"}>
            <Ring speed={2} lineWeight={5} color="blue" size={64} />
          </Flex>
        )} */}
      {/* <Stack spacing="8">
        <Flex
          w={"auto"}
          align="center"
          justify="center"
          bg={useBreakpointValue({ base: "white", sm: "#EDF2F7" })}
        >
          <Box
            py={{ base: "6", sm: "8" }}
            px={{ base: "6", sm: "10" }}
            w={"100%"}
            bg={useBreakpointValue({ base: "transparent", sm: "white" })}
            boxShadow={{
              base: "none",
              sm: useColorModeValue("md", "md-dark"),
            }}
            borderRadius={{ base: "none", sm: "xl" }}
          > */}
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
                  Relatório de cada intervenção
                </Text>
              </Flex>
              <Flex direction={"row"} gap={2}>
                <Text fontSize={"20px"} fontWeight={"700"} color={"#0047BB"}>
                  TEMPO TOTAL AGUARDADO:
                </Text>
                <Text fontSize={"20px"} fontWeight={"700"} color={"#2D2926"}>
                  100 HORAS
                </Text>
              </Flex>

              <Flex gap={2} wrap={"wrap"} flex={1}>
                {intervençoes.map((status, index) => (
                  <StatusIntervencao
                    key={index}
                    status={status.status}
                    color={status.color}
                  />
                ))}
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
