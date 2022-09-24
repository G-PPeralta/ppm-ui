import { Flex, Text } from "@chakra-ui/react";

import CardPIR from "./CardPIR";
import ModalEditarSPT from "./ModalEditarSPT";

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
  id_campanha: number;
  pocos: Poco[];
};

type Props = {
  column: Column;
};

function ColumnSPT({ column }: Props) {
  return (
    <Flex direction={"column"} align={"center"} justify={"center"}>
      <Flex mt={3} mb={6} alignItems={"center"}>
        <Text fontSize={"2xl"} fontWeight={"bold"} textAlign={"center"}>
          {column.sonda}
        </Text>
        <ModalEditarSPT column={column} />
      </Flex>
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
