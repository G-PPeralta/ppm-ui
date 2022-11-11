import { useState, useEffect } from "react";

import { Flex, Input, InputLeftAddon, Text } from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";
import { TextError } from "components/TextError";

import { formatRealInput } from "utils/regexCoinMask";

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

function InputGenericoDesabilitado({
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
  const [valorFormatado, setValorFormatado] = useState<any>("");
  useEffect(() => {
    if (isNumeric) {
      setValorFormatado(formatRealInput(value || ""));
    }
  }, []);

  const changeValueFormated = (value: string) => {
    registerForm.setFieldValue(
      propName,
      value.toString().replace(/[^0-9]/g, "")
    );
    // setValorFormatado(formatReal(getMoney(value.toString() || "")));
    setValorFormatado(formatRealInput(value || ""));
  };

  return (
    <Flex direction={"column"} w={"100%"}>
      {nomeInput && (
        <Flex gap={1}>
          {required && <RequiredField />}
          <Text fontWeight={"700"} fontSize={"12px"} color={"#949494"}>
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
            // onChange={registerForm.handleChange}
            onChange={(event: any) => changeValueFormated(event.target.value)}
            w={"100%"}
            // onKeyUp={(event) => maskMoney(event)}
          />
          {registerForm.touched[propName] && registerForm.errors[propName] && (
            <TextError>{registerForm.errors[propName]}</TextError>
          )}
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
          color={"#949494"}
        />
      )}
      {registerForm.touched[propName] && registerForm.errors[propName] && (
        <TextError>{registerForm.errors[propName]}</TextError>
      )}
    </Flex>
  );
}

export default InputGenericoDesabilitado;
