import { forwardRef, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";

import { Button, Flex, Text, useBreakpointValue } from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";

function DateTimePicker({
  registerForm,
  data,
  label,
  value,
  required,
  isDataFim,
  isDisabled,
  dataMin,
}: any) {
  const [dataInicio, setDataInicio] = useState<any>("");

  const handleIniciarDate = (date: any) => {
    if (date) {
      setDataInicio(date);
      registerForm.setFieldValue(value, date);
    }
  };

  const TriggerDatePickerInicio = forwardRef(
    ({ value, onClick }: any, ref: any) => (
      <Button
        disabled={isDisabled}
        h={"56px"}
        w={"100%"}
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

  useEffect(() => {
    if (data && !dataInicio) {
      const newDate = new Date(data);
      setDataInicio(newDate);
    }
  }, [data]);

  return (
    <Flex direction={"column"}>
      <Flex gap={1}>
        {required && <RequiredField />}
        <Text fontWeight={"700"} fontSize={"12px"} color={"#949494"}>
          {label}
        </Text>
      </Flex>
      <ReactDatePicker
        disabled={isDisabled}
        selected={dataInicio}
        minDate={new Date(dataMin)}
        onChange={(date) => handleIniciarDate(date)}
        locale="pt-BR"
        showTimeSelect
        minTime={new Date(0, 0, 0, 8, 0)}
        maxTime={new Date(0, 0, 0, 18, 0)}
        dateFormat="dd/MM/yyyy HH:mm"
        customInput={<TriggerDatePickerInicio />}
        // isClearable={dataInicio !== ""}
      />
    </Flex>
  );
}

export default DateTimePicker;
