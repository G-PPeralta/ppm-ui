import { useEffect, useState } from "react";

import { Flex, Text } from "@chakra-ui/react";

import DatePickerModal from "components/DatePickerGenerico/DatePickerModal";
// import DatePickerGenerico from "components/DatePickerGenerico";
// import DatePickerGenericoDesabilitado from "components/DatePickerGenericoDesabilitado";
import InputGenerico from "components/InputGenerico";
import InputGenericoDesabilitado from "components/InputGenericoDesabilitado";
import InputNumericoGenerico from "components/InputNumericoGenerico";

import { ModalFiltrarDuracaoMedia } from "./ModalFiltrarDuracaoMedia";

interface Props {
  registerForm: any;
  data: any;
  sondaN: any;
  pocoN: any;
}

function EditarAtividadeTabGeral({ registerForm, sondaN }: Props) {
  const [mediaHorasFiltradas, setMediaHorasFiltradas] = useState<any>(0);
  const [date, setDate] = useState<any>();

  // console.log(registerForm.values);

  useEffect(() => {
    registerForm.setFieldValue(
      "hrs_totais",
      mediaHorasFiltradas === 0
        ? registerForm.values.hrs_totais
        : mediaHorasFiltradas
    );
  }, [mediaHorasFiltradas]);

  // useEffect(() => {
  //   registerForm.setFieldValue("hrs_totais", registerForm.values.hrs_reais);
  // }, [mediaHorasFiltradas]);

  // console.log(mediaHorasFiltradas);

  useEffect(() => {
    setDate(registerForm.values.inicio_realizado);
  }, [registerForm.values]);

  const flag = sondaN.atividades.find(
    (s: any) => s.nome_atividade === registerForm.values.nome_atividade
  ).flag;

  // para entrar no formulário para envio ao backend
  useEffect(() => {
    registerForm.setFieldValue("flag", flag);
  }, []);

  console.log("Dados --> ", registerForm.values);
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
            isDisabled={false}
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
      <Flex gap={4} w={"76.7%"} mb={2}>
        <InputNumericoGenerico
          registerForm={registerForm}
          propName={"hrs_totais"}
          nomeInput={"DURAÇÃO"}
          tipo={"hora"}
          stepper={false}
          limite={1000}
          // isDisabled={registerForm.values.inicio_real || flag === 1}
          isDisabled={flag === 1}
        />

        <Flex align={"end"}>
          <ModalFiltrarDuracaoMedia
            setMediaHorasFiltradas={setMediaHorasFiltradas}
          />
        </Flex>

        <DatePickerModal
          nomeLabel={"DATA INÍCIO"}
          registerForm={registerForm}
          propName={"inicio_planejado"}
          data={date}
          selecionaHorario={true}
          // isDisabled={registerForm.values.inicio_real || flag === 1}
          isDisabled={flag === 1}
        />
        <DatePickerModal
          // isDisabled={registerForm.values.pct_real === 100}
          nomeLabel={"DATA FIM"}
          registerForm={registerForm}
          propName={"fim_planejado"}
          selecionaHorario={true}
          data={
            new Date(
              registerForm.values.inicio_planejado.getTime() +
                60 * 60 * (registerForm.values.hrs_totais * 1000)
            )
          }
          // isDisabled={registerForm.values.inicio_real || flag === 1}
          isDisabled={true}
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
              // isDisabled={flag === 0}
              isDisabled={false}
            />
            {/* <Input value={mediaHorasFiltradas} /> */}

            <DatePickerModal
              nomeLabel={"DATA INÍCIO REAL"}
              registerForm={registerForm}
              propName={"inicio_realizado"}
              data={date}
              selecionaHorario={true}
              // isDisabled={flag === 0 || registerForm.values.pct_real === 100}
              isDisabled={flag === 0}
            />
          </Flex>
          <DatePickerModal
            nomeLabel={"DATA FIM REAL"}
            registerForm={registerForm}
            propName={"fim_real"}
            data={
              registerForm.values.inicio_real
                ? new Date(
                    registerForm.values.inicio_realizado.getTime() +
                      60 * 60 * (registerForm.values.hrs_reais * 1000)
                  )
                : new Date(
                    registerForm.values.inicio_realizado.getTime() +
                      60 * 60 * (registerForm.values.hrs_reais * 1000)
                  )
            }
            // data={registerForm.values.inicio_real}
            selecionaHorario={true}
            isDisabled={true}
          />
          <Flex w={"18%"}>
            <InputNumericoGenerico
              registerForm={registerForm}
              propName={"pct_real"}
              nomeInput={"PORCENTAGEM CONCLUÍDA"}
              tipo={"porcentagem"}
              stepper={true}
              // step={100}
              // isDisabled={flag === 0}
              // isDisabled={registerForm.values.pct_real === 100}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default EditarAtividadeTabGeral;
