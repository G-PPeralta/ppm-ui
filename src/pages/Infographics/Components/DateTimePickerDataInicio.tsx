import { forwardRef, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";

import { Button, Flex, Text, useBreakpointValue } from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";

function DateTimePickerDataInicio({ registerForm, data }: any) {
  const [dataInicio, setDataInicio] = useState<any>("");
  // const [dataMin, setDataMin] = useState<any>("");

  useEffect(() => {
    if (data) {
      const newDate = new Date(data);
      newDate.setDate(newDate.getDate() + 15);
      setDataInicio(newDate);
      // setDataMin(newDate);
    } else {
      // const newDate = new Date();
      // setDataMin(newDate);
    }
  }, []);

  const handleIniciarDate = (date: any) => {
    setDataInicio(date);
    registerForm.setFieldValue("dat_ini_prev", date);
  };

  const TriggerDatePickerInicio = forwardRef(
    ({ value, onClick }: any, ref: any) => (
      <Button
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
          DATA INÍCIO
        </Text>
      </Flex>
      <ReactDatePicker
        selected={dataInicio}
        // minDate={dataMin}
        onChange={(date) => handleIniciarDate(date)}
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
