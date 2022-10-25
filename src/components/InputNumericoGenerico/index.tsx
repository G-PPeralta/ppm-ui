import {
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";

interface Props {
  registerForm: any;
  propName: string;
  nomeInput: string;
  required?: boolean;
  tipo: string;
  stepper?: boolean;
  step?: number;
  isDisabled?: boolean;
}

function InputNumericoGenerico({
  registerForm,
  propName,
  nomeInput,
  required,
  tipo,
  stepper,
  step,
  isDisabled,
}: Props) {
  const handleChange = (event: any) => {
    registerForm.setFieldValue(propName, Number(event));
  };

  const formataParaTipo = (tipo: string, val: number) => {
    if (tipo === "porcentagem") {
      return val + "%";
    }
    if (tipo === "hora") {
      return val + "h";
    }
    return val;
  };

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
      <NumberInput
        isDisabled={isDisabled}
        min={0}
        max={100}
        step={step}
        value={formataParaTipo(tipo, registerForm.values[propName])}
        onChange={(event) => handleChange(event)}
        h={"56px"}
      >
        <NumberInputField h={"56px"} />
        {stepper && (
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        )}
      </NumberInput>
    </Flex>
  );
}

export default InputNumericoGenerico;
