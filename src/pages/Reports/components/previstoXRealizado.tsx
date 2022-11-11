import { Flex } from "@chakra-ui/react";

import CurvaS from "components/CurvaS";

import { curveSData, tableData, summaryValues } from "./data";
import { GenericTable } from "./genericTable";
import { ProjectSummary } from "./summary";

export function PrevistoXRealizado() {
  return (
    <>
      <Flex direction={"column"} w={"100%"} gap={"24px"}>
        <ProjectSummary data={summaryValues} table={false} />
        <CurvaS data={curveSData} />
        <GenericTable data={tableData} total={true} />
      </Flex>
    </>
  );
}
