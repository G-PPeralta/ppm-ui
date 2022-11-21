import { useEffect } from "react";
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
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import BotaoAzulPrimary from "components/BotaoAzul/BotaoAzulPrimary";
import BotaoVermelhoGhost from "components/BotaoVermelho/BotaoVermelhoGhost";
import InputNumericoGenerico from "components/InputNumericoGenerico";
import SelectFiltragem from "components/SelectFiltragem";

import { formataParaTipo } from "utils/FormataParaTipo";

import { useDetalhamentoProjeto } from "contexts/DetalhamentoDeProjetos";

import { getGanttData } from "services/get/Gantt";

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

function ModalEditarAtividade({
  setRefresh,
  refresh,
  editAtividade,
  isOpen,
  onClose,
  registerForm,
  loading,
}: any) {
  const { id } = useParams();
  const { areaResponsavel } = useDetalhamentoProjeto();

  const getValue = (options: any[], chave: string) => {
    const index = options
      .map(({ value }) => value)
      .indexOf(registerForm?.values?.[chave]);

    return {
      value: options?.[index]?.value,
      label: options?.[index]?.label,
    };
  };

  const asyncGet = async () => {
    const reqGanttData = await getGanttData(Number(id));
    const item = getObject(reqGanttData.data, editAtividade.id_atividade);
    const responsavelId = areaResponsavel.data.find(
      (areaResponsavel: any) =>
        areaResponsavel.nom_responsavel === item.Responsavel
    )?.id;

    // console.log("responsavelId", responsavelId);
    registerForm.setFieldValue("id_atividade", editAtividade.id_atividade);
    registerForm.setFieldValue("nome_atividade", editAtividade.nome_atividade);
    registerForm.setFieldValue("inicio_realizado", new Date(item.StartDate));
    registerForm.setFieldValue("fim_realizado", new Date(item.EndDate));
    registerForm.setFieldValue("duracao_dias", item.Duration);
    registerForm.setFieldValue("pct_real", editAtividade.pct_real);
    registerForm.setFieldValue("inicio_planejado", item.StartDatePlan);
    registerForm.setFieldValue("responsavel_id", responsavelId);
    registerForm.setFieldValue("inicio_planejado", item.BaselineStartDate);
    registerForm.setFieldValue("fim_planejado", item.BaselineEndDate);
  };

  // console.log("registerForm", registerForm.values);

  const addDays = (date: any, days: any) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  useEffect(() => {
    asyncGet();
  }, [editAtividade]);

  // console.log(
  //   "registerForm.values.inicio_planejado",
  //   registerForm.values.inicio_planejado
  // );
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
                            fontFamily={"Mulish"}
                            border={"1px solid #949494"}
                            mt={"-9px"}
                            width={"328px"}
                            color={"black"}
                            height={"56px"}
                            isDisabled
                            value={registerForm.values.nome_atividade || ""}
                            type="text"
                            name="nome_atividade"
                            id="nome_atividade"
                          />
                        </FormControl>
                        <Flex w={"328px"}>
                          <SelectFiltragem
                            registerForm={registerForm}
                            nomeSelect={"ÁREA RESPONSÁVEL"}
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
                        value={"inicio_planejado"}
                        label={"INÍCIO PLANEJADO"}
                        required={false}
                        data={registerForm.values.inicio_planejado}
                      />
                    </Flex>
                    <Flex flex={1}>
                      <DateTimePicker
                        registerForm={registerForm}
                        value={"fim_planejado"}
                        label={"FIM PLANEJADO"}
                        required={false}
                        data={registerForm.values.fim_planejado}
                        isDisabled={true}
                      />
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
                      max={999999999999}
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
                  <Flex flex={1} direction={"column"}>
                    <Flex>
                      <Flex flex={1} mt={4} mb={2}>
                        <DateTimePicker
                          registerForm={registerForm}
                          value={"inicio_realizado"}
                          label={"INÍCIO REALIZADO"}
                          required={false}
                          data={registerForm.values.inicio_realizado}
                        />
                      </Flex>
                      <Flex flex={1} mt={4} mb={2}>
                        <DateTimePicker
                          registerForm={registerForm}
                          value={"fim_realizado"}
                          label={"FIM REALIZADO"}
                          required={false}
                          data={registerForm.values.fim_realizado}
                          dataMin={registerForm.values.inicio_realizado}
                          isDataFim={true}
                        />
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex flex={1} direction={"column"}>
                    <Flex mt={-1} width={"328px"}>
                      <InputNumericoGenerico
                        registerForm={registerForm}
                        propName={"pct_real"}
                        nomeInput={"PORCENTAGEM CONCLUÍDA"}
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
                <BotaoAzulPrimary
                  text="Concluir"
                  onClose={onClose}
                  formikForm={registerForm}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  loading={loading}
                />
              </Flex>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalEditarAtividade;
