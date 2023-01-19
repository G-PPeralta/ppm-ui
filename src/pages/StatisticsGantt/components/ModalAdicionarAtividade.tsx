//  CRIADO EM: 8/2022
//  AUTOR: Eduardo Muchak.
//  DESCRIÇÃO DO ARQUIVO: Botão e modal nova operação

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
  Button,
  useDisclosure,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Operacao } from "interfaces/Estatisticas";

import BotaoAzulLargoPrimary from "components/BotaoAzulLargo/BotaoAzulLargoPrimary";
import DatePickerModal from "components/DatePickerGenerico/DatePickerModal";
import InputNumericoGenerico from "components/InputNumericoGenerico";
import SelectFiltragem from "components/SelectFiltragem";

import { formatDateToddMMyyyyhhmm } from "utils/formatDate";
import { handleCancelar } from "utils/handleCadastro";

import { useAdicionarOperacao } from "hooks/useAdicionarOperacao";
import { useCadastroCronograma } from "hooks/useCadastroCronograma";

import {
  getDataInicioExecucaoEstatistica,
  getDuracaoHorasAdicionarAtividade,
} from "services/get/Estatisticas";
import { getRelacoesExecucao } from "services/get/Projetos";

import { ModalFiltrarDuracaoMedia } from "./ModalFiltrarDuracaoMedia";

interface Props {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
  projeto: any;
  ganttData: any;
  atividades: any;
}

