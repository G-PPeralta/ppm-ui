import Select from "react-select";

import { Flex, Text } from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";

function SelectPrecedente({ options, handleChange, value }: any) {
  return (
    <Flex direction={"column"} flex={1}>
      <Flex>
        <RequiredField />
        <Text sx={{ fontSize: 12, fontWeight: "600" }}>PRECEDENTE</Text>
      </Flex>
      <Select
        placeholder="Selecione"
        onChange={(event) => handleChange(event)}
        options={options}
        value={value}
        isSearchable
      />
    </Flex>
  );
}

export default SelectPrecedente;
