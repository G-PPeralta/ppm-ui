import { forwardRef, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";

import { Button, Flex, Text, useBreakpointValue } from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";

function DatePickerGenerico({ registerForm, data, propName, nomeLabel }: any) {
  const [dataInicio, setDataInicio] = useState<any>("");

  useEffect(() => {
    if (data) {
      const newDate = new Date(data);
      setDataInicio(newDate);
    }
  }, []);

  const handleIniciarDate = (dataSelecionada: any) => {
    if (dataSelecionada) {
      dataSelecionada.setHours(9, 0, 0, 0);
      setDataInicio(dataSelecionada);
      registerForm.setFieldValue(propName, dataSelecionada);
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
        minW={useBreakpointValue({ base: "180px", sm: "180px", md: "220px" })}
      >
        {value === "" ? "Selecione a data" : value}
      </Button>
    )
  );

  return (
    <Flex direction={"column"}>
      <Flex gap={1}>
        <RequiredField />
        <Text fontWeight={"bold"} fontSize={"12px"} color={"#949494"}>
          {nomeLabel}
        </Text>
      </Flex>
      <ReactDatePicker
        selected={dataInicio}
        onChange={(date) => handleIniciarDate(date)}
        locale="pt-BR"
        // showTimeSelect
        dateFormat="dd/MM/yyyy, hh:mm"
        customInput={<TriggerDatePickerInicio />}
      />
    </Flex>
  );
}

export default DatePickerGenerico;