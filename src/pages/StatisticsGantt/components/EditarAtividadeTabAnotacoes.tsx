import { BsFillCloudArrowUpFill } from "react-icons/bs";

import { Button, Flex } from "@chakra-ui/react";

import TextAreaGenerico from "components/TextAreaGenerico";

interface Props {
  registerForm: any;
}

function EditarAtividadeTabAnotacoes({ registerForm }: Props) {
  return (
    <Flex w={"100%"} direction={"column"} gap={2}>
      <Flex flex={1} justify={"end"}>
        <Button
          h={"56px"}
          borderRadius={"10px"}
          background={"white"}
          color={"origem.500"}
          _hover={{
            background: "origem.500",
            transition: "all 0.4s",
            color: "white",
          }}
          colorScheme="blue"
          variant="ghost"
          rightIcon={<BsFillCloudArrowUpFill size={24} />}
        >
          Anexar
        </Button>
      </Flex>
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
