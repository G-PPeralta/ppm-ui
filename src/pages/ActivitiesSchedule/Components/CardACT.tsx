import { Flex, Text } from "@chakra-ui/react";

import { formatDate } from "utils/formatDate";
import { validateDate } from "utils/validateDate";

// AJUSTAR TIPAGEM

// type Atividade = {
//   atividade: string;
//   data: string;
//   porcentagemFeita: string;
// };

// type Props = {
//   atividade: Atividade;
// };

// AJUSTAR TIPAGEM
function CardACT({ atividade }: any) {
  const dataFinalFormatada = formatDate(new Date(atividade.finalplanejado));
  // console.log(validateDate(dataInicioFormatada));

  return (
    <Flex
      direction={"column"}
      align={"right"}
      justify={"right"}
      // backgroundColor="#FF80D0"
      backgroundColor={validateDate(
        atividade.pct_plan,
        atividade.comp_pct,
        atividade.pct_real
      )}
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
