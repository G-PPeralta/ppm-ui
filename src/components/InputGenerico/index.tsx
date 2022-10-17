import { Flex, Input, Text } from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";
import { TextError } from "components/TextError";

import { maskMoney } from "utils/regexCoinMask";

interface Props {
  registerForm: any;
  nomeInput?: string;
  propName: string;
  maxLength: number;
  value?: string | undefined;
  required?: boolean;
  placeholder?: string;
  type?: string;
  isNumeric?: boolean;
}

function InputGenerico({
  registerForm,
  nomeInput,
  propName,
  value,
  required,
  placeholder,
  maxLength,
  type,
  isNumeric,
}: Props) {
  return (
    <Flex direction={"column"} w={"100%"}>
      {nomeInput && (
        <Flex gap={1}>
          {required && <RequiredField />}
          <Text fontWeight={"bold"} fontSize={"12px"} color={"#949494"}>
            {nomeInput}
          </Text>
        </Flex>
      )}
      {isNumeric ? (
        <Input
          h={"56px"}
          placeholder={placeholder}
          type={type || "text"}
          id={propName}
          name={propName}
          value={value}
          maxLength={maxLength}
          onChange={registerForm.handleChange}
          w={"100%"}
          onKeyUp={(event) => maskMoney(event)}
        />
      ) : (
        <Input
          h={"56px"}
          placeholder={placeholder}
          type={type || "text"}
          id={propName}
          name={propName}
          value={value}
          maxLength={maxLength}
          onChange={registerForm.handleChange}
          w={"100%"}
        />
      )}
      {registerForm.touched[propName] && registerForm.errors[propName] && (
        <TextError>{registerForm.errors[propName]}</TextError>
      )}
    </Flex>
  );
}

export default InputGenerico;
