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
