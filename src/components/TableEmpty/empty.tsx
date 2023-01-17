// CRIADO EM: 10/06/2022
// AUTOR: FELIPE MATEUS
// DESCRIÇÃO DO ARQUIVO: BODY PARA TABELA VAZIA

import { Tbody, Td, Tr } from "@chakra-ui/react";

export default function Empty() {
  return (
    <>
      <Tbody scrollBehavior={"smooth"}>
        <Tr>
          <Td textAlign="start" fontWeight={"semibold"} colSpan={6}>
            Não há dados
          </Td>
        </Tr>
      </Tbody>
    </>
  );
}
