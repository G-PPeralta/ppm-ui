import { useLayoutEffect, useState } from "react";
// import { FiPlus } from "react-icons/fi";

import { Box, Flex } from "@chakra-ui/react";
// import { Ring } from "@uiball/loaders";

import StackedBarChart from "components/StackedBarChartGraphic";

// import StatusIntervencao from "./StatusIntervencao";

export function GraficoSPT() {
  const dataMock2 = [
    {
      month: "Jan/2022",
      Manutenção: 10,
      "Recurso Origem": 20,
      "Recurso Cia": 10,
      "Condições Climáticas": 30,
      "Informações Técnicas": 10,
      "Aguardando Outros": 20,
    },
    {
      month: "Fev/2022",
      Manutenção: 5,
      "Recurso Origem": 5,
      "Recurso Cia": 10,
      "Condições Climáticas": 50,
      "Informações Técnicas": 10,
      "Aguardando Outros": 20,
    },
    {
      month: "Mar/2022",
      Manutenção: 5,
      "Recurso Origem": 5,
      "Recurso Cia": 10,
      "Condições Climáticas": 50,
      "Informações Técnicas": 10,
      "Aguardando Outros": 20,
    },
    {
      month: "Abr/2022",
      Manutenção: 10,
      "Recurso Origem": 20,
      "Recurso Cia": 10,
      "Condições Climáticas": 30,
      "Informações Técnicas": 10,
      "Aguardando Outros": 20,
    },
    {
      month: "Mai/2022",
      Manutenção: 10,
      "Recurso Origem": 20,
      "Recurso Cia": 10,
      "Condições Climáticas": 30,
      "Informações Técnicas": 10,
      "Aguardando Outros": 20,
    },
    {
      month: "Jun/2022",
      Manutenção: 5,
      "Recurso Origem": 5,
      "Recurso Cia": 10,
      "Condições Climáticas": 50,
      "Informações Técnicas": 10,
      "Aguardando Outros": 20,
    },
    {
      month: "Jul/2022",
      Manutenção: 10,
      "Recurso Origem": 20,
      "Recurso Cia": 10,
      "Condições Climáticas": 30,
      "Informações Técnicas": 10,
      "Aguardando Outros": 20,
    },
    {
      month: "Ago/2022",
      Manutenção: 20,
      "Recurso Origem": 20,
      "Recurso Cia": 20,
      "Condições Climáticas": 20,
      "Informações Técnicas": 20,
      "Aguardando Outros": 20,
    },
    {
      month: "Set/2022",
      Manutenção: 5,
      "Recurso Origem": 5,
      "Recurso Cia": 10,
      "Condições Climáticas": 50,
      "Informações Técnicas": 10,
      "Aguardando Outros": 20,
    },
    {
      month: "Out/2022",
      Manutenção: 10,
      "Recurso Origem": 20,
      "Recurso Cia": 10,
      "Condições Climáticas": 30,
      "Informações Técnicas": 10,
      "Aguardando Outros": 20,
    },
    {
      month: "Nov/2022",
      Manutenção: 10,
      "Recurso Origem": 10,
      "Recurso Cia": 10,
      "Condições Climáticas": 10,
      "Informações Técnicas": 10,
      "Aguardando Outros": 90,
    },
    {
      month: "Dez/2022",
      Manutenção: 10,
      "Recurso Origem": 20,
      "Recurso Cia": 10,
      "Condições Climáticas": 30,
      "Informações Técnicas": 10,
      "Aguardando Outros": 20,
    },
  ];

  const dataEntries2 = [
    { name: "Aguardando Outros", color: "#7030a0" },
    { name: "Informações Técnicas", color: "#00b0f0" },
    { name: "Condições Climáticas", color: "#00b050" },
    { name: "Recurso Cia", color: "#778bd7" },
    { name: "Recurso Origem", color: "#0047bb" },
    { name: "Manutenção", color: "#f4dd06" },
  ];

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
    <Box
      overflowX={"scroll"}
      w={innerWidth > 428 ? width * 0.7 : width * 0.85}
      display={"flex"}
      overflowY={"hidden"}
    >
      <Flex ml={"-25px"} mt={"50px"}>
        <StackedBarChart
          showY={true}
          sizeW={1000}
          sizeH={352}
          data={dataMock2}
          dataEntries={dataEntries2}
          barW={56}
        />
      </Flex>{" "}
    </Box>
  );
}
