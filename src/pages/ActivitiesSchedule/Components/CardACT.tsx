import { Flex, Text } from "@chakra-ui/react";

import { formatDate } from "utils/formatDate";
import { validateDate } from "utils/validateDate";

type Atividade = {
  atividade: string;
  comp_pct: number;
  finalplanejado: any;
  id_poco: number;
  inicioplanejado: any;
  pct_plan: number;
  pct_real: number;
  qtddias: number;
  sonda: string;
};

type Props = {
  atividade: Atividade;
};

function CardACT({ atividade }: Props) {
  const dataFinalFormatada = formatDate(new Date(atividade.finalplanejado));
  // console.log(validateDate(dataInicioFormatada));

  return (
    <Flex
      direction={"column"}
      align={"right"}
      justify={"right"}
      backgroundColor={validateDate(
        Number(atividade.pct_plan),
        Number(atividade.comp_pct),
        Number(atividade.pct_real)
      )}
      px={4}
      py={2}
      borderRadius={4}
      w={"100%"}
    >
      <Flex direction={"column"} align={"center"}>
        <Text
          display={"flex"}
          align={"center"}
          fontSize={"lg"}
          color={"white"}
          fontWeight={"bold"}
        >
          {atividade.atividade}
        </Text>
      </Flex>
      <Text
        align={"center"}
        fontSize={"sm"}
        color={"white"}
        fontWeight={"normal"}
      >
        {dataFinalFormatada}
      </Text>
      <Text
        align={"center"}
        fontSize={"sm"}
        color={"white"}
        fontWeight={"normal"}
      >
        {`Planejado: ${atividade.pct_plan} %`}
      </Text>
      <Text
        align={"center"}
        fontSize={"sm"}
        color={"white"}
        fontWeight={"normal"}
      >
        {`Realizado: ${atividade.pct_real} %`}
      </Text>
    </Flex>
  );
}

export default CardACT;
