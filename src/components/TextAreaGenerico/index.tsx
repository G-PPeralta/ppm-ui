// CRIADO EM: 14/10/2022
// AUTOR: EDUARDO MUCHAK
// DESCRIÇÃO DO ARQUIVO: COMPONENTE DE TEXTAREA GENÉRICO

import { Flex, Textarea, Text } from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";

interface Props {
  registerForm: any;
  nomeInput: any;
  propName: any;
  value: any;
  required?: any;
  placeholder?: any;
  minHeight?: string;
}

function TextAreaGenerico({
  registerForm,
  nomeInput,
  propName,
  value,
  required,
  placeholder,
  minHeight,
}: Props) {
  return (
    <Flex direction={"column"} w={"100%"} flex={1}>
      <Flex gap={1}>
        {required && <RequiredField />}
        <Text fontWeight={"bold"} fontSize={"12px"} color={"#949494"}>
          {nomeInput}
        </Text>
      </Flex>
      <Textarea
        placeholder={placeholder}
        id={propName}
        name={propName}
        value={value}
        maxLength={5000}
        onChange={registerForm.handleChange}
        w={"100%"}
        _placeholder={{ color: "#949494" }}
        fontSize={"14px"}
        fontWeight={"400"}
        minH={minHeight}
      />
    </Flex>
  );
}

export default TextAreaGenerico;
