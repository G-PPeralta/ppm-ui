import { Flex, Heading } from "@chakra-ui/react";

import BotaoSetaVoltar from "components/BotaoSetaVoltar/BotaoSetaVoltar";

interface Props {
  children: string;
  botaoVoltar?: boolean;
}

function TituloPagina({ children, botaoVoltar }: Props) {
  return (
    <Flex align={"center"} mb={4}>
      {botaoVoltar && <BotaoSetaVoltar />}
      <Heading
        as="h2"
        size="md"
        fontFamily={"Mulish"}
        textAlign={"center"}
        fontSize={"24px"}
        fontWeight={"700"}
      >
        {children}
      </Heading>
    </Flex>
  );
}

export default TituloPagina;
