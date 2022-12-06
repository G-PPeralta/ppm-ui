import { forwardRef, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";

import { Button, Flex, Text, useBreakpointValue } from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";

function DatePickerModal({
  registerForm,
  data,
  propName,
  nomeLabel,
  required,
  selecionaHorario,
  isDisabled,
  esconderHorario,
}: any) {
  const [dataInicio, setDataInicio] = useState<any>("");

  useEffect(() => {
    if (data) {
      const newDate = new Date(data);
      setDataInicio(newDate);
    } else {
      setDataInicio("");
    }
  }, [data]);

  const handleIniciarDate = (dataSelecionada: any) => {
    if (dataSelecionada) {
      if (
        dataSelecionada.prevState === null ||
        dataSelecionada.prevState === ""
      ) {
        dataSelecionada.setHours(9, 0, 0, 0);
      }
      setDataInicio(dataSelecionada);
      registerForm.setFieldValue(propName, dataSelecionada);
    }
  };

  const TriggerDatePickerInicio = forwardRef(
    ({ value, onClick }: any, ref: any) => (
      <Flex flex={1}>
        <Button
          fontWeight={"400"}
          fontSize={"14px"}
          color={isDisabled ? "#949494" : "black"}
          isDisabled={isDisabled}
          h={"56px"}
          onClick={onClick}
          ref={ref}
          variant="outline"
          px={useBreakpointValue({ base: 5, sm: 5, md: 5 })}
          minW={useBreakpointValue({
            base: "180px",
            sm: "180px",
            md: "174px",
          })}
          w={"100%"}
        >
          {value === "" ? "Selecione a data" : value}
        </Button>
      </Flex>
    )
  );

  return (
    <Flex direction={"column"}>
      <Flex gap={1}>
        {required && <RequiredField />}
        <Text fontWeight={"bold"} fontSize={"12px"} color={"#949494"}>
          {nomeLabel}
        </Text>
      </Flex>
      <ReactDatePicker
        disabled={isDisabled}
        selected={dataInicio}
        onChange={(date) => handleIniciarDate(date)}
        locale="pt-BR"
        showTimeSelect={selecionaHorario}
        timeFormat="p"
        timeIntervals={15}
        dateFormat="Pp"
        // timeFormat="HH:mm"
        // dateFormat={esconderHorario ? "dd/MM/yyyy" : "dd/MM/yyyy, hh:mm aa"}
        customInput={<TriggerDatePickerInicio />}
      />
    </Flex>
  );
}

export default DatePickerModal;
