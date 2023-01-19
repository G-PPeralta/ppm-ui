//  CRIADO EM: 8/2022
//  AUTOR: Eduardo Muchak.
//  DESCRIÇÃO DO ARQUIVO: Seletor de data.

import { forwardRef, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";

import { Button, Flex, Text, useBreakpointValue } from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";

function DateTimePicker({ registerForm, data, label, value, required }: any) {
  const [dataInicio, setDataInicio] = useState<any>("");

  useEffect(() => {
    if (data) {
      const newDate = new Date(data);
      setDataInicio(newDate);
    }
  }, [data]);

  const handleIniciarDate = (date: any) => {
    if (date) {
      setDataInicio(date);
      registerForm.setFieldValue(value, date);
    }
  };

  const TriggerDatePickerInicio = forwardRef(
    ({ value, onClick }: any, ref: any) => (
      <Button
        h={"56px"}
        onClick={onClick}
        ref={ref}
        variant="outline"
        px={useBreakpointValue({ base: 5, sm: 5, md: 5 })}
        minW={useBreakpointValue({ base: "220px", sm: "220px", md: "220px" })}
      >
        {value === "" ? "Selecione a data" : value}
      </Button>
    )
  );

  return (
    <Flex direction={"column"}>
      <Flex gap={1}>
        {required && <RequiredField />}
        <Text fontWeight={"bold"} fontSize={"12px"} color={"#949494"}>
          {label}
        </Text>
      </Flex>
      <ReactDatePicker
        selected={dataInicio}
        onChange={(date) => handleIniciarDate(date)}
        locale="pt-BR"
        showTimeSelect
        dateFormat="dd/MM/yyyy, hh:mm"
        customInput={<TriggerDatePickerInicio />}
      />
    </Flex>
  );
}

export default DateTimePicker;
