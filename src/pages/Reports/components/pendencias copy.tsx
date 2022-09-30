import { Flex } from "@chakra-ui/react";

import { tableData } from "./data";
import { GenericTable } from "./genericTable";
import { ProjectSummary } from "./summary";

export function Pendencias() {
  return (
    <>
      <Flex direction={"column"} w={"100%"} gap={"2em"}>
        <ProjectSummary />
        <GenericTable data={tableData} />
      </Flex>
    </>
  );
}
