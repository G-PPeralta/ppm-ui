//  CRIADO EM: 9/2022
//  AUTOR: Bruno Fracaro, Eduardo Muchak.
//  DESCRIÇÃO DO ARQUIVO: Combobox para selecionar um poço a arrastar dentro da sonda

import Select from "react-select";

import { FormControl, Text } from "@chakra-ui/react";

function SelectPoco({ pocos, index, value, options }: any) {
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
    <FormControl>
      <Text fontWeight={"bold"} fontSize={"12px"} color={"#949494"}>
        POÇO
      </Text>
      <Select
        styles={customStyles}
        isDisabled
        id={pocos[index].poco}
        name={pocos[index].poco}
        placeholder={pocos[index].poco}
        isSearchable
        options={options}
        value={value}
      />
    </FormControl>
  );
}

export default SelectPoco;
