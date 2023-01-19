//  CRIADO EM: 9/2022
//  AUTOR: Bruno Fracaro, Eduardo Muchak.
//  DESCRIÇÃO DO ARQUIVO: ADicionar poço pra o draggable

import { FiPlus } from "react-icons/fi";

import { Flex, IconButton } from "@chakra-ui/react";

interface Props {
  add: Function;
}

function BotaoAdicionar({ add }: Props) {
  return (
    <Flex
      w="100%"
      border={"2px"}
      borderStyle={"dashed"}
      borderRadius={"50px"}
      borderColor={"#D6D4D4"}
      align={"center"}
      justify={"center"}
      p={2}
      _hover={{
        cursor: "pointer",
        borderColor: "#D6D4D4",
      }}
      onClick={() => add()}
    >
      <IconButton
        disabled
        icon={<FiPlus />}
        aria-label={"Plus sign icon"}
        isRound={true}
        color={"white"}
        backgroundColor={"#D6D4D4"}
        size={"sm"}
        _hover={{
          backgroundColor: "origem.500",
        }}
        transition={"all 0.4s"}
      />
    </Flex>
  );
}

export default BotaoAdicionar;
