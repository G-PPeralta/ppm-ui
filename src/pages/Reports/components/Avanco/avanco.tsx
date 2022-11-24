import { Flex } from "@chakra-ui/react";

import CurvaS from "components/CurvaS";

import { curveSData, summaryValues, tableData } from "../data";
import { GenericTable } from "../genericTable";
import { ProjectSummary } from "./summary";

export function Avanco() {
  return (
    <>
      <Flex direction={"column"} w={"100%"} gap={"24px"}>
        <ProjectSummary data={summaryValues} table={false} />
        <CurvaS data={curveSData} />
        <GenericTable data={tableData} />
      </Flex>
    </>
  );
}
