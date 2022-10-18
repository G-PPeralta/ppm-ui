import { Flex } from "@chakra-ui/react";

import { curveSData, ganttData, taskFildsValues } from "./data";
import GenericGantt from "./geericGantt";
import GenericCurveS from "./genericCurveS";
export function Evolucao() {
  return (
    <>
      <Flex direction={"column"} w={"100%"} gap={"24px"} marginTop={"24px"}>
        <GenericCurveS data={curveSData} />
        <GenericGantt data={ganttData} taskValues={taskFildsValues} />
      </Flex>
    </>
  );
}
