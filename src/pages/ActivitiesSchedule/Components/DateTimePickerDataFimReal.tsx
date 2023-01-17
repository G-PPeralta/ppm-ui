//  CRIADO EM: 09/2022
//  AUTOR: Bruno Fracaro
//  DESCRIÇÃO DO ARQUIVO: Seletor de data para o modal de cadastro de atividade.

import { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";

import { Button, Flex, useBreakpointValue } from "@chakra-ui/react";

function DateTimePickerDataFimReal({
  fimReal,
  setFimReal,
  intervencaoIniciada,
  atividadeStatus,
  inicioReal,
}: any) {
  const handleIniciarDate = (date: any) => {
    date.setHours(18, 0, 0, 0);
    setFimReal(date);
  };

  const TriggerDatePickerInicio = forwardRef(
    ({ value, onClick }: any, ref: any) => (
      <Button
        isDisabled={!(atividadeStatus !== 100)}
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
        selected={fimReal}
        onChange={(date) => handleIniciarDate(date)}
        locale="pt-BR"
        // showTimeSelect
        dateFormat="Pp"
        customInput={<TriggerDatePickerInicio />}
        // isClearable={fimReal !== ""}
        disabled={!intervencaoIniciada && atividadeStatus !== 100}
        // minDate={inicioReal}
      />
    </Flex>
  );
}

export default DateTimePickerDataFimReal;
