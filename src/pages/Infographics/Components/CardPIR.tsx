import { useNavigate } from "react-router-dom";

import { Flex, Heading, Text } from "@chakra-ui/react";

import { formatDate } from "utils/formatDate";
import { validateDate } from "utils/validateDate";

// type Poco = {
//   comp_pct: number;
//   finalPlanejado: any;
//   id_campanha: number;
//   id_poco: number;
//   inicioplanejado: any;
//   pct_plan: any;
//   pct_real: any;
//   poco: string;
//   sonda: string;
// };

// type Props = {
//   poco: Poco;
//   index: number;
// };

function CardPIR({ poco, index }: any) {
  const navigate = useNavigate();
  const dataInicioFormatada = formatDate(new Date(poco.inicioplanejado));

  const transfer = () => {
    navigate(`/atividade/${poco.id}`, {
      state: {
        poco,
      },
    });
  };

  return (
    <>
      {/* A data 31/12/1969 é o valor de null no banco de dados.
      Se o valor for exatamente esse, o componente não deverá ser renderizado. */}
      <Flex direction={"row"} gap={4} onClick={() => transfer()}>
        <Flex align={"center"} justify={"center"}>
          <Heading as="h3" size="md" textAlign={"center"} width={"60px"}>
            {index === 0 ? "Atual" : `${index + 1}º`}
          </Heading>
        </Flex>
        <Flex
          direction={"column"}
          align={"center"}
          justify={"center"}
          backgroundColor={validateDate(
            Number(poco.pct_plan),
            Number(poco.comp_pct),
            Number(poco.pct_real)
          )}
          px={4}
          py={2}
          borderRadius={4}
          _hover={{
            cursor: "pointer",
          }}
          w={"150px"}
        >
          <Text fontSize={"lg"} color={"white"} fontWeight={"bold"}>
            {poco.poco}
          </Text>
          <Text
            fontSize={"md"}
            color={"white"}
            fontWeight={"semi-bold"}
            textAlign={"center"}
          >
            {dataInicioFormatada === "31/12/1969" ? "" : dataInicioFormatada}
          </Text>
          <Text
            fontSize={"md"}
            color={"white"}
            fontWeight={"semi-bold"}
            textAlign={"center"}
          >
            {poco.pct_plan === null ? "" : `Planejado: ${poco.pct_plan}%`}
          </Text>
          <Text
            fontSize={"md"}
            color={"white"}
            fontWeight={"semi-bold"}
            textAlign={"center"}
          >
            {poco.pct_plan === null ? "" : `Realizado: ${poco.pct_real}%`}
          </Text>
        </Flex>
      </Flex>
    </>
  );
}

export default CardPIR;
