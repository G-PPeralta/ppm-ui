import Select from "react-select";

import { Flex, Text } from "@chakra-ui/react";

function SelectPoco({ pocos, setPocos, index }: any) {
  const handleChange = ({ value }: any, { name }: any) => {};

  return (
    <>
      <Flex sx={{ width: 200 }} direction={"column"}>
        <Text sx={{ fontSize: 12, fontWeight: "600" }}>Poço</Text>
        <Select
          isDisabled
          placeholder={pocos[index].poco}
          onChange={(event, name) => handleChange(event, name)}
          isSearchable
        />
      </Flex>
    </>
  );
}

export default SelectPoco;
