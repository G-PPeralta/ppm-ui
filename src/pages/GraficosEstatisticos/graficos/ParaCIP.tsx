import { useLayoutEffect, useState } from "react";
// import { FiPlus } from "react-icons/fi";

import { Box, Flex } from "@chakra-ui/react";
// import { Ring } from "@uiball/loaders";

import StackedBarChart from "components/StackedBarChartGraphic";

// import StatusIntervencao from "./StatusIntervencao";

export function GraficoCIP() {
  const dataMock2 = [
    {
      month: "Jan/2022",
      Durações: 90,
    },
    {
      month: "Fev/2022",
      Durações: 80,
    },
    {
      month: "Mar/2022",
      Durações: 70,
    },
    {
      month: "Abr/2022",
      Durações: 60,
    },
    {
      month: "Mai/2022",
      Durações: 50,
    },
    {
      month: "Jun/2022",
      Durações: 40,
    },
    {
      month: "Jul/2022",
      Durações: 30,
    },
    {
      month: "Ago/2022",
      Durações: 20,
    },
    {
      month: "Set/2022",
      Durações: 90,
    },
    {
      month: "Out/2022",
      Durações: 70,
    },
    {
      month: "Nov/2022",
      Durações: 50,
    },
    {
      month: "Dez/2022",
      Durações: 100,
    },
  ];

  const dataEntries2 = [{ name: "Durações", color: "#0047BB" }];

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
