import { Flex, Text } from "@chakra-ui/react";

import CardPIR from "./CardPIR";

type Poco = {
  comp_pct: number;
  finalPlanejado: any;
  id_campanha: number;
  id_poco: number;
  inicioplanejado: any;
  pct_plan: any;
  pct_real: any;
  poco: string;
  sonda: string;
};

type Column = {
  sonda: string;
  pocos: Poco[];
};

type Props = {
  column: Column;
};

function ColumnSPT({ column }: Props) {
  console.log("column", column.pocos);
  return (
    <Flex direction={"column"} align={"center"} justify={"center"}>
      <Text
        fontSize={"2xl"}
        fontWeight={"bold"}
        mb={6}
        mt={3}
        textAlign={"center"}
      >
        {column.sonda}
      </Text>
      <Flex direction={"column"} gap={10} align={"center"} justify={"center"}>
        {column.pocos.map((poco, index) => {
          if (!poco.poco) {
            return <></>;
          } else {
            return <CardPIR poco={poco} index={index} key={index} />;
          }
        })}
      </Flex>
    </Flex>
  );
}

export default ColumnSPT;
