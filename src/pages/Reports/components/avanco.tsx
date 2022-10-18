import { Flex } from "@chakra-ui/react";

import { curveSData, tableData, summaryValues } from "./data";
import GenericCurveS from "./genericCurveS";
import { GenericTable } from "./genericTable";
import { ProjectSummary } from "./summary";

export function Avanco() {
  return (
    <>
      <Flex direction={"column"} w={"100%"} gap={"24px"}>
        <ProjectSummary data={summaryValues} table={false} />
        <GenericCurveS data={curveSData} />
        <GenericTable data={tableData} />
      </Flex>
    </>
  );
}
