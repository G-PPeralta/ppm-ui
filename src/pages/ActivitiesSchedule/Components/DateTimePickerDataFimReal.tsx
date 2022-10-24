import { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";

import { Button, Flex, useBreakpointValue } from "@chakra-ui/react";

function DateTimePickerDataFimReal({
  fimReal,
  setFimReal,
  intervencaoIniciada,
  atividadeStatus,
}: any) {
  const handleIniciarDate = (date: any) => {
    setFimReal(date);
  };

  const TriggerDatePickerInicio = forwardRef(
    ({ value, onClick }: any, ref: any) => (
      <Button
        isDisabled={!intervencaoIniciada && atividadeStatus !== 100}
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

  return (
    <Flex direction={"column"}>
      <ReactDatePicker
        selected={fimReal}
        onChange={(date) => handleIniciarDate(date)}
        locale="pt-BR"
        showTimeSelect
        dateFormat="dd/MM/yyyy, hh:mm"
        customInput={<TriggerDatePickerInicio />}
        isClearable={fimReal !== ""}
        disabled={!intervencaoIniciada && atividadeStatus !== 100}
      />
    </Flex>
  );
}

export default DateTimePickerDataFimReal;
