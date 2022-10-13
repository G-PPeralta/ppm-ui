import { forwardRef, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";

import { Button, Flex, Text, useBreakpointValue } from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";

function DateTimePickerDataInicio({ registerForm, data, index }: any) {
  const [dataInicio, setDataInicio] = useState<any>("");
  const [dataMin, setDataMin] = useState<any>("");

  useEffect(() => {
    if (data) {
      const newDate = new Date(data);
      // newDate.setDate(newDate.getDate() + 15);
      // newDate.setHours(9, 0, 0, 0);
      setDataInicio(newDate);
      setDataMin(newDate);
    } else {
      const newDate = new Date();
      setDataMin(newDate);
    }
  }, []);

  const handleIniciarDate = (date: any) => {
    // date.setHours(9, 0, 0, 0);
    setDataInicio(date);
    registerForm.setFieldValue(
      `atividades[${index}].data_inicio`,
      new Date(date).toLocaleString()
    );
  };

  const TriggerDatePickerInicio = forwardRef(
    ({ value, onClick }: any, ref: any) => (
      <Button
        h={"56px"}
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
        minDate={dataMin}
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
