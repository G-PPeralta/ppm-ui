import Select from "react-select";

import { Flex, FormControl, Text } from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";

function SelectOption({
  registerForm,
  nomeSelect,
  propName,
  options,
  value,
  disabled,
  required,
}: any) {
  const handleChange = ({ value }: any, { name }: any) => {
    console.log(">>>>>>handleChange  ", name, value);
    registerForm.setFieldValue(name, value);
  };

  const defaultValue = {
    value: undefined,
    label: undefined,
  };

  const customStyles = {
    control: (base: any) => ({
      ...base,
      height: 56,
      minHeight: 56,
    }),
  };

  return (
    <>
      <FormControl>
        {nomeSelect && (
          <Flex gap={1}>
            {required && <RequiredField />}
            <Text fontWeight={"bold"} fontSize={"12px"} color={"#949494"}>
              {nomeSelect}
            </Text>
          </Flex>
        )}
        <Select
          styles={customStyles}
          id={propName}
          name={propName}
          placeholder={"Selecione"}
          onChange={(event, name) => handleChange(event, name)}
          options={options}
          defaultValue={"Selecione"}
          value={
            JSON.stringify(value) === JSON.stringify(defaultValue)
              ? "Selecione"
              : value
          }
          isSearchable
          isDisabled={disabled}
        />
      </FormControl>
    </>
  );
}

export default SelectOption;
