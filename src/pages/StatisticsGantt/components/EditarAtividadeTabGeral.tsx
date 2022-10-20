import { Flex } from "@chakra-ui/react";

import DatePickerGenerico from "components/DatePickerGenerico";
import InputGenerico from "components/InputGenerico";
import InputNumericoGenerico from "components/InputNumericoGenerico";
import SelectFiltragem from "components/SelectFiltragem";

import { getSelectFiltragemValue } from "utils/GetSelectFiltragemValue";

interface Props {
  registerForm: any;
}

function EditarAtividadeTabGeral({ registerForm }: Props) {
  const optionsStatusMock = [
    { value: 1, label: "Em andamento" },
    { value: 2, label: "Concluído" },
    { value: 3, label: "Cancelado" },
  ];
  return (
    <Flex w={"100%"} direction={"column"} gap={5}>
      <Flex gap={4}>
        <Flex flex={1}>
          <InputGenerico
            registerForm={registerForm}
            nomeInput={"ID"}
            propName={"id_atividade"}
            value={registerForm.values.id_atividade}
            required={false}
            placeholder={"ID"}
            maxLength={100}
            isDisabled={true}
          />
        </Flex>
        <Flex flex={2}>
          <InputGenerico
            registerForm={registerForm}
            nomeInput={"NOME"}
            propName={"nome_atividade"}
            value={registerForm.values.nome_atividade}
            required={false}
            placeholder={"Nome"}
            maxLength={100}
          />
        </Flex>
        <Flex flex={1}>
          <InputNumericoGenerico
            registerForm={registerForm}
            propName={"pct_real"}
            nomeInput={"PORCENTAGEM CONCLUÍDA"}
            tipo={"porcentagem"}
            stepper={true}
          />
        </Flex>
      </Flex>
      <Flex gap={4}>
        <InputNumericoGenerico
          registerForm={registerForm}
          propName={"hrs_reais"}
          nomeInput={"DURAÇÃO"}
          tipo={"hora"}
          stepper={false}
        />
        <SelectFiltragem
          registerForm={registerForm}
          nomeSelect={"STATUS"}
          propName={"status_id"}
          options={optionsStatusMock}
          value={getSelectFiltragemValue(
            optionsStatusMock,
            "status_id",
            registerForm
          )}
        />
        <DatePickerGenerico
          nomeLabel={"DATA INÍCIO"}
          registerForm={registerForm}
          propName={"inicio_realizado"}
          data={registerForm.values.inicio_realizado}
          selecionaHorario={true}
        />
        <DatePickerGenerico
          isDisabled={registerForm.values.pct_real !== 100}
          nomeLabel={"DATA FIM"}
          registerForm={registerForm}
          propName={"fim_realizado"}
          data={registerForm.values.fim_realizado}
          selecionaHorario={true}
        />
      </Flex>
    </Flex>
  );
}

export default EditarAtividadeTabGeral;
