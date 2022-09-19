import { Flex, Text } from "@chakra-ui/react";

import { formatDate } from "utils/formatDate";

type Atividade = {
  atividade: string;
  data: string;
  porcentagemFeita: string;
};

type Props = {
  atividade: Atividade;
};

function CardACT({ atividade }: Props) {
  const dataInicioFormatada = formatDate(new Date(atividade.data));
  // console.log(validateDate(dataInicioFormatada));

  return (
    <Flex
      direction={"column"}
      align={"right"}
      justify={"right"}
      backgroundColor="#FF80D0"
      px={4}
      py={2}
      borderRadius={4}
      w={"100%"}
    >
      <Flex direction={"column"}>
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
        {dataInicioFormatada}
      </Text>
      <Text
        align={"center"}
        fontSize={"sm"}
        color={"white"}
        fontWeight={"normal"}
      >
        {atividade.porcentagemFeita}
      </Text>
    </Flex>
  );
}

export default CardACT;
