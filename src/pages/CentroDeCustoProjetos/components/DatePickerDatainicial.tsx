//  CRIADO EM: 09/2022
//  AUTOR: Geovata Augusta
//  DESCRIÇÃO DO ARQUIVO: Seletor de datas.

import { forwardRef, useEffect, useState } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";

import { Button, Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import ptBR from "date-fns/locale/pt-BR";
import { DatePicker } from "interfaces/CentroDeCusto";

import { RequiredField } from "components/RequiredField/RequiredField";

registerLocale("ptBR", ptBR);

function DatePickerGenericoDataInicial({
  registerForm,
  data,
  propName,
  nomeLabel,
  required,
  selecionaHorario,
  isDisabled,
  esconderHorario,
  mes,
  dataInicial,
  dates,
}: DatePicker) {
  const [dataInicio, setDataInicio] = useState<any>("");
  const [startDate, setStartDate] = useState<any>("");
  const [endDate, setEndSate] = useState<any>("");

  // console.log(dataInicial);

  useEffect(() => {
    if (data) {
      const newDate = new Date(data);
      setDataInicio(newDate);
    }

    const mesAtual = mes - 1;

    if (
      startDate ===
      "Wed Dec 31 1969 21:00:00 GMT-0300 (Horário Padrão de Brasília)"
    ) {
      setStartDate(new Date(new Date().getFullYear(), mesAtual + 1, 0));
      setEndSate(new Date(new Date().getFullYear(), mesAtual + 1, 0));
    }

    if (
      dates &&
      startDate !==
        "Wed Dec 31 1969 21:00:00 GMT-0300 (Horário Padrão de Brasília)"
    ) {
      setStartDate(new Date(dates.data.data_inicio));
      setEndSate(new Date(new Date().getFullYear(), mesAtual + 1, 0));
    }
  }, [mes]);

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
          isDisabled={isDisabled}
          h={"56px"}
          onClick={onClick}
          ref={ref}
          variant="outline"
          px={useBreakpointValue({ base: 5, sm: 5, md: 5 })}
          minW={useBreakpointValue({ base: "220px", sm: "220px", md: "220px" })}
          w={"100%"}
          fontSize={"14px"}
          fontWeight={"400"}
          color={"black"}
        >
          {value === "" ? "Selecione a Data" : value}
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
        locale="ptBR"
        showTimeSelect={!!selecionaHorario}
        dateFormat={esconderHorario ? "dd/MM/yyyy" : "Pp"}
        customInput={<TriggerDatePickerInicio />}
        timeFormat="p"
        minDate={startDate}
        maxDate={endDate}
      />
    </Flex>
  );
}

export default DatePickerGenericoDataInicial;
