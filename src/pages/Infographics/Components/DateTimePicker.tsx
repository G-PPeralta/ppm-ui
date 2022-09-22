import { forwardRef, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";

import { Button, Flex, FormLabel } from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";

function DateTimePicker({ registerForm }: any) {
  const [startDate, setStartDate] = useState<any>("");

  const handleStartDate = (date: any) => {
    setStartDate(date);
    registerForm.setFieldValue("dat_ini_plan", date);
  };

  const Trigger = forwardRef(({ value, onClick }: any, ref: any) => {
    useEffect(() => {
      // console.log("value", value);
    }, []);

    return (
      <Button
        onClick={onClick}
        ref={ref}
        variant="outline"
        px={10}
        minW={"220px"}
      >
        {value === "" ? "Selecione a data" : value}
      </Button>
    );
  });
  return (
    <>
      <Flex direction={"column"}>
        <Flex gap={1}>
          <RequiredField />
          <FormLabel htmlFor="dat_ini_plan">DATA INÍCIO</FormLabel>
        </Flex>
        <ReactDatePicker
          selected={startDate}
          onChange={(date) => handleStartDate(date)}
          locale="pt-BR"
          showTimeSelect
          dateFormat="dd/MM/yyyy, hh:mm"
          customInput={<Trigger />}
          isClearable={startDate !== ""}
        />
      </Flex>
    </>
  );
}

export default DateTimePicker;
