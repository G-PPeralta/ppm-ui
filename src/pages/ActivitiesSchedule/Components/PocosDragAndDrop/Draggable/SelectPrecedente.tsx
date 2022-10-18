import Select from "react-select";

import { Flex, Text } from "@chakra-ui/react";

// import { RequiredField } from "components/RequiredField/RequiredField";

function SelectPrecedente({ options, handleChange, value }: any) {
  const customStyles = {
    control: (base: any) => ({
      ...base,
      height: 56,
      minHeight: 56,
      border: "1px solid #E2E8F0",
    }),

    menu: (base: any) => ({
      ...base,
      zIndex: 9999,
      minWidth: "300px",
    }),
  };

  return (
    <Flex direction={"column"} flex={1}>
      <Flex>
        {/* <RequiredField /> */}
        <Text sx={{ fontSize: 12, fontWeight: "600" }}>PRECEDENTE</Text>
      </Flex>
      <Select
        styles={customStyles}
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
