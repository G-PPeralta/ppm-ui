import { Flex } from "@chakra-ui/react";

import CurvaS from "components/CurvaS";

import { curveSData } from "./data";
import { Gantt } from "./Gantt";
export function Evolucao() {
  return (
    <>
      <Flex direction={"column"} w={"100%"} gap={"24px"} marginTop={"24px"}>
        <CurvaS data={curveSData} />
        <Gantt />
      </Flex>
    </>
  );
}
