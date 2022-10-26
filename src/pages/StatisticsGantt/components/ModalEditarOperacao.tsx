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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { Anotacoes, LicaoAprendida, Ocorrencia } from "interfaces/Estatisticas";

import BotaoAzulLargoPrimary from "components/BotaoAzulLargo/BotaoAzulLargoPrimary";
import BotaoVermelhoLargoGhost from "components/BotaoVermelhoLargo/BotaoVermelhoLargoGhost";

import { handleCancelar } from "utils/handleCadastro";

import {
  getAnotacoesPorAtividade,
  getLicoesAprendidasPorAtividade,
  getMocPorAtividade,
  getOcorrenciasPorAtividade,
} from "services/get/Estatisticas";

import EditarAtividadeTabAnotacoes from "./EditarAtividadeTabAnotacoes";
import EditarAtividadeTabGeral from "./EditarAtividadeTabGeral";
import EditarAtividadeTabLicoesAprendidas from "./EditarAtividadeTabLicoesAprendidas";
import EditarAtividadeTabMOC from "./EditarAtividadeTabMoc";
import EditarAtividadeTabOcorrencias from "./EditarAtividadeTabOcorrencias";

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

// const licoesAprendidasMock = [
//   {
//     id: 1,
//     licao_aprendida: "Lição 1",
//     data: "01/01/2021",
//     acao_e_recomendacao: "Ação 1 e Recomendação 1",
//   },
//   {
//     id: 2,
//     licao_aprendida: "Lição 2",
//     data: "01/01/2022",
//     acao_e_recomendacao: "Ação 2 e Recomendação 2",
//   },
//   {
//     id: 3,
//     licao_aprendida: "Lição 3",
//     data: "01/01/2023",
//     acao_e_recomendacao: "Ação 3 e Recomendação 3",
//   },
//   {
//     id: 4,
//     licao_aprendida: "Lição 4",
//     data: "01/01/2024",
//     acao_e_recomendacao: "Ação 4 e Recomendação 4",
//   },
//   {
//     id: 5,
//     licao_aprendida: "Lição 5",
//     data: "01/01/2025",
//     acao_e_recomendacao: "Ação 5 e Recomendação 5",
//   },
//   {
//     id: 6,
//     licao_aprendida: "Lição 6",
//     data: "01/01/2026",
//     acao_e_recomendacao: "Ação 6 e Recomendação 6",
//   },
//   {
//     id: 7,
//     licao_aprendida: "Lição 7",
//     data: "01/01/2027",
//     acao_e_recomendacao: "Ação 7 e Recomendação 7",
//   },
//   {
//     id: 8,
//     licao_aprendida: "Lição 8",
//     data: "01/01/2028",
//     acao_e_recomendacao: "Ação 8 e Recomendação 8",
//   },
//   {
//     id: 9,
//     licao_aprendida: "Lição 9",
//     data: "01/01/2029",
//     acao_e_recomendacao: "Ação 9 e Recomendação 9",
//   },
//   {
//     id: 10,
//     licao_aprendida: "Lição 10",
//     data: "01/01/2030",
//     acao_e_recomendacao: "Ação 10 e Recomendação 10",
//   },
//   {
//     id: 11,
//     licao_aprendida: "Lição 11",
//     data: "01/01/2031",
//     acao_e_recomendacao: "Ação 11 e Recomendação 11",
//   },
//   {
//     id: 12,
//     licao_aprendida: "Lição 12",
//     data: "01/01/2032",
//     acao_e_recomendacao: "Ação 12 e Recomendação 12",
//   },
// ];

