import { Flex } from "@chakra-ui/react";

import TextAreaGenerico from "components/TextAreaGenerico";

interface Props {
  registerForm: any;
}

function EditarAtividadeTabAnotacoes({ registerForm }: Props) {
  return (
    <Flex w={"100%"} direction={"column"} gap={2}>
      <Flex gap={4}>
        <Flex flex={1}>
          <TextAreaGenerico
            registerForm={registerForm}
            nomeInput={"ANOTAÇÕES"}
            propName={"anotacoes"}
            value={registerForm.values.anotacoes}
            placeholder={"Escreva anotações sobre a atividade"}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default EditarAtividadeTabAnotacoes;
