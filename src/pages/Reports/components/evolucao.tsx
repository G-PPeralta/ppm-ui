import { Flex } from "@chakra-ui/react";

import { curveSData, ganttData, taskFildsValues } from "./data";
import GenericGantt from "./geericGantt";
import GenericCurveS from "./genericCurveS";
export function Evolucao() {
  return (
    <>
      <Flex direction={"column"} w={"100%"} gap={"1.4em"} marginTop={"1.4em"}>
        <GenericCurveS data={curveSData} />
        <GenericGantt data={ganttData} taskValues={taskFildsValues} />
      </Flex>
    </>
  );
}
