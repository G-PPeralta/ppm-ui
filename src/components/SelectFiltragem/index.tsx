import Select from "react-select";

import { Flex, FormControl, Text } from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";

function SelectFiltragem({
  registerForm,
  nomeSelect,
  propName,
  options,
  value,
  idCampanha,
  required,
}: any) {
  const handleChange = ({ value }: any, { name }: any) => {
    registerForm.setFieldValue(name, value);
  };

  const getNomeCampanha = (idCampanha: number) => {
    const campanha = options.find((option: any) => option.value === idCampanha);
    return campanha.label;
  };

  const defaultValue = {
    value: undefined,
    label: undefined,
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
          id={propName}
          name={propName}
          placeholder={idCampanha ? getNomeCampanha(idCampanha) : "Selecione"}
          onChange={(event, name) => handleChange(event, name)}
          options={options}
          defaultValue={"Selecione"}
          value={
            JSON.stringify(value) === JSON.stringify(defaultValue)
              ? "Selecione"
              : value
          }
          isSearchable
          isDisabled={!!idCampanha}
        />
      </FormControl>
    </>
  );
}

export default SelectFiltragem;
