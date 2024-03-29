//  CRIADO EM: 10/2022
//  AUTOR: Geovana Augusta.
//  DESCRIÇÃO DO ARQUIVO: Apresenta o Status.

import { Box, Flex, Text } from "@chakra-ui/react";

type Props = {
  status: string;
  color: string;
};

function StatusIntervencao({ status, color }: Props) {
  return (
    <Flex align={"center"} wrap={"wrap"}>
      <Box
        backgroundColor={color}
        borderRadius={"50%"}
        width={"8px"}
        height={"8px"}
      />
      <Text ml={2}>{status}</Text>
    </Flex>
  );
}

export default StatusIntervencao;
