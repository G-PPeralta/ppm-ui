import { Flex } from "@chakra-ui/react";

import { curveSData } from "../data";
import GenericCurveS from "../genericCurveS";
import { Gantt } from "./Gantt";

export function PanoramaGeral() {
  return (
    <>
      <Flex direction={"column"} w={"100%"} gap={"24px"} marginTop={"24px"}>
        <GenericCurveS data={curveSData} />
        <Gantt id={24} />
      </Flex>
    </>
  );
}
