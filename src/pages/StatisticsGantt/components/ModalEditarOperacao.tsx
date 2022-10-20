import { useEffect, useState } from "react";

import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";

import BotaoAzulLargoPrimary from "components/BotaoAzulLargo/BotaoAzulLargoPrimary";
import BotaoVermelhoLargoGhost from "components/BotaoVermelhoLargo/BotaoVermelhoLargoGhost";

import { handleCancelar } from "utils/handleCadastro";

import BotoesTabs from "./BotoesTabs";
import EditarAtividadeTabAnotacoes from "./EditarAtividadeTabAnotacoes";
import EditarAtividadeTabCamposPersonalizados from "./EditarAtividadeTabCamposPersonalizados";
import EditarAtividadeTabGeral from "./EditarAtividadeTabGeral";
import EditarAtividadeTabLicoesAprendidas from "./EditarAtividadeTabLicoesAprendidas";
import EditarAtividadeTabMOC from "./EditarAtividadeTabMoc";

interface EditOp {
  fim_planejado?: Date;
  fim_realizado?: Date;
  hrs_reais?: number;
  hrs_totais?: number;
  id_atividade?: number;
  inicio_planejado?: Date;
  inicio_realizado?: Date;
  nome_atividade?: string;
  pct_real?: number;
}

interface Props {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
  editOp: EditOp;
  onClose: () => void;
  isOpen: boolean;
  loading: boolean;
  registerForm: any;
}

function ModalAdicionarOperacao({
  setRefresh,
  refresh,
  editOp,
  onClose,
  isOpen,
  loading,
  registerForm,
}: Props) {
  const [tabSelecionado, setTabSelecionado] = useState<any>(0);

  const tab = {
    tabSelecionado,
    setTabSelecionado,
  };

  useEffect(() => {
    registerForm.setFieldValue("id_atividade", editOp.id_atividade);
    registerForm.setFieldValue("nome_atividade", editOp.nome_atividade);
    registerForm.setFieldValue("inicio_planejado", editOp.inicio_planejado);
    registerForm.setFieldValue("inicio_realizado", editOp.inicio_realizado);
    registerForm.setFieldValue("fim_planejado", editOp.fim_planejado);
    registerForm.setFieldValue("fim_realizado", editOp.fim_realizado);
    registerForm.setFieldValue("hrs_totais", editOp.hrs_totais);
    registerForm.setFieldValue("hrs_reais", editOp.hrs_reais);
    registerForm.setFieldValue("pct_real", editOp.pct_real);
  }, [editOp]);

  // console.log("registerForm", registerForm.values);
  // console.log("editOp", editOp);

  // console.log("tabSelecionado", tabSelecionado);

  function HandleTab() {
    switch (true) {
      case tabSelecionado === 0:
        return <EditarAtividadeTabGeral registerForm={registerForm} />;

      case tabSelecionado === 1:
        return <EditarAtividadeTabAnotacoes registerForm={registerForm} />;

      case tabSelecionado === 2:
        return <EditarAtividadeTabMOC registerForm={registerForm} />;

      case tabSelecionado === 3:
        return (
          <EditarAtividadeTabLicoesAprendidas registerForm={registerForm} />
        );

      case tabSelecionado === 4:
        return (
          <EditarAtividadeTabCamposPersonalizados registerForm={registerForm} />
        );

      default:
        return <EditarAtividadeTabGeral registerForm={registerForm} />;
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
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
            Editar Atividade
          </ModalHeader>
          <ModalCloseButton
            color={"white"}
            onClick={() => handleCancelar(registerForm, onClose)}
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              registerForm.handleSubmit(e);
            }}
          >
            <ModalBody mt={3}>
              <BotoesTabs tab={tab} />

              <Flex flex={1} mt={5}>
                <HandleTab />
              </Flex>

              {/*
              MODAL ANTIGO - NÃO APAGUEI AINDA PARA CASO VOLTE AO QUE ERA ANTES, É SÓ DESCOMENTAR KKK
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
                        required={true}
                        data={registerForm.values.inicio_realizado}
                      />
                    </Flex>
                    <Flex>
                      <DateTimePicker
                        registerForm={registerForm}
                        value={"fim_realizado"}
                        label={"FIM REAL"}
                        required={true}
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
              </Flex> */}
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Flex gap={2}>
                <BotaoVermelhoLargoGhost
                  text="Cancelar"
                  onClose={onClose}
                  formikForm={registerForm}
                />
                <BotaoAzulLargoPrimary
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

export default ModalAdicionarOperacao;
