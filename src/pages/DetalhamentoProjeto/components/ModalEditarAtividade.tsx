//  CRIADO EM: 06/2022
//  AUTOR: Eduardo Muchak.
//  DESCRIÇÃO DO ARQUIVO: Modal de editar atividade.

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Flex,
  Text,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormLabel,
  FormControl,
  ModalCloseButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Button,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { EditarAtividade } from "interfaces/EditarAtividadeDe";

import BotaoVermelhoGhost from "components/BotaoVermelho/BotaoVermelhoGhost";
import InputNumericoGenerico from "components/InputNumericoGenerico";
import SelectFiltragem from "components/SelectFiltragem";

import { formataParaTipo } from "utils/FormataParaTipo";
import { formatDateToddMMyyyyhhmmCronograma } from "utils/formatDate";
import { handleCadastrarRefresh } from "utils/handleCadastro";

import { useDetalhamentoProjeto } from "contexts/DetalhamentoDeProjetos";

import { getGanttData } from "services/get/Gantt";

import DatePicker from "./DatePicker";
import DateTimePicker from "./DateTimePicker";

function getObject(theObject: any, id: any): any {
  let result = null;
  if (theObject instanceof Array) {
    for (let i = 0; i < theObject.length; i++) {
      result = getObject(theObject[i], id);
      if (result) {
        break;
      }
    }
  } else {
    for (const prop in theObject) {
      if (prop == "TaskID") {
        if (theObject[prop] == id) {
          return theObject;
        }
      }
      if (
        theObject[prop] instanceof Object ||
        theObject[prop] instanceof Array
      ) {
        result = getObject(theObject[prop], id);
        if (result) {
          break;
        }
      }
    }
  }
  return result;
}

type Props = {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
  editAtividade: any | EditarAtividade;
  isOpen: any;
  onClose: () => void;
  registerForm: any;
  loading: boolean;
  setInfoProjetoRefresh: () => void;
  setEditAtividade: any;
};

