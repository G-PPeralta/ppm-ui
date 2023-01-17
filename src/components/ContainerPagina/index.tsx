// CRIADO EM: 17/10/2022
// AUTOR: EDUARDO MUCHAK
// DESCRIÇÃO DO ARQUIVO: COMPONENTE PADRÃO PARA CONTAINER DE PÁGINA DENTRO DO SISTEMA, PARA PADRONIZAR O TAMANHO DE MARGENS E A COR DE FUNDO

import { Box, Flex } from "@chakra-ui/react";

function ContainerPagina({ children }: any) {
  return (
    <Flex w={"auto"} align="center" justify="center" bg={"#EDF2F7"}>
      <Box
        py={{ base: "6", sm: "6" }}
        px={{ base: "6", sm: "6" }}
        w={"100%"}
        bg={"white"}
        borderRadius={{ base: "xl", sm: "xl" }}
      >
        {children}
      </Box>
    </Flex>
  );
}

export default ContainerPagina;
