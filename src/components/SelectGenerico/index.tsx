// CRIADO EM: 24/10/2022
// AUTOR: GEOVANA AUGUSTA
// DESCRIÇÃO DO ARQUIVO: COMPONENTE SELECT GENERICO SEM A FUNCIONALIDADE DE BUSCA

import Select from "react-select";

import { Flex, FormControl, Text } from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";

function SelectGenerico({
  nomeSelect,
  propName,
  options,
  value,
  required,
  width,
}: any) {
  const defaultValue = {
    value: undefined,
    label: undefined,
  };

  const customStyles = {
    placeholder: (defaultStyles: any) => ({
      ...defaultStyles,
      color: "#949494",
    }),
    control: (base: any) => ({
      ...base,
      height: 56,
      minHeight: 56,
      border: "0.5px solid #E2E8F0",
      borderRadius: "8px",
      fontWeigth: "400",
      fontSize: "14px",
    }),

    dropdownIndicator: (base: any) => ({
      ...base,
      color: "#2D2926",
    }),

    menu: (base: any) => ({
      ...base,
      zIndex: 9999,
      minWidth: "300px",
    }),
  };

  const customStyles208 = {
    placeholder: (defaultStyles: any) => ({
      ...defaultStyles,
      color: "#949494",
    }),
    control: (base: any) => ({
      ...base,
      height: 56,
      minHeight: 56,
      border: "0.5px solid #E2E8F0",
      borderRadius: "8px",
      fontWeigth: "400",
      fontSize: "14px",
      width: "208px",
    }),

    dropdownIndicator: (base: any) => ({
      ...base,
      color: "#2D2926",
    }),

    menu: (base: any) => ({
      ...base,
      zIndex: 9999,
      minWidth: "300px",
    }),
  };

  return (
    <>
      <FormControl>
        {nomeSelect && (
          <Flex gap={1}>
            {required && <RequiredField />}
            <Text fontWeight={"700"} fontSize={"12px"} color={"#949494"}>
              {nomeSelect}
            </Text>
          </Flex>
        )}
        <Select
          styles={width ? customStyles208 : customStyles}
          components={{
            IndicatorSeparator: () => null,
          }}
          id={propName}
          name={propName}
          placeholder={"Selecione"}
          options={options}
          defaultValue={"Selecione"}
          value={
            JSON.stringify(value) === JSON.stringify(defaultValue)
              ? "Selecione"
              : value
          }
        />
      </FormControl>
    </>
  );
}

export default SelectGenerico;
