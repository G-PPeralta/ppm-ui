import { useState } from "react";

import { Flex, Input, InputLeftAddon, Text } from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";
import { TextError } from "components/TextError";

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
  isDisabled?: boolean;
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
  isDisabled,
}: Props) {
  function getMoney(str: string | undefined | null) {
    if (str === undefined || str === null) return null;
    return parseInt(str.replace(/[\D]+/g, ""));
  }
  function formatReal(number: number | undefined | null) {
    let tmp = number + "";
    tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
    if (tmp.length > 6) tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

    return tmp;
  }

  const [valorFormatado, setValorFormatado] = useState<any>("");
  if (isNumeric) {
    setValorFormatado(formatReal(getMoney(value || "0")));
  }

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
        <Flex gap={1}>
          <InputLeftAddon
            alignSelf={"end"}
            color="#949494"
            border={"1px solid #949494"}
            background={"white"}
            h={"56px"}
          >
            R$
          </InputLeftAddon>
          <Input
            isDisabled={isDisabled}
            h={"56px"}
            placeholder={placeholder}
            type={"text"}
            id={propName}
            name={propName}
            value={valorFormatado}
            maxLength={maxLength}
            onChange={registerForm.handleChange}
            w={"100%"}
            // onKeyUp={(event) => maskMoney(event)}
          />
        </Flex>
      ) : (
        <Input
          isDisabled={isDisabled}
          h={"56px"}
          placeholder={placeholder}
          type={type || "text"}
          id={propName}
          name={propName}
          value={value}
          maxLength={maxLength}
          onChange={registerForm.handleChange}
          w={"100%"}
          _placeholder={{ color: "#949494" }}
          fontSize={"14px"}
          fontWeight={"400"}
          color={"black"}
        />
      )}
      {registerForm.touched[propName] && registerForm.errors[propName] && (
        <TextError>{registerForm.errors[propName]}</TextError>
      )}
    </Flex>
  );
}

export default InputGenerico;
