import { useLayoutEffect, useState } from "react";

import { Box, Flex } from "@chakra-ui/react";

import StackedBarChart from "components/StackedBarChartGraphic";

export function GraficoPorDuracao() {
  const dataMock1 = [
    {
      month: "Pir-61",
      Durações: 90,
    },
    {
      month: "Pir-62",
      Durações: 80,
    },
    {
      month: "Pir-63",
      Durações: 70,
    },
    {
      month: "Pir-64",
      Durações: 60,
    },
    {
      month: "Pir-65",
      Durações: 50,
    },
    {
      month: "Pir-66",
      Durações: 40,
    },
    {
      month: "Pir-67",
      Durações: 30,
    },
    {
      month: "Pir-68",
      Durações: 20,
    },
    {
      month: "Pir-69",
      Durações: 90,
    },
    {
      month: "Pir-70",
      Durações: 70,
    },
    {
      month: "Pir-71",
      Durações: 50,
    },
    {
      month: "Pir-72",
      Durações: 100,
    },
  ];

  const dataEntries1 = [{ name: "Durações", color: "#0047BB" }];

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
      <Flex ml={"-25px"} mt={"15px"}>
        <StackedBarChart
          showY={true}
          sizeW={1000}
          sizeH={352}
          data={dataMock1}
          dataEntries={dataEntries1}
          barW={44}
        />
      </Flex>
    </Box>
  );
}
