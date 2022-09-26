import { forwardRef, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";

import { Button, Flex, FormLabel, useBreakpointValue } from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";

function DateTimePickerDataInicio({ registerForm }: any) {
  const [dataInicio, setDataInicio] = useState<any>("");

  const handleIniciarDate = (date: any) => {
    setDataInicio(date);
    registerForm.setFieldValue("dat_ini_prev", date);
  };

  const TriggerDatePickerInicio = forwardRef(
    ({ value, onClick }: any, ref: any) => {
      useEffect(() => {
        // console.log("value", value);
      }, []);

      return (
        <Button
          onClick={onClick}
          ref={ref}
          variant="outline"
          px={useBreakpointValue({ base: 5, sm: 5, md: 5 })}
          minW={useBreakpointValue({ base: "180px", sm: "180px", md: "220px" })}
          // disabled={!registerForm.values.nao_iniciar_antes_de.checked}
        >
          {value === "" ? "Selecione a data" : value}
        </Button>
      );
    }
  );

  return (
    <Flex direction={"column"}>
      <Flex gap={1}>
        <RequiredField />
        <FormLabel>DATA INÍCIO</FormLabel>
      </Flex>
      <ReactDatePicker
        selected={dataInicio}
        onChange={(date) => handleIniciarDate(date)}
        locale="pt-BR"
        showTimeSelect
        dateFormat="dd/MM/yyyy, hh:mm"
        customInput={<TriggerDatePickerInicio />}
        isClearable={dataInicio !== ""}
        // disabled={!registerForm.values.nao_iniciar_antes_de.checked}
      />
    </Flex>
  );
}

export default DateTimePickerDataInicio;
