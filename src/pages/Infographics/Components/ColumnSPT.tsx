import { Flex, Text } from "@chakra-ui/react";

import CardPIR from "./CardPIR";
import ModalCadastroIntervencao from "./ModalCadastroIntervencao";

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
  pocos: Poco[];
  id_campanha: number;
};

type OpcoesExibir = {
  exibirDataInicio: boolean;
  setExibirDataInicio: React.Dispatch<React.SetStateAction<boolean>>;
  exibirPctPlan: boolean;
  setExibirPctPlan: React.Dispatch<React.SetStateAction<boolean>>;
  exibirPctReal: boolean;
  setExibirPctReal: React.Dispatch<React.SetStateAction<boolean>>;
};

type Props = {
  column: Column;
  setRefresh: Function;
  refresh: boolean;
  opcoesExibir: OpcoesExibir;
};

function ColumnSPT({ column, setRefresh, refresh, opcoesExibir }: Props) {
  return (
    <Flex direction={"column"} align={"center"} justify={"start"} flex={1}>
      <Text
        fontSize={"2xl"}
        fontWeight={"bold"}
        mb={6}
        mt={3}
        textAlign={"center"}
      >
        {column.sonda}
      </Text>
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
              return <div key={index}></div>;
            } else {
              return (
                <CardPIR
                  poco={poco}
                  index={index}
                  key={index}
                  opcoesExibir={opcoesExibir}
                />
              );
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
