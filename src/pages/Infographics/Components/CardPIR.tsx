import { useNavigate } from "react-router-dom";

import { Flex, Heading, Text } from "@chakra-ui/react";

import { formatDate } from "utils/formatDate";
import { validateDate } from "utils/validateDate";

type Poco = {
  id?: number;
  comp_pct: number;
  finalplanejado: string;
  id_campanha: number;
  id_poco: number;
  inicioplanejado: string;
  pct_plan: number;
  pct_real: number;
  poco: string;
  sonda: string;
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
  poco: Poco;
  index: number;
  opcoesExibir: OpcoesExibir;
};

function CardPIR({ poco, index, opcoesExibir }: Props) {
  const { exibirDataInicio, exibirPctPlan, exibirPctReal } = opcoesExibir;

  const navigate = useNavigate();
  const dataInicioFormatada = formatDate(new Date(poco.inicioplanejado));
  const dataFimFormatada = formatDate(new Date(poco.finalplanejado));

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
          borderRadius={12}
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
            {/* {dataInicioFormatada === "31/12/1969" ? "" : dataInicioFormatada} */}
            {exibirDataInicio ? dataInicioFormatada : dataFimFormatada}
          </Text>
          <Text
            fontSize={"md"}
            color={"white"}
            fontWeight={"semi-bold"}
            textAlign={"center"}
          >
            {/* {poco.pct_plan === null ? "" : `Planejado: ${poco.pct_plan}%`} */}
            {exibirPctPlan ? `Planejado: ${poco.pct_plan}%` : ""}
          </Text>
          <Text
            fontSize={"md"}
            color={"white"}
            fontWeight={"semi-bold"}
            textAlign={"center"}
          >
            {/* {poco.pct_plan === null ? "" : `Realizado: ${poco.pct_real}%`} */}
            {exibirPctReal ? `Realizado: ${poco.pct_real}%` : ""}
          </Text>
        </Flex>
      </Flex>
    </>
  );
}

export default CardPIR;