// const ocorrenciasMock = [
//   {
//     id: 1,
//     nome_ocorrencia: "Agda informação técnica / orientação",
//     horas: "00:00",
//   },
//   {
//     id: 2,
//     nome_ocorrencia: "Agdo manutenção",
//     horas: "00:00",
//   },
//   {
//     id: 3,
//     nome_ocorrencia: "Agdo outros",
//     horas: "00:00",
//   },
//   {
//     id: 4,
//     nome_ocorrencia: "Agdo recursos Cia Serviço",
//     horas: "00:00",
//   },
//   {
//     id: 5,
//     nome_ocorrencia: "APR",
//     horas: "00:00",
//   },
// ];

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
  const [listaLicoesAprendidas, setListaLicoesAprendidas] = useState<
    LicaoAprendida[]
  >([]);
  const [listaOcorrencias, setListaOcorrencias] = useState<Ocorrencia[]>([]);
  const [anotacoes, setAnotacoes] = useState<Anotacoes[]>([]);
  const [mocs, setMocs] = useState<any[]>([]);
  const [gambiarra, setGambiarra] = useState<any>(true);

  const refreshState = {
    setRefresh,
    refresh,
  };

  const requestLicoesEOperacoes = async () => {
    if (editOp.id_atividade) {
      const licoesAprendidasPorAtividade =
        await getLicoesAprendidasPorAtividade(editOp.id_atividade);
      setListaLicoesAprendidas(licoesAprendidasPorAtividade.data);

      const ocorrenciasPorAtividade = await getOcorrenciasPorAtividade(
        editOp.id_atividade
      );
      setListaOcorrencias(ocorrenciasPorAtividade.data);

      const anotacoesPorAtividade = await getAnotacoesPorAtividade(
        editOp.id_atividade
      );
      setAnotacoes(anotacoesPorAtividade.data);

      const mocPorAtividade = await getMocPorAtividade(editOp.id_atividade);
      setMocs(mocPorAtividade.data);
    }
  };

  const handleGambiarra = () => {
    setTimeout(() => {
      setGambiarra(!gambiarra);
    }, 2000);
  };

  useEffect(() => {
    requestLicoesEOperacoes();
    handleGambiarra();
  }, []);

  useEffect(() => {
    requestLicoesEOperacoes();
    handleGambiarra();
  }, [refresh]);

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
    registerForm.setFieldValue("licoes_aprendidas", listaLicoesAprendidas);
    registerForm.setFieldValue("ocorrencias", listaOcorrencias);
    if (anotacoes.length > 0) {
      registerForm.setFieldValue("anotacoes", anotacoes[0].txt_nota);
    }
    if (mocs.length > 0) {
      registerForm.setFieldValue("mocs", mocs);
    }
    // console.log("GAMBIARRA", editOp);
  }, [gambiarra]);

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
    registerForm.setFieldValue("licoes_aprendidas", listaLicoesAprendidas);
    registerForm.setFieldValue("ocorrencias", listaOcorrencias);
    if (anotacoes.length > 0) {
      registerForm.setFieldValue("anotacoes", anotacoes[0].txt_nota);
    }
    if (mocs.length > 0) {
      registerForm.setFieldValue("mocs", mocs);
    }
    handleGambiarra();
  }, [editOp, isOpen]);

  useEffect(() => {
    if (anotacoes.length > 0) {
      registerForm.setFieldValue("anotacoes", anotacoes[0].txt_nota);
    }
    if (mocs.length > 0) {
      registerForm.setFieldValue("mocs", mocs);
    }
    handleGambiarra();
  }, [anotacoes, mocs]);

  useEffect(() => {
    requestLicoesEOperacoes();
  }, [isOpen]);

  // console.log("mocs", mocs);
  // console.log("anotacoes", anotacoes);
  // console.log("registerForm", registerForm.values);
  // console.log("editOp", editOp);

  const botoes = [
    {
      nome: "Geral",
      selecionado: tabSelecionado === 0,
    },
    {
      nome: "Anotações",
      selecionado: tabSelecionado === 1,
    },
    {
      nome: "MOC",
      selecionado: tabSelecionado === 2,
    },
    {
      nome: "Lições Aprendidas",
      selecionado: tabSelecionado === 3,
    },
    {
      nome: "Ocorrências",
      selecionado: tabSelecionado === 4,
    },
  ];

  const handleClick = (index: number) => {
    setTabSelecionado(index);

    botoes.map((botao, i) => {
      if (i === index) {
        botao.selecionado = true;
      } else {
        botao.selecionado = false;
      }
      return botao;
    });
  };

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
              <Flex flex={1} mt={5}>
                <Tabs variant={"unstyled"} isLazy={true} flex={1}>
                  <TabList>
                    <ButtonGroup size="lg" isAttached variant="outline">
                      {botoes.map((botao, index) => (
                        <Button
                          fontSize={"14px"}
                          fontWeight={"bold"}
                          color={botao.selecionado ? "#FEFEFE" : "origem.300"}
                          backgroundColor={
                            botao.selecionado ? "origem.300" : "#FEFEFE"
                          }
                          _hover={{
                            background: "origem.500",
                            transition: "all 0.4s",
                            color: "#FEFEFE",
                          }}
                          onClick={() => handleClick(index)}
                        >
                          <Tab fontWeight={"semibold"}>{botao.nome}</Tab>
                        </Button>
                      ))}
                    </ButtonGroup>
                  </TabList>

                  <TabPanels flex={1}>
                    <TabPanel flex={1}>
                      <EditarAtividadeTabGeral registerForm={registerForm} />
                    </TabPanel>
                    <TabPanel flex={1}>
                      <EditarAtividadeTabAnotacoes
                        registerForm={registerForm}
                      />
                    </TabPanel>
                    <TabPanel flex={1}>
                      <EditarAtividadeTabMOC registerForm={registerForm} />
                    </TabPanel>
                    <TabPanel flex={1}>
                      <EditarAtividadeTabLicoesAprendidas
                        registerForm={registerForm}
                        refreshState={refreshState}
                      />
                    </TabPanel>
                    <TabPanel flex={1}>
                      <EditarAtividadeTabOcorrencias
                        registerForm={registerForm}
                        refreshState={refreshState}
                      />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Flex>
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
