import { Flex } from "@chakra-ui/react";

import GraficoCurvaS from "pages/DetalhamentoProjeto/components/GraficoCurvaS";

import { Gantt } from "components/Gantt";

export function PanoramaGeral() {
  return (
    <>
      <Flex direction={"column"} w={"100%"}>
        <GraficoCurvaS />
        <Gantt />
      </Flex>
    </>
  );
}
