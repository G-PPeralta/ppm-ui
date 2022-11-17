import { forwardRef, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";

import { Button, Flex, Text, useBreakpointValue } from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";

import { formatDateToYYYYMMDDhhmmss } from "utils/formatDate";

function DateTimePickerDataInicio({ registerForm, data }: any) {
  const [dataInicio, setDataInicio] = useState<any>("");
  // const [dataMin, setDataMin] = useState<any>("");

  useEffect(() => {
    if (data) {
      const newDate = new Date(data);
      setDataInicio(newDate);
    }
  }, []);

  const handleIniciarDate = (date: any) => {
    if (date) {
      date.setHours(9, 0, 0, 0);
      setDataInicio(date);
      registerForm.setFieldValue(
        "dat_inicio_plan",
        formatDateToYYYYMMDDhhmmss(date)
      );
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
        fontSize={"14px"}
        fontWeight={"700"}
        fontFamily={"Mulish"}
      >
        {value === "" ? "Selecione a data" : value}
      </Button>
    )
  );

  return (
    <Flex direction={"column"}>
      <Flex gap={1}>
        <RequiredField />
        <Text fontWeight={"700"} fontSize={"12px"} color={"#949494"}>
          DATA INÍCIO
        </Text>
      </Flex>
      <ReactDatePicker
        selected={dataInicio}
        // minDate={dataMin}
        onChange={(date) => handleIniciarDate(date)}
        locale="pt-BR"
        // showTimeSelect
        dateFormat="Pp"
        customInput={<TriggerDatePickerInicio />}
        // isClearable={dataInicio !== ""}
      />
    </Flex>
  );
}

export default DateTimePickerDataInicio;
