import { Flex } from "@chakra-ui/react";

import { tableData, summaryValues } from "./data";
import { GenericTable } from "./genericTable";
import { ProjectSummary } from "./summary";

export function Pendencias() {
  return (
    <>
      <Flex direction={"column"} w={"100%"} gap={"1.4em"} marginTop={"1.4em"}>
        <ProjectSummary data={summaryValues} table={false} />
        <GenericTable data={tableData} />
      </Flex>
    </>
  );
}
