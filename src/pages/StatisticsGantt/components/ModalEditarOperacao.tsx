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
  Text,
} from "@chakra-ui/react";
import { Anotacoes, LicaoAprendida, Ocorrencia } from "interfaces/Estatisticas";

import BotaoAzulLargoPrimary from "components/BotaoAzulLargo/BotaoAzulLargoPrimary";

// import { handleCancelar } from "utils/handleCadastro";

import {
  getAnotacoesPorAtividade,
  getAprPorAtividade,
  getLicoesAprendidasPorAtividade,
  getMocPorAtividade,
  getOcorrenciasPorAtividade,
} from "services/get/Estatisticas";

import EditarAtividadeTabAnotacoes from "./EditarAtividadeTabAnotacoes";
import EditarAtividadeTabAPR from "./EditarAtividadeTabApr";
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
  inicio_real?: Date;
  fim_real?: Date;
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
  data: any;
  sondaN: any;
  pocoN: any;
}

function ModalEditarOperacao({
  setRefresh,
  refresh,
  editOp,
  onClose,
  isOpen,
  loading,
  registerForm,
  data,
  sondaN,
  pocoN,
}: Props) {
  const [tabSelecionado, setTabSelecionado] = useState<any>(0);
  const [listaLicoesAprendidas, setListaLicoesAprendidas] = useState<
    LicaoAprendida[]
  >([]);
  const [listaOcorrencias, setListaOcorrencias] = useState<Ocorrencia[]>([]);
  const [anotacoes, setAnotacoes] = useState<Anotacoes[]>([]);
  const [mocs, setMocs] = useState<any[]>([]);
  const [aprs, setAprs] = useState<any[]>([]);
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

      const ocorrencias = ocorrenciasPorAtividade.data.map(
        (ocorrencia: any) => ({
          ...ocorrencia,
          url: "",
          anexo: "",
        })
      );

      setListaOcorrencias(
        ocorrencias.sort((a: any, b: any) =>
          a.dsc_ocorrencia.localeCompare(b.dsc_ocorrencia)
        )
      );

      const anotacoesPorAtividade = await getAnotacoesPorAtividade(
        editOp.id_atividade
      );
      setAnotacoes(anotacoesPorAtividade.data);

      const mocPorAtividade = await getMocPorAtividade(editOp.id_atividade);
      const aprPorAtividade = await getAprPorAtividade(editOp.id_atividade);
      setMocs(mocPorAtividade.data);
      setAprs(aprPorAtividade.data);
    }
  };

  // console.log({ listaOcorrencias });

  const handleFecharModal = () => {
    setTabSelecionado(0);
    registerForm.resetForm();
    onClose();
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

  // console.log(editOp);

  useEffect(() => {
    registerForm.setFieldValue("id_atividade", editOp.id_atividade);
    registerForm.setFieldValue("nome_atividade", editOp.nome_atividade);
    registerForm.setFieldValue("inicio_planejado", editOp.inicio_planejado);
    // registerForm.setFieldValue("inicio_realizado", editOp.inicio_realizado);
    registerForm.setFieldValue("fim_planejado", editOp.fim_planejado);
    // registerForm.setFieldValue("fim_realizado", editOp.fim_realizado);
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
    if (aprs.length > 0) {
      registerForm.setFieldValue("aprs", aprs);
    }
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
    requestLicoesEOperacoes();
    handleGambiarra();
  }, [registerForm.values.inicio_real, registerForm.values.inicio_realizado]);

  // console.log(registerForm.values);

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
      nome: "APR",
      selecionado: tabSelecionado === 3,
    },
    {
      nome: "Lições Aprendidas",
      selecionado: tabSelecionado === 4,
    },
    {
      nome: "Tempo Aguardando",
      selecionado: tabSelecionado === 5,
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
            fontSize={"14px"}
            fontWeight={"700"}
            fontFamily={"Mulish"}
          >
            Editar Atividade
          </ModalHeader>
          <ModalCloseButton
            color={"white"}
            onClick={() => handleFecharModal()}
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              registerForm.handleSubmit(e);
            }}
          >
            <ModalBody mt={3}>
              <Flex flex={1} mt={5} w={"100%"}>
                <Tabs variant={"unstyled"} isLazy={true} flex={1} w={"100%"}>
                  <TabList>
                    <ButtonGroup size="lg" isAttached variant="outline">
                      {botoes.map((botao, index) => (
                        <Button
                          fontSize={"14px"}
                          fontWeight={"bold"}
                          color={botao.selecionado ? "white" : "origem.500"}
                          backgroundColor={
                            botao.selecionado ? "origem.500" : "#FEFEFE"
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

                  <TabPanels flex={1} w={"100%"}>
                    <TabPanel flex={1}>
                      <EditarAtividadeTabGeral
                        registerForm={registerForm}
                        data={data}
                        pocoN={pocoN}
                        sondaN={sondaN}
                      />
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
                      <EditarAtividadeTabAPR registerForm={registerForm} />
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
                <Button
                  h={"56px"}
                  variant="ghost"
                  color="red.500"
                  w={"208px"}
                  onClick={() => handleFecharModal()}
                  _hover={{
                    background: "red.600",
                    transition: "all 0.4s",
                    color: "white",
                  }}
                  fontSize={"18px"}
                  fontWeight={"700"}
                  borderRadius={"8px"}
                  fontFamily={"Mulish"}
                >
                  <Text
                    fontSize="18px"
                    fontWeight={"700"}
                    fontFamily={"Mulish"}
                    mx={12}
                  >
                    Cancelar
                  </Text>
                </Button>
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

export default ModalEditarOperacao;
