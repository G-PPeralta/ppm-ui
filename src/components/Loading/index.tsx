// CRIADO EM: 10/01/2023
// AUTOR: EDUARDO MUCHAK
// DESCRIÇÃO DO ARQUIVO: COMPONENTE COM UM LOADING PADRÃO PARA O SISTEMA

import { Flex } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

export const Loading = () => (
  <Flex display={"flex"} align={"center"} justify={"center"} h={"90vh"}>
    <Ring speed={2} lineWeight={5} color="blue" size={64} />
  </Flex>
);
