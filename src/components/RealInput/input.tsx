// CRIADO EM: 15/10/2022
// AUTOR: FELIPE MATEUS
// DESCRIÇÃO DO ARQUIVO: COMPONENTE DE INPUT DE VALOR MONETÁRIO COM MÁSCARA (R$)

import { useState } from "react";

import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

import { regexSomenteNumeros } from "utils/regex";

export function RealInput(props: {
  onChange: any;
  id: string;
  name: string;
  placeholder: string;
  value: string;
}) {
  const { onChange, id, name, placeholder } = props;
  const [valor, setValor] = useState("");
  const format = (val: string) => "R$" + val;
  const parse = (val: string) => regexSomenteNumeros(val);
  return (
    <>
      <NumberInput
        isRequired
        onChange={(valueString) => {
          setValor(parse(valueString));
          onChange(valueString);
        }}
        value={format(valor)}
        id={id}
        name={name}
        placeholder={placeholder}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </>
  );
}

export default RealInput;
