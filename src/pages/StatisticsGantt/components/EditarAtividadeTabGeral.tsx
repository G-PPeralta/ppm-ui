import { Flex, Text } from "@chakra-ui/react";

import DatePickerModal from "components/DatePickerGenerico/DatePickerModal";
// import DatePickerGenerico from "components/DatePickerGenerico";
// import DatePickerGenericoDesabilitado from "components/DatePickerGenericoDesabilitado";
import InputGenerico from "components/InputGenerico";
import InputGenericoDesabilitado from "components/InputGenericoDesabilitado";
import InputNumericoGenerico from "components/InputNumericoGenerico";

interface Props {
  registerForm: any;
  data: any;
  sondaN: any;
  pocoN: any;
}

function EditarAtividadeTabGeral({ registerForm, sondaN }: Props) {
  // console.log(registerForm.values);

  // console.log(data);

  // console.log(sondaN);

  const flag = sondaN.atividades.find(
    (s: any) => s.nome_atividade === registerForm.values.nome_atividade
  ).flag;

  // console.log(flag);

  return (
    <Flex w={"100%"} direction={"column"} gap={5}>
      <Flex gap={4} w={"80%"}>
        <Flex flex={1}>
          <InputGenericoDesabilitado
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
        {/* <Flex flex={1}>
          <InputNumericoGenerico
            registerForm={registerForm}
            propName={"pct_real"}
            nomeInput={"PORCENTAGEM CONCLUÍDA"}
            tipo={"porcentagem"}
            stepper={true}
            step={100}
          />
        </Flex> */}
      </Flex>
      <Flex gap={4} w={"70%"} mb={2}>
        <InputNumericoGenerico
          registerForm={registerForm}
          propName={"hrs_reais"}
          nomeInput={"DURAÇÃO"}
          tipo={"hora"}
          stepper={false}
          limite={1000}
          isDisabled={registerForm.values.inicio_real}
        />

        <DatePickerModal
          nomeLabel={"DATA INÍCIO"}
          registerForm={registerForm}
          propName={"inicio_realizado"}
          data={registerForm.values.inicio_realizado}
          selecionaHorario={true}
          isDisabled={registerForm.values.inicio_real}
        />
        <DatePickerModal
          // isDisabled={registerForm.values.pct_real === 100}
          nomeLabel={"DATA FIM"}
          registerForm={registerForm}
          propName={"fim_realizado"}
          data={registerForm.values.fim_realizado}
          selecionaHorario={true}
          isDisabled={registerForm.values.inicio_real}
        />
      </Flex>
      <hr />
      <Text fontWeight={"700"} color={"black"} mt={-3} mb={1}>
        Acompanhamento da Atividade
      </Text>
      <Flex direction={"row"}>
        <Flex direction={"row"} gap={4} w={"100%"}>
          <Flex direction={"row"} w={"52.2%"} gap={4}>
            <InputNumericoGenerico
              registerForm={registerForm}
              propName={"hrs_reais"}
              nomeInput={"DURAÇÃO"}
              tipo={"hora"}
              stepper={false}
              limite={1000}
              isDisabled={flag === 0}
            />

            <DatePickerModal
              nomeLabel={"DATA INÍCIO REAL"}
              registerForm={registerForm}
              propName={"inicio_real"}
              data={
                registerForm.values.inicio_real
                  ? registerForm.values.inicio_real
                  : registerForm.values.inicio_realizado
              }
              selecionaHorario={true}
              isDisabled={flag === 0 || registerForm.values.pct_real === 100}
            />
          </Flex>
          <DatePickerModal
            nomeLabel={"DATA FIM REAL"}
            registerForm={registerForm}
            propName={"fim_real"}
            data={
              registerForm.values.inicio_real !== ""
                ? new Date(
                    registerForm.values.inicio_real.getTime() +
                      60 * 60 * (registerForm.values.hrs_reais * 1000)
                  )
                : registerForm.values.fim_realizado
            }
            // data={registerForm.values.inicio_real}
            selecionaHorario={true}
            isDisabled
          />
          <Flex w={"18%"}>
            <InputNumericoGenerico
              registerForm={registerForm}
              propName={"pct_real"}
              nomeInput={"PORCENTAGEM CONCLUÍDA"}
              tipo={"porcentagem"}
              stepper={true}
              // step={100}
              isDisabled={flag === 0}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default EditarAtividadeTabGeral;
