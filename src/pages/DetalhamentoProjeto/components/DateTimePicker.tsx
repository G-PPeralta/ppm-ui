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
}: any) {
  const [horaMin, setHoraMin] = useState<any>(new Date());
  const [horaMax, setHoraMax] = useState<any>(new Date());
  const [dataInicio, setDataInicio] = useState<any>("");

  // console.log("data", data);
  // console.log("dataInicio", dataInicio);

  useEffect(() => {
    if (data && !dataInicio) {
      const newDate = new Date(data);
      // console.log("newDate", newDate);

      // newDate.setHours(newDate.getHours() + 3);
      setDataInicio(newDate);
      // setDataMin(newDate);
    } else {
      // const newDate = new Date();
      // setDataInicio(newDate);
    }
  }, [data]);

  useEffect(() => {
    const dateMin = new Date();
    dateMin.setHours(8);
    dateMin.setMinutes(0);
    setHoraMin(dateMin);
    const dateMax = new Date();
    dateMax.setHours(18);
    dateMax.setMinutes(0);
    setHoraMax(dateMax);
  }, []);

  const handleIniciarDate = (date: any) => {
    if (date) {
      if (isDataFim) {
        date.setHours(18, 0, 0);
        setDataInicio(date);
        registerForm.setFieldValue(value, date);
      } else {
        date.setHours(9, 0, 0);
        setDataInicio(date);
        registerForm.setFieldValue(value, date);
      }
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
        // minDate={dataMin}
        onChange={(date) => handleIniciarDate(date)}
        locale="pt-BR"
        showTimeSelect
        minTime={horaMin}
        maxTime={horaMax}
        dateFormat="dd/MM/yyyy HH:mm"
        customInput={<TriggerDatePickerInicio />}
        // isClearable={dataInicio !== ""}
      />
    </Flex>
  );
}

export default DateTimePicker;