function ModalEditarAtividade({
  setRefresh,
  refresh,
  editAtividade,
  isOpen,
  onClose,
  registerForm,
  loading,
  setInfoProjetoRefresh,
}: Props) {
  const { id } = useParams();
  const { areaResponsavel } = useDetalhamentoProjeto();
  const [render, setRender] = useState(false);

  const getValue = (options: any[], chave: string) => {
    const index = options
      .map(({ value }) => value)
      .indexOf(registerForm?.values?.[chave]);

    return {
      value: options?.[index]?.value,
      label: options?.[index]?.label,
    };
  };

  // console.log(editAtividade);

  const asyncGet = async () => {
    const reqGanttData = await getGanttData(Number(id));
    const item = getObject(reqGanttData.data, editAtividade.id_atividade);
    const responsavelId =
      areaResponsavel &&
      areaResponsavel.data.find(
        (areaResponsavel: any) =>
          areaResponsavel.nom_responsavel === item.Responsavel
      )?.id;

    const dat_ini_real = new Date(
      new Date(item.StartDate).getTime() + 3 * 3600 * 1000
    );
    const dat_fim_real = new Date(
      new Date(item.EndDate).getTime() + 3 * 3600 * 1000
    );
    const dat_ini_plan = new Date(
      new Date(item.BaselineStartDate).getTime() + 3 * 3600 * 1000
    );

    registerForm.setFieldValue("id_atividade", editAtividade.id_atividade);
    registerForm.setFieldValue("nome_atividade", editAtividade.nome_atividade);
    registerForm.setFieldValue("inicio_realizado", dat_ini_real);
    registerForm.setFieldValue("fim_realizado", dat_fim_real);
    registerForm.setFieldValue("duracao_dias", item.BaselineDuration);
    registerForm.setFieldValue("pct_real", editAtividade.pct_real);
    registerForm.setFieldValue("inicio_planejado", item.StartDatePlan);
    registerForm.setFieldValue("responsavel_id", responsavelId);
    registerForm.setFieldValue("macro_id", item.macro_id);
    registerForm.setFieldValue("inicio_planejado", dat_ini_plan);
    registerForm.setFieldValue("fim_planejado", item.BaselineEndDate);
  };

  const addDays = (date: any, days: any) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  // console.log(registerForm.values.pct_real);

  useEffect(() => {
    asyncGet();
  }, [editAtividade]);

  const macroOptions = [
    {
      value: 1,
      label: "Pré-Projeto",
    },
    {
      value: 2,
      label: "Engenharia",
    },
    {
      value: 3,
      label: "Suprimentos",
    },
    {
      value: 4,
      label: "C&M",
    },
  ];

  useEffect(() => {
    if (registerForm.values.pct_real === 100) {
      setRender(false);
      registerForm.setFieldValue("inicio_realizado", "");
      registerForm.setFieldValue("fim_realizado", "");
      setTimeout(() => setRender(true), 2000);
    }
  }, [registerForm.values.pct_real]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            backgroundColor={"#2E69FD"}
            borderTopRadius={7}
            display={"flex"}
            justifyContent={"center"}
            color={"white"}
            fontSize={"14px"}
            fontWeight={"700"}
          >
            Editar Atividade
          </ModalHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              registerForm.handleSubmit(e);
            }}
          >
            <ModalBody mt={3}>
              {!areaResponsavel.isLoading ? (
                <Flex flexDirection={"column"} gap={3}>
                  <Flex flex={1} direction={"column"}>
                    <Flex flex={1}>
                      <Flex direction={"column"} flex={2} gap={2}>
                        <FormControl>
                          <FormLabel htmlFor="nome_atividade">
                            <Text
                              color="#949494"
                              fontSize="12px"
                              fontWeight="700"
                              mt={"6px"}
                            >
                              NOME
                            </Text>
                          </FormLabel>
                          <Input
                            borderRadius={"8px"}
                            fontSize={"14px"}
                            fontWeight={"400"}
                            disabled={registerForm.values.pct_real === 100}
                            fontFamily={"Mulish"}
                            border={"0.5px solid #E2E8F0"}
                            mt={"-9px"}
                            width={"328px"}
                            color={"black"}
                            height={"56px"}
                            // isDisabled={registerForm.values.pct_real === 100}
                            value={registerForm.values.nome_atividade || ""}
                            onChange={registerForm.handleChange}
                            type="text"
                            name="nome_atividade"
                            id="nome_atividade"
                          />
                        </FormControl>
                        <Flex w={"328px"}>
                          <SelectFiltragem
                            registerForm={registerForm}
                            nomeSelect={"MACRO"}
                            propName={"macro_id"}
                            options={macroOptions}
                            required={false}
                            value={getValue(macroOptions, "macro_id")}
                          />
                        </Flex>
                        <Flex w={"328px"}>
                          <SelectFiltragem
                            registerForm={registerForm}
                            nomeSelect={"ÁREA RESPONSÁVEL"}
                            isDisabled={registerForm.values.pct_real === 100}
                            propName={"responsavel_id"}
                            options={areaResponsavel.data
                              .map((areaResponsavel: any) => ({
                                value: areaResponsavel.id,
                                label: areaResponsavel.nom_responsavel,
                              }))
                              .sort((a: any, b: any) =>
                                a.label.localeCompare(b.label)
                              )}
                            required={false}
                            value={getValue(
                              areaResponsavel.data
                                .map((areaResponsavel: any) => ({
                                  value: areaResponsavel.id,
                                  label: areaResponsavel.nom_responsavel,
                                }))
                                .sort((a: any, b: any) =>
                                  a.label.localeCompare(b.label)
                                ),
                              "responsavel_id"
                            )}
                          />
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>

                  <Flex flex={1} direction={"row"} mt={1} gap={3}>
                    <Flex flex={1}>
                      <DateTimePicker
                        registerForm={registerForm}
                        isDisabled={registerForm.values.pct_real === 100}
                        value={"inicio_planejado"}
                        label={"INÍCIO PLANEJADO"}
                        required={false}
                        data={registerForm.values.inicio_planejado}
                      />
                    </Flex>
                    <Flex direction={"column"}>
                      <Flex gap={1}>
                        <Text color="#949494" fontSize="12px" fontWeight="700">
                          FIM PLANEJADO
                        </Text>
                      </Flex>
                      <Button
                        disabled={true}
                        h={"56px"}
                        w={"100%"}
                        variant="outline"
                        px={5}
                        minW={"220px"}
                      >
                        {formatDateToddMMyyyyhhmmCronograma(
                          registerForm.values.fim_planejado,
                          "fim"
                        )}
                      </Button>
                    </Flex>
                  </Flex>
                  <Flex direction={"column"} width={"328px"} mb={-3}>
                    <Flex gap={1}>
                      <Text
                        fontWeight={"bold"}
                        fontSize={"12px"}
                        color={"#949494"}
                      >
                        DURAÇÃO PLANEJADA
                      </Text>
                    </Flex>
                    <NumberInput
                      h={"56px"}
                      placeholder="Duração em Dias"
                      id="duracao_dias"
                      name="duracao_dias"
                      isDisabled={registerForm.values.pct_real === 100}
                      max={999999999999}
                      min={1}
                      value={formataParaTipo(
                        "dias",
                        registerForm.values.duracao_dias
                      )}
                      onChange={(value) => {
                        registerForm.setFieldValue(
                          "duracao_dias",
                          Number(value)
                        );
                        registerForm.setFieldValue(
                          "fim_planejado",
                          addDays(
                            registerForm.values.inicio_planejado,
                            Number(value)
                          )
                        );
                      }}
                      w={"95%"}
                    >
                      <NumberInputField h={"56px"} />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Flex>
                  {registerForm.values.pct_real === 100 ? (
                    <Flex flex={1} direction={"column"}>
                      {render ? (
                        <Flex>
                          <Flex flex={1} mt={4} mb={2}>
                            <DatePicker
                              registerForm={registerForm}
                              value={"inicio_realizado"}
                              label={"INÍCIO REALIZADO"}
                              required={false}
                              data={registerForm.values.inicio_realizado}
                            />
                          </Flex>
                          <Flex flex={1} mt={4} mb={2}>
                            <DatePicker
                              registerForm={registerForm}
                              isDisabled={!registerForm.values.inicio_realizado}
                              value={"fim_realizado"}
                              label={"FIM REALIZADO"}
                              required={false}
                              data={registerForm.values.fim_realizado}
                              dataMin={registerForm.values.inicio_realizado}
                              isDataFim={true}
                            />
                          </Flex>
                        </Flex>
                      ) : undefined}
                    </Flex>
                  ) : undefined}
                  <Flex flex={1} direction={"column"}>
                    <Flex mt={-1} width={"328px"}>
                      <InputNumericoGenerico
                        registerForm={registerForm}
                        propName={"pct_real"}
                        nomeInput={"% CONCLUSÃO"}
                        tipo={"porcentagem"}
                        stepper={true}
                      />
                    </Flex>
                  </Flex>
                </Flex>
              ) : (
                <Flex align={"center"} justify={"center"} w={"100%"} h={"50vh"}>
                  <Ring speed={2} lineWeight={5} color="blue" size={64} />
                </Flex>
              )}
            </ModalBody>

            <ModalCloseButton color={"white"} />

            <ModalFooter justifyContent={"center"}>
              <Flex gap={2}>
                <BotaoVermelhoGhost
                  text="Cancelar"
                  onClose={onClose}
                  formikForm={registerForm}
                />
                <Button
                  h={"56px"}
                  isDisabled={
                    registerForm.values.pct_real === 100 &&
                    !registerForm.values.fim_realizado
                  }
                  w={"208px"}
                  borderRadius={"8px"}
                  background={"origem.500"}
                  variant="primary"
                  color="white"
                  onClick={() => {
                    handleCadastrarRefresh(
                      registerForm,
                      onClose,
                      setRefresh,
                      refresh
                    );
                    setInfoProjetoRefresh();
                  }}
                  _hover={{
                    background: "origem.600",
                    transition: "all 0.4s",
                  }}
                >
                  {
                    <>
                      <Text
                        fontSize="18px"
                        fontWeight={"700"}
                        fontFamily={"Mulish"}
                      >
                        Concluir
                      </Text>
                    </>
                  }
                </Button>
              </Flex>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalEditarAtividade;
