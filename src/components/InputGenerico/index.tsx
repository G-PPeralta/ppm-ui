import { Flex, Input, Text } from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";

interface Props {
  registerForm: any;
  nomeInput: any;
  propName: any;
  value: any;
  required?: any;
  placeholder?: any;
}

function InputGenerico({
  registerForm,
  nomeInput,
  propName,
  value,
  required,
  placeholder,
}: Props) {
  return (
    <Flex direction={"column"} w={"100%"}>
      <Flex gap={1}>
        {required && <RequiredField />}
        <Text fontWeight={"bold"} fontSize={"12px"} color={"#949494"}>
          {nomeInput}
        </Text>
      </Flex>
      <Input
        h={"56px"}
        placeholder={placeholder}
        type="text"
        id={propName}
        name={propName}
        value={value}
        maxLength={50}
        onChange={registerForm.handleChange}
        w={"100%"}
      />
    </Flex>
  );
}

export default InputGenerico;
