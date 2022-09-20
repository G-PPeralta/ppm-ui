import {
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

function InputPorcentagem({ registerForm }: any) {
  const format = (val: number) => val + "%";

  const handleChange = (event: any) => {
    registerForm.setFieldValue("pct_real", Number(event));
  };

  return (
    <>
      <FormControl>
        <FormLabel htmlFor="pct_real">STATUS</FormLabel>
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
