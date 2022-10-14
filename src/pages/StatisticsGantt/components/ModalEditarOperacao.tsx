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
  NumberInput,
  NumberInputField,
  useBreakpointValue,
} from "@chakra-ui/react";

// import Restricoes from "pages/Infographics/Components/Restricoes";

import BotaoAzulPrimary from "components/BotaoAzul/BotaoAzulPrimary";
import BotaoVermelhoGhost from "components/BotaoVermelho/BotaoVermelhoGhost";
// import SelectFiltragem from "components/SelectFiltragem";

// import PopOverRelacao from "./PopOverRelacao";

// import AtividadesDragAndDrop from "./AtividadesDragAndDrop";
import DateTimePicker from "./DateTimePicker";

// interface Responsavel {
//   id: number;
//   nome: string;
// }

function ModalAdicionarOperacao({
  setRefresh,
  refresh,
  editOp,
  listaResponsaveis,
  listaAreaAtuacao,
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
    // console.log(">>>>editOp", editOp);
    registerForm.setFieldValue("id_atividade", editOp.id_atividade);
    registerForm.setFieldValue("nome_atividade", editOp.nome_atividade);
    // registerForm.setFieldValue("id_responsavel", editOp.id_responsavel);
    registerForm.setFieldValue("inicio_planejado", editOp.inicio_planejado);
    registerForm.setFieldValue("inicio_realizado", editOp.inicio_realizado);
    registerForm.setFieldValue("fim_planejado", editOp.fim_planejado);
    registerForm.setFieldValue("fim_realizado", editOp.fim_realizado);
    registerForm.setFieldValue("hrs_totais", editOp.hrs_totais);
    registerForm.setFieldValue("hrs_reais", editOp.hrs_reais);
    registerForm.setFieldValue("pct_real", editOp.pct_real);
  }, [editOp]);

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
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            backgroundColor={"#2E69FD"}
            borderTopRadius={7}
            display={"flex"}
            justifyContent={"center"}
            color={"white"}
            fontSize={"1em"}
          >
            Editar Operação
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
                gap={5}
              >
                <Flex flex={1} direction={"column"}>
                  <Text fontWeight={"bold"}>Nome</Text>
                  <Flex gap={5} flex={1}>
                    <Flex direction={"column"} flex={2}>
                      <Input
                        isDisabled
                        value={registerForm.values.nome_atividade || ""}
                        type="text"
                        name="nome_atividade"
                      />
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

                <Flex flex={1} direction={"column"}>
                  <Text fontWeight={"bold"}>Datas</Text>
                  <Flex gap={5}>
                    <Flex>
                      <DateTimePicker
                        registerForm={registerForm}
                        value={"inicio_planejado"}
                        label={"INÍCIO PLANEJADO"}
                        required={true}
                        data={registerForm.values.inicio_planejado}
                      />
                    </Flex>
                    <Flex>
                      <DateTimePicker
                        registerForm={registerForm}
                        value={"fim_planejado"}
                        label={"FIM PLANEJADO"}
                        required={true}
                        data={registerForm.values.fim_planejado}
                      />
                    </Flex>
                  </Flex>
                  <Flex gap={5}>
                    <Flex>
                      <DateTimePicker
                        registerForm={registerForm}
                        value={"inicio_realizado"}
                        label={"INÍCIO REAL"}
                        required={false}
                        data={registerForm.values.inicio_realizado}
                      />
                    </Flex>
                    <Flex>
                      <DateTimePicker
                        registerForm={registerForm}
                        value={"fim_realizado"}
                        label={"FIM REAL"}
                        required={false}
                        data={registerForm.values.fim_realizado}
                      />
                    </Flex>
                  </Flex>
                  <Flex flex={1} direction={"column"}>
                    <Text fontWeight={"bold"}>Progresso</Text>
                    <Flex gap={5}>
                      <Flex>
                        <NumberInput
                          max={100}
                          min={0}
                          id={"pct_real"}
                          name={"pct_real"}
                          value={registerForm.values.pct_real}
                          onChange={(value) => {
                            registerForm.setFieldValue(
                              "pct_real",
                              Number(value)
                            );
                          }}
                        >
                          <NumberInputField bg={"#fff"} h={"56px"} />
                        </NumberInput>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Flex gap={2}>
                <BotaoVermelhoGhost
                  text="Cancelar"
                  onClose={onClose}
                  formikForm={registerForm}
                />
                <BotaoAzulPrimary
                  text="Concluir Cadastro"
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

export default ModalAdicionarOperacao;
