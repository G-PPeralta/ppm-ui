/*
  Criado por: Bruno Fracaro
  Data de criação: 09/2022
  Descrição: Card para ser exibido na tela. Muito parecido com o card de atividades.
*/

import { Flex, Text } from "@chakra-ui/react";

import { validateDate } from "utils/validateDate";

type Atividade = {
  atividade: string;
  comp_pct: number;
  finalplanejado: string;
  id_poco: number;
  inicioplanejado: string;
  pct_plan: number;
  pct_real: number;
  qtddias: number;
  sonda: string;
  ind_alerta?: number;
  ind_status?: number;
};

type Props = {
  atividade: Atividade;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
};

function CardACT({ atividade, setRefresh, refresh }: Props) {
  const dataInicioFormatada = atividade.inicioplanejado;
  const dataFinalFormatada = atividade.finalplanejado;

  return (
    <Flex
      zIndex={1000}
      direction={"column"}
      align={"right"}
      justify={"right"}
      backgroundColor={validateDate(
        Number(atividade.pct_plan),
        Number(atividade.comp_pct),
        Number(atividade.pct_real),
        atividade.finalplanejado,
        Number(atividade.ind_alerta),
        Number(atividade.ind_status)
      )}
      px={5}
      py={3}
      borderRadius={12}
      minW={"220px"}
      gap={2}
      flex={1}
    >
      <Flex>
        <Text fontSize={"sm"} color={"white"} fontWeight={"bold"}>
          {atividade.atividade}
        </Text>
      </Flex>
      <Flex direction={"column"} w={"100%"}>
        <Flex direction={"row"} justify={"space-between"} w={"100%"}>
          <Text
            fontSize={"sm"}
            color={"white"}
            fontWeight={"bold"}
            textAlign={"start"}
            flex={1}
          >
            Data Início:
          </Text>
          <Text
            fontSize={"sm"}
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
            fontSize={"sm"}
            color={"white"}
            fontWeight={"bold"}
            textAlign={"start"}
            flex={1}
          >
            Data Fim:
          </Text>
          <Text
            fontSize={"sm"}
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
            fontSize={"sm"}
            color={"white"}
            fontWeight={"bold"}
            textAlign={"start"}
            flex={1}
          >
            Planejado:
          </Text>
          <Text
            fontSize={"sm"}
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
            fontSize={"sm"}
            color={"white"}
            fontWeight={"bold"}
            textAlign={"start"}
            flex={1}
          >
            Realizado:
          </Text>
          <Text
            fontSize={"sm"}
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
