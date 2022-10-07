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
  const dataInicioFormatada = formatDate(new Date(atividade.inicioplanejado));
  const dataFinalFormatada = formatDate(new Date(atividade.finalplanejado));
  // console.log(validateDate(dataInicioFormatada));

  return (
    <Flex
      zIndex={1000}
      direction={"column"}
      align={"right"}
      justify={"right"}
      backgroundColor={validateDate(
        Number(atividade.pct_plan),
        Number(atividade.comp_pct),
        Number(atividade.pct_real)
      )}
      px={5}
      py={3}
      borderRadius={12}
      minW={"220px"}
      gap={2}
      flex={1}
    >
      <Flex>
        <Text fontSize={"lg"} color={"white"} fontWeight={"bold"}>
          {atividade.atividade}
        </Text>
      </Flex>
      <Flex direction={"column"} w={"100%"}>
        <Flex direction={"row"} justify={"space-between"} w={"100%"}>
          <Text
            fontSize={"md"}
            color={"white"}
            fontWeight={"bold"}
            textAlign={"start"}
            flex={1}
          >
            Data Início:
          </Text>
          <Text
            fontSize={"md"}
            color={"white"}
            fontWeight={"semi-bold"}
            textAlign={"end"}
            ml={1}
            flex={1}
          >
            {dataInicioFormatada}
          </Text>
        </Flex>
        <Flex direction={"row"} justify={"space-between"} w={"100%"}>
          <Text
            fontSize={"md"}
            color={"white"}
            fontWeight={"bold"}
            textAlign={"start"}
            flex={1}
          >
            Data Fim:
          </Text>
          <Text
            fontSize={"md"}
            color={"white"}
            fontWeight={"semi-bold"}
            textAlign={"end"}
            ml={1}
            flex={1}
          >
            {dataFinalFormatada}
          </Text>
        </Flex>
        <Flex direction={"row"} justify={"space-between"} w={"100%"}>
          <Text
            fontSize={"md"}
            color={"white"}
            fontWeight={"bold"}
            textAlign={"start"}
            flex={1}
          >
            Planejado:
          </Text>
          <Text
            fontSize={"md"}
            color={"white"}
            fontWeight={"semi-bold"}
            textAlign={"end"}
            ml={1}
            flex={1}
          >
            {`${atividade.pct_plan}%`}
          </Text>
        </Flex>
        <Flex direction={"row"} justify={"space-between"} w={"100%"}>
          <Text
            fontSize={"md"}
            color={"white"}
            fontWeight={"bold"}
            textAlign={"start"}
            flex={1}
          >
            Realizado:
          </Text>
          <Text
            fontSize={"md"}
            color={"white"}
            fontWeight={"semi-bold"}
            textAlign={"end"}
            ml={1}
            flex={1}
          >
            {`${atividade.pct_real}%`}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default CardACT;
