// import { useLayoutEffect, useState } from "react";
// import { FiPlus } from "react-icons/fi";

import { useLayoutEffect, useState } from "react";

import { Box, Flex } from "@chakra-ui/react";

import StackedBarChart from "components/StackedBarChartGraphic";

export function GraficoNPTPorPeriodoSPT() {
  const dataMock2 = [
    {
      month: "Pir-61",
      Manutenção: 10,
      "Recurso Origem": 20,
      "Recurso Cia": 10,
      "Condições Climáticas": 30,
      "Informações Técnicas": 10,
      "Aguardando Outros": 20,
    },
    {
      month: "Pir-62",
      Manutenção: 5,
      "Recurso Origem": 5,
      "Recurso Cia": 10,
      "Condições Climáticas": 50,
      "Informações Técnicas": 10,
      "Aguardando Outros": 20,
    },
    {
      month: "Pir-63",
      Manutenção: 5,
      "Recurso Origem": 5,
      "Recurso Cia": 10,
      "Condições Climáticas": 50,
      "Informações Técnicas": 10,
      "Aguardando Outros": 20,
    },
    {
      month: "Pir-64",
      Manutenção: 10,
      "Recurso Origem": 20,
      "Recurso Cia": 10,
      "Condições Climáticas": 30,
      "Informações Técnicas": 10,
      "Aguardando Outros": 20,
    },
    {
      month: "Pir-65",
      Manutenção: 10,
      "Recurso Origem": 20,
      "Recurso Cia": 10,
      "Condições Climáticas": 30,
      "Informações Técnicas": 10,
      "Aguardando Outros": 20,
    },
    {
      month: "Pir-66",
      Manutenção: 5,
      "Recurso Origem": 5,
      "Recurso Cia": 10,
      "Condições Climáticas": 50,
      "Informações Técnicas": 10,
      "Aguardando Outros": 20,
    },
    {
      month: "Pir-67",
      Manutenção: 10,
      "Recurso Origem": 20,
      "Recurso Cia": 10,
      "Condições Climáticas": 30,
      "Informações Técnicas": 10,
      "Aguardando Outros": 20,
    },
    {
      month: "Pir-68",
      Manutenção: 20,
      "Recurso Origem": 20,
      "Recurso Cia": 20,
      "Condições Climáticas": 20,
      "Informações Técnicas": 20,
      "Aguardando Outros": 20,
    },
    {
      month: "Pir-69",
      Manutenção: 5,
      "Recurso Origem": 5,
      "Recurso Cia": 10,
      "Condições Climáticas": 50,
      "Informações Técnicas": 10,
      "Aguardando Outros": 20,
    },
    {
      month: "Pir-70",
      Manutenção: 10,
      "Recurso Origem": 20,
      "Recurso Cia": 10,
      "Condições Climáticas": 30,
      "Informações Técnicas": 10,
      "Aguardando Outros": 20,
    },
    {
      month: "Pir-71",
      Manutenção: 10,
      "Recurso Origem": 10,
      "Recurso Cia": 10,
      "Condições Climáticas": 10,
      "Informações Técnicas": 10,
      "Aguardando Outros": 90,
    },
    {
      month: "Pir-72",
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
      h={460}
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
      </Flex>
    </Box>
  );
}
