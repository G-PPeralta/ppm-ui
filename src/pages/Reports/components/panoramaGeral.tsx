import { Flex } from "@chakra-ui/react";
import { Gantt } from "components/Gantt";
import GraficoCurvaS from "pages/DetalhamentoProjeto/components/GraficoCurvaS";

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
