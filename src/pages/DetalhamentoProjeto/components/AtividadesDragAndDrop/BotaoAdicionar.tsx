import { FiPlus } from "react-icons/fi";

import { Flex, IconButton } from "@chakra-ui/react";

interface Props {
  add: Function;
  registerForm: any;
  atividades: any;
}

function BotaoAdicionar({ add, registerForm, atividades }: Props) {
  if (registerForm.values.precedentes.length !== atividades.length) {
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
  return null;
}

export default BotaoAdicionar;
