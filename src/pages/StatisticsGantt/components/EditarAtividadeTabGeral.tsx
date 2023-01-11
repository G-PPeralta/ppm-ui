import { useEffect, useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

import { Flex, IconButton, Text } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import DatePickerModal from "components/DatePickerGenerico/DatePickerModal";
// import DatePickerGenerico from "components/DatePickerGenerico";
// import DatePickerGenericoDesabilitado from "components/DatePickerGenericoDesabilitado";
import InputGenerico from "components/InputGenerico";
import InputGenericoDesabilitado from "components/InputGenericoDesabilitado";
import InputNumericoGenerico from "components/InputNumericoGenerico";

// import { regexNumerosEPonto } from "utils/regexPontoENumero";

import { ModalFiltrarDuracaoMedia } from "./ModalFiltrarDuracaoMedia";

interface Props {
  registerForm: any;
  data: any;
  sondaN: any;
  pocoN: any;
}

function EditarAtividadeTabGeral({ registerForm, sondaN }: Props) {
  const [mediaHorasFiltradas, setMediaHorasFiltradas] = useState<any>(0);
  const [hrsTotais, setHrsTotais] = useState<any>(
    registerForm.values.hrs_totais
  );
  const [hrsReais, setHrsReais] = useState<any>(registerForm.values.hrs_reais);
  const [date, setDate] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    registerForm.setFieldValue(
      "hrs_totais",
      mediaHorasFiltradas === 0
        ? registerForm.values.hrs_totais
        : mediaHorasFiltradas
    );
  }, [mediaHorasFiltradas]);

  const flag = sondaN.atividades.find(
    (s: any) => s.id_atividade === registerForm.values.id_atividade
  )?.flag;

  // console.log("dados flag ---> ", sondaN.atividades);
  // console.log("dados flag ---> ", flag);

  // para entrar no formulário para envio ao backend
  useEffect(() => {
    registerForm.setFieldValue("flag", flag);
  }, []);

  useEffect(() => {
    registerForm.setFieldValue("hrs_totais", hrsTotais);
  }, [hrsTotais]);

  useEffect(() => {
    registerForm.setFieldValue("hrs_reais", hrsReais);
  }, [hrsReais]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [sondaN]);

  const handleClickIncrement = (hrsTotais: number) => {
    let counter = 0;
    counter += 1;
    const increase = hrsTotais ? hrsTotais + counter : counter;
    setHrsTotais(increase);
    return increase;
  };

  const handleClickDecrement = (hrsTotais: number) => {
    let counter = 0;
    counter -= 1;
    const decrease = Number(hrsTotais) + counter;
    setHrsTotais(decrease);
    return decrease;
  };

  const handleClickIncrementReal = (hrsReais: number) => {
    let counter = 0;
    counter += 1;
    const increase = hrsReais ? hrsReais + counter : counter;
    setHrsReais(increase);
    return increase;
  };

  const handleClickDecrementReal = (hrsReais: number) => {
    let counter = 0;
    counter -= 1;
    const decrease = hrsReais + counter;
    setHrsReais(decrease);
    return decrease;
  };

  useEffect(() => {
    setDate(registerForm.values.inicio_realizado);
    const hrs_reais: any = sessionStorage.getItem(
      "hrs_totais_" + registerForm.values.id_atividade
    );

    // console.log(
    //   "dados REGRA --> ",
    //   +hrs_reais !== registerForm.values.hrs_reais
    // );

    let statehrsEditado: number = 0;
    // console.log("Dados hrs_reais --->", +hrs_reais);
    // console.log("Dados register hrs --->", +registerForm.values.hrs_reais);
    if (+hrs_reais !== +registerForm.values.hrs_reais) {
      statehrsEditado = 1;
    } else {
      statehrsEditado = 0;
    }
    const pct_real: any = sessionStorage.getItem(
      "pct_real_" + registerForm.values.id_atividade
    );

    // console.log(
    //   "dados REGRA 2 ---> ",
    //   +pct_real !== registerForm.values.pct_real
    // );

    let statepctEditado: number = 0;
    if (+pct_real !== +registerForm.values.pct_real) {
      statepctEditado = 1;
    } else {
      statepctEditado = 0;
    }

    // console.log("Dados Pct --->", statepctEditado);
    // console.log("Dados hrs --->", statehrsEditado);
    const intTotal = +statepctEditado + +statehrsEditado;
    // console.log("Dados Total ---> ", intTotal);
    // console.log("dados " + statepctEditado + statehrsEditado);
    if (intTotal > 0) {
      registerForm.setFieldValue("realEditado", 1);
    } else {
      registerForm.setFieldValue("realEditado", 0);
    }
  }, [registerForm.values]);

  return (
    <>
      <Flex>
        {loading ? (
          <Flex justify={"center"} gap={4} w={"100%"}>
            <Ring speed={2} lineWeight={5} color="blue" size={64} />
          </Flex>
        ) : (
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
            <Flex gap={4} w={"76.5%"} mb={2}>
              <Flex align={"end"} w={"56.4%"}>
                {/* <InputNumericoGenerico
                  registerForm={registerForm}
                  propName={"hrs_totais"}
                  nomeInput={"DURAÇÃO"}
                  tipo={"hora"}
                  step={0.5}
                  stepper={true}
                  limite={1000}
                  // isDisabled={registerForm.values.inicio_real || flag === 1}
                  isDisabled={!(flag === 1 || flag === 0)}
                /> */}

                <InputGenerico
                  value={hrsTotais || registerForm.values.hrs_totais}
                  registerForm={registerForm}
                  propName={"hrs_totais"}
                  nomeInput={"DURAÇÃO"}
                  maxLength={1000000}
                  isDisabled={!(flag === 1 || flag === 0)}
                />
                <Flex flexDir={"column"} w={"14px"}>
                  <IconButton
                    borderLeft={"50px solid #D6D4D4"}
                    onClick={() => {
                      handleClickIncrement(registerForm.values.hrs_totais);
                    }}
                    color={"black"}
                    fontWeight={"700"}
                    border={"#e6e6e6 1px solid"}
                    borderColor={"#e6e6e6"}
                    backgroundColor={"transparent"}
                    aria-label="Decrease button"
                    _hover={{
                      backgroundColor: "transparent",
                      color: "black",
                    }}
                    h={"28px"}
                    w={"10%"}
                    borderRadius={"2px"}
                  >
                    <AiFillCaretUp size={16} />
                  </IconButton>

                  <IconButton
                    onClick={() => {
                      handleClickDecrement(registerForm.values.hrs_totais);
                    }}
                    color={"black"}
                    fontWeight={"700"}
                    border={"#e6e6e6 0.5px solid"}
                    backgroundColor={"transparent"}
                    aria-label="Decrease button"
                    _hover={{
                      backgroundColor: "transparent",
                      color: "black",
                    }}
                    h={"28px"}
                    w={"14px"}
                    borderRadius={"3px"}
                  >
                    <AiFillCaretDown size={16} />
                  </IconButton>
                </Flex>
              </Flex>

              <Flex align={"end"} ml={6}>
                <ModalFiltrarDuracaoMedia
                  setMediaHorasFiltradas={setMediaHorasFiltradas}
                />
              </Flex>

              <DatePickerModal
                nomeLabel={"DATA INÍCIO"}
                registerForm={registerForm}
                propName={"inicio_planejado"}
                data={registerForm.values.inicio_planejado}
                selecionaHorario={true}
                // isDisabled={registerForm.values.inicio_real || flag === 1}
                isDisabled={!(flag === 1)}
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
                  <Flex align={"end"} direction={"row"} w={"80.2%"}>
                    {/* <InputNumericoGenerico
                    registerForm={registerForm}
                    propName={"hrs_reais"}
                    nomeInput={"DURAÇÃO"}
                    tipo={"hora"}
                    step={0.5}
                    stepper={true}
                    limite={1000}
                    // isDisabled={flag === 0}
                    isDisabled={registerForm.values.pct_real === 100}
                  /> */}

                    <InputGenerico
                      value={hrsReais || registerForm.values.hrs_reais}
                      registerForm={registerForm}
                      propName={"hrs_reais"}
                      nomeInput={"DURAÇÃO"}
                      maxLength={1000000}
                      isDisabled={registerForm.values.pct_real === 100}
                    />
                    <Flex flexDir={"column"}>
                      <IconButton
                        borderLeft={"50px solid #D6D4D4"}
                        onClick={() => {
                          handleClickIncrementReal(
                            registerForm.values.hrs_reais
                          );
                        }}
                        color={"black"}
                        fontWeight={"700"}
                        border={"#e6e6e6 1px solid"}
                        borderColor={"#e6e6e6"}
                        backgroundColor={"transparent"}
                        aria-label="Decrease button"
                        _hover={{
                          backgroundColor: "transparent",
                          color: "black",
                        }}
                        h={"28px"}
                        w={"10%"}
                        borderRadius={"2px"}
                      >
                        <AiFillCaretUp size={16} />
                      </IconButton>

                      <IconButton
                        onClick={() => {
                          handleClickDecrementReal(
                            registerForm.values.hrs_reais
                          );
                        }}
                        color={"black"}
                        fontWeight={"700"}
                        border={"#e6e6e6 0.5px solid"}
                        backgroundColor={"transparent"}
                        aria-label="Decrease button"
                        _hover={{
                          backgroundColor: "transparent",
                          color: "black",
                        }}
                        h={"28px"}
                        w={"14px"}
                        borderRadius={"3px"}
                      >
                        <AiFillCaretDown size={16} />
                      </IconButton>
                    </Flex>
                  </Flex>
                  {/* <Input value={mediaHorasFiltradas} /> */}

                  <DatePickerModal
                    nomeLabel={"DATA INÍCIO REAL"}
                    registerForm={registerForm}
                    propName={"inicio_realizado"}
                    data={date}
                    selecionaHorario={true}
                    // isDisabled={flag === 0 || registerForm.values.pct_real === 100}
                    isDisabled={!(flag === 1 || flag === 2)}
                  />
                </Flex>
                <DatePickerModal
                  nomeLabel={"DATA FIM REAL"}
                  registerForm={registerForm}
                  propName={"fim_realizado"}
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
                    nomeInput={"% CONCLUSÃO"}
                    tipo={"porcentagem"}
                    stepper={true}
                    isDisabled={flag === 3}
                    step={100}
                    // isDisabled={flag === 0}
                    // isDisabled={registerForm.values.pct_real === 100}
                  />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        )}
      </Flex>
    </>
  );
}

export default EditarAtividadeTabGeral;
