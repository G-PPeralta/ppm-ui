import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";

import { Flex, IconButton } from "@chakra-ui/react";

interface Props {
  add: Function;
  registerForm: any;
  atividades: any;
}

function BotaoAdicionar({ add, registerForm, atividades }: Props) {
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const isDisabled = registerForm.values.precedentes.some(
      (atividade: any) =>
        atividade.atividadePrecedenteId <= 0 || atividade.dias <= 0
    );
    const semPrecedentesNoArray = atividades.length === 0;

    if (isDisabled || semPrecedentesNoArray) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [registerForm.values.precedentes]);

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
          borderColor: "#D6D4D4",
        }}
      >
        <IconButton
          onClick={() => add()}
          icon={<FiPlus />}
          aria-label={"Plus sign icon"}
          isRound={true}
          color={"white"}
          backgroundColor={isDisabled ? "#D6D4D4" : "origem.500"}
          size={"sm"}
          _hover={{
            backgroundColor: isDisabled ? "#D6D4D4" : "origem.600",
          }}
          transition={"all 0.4s"}
          isDisabled={isDisabled}
        />
      </Flex>
    );
  }
  return null;
}

export default BotaoAdicionar;
