import { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";

import { Button, Flex, useBreakpointValue } from "@chakra-ui/react";

function DateTimePickerDataInicioPlan({
  inicioPlanejado,
  setInicioPlanejado,
  intervencaoIniciada,
  atividadeStatus,
}: any) {
  const handleIniciarDate = (date: any) => {
    setInicioPlanejado(date);
  };

  const TriggerDatePickerInicio = forwardRef(
    ({ value, onClick }: any, ref: any) => (
      <Button
        isDisabled
        fontSize={"14px"}
        fontWeight={"400"}
        _placeholder={{ color: "#949494" }}
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
      <ReactDatePicker
        selected={inicioPlanejado}
        onChange={(date) => handleIniciarDate(date)}
        locale="pt-BR"
        showTimeSelect
        dateFormat="Pp"
        customInput={<TriggerDatePickerInicio />}
        // isClearable={inicioPlanejado !== ""}
        disabled={intervencaoIniciada || atividadeStatus !== 0}
      />
    </Flex>
  );
}

export default DateTimePickerDataInicioPlan;
