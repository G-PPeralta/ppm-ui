import { useNavigate } from "react-router-dom";

import { Flex, Heading, Text } from "@chakra-ui/react";

// import { formatDate } from "utils/formatDate";
import { validateDate } from "utils/validateDate";

type Poco = {
  id?: number;
  comp_pct: number;
  finalplanejado: string;
  id_campanha: number;
  id_poco: number;
  inicioplanejado: string;
  pct_plan: string;
  pct_real: string;
  poco: string;
  sonda: string;
  ind_alerta?: number;
  ind_status?: number;
};

type Props = {
  poco: Poco;
  index: number;
};

function CardPIR({ poco, index }: Props) {
  const navigate = useNavigate();
  const dataInicioFormatada = poco.inicioplanejado;
  const dataFimFormatada = poco.finalplanejado;
  // const dataInicioFormatada = formatDate(new Date(poco.inicioplanejado));
  // const dataFimFormatada = formatDate(new Date(poco.finalplanejado));

  const intervencaoFoiIniciada = index === 0 && poco.pct_real !== "0";

  const transfer = () => {
    navigate(`/campanhas/atividade/${poco.id}`, {
      state: {
        poco,
        intervencaoFoiIniciada,
      },
    });
  };

  // console.log("poco", poco);

  return (
    <>
      <Flex direction={"row"} gap={4} onClick={() => transfer()}>
        <Flex align={"center"} justify={"center"}>
          <Heading as="h3" size="sm" textAlign={"center"} width={"60px"}>
            {intervencaoFoiIniciada ? "Atual" : `${index + 1}º`}
          </Heading>
        </Flex>
        <Flex
          direction={"column"}
          align={"center"}
          justify={"center"}
          backgroundColor={validateDate(
            Number(poco.pct_plan),
            Number(poco.comp_pct),
            Number(poco.pct_real),
            poco.finalplanejado,
            Number(poco.ind_alerta),
            Number(poco.ind_status)
          )}
          px={5}
          py={3}
          borderRadius={12}
          _hover={{
            cursor: "pointer",
          }}
          gap={2}
          minW={"220px"}
        >
          <Flex>
            <Text
              fontSize={"sm"}
              color={poco.ind_alerta === 1 ? "#000000" : "#FEFEFE"}
              fontWeight={"bold"}
            >
              {poco.poco}
            </Text>
          </Flex>
          <Flex direction={"column"} w={"100%"}>
            <Flex direction={"row"} justify={"space-between"} w={"100%"}>
              <Text
                fontSize={"sm"}
                color={poco.ind_alerta === 1 ? "#000000" : "#FEFEFE"}
                fontWeight={"bold"}
                textAlign={"start"}
                flex={1}
              >
                Data Início:
              </Text>
              <Text
                fontSize={"sm"}
                color={poco.ind_alerta === 1 ? "#000000" : "#FEFEFE"}
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
                color={poco.ind_alerta === 1 ? "#000000" : "#FEFEFE"}
                fontWeight={"bold"}
                textAlign={"start"}
                flex={1}
              >
                Data Fim:
              </Text>
              <Text
                fontSize={"sm"}
                color={poco.ind_alerta === 1 ? "#000000" : "#FEFEFE"}
                fontWeight={"semi-bold"}
                textAlign={"end"}
                ml={1}
                flex={1}
              >
                {dataFimFormatada}
              </Text>
            </Flex>
            <Flex direction={"row"} justify={"space-between"} w={"100%"}>
              <Text
                fontSize={"sm"}
                color={poco.ind_alerta === 1 ? "#000000" : "#FEFEFE"}
                fontWeight={"bold"}
                textAlign={"start"}
                flex={1}
              >
                Planejado:
              </Text>
              <Text
                fontSize={"sm"}
                color={poco.ind_alerta === 1 ? "#000000" : "#FEFEFE"}
                fontWeight={"semi-bold"}
                textAlign={"end"}
                ml={1}
                flex={1}
              >
                {`${poco.pct_plan}%`}
              </Text>
            </Flex>
            <Flex direction={"row"} justify={"space-between"} w={"100%"}>
              <Text
                fontSize={"sm"}
                color={poco.ind_alerta === 1 ? "#000000" : "#FEFEFE"}
                fontWeight={"bold"}
                textAlign={"start"}
                flex={1}
              >
                Realizado:
              </Text>
              <Text
                fontSize={"sm"}
                color={poco.ind_alerta === 1 ? "#000000" : "#FEFEFE"}
                fontWeight={"semi-bold"}
                textAlign={"end"}
                ml={1}
                flex={1}
              >
                {`${poco.pct_real}%`}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default CardPIR;
