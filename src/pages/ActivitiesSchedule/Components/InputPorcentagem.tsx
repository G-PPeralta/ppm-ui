import {
  Flex,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";

function InputPorcentagem({ registerForm }: any) {
  const format = (val: number) => val + "%";

  const handleChange = (event: any) => {
    registerForm.setFieldValue("pct_real", Number(event));
  };

  return (
    <>
      <FormControl>
        <Flex gap={1}>
          <RequiredField />
          <FormLabel htmlFor="pct_real">STATUS</FormLabel>
        </Flex>

        <NumberInput
          min={0}
          max={100}
          value={format(registerForm.values.pct_real)}
          onChange={(event) => handleChange(event)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
    </>
  );
}

export default InputPorcentagem;
