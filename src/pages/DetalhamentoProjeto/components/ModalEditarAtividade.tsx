import { useEffect } from "react";

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
  // NumberInput,
  // NumberInputField,
  useBreakpointValue,
  FormLabel,
  FormControl,
  ModalCloseButton,
} from "@chakra-ui/react";

// import Restricoes from "pages/Infographics/Components/Restricoes";

import BotaoAzulPrimary from "components/BotaoAzul/BotaoAzulPrimary";
import BotaoVermelhoGhost from "components/BotaoVermelho/BotaoVermelhoGhost";
import InputNumericoGenerico from "components/InputNumericoGenerico";

import { getGanttData } from "services/get/Gantt";

import DateTimePicker from "./DateTimePicker";

// interface Responsavel {
//   id: number;
//   nome: string;
// }

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
  // listaResponsaveis,
  // listaAreaAtuacao,
  isOpen,
  onClose,
  registerForm,
  loading,
}: any) {
  // const responsaveisOptions = listaResponsaveis.map(
  //   (responsavel: Responsavel) => ({
  //     value: responsavel.id,
  //     label: responsavel.nome,
  //   })
  // );

  // const areaAtuacaoOptions = listaAreaAtuacao.map((area: any) => ({
  //   value: area.id,
  //   label: area.tipo,
  // }));

  useEffect(() => {
    asyncGet();
  }, [editAtividade]);

  // const asyncGet = async () => {
  //   const reqGanttData = await getGanttData(Number("24"));
  //   console.log("reqGanttData", reqGanttData.data);
  //   const item = reqGanttData.data.map((val: any) => {
  //     if (val.TaskID == editAtividade.id_atividade) {
  //       return val;
  //     } else {
  //       return val.subtasks
  //         .map((val2: any) => {
  //           if (val2.TaskID == editAtividade.id_atividade) {
  //             return val2;
  //           } else {
  //             return null;
  //           }
  //         })
  //         .filter((val: any) => val !== null)[0];
  //     }
  //   });
  //   console.log("item", item[0]);
  //   registerForm.setFieldValue("id_atividade", editAtividade.id_atividade);
  //   registerForm.setFieldValue("nome_atividade", editAtividade.nome_atividade);
  //   registerForm.setFieldValue("inicio_realizado", item[0].StartDate);
  //   registerForm.setFieldValue("fim_realizado", item[0].EndDate);
  //   registerForm.setFieldValue("pct_real", editAtividade.pct_real);
  // };

  const asyncGet = async () => {
    const reqGanttData = await getGanttData(Number("24"));
    const item = getObject(reqGanttData.data, editAtividade.id_atividade);
    registerForm.setFieldValue("id_atividade", editAtividade.id_atividade);
    registerForm.setFieldValue("nome_atividade", editAtividade.nome_atividade);
    registerForm.setFieldValue("inicio_realizado", item.StartDate);
    registerForm.setFieldValue("fim_realizado", item.EndDate);
    registerForm.setFieldValue("pct_real", editAtividade.pct_real);
  };

  return (
    <>
      {/* <Button
        h={"56px"}
        borderRadius={"10px"}
        background={"white"}
        color={"origem.500"}
        onClick={onOpen}
        _hover={{
          background: "origem.500",
          transition: "all 0.4s",
          color: "white",
        }}
      >
        Editar Operação
      </Button> */}
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
            // h={"48px"}
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
              <Flex
                flexDirection={useBreakpointValue({
                  base: "column",
                  md: "column",
                })}
                gap={3}
              >
                <Flex flex={1} direction={"column"}>
                  {/* <Text fontWeight={"bold"}>Nome</Text> */}
                  <Flex flex={1}>
                    <Flex direction={"column"} flex={2}>
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
                    </Flex>
                  </Flex>
                </Flex>

                {/* <Flex flex={1} direction={"column"}>
                  <Text fontWeight={"bold"}>Responsável</Text>
                  <Flex gap={5} flex={1}>
                    <SelectFiltragem
                      registerForm={registerForm}
                      nomeSelect={"RESPONSÁVEL"}
                      propName={"id_responsavel"}
                      options={responsaveisOptions}
                      required={true}
                    />

                    <SelectFiltragem
                      registerForm={registerForm}
                      nomeSelect={"ÁREA"}
                      propName={"id_area"}
                      options={areaAtuacaoOptions}
                      required={true}
                    />
                  </Flex>
                </Flex> */}

                <Flex flex={1} direction={"column"} mt={-3} mb={-3}>
                  {/* <Text fontWeight={"bold"}>Datas</Text> */}
                  {/* <Flex>
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
                      />
                    </Flex>
                  </Flex> */}
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
                      />
                    </Flex>
                  </Flex>
                </Flex>
                <Flex flex={1} direction={"column"}>
                  {/* <Text fontWeight={"bold"}>Progresso</Text> */}
                  <Flex mt={-1} w={"76%"}>
                    {/* <Flex>
                      <NumberInput
                        max={100}
                        min={0}
                        id={"pct_real"}
                        name={"pct_real"}
                        value={registerForm.values.pct_real}
                        onChange={(value) => {
                          registerForm.setFieldValue("pct_real", Number(value));
                        }}
                      >
                        <NumberInputField bg={"#fff"} h={"56px"} />
                      </NumberInput>
                    </Flex> */}
                    <InputNumericoGenerico
                      registerForm={registerForm}
                      propName={"pct_real"}
                      nomeInput={"PORCENTAGEM CONCLUÍDA"}
                      tipo={"porcentagem"}
                      stepper={true}
                    />
                  </Flex>
                </Flex>
                {/* <Flex
                  flexDirection={useBreakpointValue({
                    base: "column",
                    md: "column",
                  })}
                  gap={2}
                >
                  <Text fontWeight={"bold"}>Restrições</Text>
                  <Restricoes registerForm={registerForm} />
                </Flex> */}

                {/* <AtividadesDragAndDrop
                  registerForm={registerForm}
                  atividades={relacoesOptions}
                /> */}
              </Flex>
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
                  text="Cadastrar"
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
