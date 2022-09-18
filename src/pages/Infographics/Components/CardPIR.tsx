import { useNavigate } from "react-router-dom";

import { Flex, Heading, Text } from "@chakra-ui/react";

import { formatDate } from "utils/formatDate";
import { validateDate } from "utils/validateDate";

type Poco = {
  poco: string;
  inicioplanejado: string;
  pct_plan: number;
  comp_pct: number;
  pct_real: number;
};

type Props = {
  poco: Poco;
  index: number;
};

function CardPIR({ poco, index }: Props) {
  const navigate = useNavigate();
  // console.log('CARD', poco);
  const dataInicioFormatada = formatDate(new Date(poco.inicioplanejado));

  // const dataInicio = '2022-08-25';
  // const dataFim = '2022-08-31';
  // const diferencaMilisegundos =
  //   Number(new Date(dataFim)) - Number(new Date(dataInicio));
  // const diferencaDias = diferencaMilisegundos / (1000 * 60 * 60 * 24);

  // console.log('Quantidade dias:', diferencaDias);

  const transfer = () => {
    navigate(`/atividade/${poco.poco}`);
  };

  return (
    <Flex direction={"row"} gap={4} onClick={() => transfer()}>
      <Flex align={"center"} justify={"center"}>
        <Heading as="h3" size="md" textAlign={"center"} width={"50px"}>
          {index === 0 ? "Atual" : `${index + 1}º`}
        </Heading>
      </Flex>
      <Flex
        direction={"column"}
        align={"center"}
        justify={"center"}
        backgroundColor={validateDate(
          poco.pct_plan,
          poco.comp_pct,
          poco.pct_real
        )}
        px={4}
        py={2}
        borderRadius={4}
        _hover={{
          cursor: "pointer",
        }}
      >
        <Text fontSize={"lg"} color={"white"} fontWeight={"bold"}>
          {poco.poco}
        </Text>
        <Text fontSize={"md"} color={"white"} fontWeight={"semi-bold"}>
          {dataInicioFormatada}
        </Text>
        {/* <Text fontSize={'md'} color={'white'} fontWeight={'semi-bold'}>
          {card.porcentagem}
        </Text> */}
      </Flex>
    </Flex>
  );
}

export default CardPIR;
