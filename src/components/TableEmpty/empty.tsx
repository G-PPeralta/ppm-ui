import { Tbody, Td, Tr } from "@chakra-ui/react";

export default function Empty() {
  return (
    <>
      <Tbody scrollBehavior={"smooth"}>
        <Tr>
          <Td align={"center"} alignContent={"cemter"} colSpan={6}>
            Nenhum dado pra exibir
          </Td>
        </Tr>
      </Tbody>
    </>
  );
}
