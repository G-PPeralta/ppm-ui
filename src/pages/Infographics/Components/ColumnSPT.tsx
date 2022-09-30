import { Flex, Text } from "@chakra-ui/react";

import CardPIR from "./CardPIR";
import ModalCadastroIntervencao from "./ModalCadastroIntervencao";
import ModalEditarSPT from "./ModalEditarSPT";

type Poco = {
  comp_pct: number;
  finalplanejado: any;
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
  setRefresh: Function;
  refresh: boolean;
};

function ColumnSPT({ column, setRefresh, refresh }: Props) {
  return (
    <Flex direction={"column"} align={"center"} justify={"start"} flex={1}>
      <Flex mt={3} mb={6} alignItems={"center"}>
        <Text fontSize={"2xl"} fontWeight={"bold"} textAlign={"center"}>
          {column.sonda}
        </Text>
        <ModalEditarSPT column={column} />
      </Flex>
      <Flex
        direction={"column"}
        align={"end"}
        justify={"space-between"}
        flex={1}
      >
        <Flex
          direction={"column"}
          gap={10}
          align={"center"}
          justify={"center"}
          mb={4}
        >
          {column.pocos.map((poco, index) => {
            if (!poco.poco) {
              return (
                <Flex
                  key={index}
                  justify={"center"}
                  align={"center"}
                  h={"179px"}
                >
                  <Text
                    fontSize="lg"
                    fontWeight={"semibold"}
                    textAlign={"center"}
                    w={"220px"}
                  >
                    Não há intervenções cadastradas para essa campanha.
                  </Text>
                </Flex>
              );
            } else {
              return <CardPIR poco={poco} index={index} key={index} />;
            }
          })}
        </Flex>
        <ModalCadastroIntervencao
          data={column.pocos[column.pocos.length - 1].finalplanejado}
          idCampanha={column.id_campanha}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      </Flex>
    </Flex>
  );
}

export default ColumnSPT;
