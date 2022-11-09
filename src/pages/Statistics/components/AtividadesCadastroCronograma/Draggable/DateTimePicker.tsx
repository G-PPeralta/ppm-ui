import { forwardRef, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";

import { Button, Flex, Text, useBreakpointValue } from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";

function DateTimePicker({ registerForm, index }: any) {
  const [dataInicio, setDataInicio] = useState<any>("");

  useEffect(() => {
    const data = registerForm.values.atividades[index].data_inicio;
    if (data) {
      const newDate = new Date(data);
      // newDate.setDate(newDate.getDate() + 15);
      setDataInicio(newDate);
      // setDataMin(newDate);
    } else {
      // const newDate = new Date();
      setDataInicio("");
    }
  }, [registerForm.values.atividades[index].data_inicio]);

  const handleIniciarDate = (date: any) => {
    if (date) {
      setDataInicio(date);
      registerForm.setFieldValue(`atividades[${index}].data_inicio`, date);
    } else {
      setDataInicio("");
      registerForm.setFieldValue(`atividades[${index}].data_inicio`, "");
    }
  };

  const TriggerDatePickerInicio = forwardRef(
    ({ value, onClick }: any, ref: any) => (
      <Button
        h={"56px"}
        // _placeholder={{ color: "#949494" }}
        fontSize={"14px"}
        fontWeight={"400"}
        color={"black"}
        onClick={onClick}
        ref={ref}
        variant="outline"
        px={useBreakpointValue({ base: 5, sm: 5, md: 5 })}
        minW={useBreakpointValue({ base: "180px", sm: "180px", md: "180px" })}
        backgroundColor="white"
        borderColor={"#E2E8F0"}
        textColor={value === "" ? "#949494" : "#2D3748"}
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

export default DateTimePicker;
