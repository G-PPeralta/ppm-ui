// CRIADO EM: 17/10/2022
// AUTOR: EDUARDO MUCHAK
// DESCRIÇÃO DO ARQUIVO: COMPONENTE PARA EXIBIR O TÍTULO DA PÁGINA COM ESTILO PADRÃO

import { Flex, Heading, Text } from "@chakra-ui/react";

import BotaoSetaVoltar from "components/BotaoSetaVoltar/BotaoSetaVoltar";

interface Props {
  children: string;
  botaoVoltar?: boolean;
  subTitulo?: any;
}

function TituloPagina({ children, botaoVoltar, subTitulo }: Props) {
  return (
    <Flex align={"start"} mb={4} direction={"column"}>
      <Flex align={"center"} gap={2}>
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
      {subTitulo && (
        <>
          <Text
            fontFamily={"Mulish"}
            textAlign={"start"}
            fontSize={"16px"}
            fontWeight={"600"}
            ml={12}
            mt={-1}
          >
            <strong>Sonda:</strong> {subTitulo.sonda}
          </Text>
          <Text
            fontFamily={"Mulish"}
            textAlign={"start"}
            fontSize={"16px"}
            fontWeight={"600"}
            ml={12}
            mt={-1}
          >
            <strong>Poço:</strong> {subTitulo.poco}
          </Text>
        </>
      )}
    </Flex>
  );
}

export default TituloPagina;
