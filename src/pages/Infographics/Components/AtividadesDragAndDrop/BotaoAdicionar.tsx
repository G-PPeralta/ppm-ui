import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";

import { Flex, IconButton } from "@chakra-ui/react";
import { FormikProps } from "formik";

interface Props {
  add: Function;
  registerForm: FormikProps<any>;
}

function BotaoAdicionar({ add, registerForm }: Props) {
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (
      registerForm.values.atividades[registerForm.values.atividades.length - 1]
        .tarefa_id === 0
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [
    registerForm.values.atividades[registerForm.values.atividades.length - 1]
      .tarefa_id,
  ]);

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
        // cursor: "pointer",
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
          cursor: "pointer",
          backgroundColor: isDisabled ? "#D6D4D4" : "origem.600",
        }}
        transition={"all 0.4s"}
        isDisabled={isDisabled}
      />
    </Flex>
  );
}

export default BotaoAdicionar;
