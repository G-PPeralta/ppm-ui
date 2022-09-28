import { Flex } from "@chakra-ui/react";

import { Gantt } from "components/Gantt";

import CurvaS from "./curvaS";

export function PanoramaGeral() {
  const data = [
    {
      mes: "Nov/2022",
      cronogramaPrevisto: 6,
      cronogramaRealizado: 30,
      capexPrevisto: 40,
      capexRealizado: 50,
    },
    {
      mes: "Dez/2021",
      cronogramaPrevisto: 60,
      cronogramaRealizado: 20,
      capexPrevisto: 35,
      capexRealizado: 50,
    },
    {
      mes: "Nov/2022",
      cronogramaPrevisto: 6,
      cronogramaRealizado: 30,
      capexPrevisto: 40,
      capexRealizado: 50,
    },
  ];

  return (
    <>
      <Flex direction={"column"} w={"100%"} gap={"2em"}>
        <CurvaS data={data} />
        <Gantt />
      </Flex>
    </>
  );
}