function ModalAdicionarAtividade({
  setRefresh,
  refresh,
  projeto,
  ganttData,
  atividades,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading } = useAdicionarOperacao(
    refresh,
    setRefresh,
    projeto
  );

  const { listaOperacao } = useCadastroCronograma();

  const optionsMetodosElevacao = [
    {
      value: 1,
      label: "Gás Lift",
    },
    {
      value: 2,
      label: "Surgente",
    },
  ];

  const [dataFinalGantt, setDataFinalGantt] = useState<any>();
  const [dataFinalAtividade, setDataFinalAtividade] = useState<any>();
  const [mediaHorasFiltradas, setMediaHorasFiltradas] = useState<any>(0);
  const [atividadesCronograma, setAtividadesCronograma] = useState<any[]>();

  const optionsOperacao = listaOperacao.map((operacao: Operacao) => ({
    value: operacao.id,
    label: operacao.nom_operacao,
  }));

  const id = window.location.pathname.slice(-3);

  const handleReqRelacoes = async () => {
    const reqAtividadesCronograma = await getRelacoesExecucao(id);
    setAtividadesCronograma(reqAtividadesCronograma);
  };

  const getOperacoes = atividadesCronograma?.map((atv) => ({
    value: atv.id,
    label: atv.valor,
  }));

  useEffect(() => {
    handleReqRelacoes();
  }, [refresh]);

  const handleDataInicio = async () => {
    const dados = await getDataInicioExecucaoEstatistica(projeto.id_poco);
    let ultimaData = dados
      ? new Date(dados.data.dat_ini_plan).getTime() + 3 * 60 * 60 * 1000
      : new Date();
    if (ganttData?.length > 1) {
      ultimaData = ganttData?.reduce((acc: any, curr: any) => {
        if (acc.EndDate > curr.EndDate) {
          return acc.EndDate;
        } else {
          return curr.EndDate;
        }
      });
    } else {
      if (ganttData?.length > 0) {
        ultimaData = ganttData[0].EndDate;
      }
    }
    sessionStorage.setItem("data_inicio", dados.data.dat_ini_plan);
    setDataFinalGantt(ultimaData);
  };

  const getDataInicio =
    registerForm.values.naoIniciarAntesDe &&
    ganttData.find(
      (op: any) => op.TaskID === registerForm.values.naoIniciarAntesDe
    ).EndDate;

  const dat_ini_atv_session: any = sessionStorage.getItem("data_inicio");

  const formattDataInicial = registerForm.values.naoIniciarAntesDe
    ? new Date(getDataInicio).getTime() + 3 * 60 * 60 * 1000
    : new Date(dat_ini_atv_session).getTime() + 3 * 60 * 60 * 1000;

  const handleDataFim = () => {
    const dataInicio = new Date(
      getDataInicio || registerForm.values.data_inicio
    );
    const duracaoEmHoras = registerForm.values.duracao;
    const dataFinal = new Date(
      getDataInicio
        ? dataInicio.getTime() + (duracaoEmHoras + 3) * 3600000
        : dataInicio.getTime() + (duracaoEmHoras + 4) * 3600000
    );
    setDataFinalAtividade(dataFinal);
  };

  const handleDuracao = async () => {
    const horasDuracao = await getDuracaoHorasAdicionarAtividade(
      registerForm.values.operacao_id
    );
    setMediaHorasFiltradas(horasDuracao.data.hrs_media);
  };

  const handlePrecedentes = async (id: number | undefined) => {
    if (id) {
      const duracaoPrecedente = await getDuracaoHorasAdicionarAtividade(id);
      setMediaHorasFiltradas(
        (prevState: any) =>
          Number(duracaoPrecedente.data.hrs_media) + Number(prevState)
      );
    }
  };

  const handleCancelarModal = () => {
    registerForm.resetForm();
    registerForm.setFieldValue("data_inicio", new Date(dataFinalGantt));
    onClose();
  };

  useEffect(() => {
    handleDataInicio();
    registerForm.setFieldValue("id_sonda", projeto.id_sonda);
    registerForm.setFieldValue("id_poco", projeto.id_poco);
    registerForm.setFieldValue("duracao", "0");
    registerForm.setFieldValue("data_fim", "");
  }, []);

  useEffect(() => {
    handleDataInicio();
  }, [ganttData]);

  useEffect(() => {
    if (mediaHorasFiltradas === 0) {
      registerForm.setFieldValue("duracao", "0");
    } else {
      registerForm.setFieldValue("duracao", mediaHorasFiltradas);
    }
  }, [mediaHorasFiltradas]);

  useEffect(() => {
    handleDataFim();
  }, [registerForm.values.duracao]);

  useEffect(() => {
    if (registerForm.values.precedentes.length > 0) {
      handleDuracao();
      registerForm.values.precedentes.map((precedente: any) => {
        const getAtividadePrecedenteId = optionsOperacao.find(
          (atividade: any) =>
            atividade.label === precedente.atividadePrecedenteId.valor
        );
        return handlePrecedentes(getAtividadePrecedenteId?.value);
      });
    } else {
      handleDuracao();
    }
    if (
      registerForm.values.operacao_id === 3 ||
      registerForm.values.operacao_id === 8
    ) {
      registerForm.setFieldValue("metodo_elevacao_id", 0);
    } else {
      registerForm.setFieldValue("metodo_elevacao_id", null);
    }
  }, [registerForm.values.operacao_id]);

  useEffect(() => {
    handleDuracao();
    registerForm.values.precedentes.map((precedente: any) => {
      const getAtividadePrecedenteId = optionsOperacao.find(
        (atividade: any) =>
          atividade.label === precedente.atividadePrecedenteId.valor
      );
      return handlePrecedentes(getAtividadePrecedenteId?.value);
    });
  }, [registerForm.values.precedentes]);

  useEffect(() => {
    registerForm.setFieldValue("data_inicio", new Date(dataFinalGantt));
  }, [dataFinalGantt]);

  useEffect(() => {
    if (registerForm.values.data_inicio && registerForm.values.duracao) {
      registerForm.setFieldValue("data_fim", new Date(dataFinalAtividade));
    }
  }, [dataFinalAtividade]);

  useEffect(() => {
    if (projeto.total_atv === 0) {
      registerForm.setFieldValue("flag", 1);
    } else {
      registerForm.setFieldValue("flag", 0);
    }
  }, []);

  const flag: any = projeto.total_atv !== 0;

  useEffect(() => {
    registerForm.setFieldValue(
      "data_inicio",
      getDataInicio || registerForm.values.data_inicio
    );
  }, [isOpen]);

  return (
    <>
      <Button
        h={"46px"}
        borderRadius={"8px"}
        fontSize={"14px"}
        fontWeight={"700"}
        variant="outline"
        border={"2px solid"}
        borderColor={"origem.500"}
        textColor={"white"}
        backgroundColor={"origem.500"}
        _hover={{
          borderColor: "origem.600",
          backgroundColor: "origem.600",
          textColor: "white",
          transition: "all 0.4s",
        }}
        onClick={onOpen}
      >
        Nova Operação
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
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
            Nova Operação
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
              <Flex flex={1} mt={2}>
                <Flex w={"100%"} direction={"column"} gap={5}>
                  <Flex gap={4} justify={"end"} align={"end"}>
                    <Flex flex={2}>
                      <SelectFiltragem
                        registerForm={registerForm}
                        nomeSelect={"NOME"}
                        propName={"operacao_id"}
                        options={optionsOperacao}
                        required={true}
                      />
                    </Flex>
                    <ModalFiltrarDuracaoMedia
                      operacaoId={registerForm.values.operacao_id}
                      setMediaHorasFiltradas={setMediaHorasFiltradas}
                    />
                  </Flex>
                  <Flex flex={2}>
                    <SelectFiltragem
                      registerForm={registerForm}
                      nomeSelect={"INICIAR DEPOIS DE"}
                      propName={"naoIniciarAntesDe"}
                      options={getOperacoes}
                      required={false}
                    />
                  </Flex>
                  <Flex gap={4} w={"100%"}>
                    <InputNumericoGenerico
                      registerForm={registerForm}
                      propName={"duracao"}
                      nomeInput={"DURAÇÃO"}
                      tipo={"hora"}
                      stepper={true}
                      limite={99999}
                      required={true}
                      isDecimal={true}
                    />

                    <Flex flex={1}>
                      <Flex direction={"column"}>
                        <Flex gap={1}></Flex>
                        <DatePickerModal
                          use12hours={true}
                          nomeLabel={"DATA INÍCIO"}
                          registerForm={registerForm}
                          propName={"data_inicio"}
                          data={formattDataInicial || ""}
                          selecionaHorario={true}
                          isDisabled={flag}
                        />
                      </Flex>
                    </Flex>

                    <Flex flex={1}>
                      <Flex direction={"column"}>
                        <Flex gap={1}>
                          <Text
                            fontWeight={"bold"}
                            fontSize={"12px"}
                            color={"#949494"}
                          >
                            DATA FIM
                          </Text>
                        </Flex>
                        <Button
                          fontWeight={"400"}
                          fontSize={"14px"}
                          color={"#949494"}
                          isDisabled={true}
                          h={"56px"}
                          variant="outline"
                          px={useBreakpointValue({ base: 5, sm: 5, md: 5 })}
                          minW={useBreakpointValue({
                            base: "180px",
                            sm: "180px",
                            md: "220px",
                          })}
                          w={"100%"}
                        >
                          {registerForm.values.data_fim
                            ? formatDateToddMMyyyyhhmm(
                                registerForm.values.data_fim
                              )
                            : "Data Fim"}
                        </Button>
                      </Flex>
                    </Flex>
                  </Flex>
                  {(registerForm.values.operacao_id === 3 ||
                    registerForm.values.operacao_id === 8) && (
                    <Flex gap={4} justify={"end"} align={"end"} w={"50%"}>
                      <SelectFiltragem
                        registerForm={registerForm}
                        nomeSelect={"MÉTODO DE ELEVAÇÃO"}
                        propName={"metodo_elevacao_id"}
                        options={optionsMetodosElevacao}
                      />
                    </Flex>
                  )}
                </Flex>
              </Flex>
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Flex gap={2}>
                <Button
                  h={"56px"}
                  variant="ghost"
                  color="red.500"
                  w={"208px"}
                  _hover={{
                    background: "red.600",
                    transition: "all 0.4s",
                    color: "white",
                  }}
                  fontSize={"18px"}
                  fontWeight={"700"}
                  borderRadius={"8px"}
                  fontFamily={"Mulish"}
                  onClick={() => handleCancelarModal()}
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

export default ModalAdicionarAtividade;
