//  CRIADO EM: 8/2022
//  AUTOR: Eduardo Muchak.
//  DESCRIÇÃO DO ARQUIVO: Adicionar item a lista arrastável

import { FiPlus } from "react-icons/fi";

import { Flex, IconButton } from "@chakra-ui/react";

interface Props {
  add: Function;
  registerForm: any;
  atividades?: any;
}

function BotaoAdicionar({ add, registerForm, atividades }: Props) {
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
        borderColor: "#D6D4D4",
      }}
    >
      <IconButton
        onClick={() => add()}
        icon={<FiPlus />}
        aria-label={"Plus sign icon"}
        isRound={true}
        color={"white"}
        backgroundColor={"origem.500"}
        size={"sm"}
        _hover={{
          backgroundColor: "origem.600",
        }}
        transition={"all 0.4s"}
      />
    </Flex>
  );
}

export default BotaoAdicionar;
