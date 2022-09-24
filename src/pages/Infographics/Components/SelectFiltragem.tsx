import Select from "react-select";

import { Flex, FormControl, FormLabel } from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";
// import { TextError } from "components/TextError";

function SelectFiltragem({
  registerForm,
  nomeSelect,
  propName,
  options,
  value,
}: any) {
  const handleChange = ({ value }: any, { name }: any) => {
    registerForm.setFieldValue(name, value);
  };

  return (
    <>
      <FormControl>
        {nomeSelect && (
          <Flex gap={1}>
            <RequiredField />
            <FormLabel>{nomeSelect}</FormLabel>
          </Flex>
        )}
        <Select
          id={propName}
          name={propName}
          placeholder="Selecione"
          onChange={(event, name) => handleChange(event, name)}
          options={options}
          defaultValue={"Selecione"}
          value={value}
          isSearchable
        />
        {/* {`registerForm.errors.${propName}` && (
          <TextError>{`registerForm.errors.${propName}`}</TextError>
        )} */}
      </FormControl>
    </>
  );
}

export default SelectFiltragem;
