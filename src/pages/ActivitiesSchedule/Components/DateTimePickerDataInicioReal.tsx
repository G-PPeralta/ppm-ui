import { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";

import { Button, Flex, useBreakpointValue } from "@chakra-ui/react";

function DateTimePickerDataInicioReal({
  inicioReal,
  setInicioReal,
  intervencaoIniciada,
  atividadeStatus,
}: any) {
  const handleIniciarDate = (date: any) => {
    setInicioReal(date);
  };

  const TriggerDatePickerInicio = forwardRef(
    ({ value, onClick }: any, ref: any) => (
      <Button
        isDisabled={!intervencaoIniciada && atividadeStatus === 0}
        h={"56px"}
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

  console.log("atividadeStatus", atividadeStatus);

  return (
    <Flex direction={"column"}>
      <ReactDatePicker
        selected={inicioReal}
        onChange={(date) => handleIniciarDate(date)}
        locale="pt-BR"
        showTimeSelect
        dateFormat="dd/MM/yyyy, hh:mm"
        customInput={<TriggerDatePickerInicio />}
        isClearable={inicioReal !== ""}
        disabled={!intervencaoIniciada && atividadeStatus === 0}
      />
    </Flex>
  );
}

export default DateTimePickerDataInicioReal;
