import { forwardRef, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";

import { Button, Flex, Text, useBreakpointValue } from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";

function DateTimePickerData({ registerForm, data, required, value }: any) {
  const [dataInicio, setDataInicio] = useState<any>("");
  const [initialValue, setInitial] = useState<any>("");

  useEffect(() => {
    if (data) {
      setDataInicio(data);
    }
    if (value) {
      setInitial(new Date(value));
    }
  }, []);

  const handleIniciarDate = (date: any) => {
    if (date) {
      date.setHours(9, 0, 0, 0);
      setDataInicio(date);
      registerForm.setFieldValue("data", date);
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
        {required ? <RequiredField /> : null}
        <Text fontWeight={"bold"} fontSize={"12px"} color={"#949494"}>
          DATA
        </Text>
      </Flex>
      <ReactDatePicker
        selected={initialValue ? new Date(value) : dataInicio}
        onChange={(date) => handleIniciarDate(date)}
        locale="pt-BR"
        // showTimeSelect
        dateFormat="dd/MM/yyyy"
        customInput={<TriggerDatePickerInicio />}
        // isClearable={dataInicio !== ""}
      />
    </Flex>
  );
}

export default DateTimePickerData;
