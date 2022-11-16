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
  limite?: number;
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
  limite,
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
    if (tipo === "dias") {
      const isPlural = val > 1 ? " dias" : " dia";
      return val + isPlural;
    }
    return val;
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
      <NumberInput
        isDisabled={isDisabled}
        min={0}
        max={limite || 100}
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
