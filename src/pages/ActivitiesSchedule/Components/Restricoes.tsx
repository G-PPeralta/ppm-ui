import { forwardRef, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";

import {
  Button,
  Checkbox,
  Flex,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";

function Restricoes({ registerForm }: any) {
  const [naoIniciarData, setNaoIniciarData] = useState<any>("");
  const [naoFinalizarData, setNaoFinalizarData] = useState<any>("");

  const handleIniciarDate = (date: any) => {
    setNaoIniciarData(date);
    registerForm.setFieldValue("nao_iniciar_antes_de.data", date);
  };

  const handleFinalizarDate = (date: any) => {
    setNaoFinalizarData(date);
    registerForm.setFieldValue("nao_terminar_depois_de.data", date);
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
          disabled={!registerForm.values.nao_iniciar_antes_de.checked}
        >
          {value === "" ? "Selecione a data" : value}
        </Button>
      );
    }
  );

  const TriggerDatePickerFinalizar = forwardRef(
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
          disabled={!registerForm.values.nao_terminar_depois_de.checked}
        >
          {value === "" ? "Selecione a data" : value}
        </Button>
      );
    }
  );

  return (
    <Flex direction={"column"} gap={3}>
      <Flex gap={5}>
        <Stack spacing={5} direction="row">
          <Checkbox
            w={"100%"}
            // h={"40px"}
            name="nao_iniciar_antes_de.checked"
            onChange={registerForm.handleChange}
            value={registerForm.values.nao_iniciar_antes_de.checked}
            mr={7}
            size={useBreakpointValue({ base: "sm", sm: "sm", md: "md" })}
          >
            Não iniciar antes de
          </Checkbox>
        </Stack>

        <Flex>
          <ReactDatePicker
            selected={naoIniciarData}
            onChange={(date) => handleIniciarDate(date)}
            locale="pt-BR"
            showTimeSelect
            dateFormat="dd/MM/yyyy, hh:mm"
            customInput={<TriggerDatePickerInicio />}
            isClearable={naoIniciarData !== ""}
            disabled={!registerForm.values.nao_iniciar_antes_de.checked}
          />
        </Flex>
      </Flex>
      <Flex gap={5}>
        <Stack spacing={5} direction="row">
          <Checkbox
            w={"100%"}
            // h={"40px"}
            name="nao_terminar_depois_de.checked"
            onChange={registerForm.handleChange}
            value={registerForm.values.nao_terminar_depois_de.checked}
            size={useBreakpointValue({ base: "sm", sm: "sm", md: "md" })}
          >
            Não terminar depois de
          </Checkbox>
        </Stack>
        <Flex>
          <ReactDatePicker
            selected={naoFinalizarData}
            onChange={(date) => handleFinalizarDate(date)}
            locale="pt-BR"
            showTimeSelect
            dateFormat="dd/MM/yyyy, hh:mm"
            customInput={<TriggerDatePickerFinalizar />}
            isClearable={naoFinalizarData !== ""}
            disabled={!registerForm.values.nao_terminar_depois_de.checked}
          />
        </Flex>
      </Flex>
      <Stack spacing={5} direction="row" mt={2}>
        <Checkbox
          w={"100%"}
          // h={"40px"}
          name="o_mais_breve_possivel"
          onChange={registerForm.handleChange}
          value={registerForm.values.o_mais_breve_possivel}
          size={useBreakpointValue({ base: "sm", sm: "sm", md: "md" })}
        >
          O mais breve possível
        </Checkbox>
      </Stack>
    </Flex>
  );
}

export default Restricoes;
