//  CRIADO EM: 8/2022
//  AUTOR: Eduardo Muchak.
//  DESCRIÇÃO DO ARQUIVO: Seletor de data par componente.

import { forwardRef, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";

import { Button, Flex, Text, useBreakpointValue } from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";

function DateTimePickerDataInicio({ registerForm, data, index }: any) {
  const [dataInicio, setDataInicio] = useState<any>("");

  const handleInitialDate = () => {
    setDataInicio(registerForm?.values.atividades?.[index].data_inicio);
  };
  const handleChangeDate = (date: any) => {
    setDataInicio(date);
    registerForm.setFieldValue(`atividades[${index}].data_inicio`, date);
  };

  const TriggerDatePickerInicio = forwardRef(
    ({ value, onClick }: any, ref: any) => (
      <Button
        onClick={onClick}
        ref={ref}
        variant="outline"
        px={useBreakpointValue({ base: 5, sm: 5, md: 5 })}
        minW={useBreakpointValue({ base: "180px", sm: "180px", md: "180px" })}
        backgroundColor="white"
        borderColor={"#E2E8F0"}
        textColor={value === "" ? "#718096" : "#2D3748"}
      >
        {value === "" ? "Selecione a data" : value}
      </Button>
    )
  );

  useEffect(() => {
    handleInitialDate();
  }, []);

  return (
    <Flex direction={"column"}>
      <Flex gap={1}>
        <RequiredField />
        <Text fontWeight={"bold"} fontSize={"12px"} color={"#949494"}>
          DATA INÍCIO
        </Text>
      </Flex>
      <ReactDatePicker
        selected={dataInicio}
        onChange={(date) => handleChangeDate(date)}
        locale="pt-BR"
        showTimeSelect
        dateFormat="dd/MM/yyyy, hh:mm"
        customInput={<TriggerDatePickerInicio />}
        isClearable={dataInicio !== ""}
      />
    </Flex>
  );
}

export default DateTimePickerDataInicio;
