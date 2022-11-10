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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Operacao } from "interfaces/Estatisticas";

import BotaoAzulLargoPrimary from "components/BotaoAzulLargo/BotaoAzulLargoPrimary";
import InputNumericoGenerico from "components/InputNumericoGenerico";
import { RequiredField } from "components/RequiredField/RequiredField";
import SelectFiltragem from "components/SelectFiltragem";

import { formatDateToddMMyyyyhhmm } from "utils/formatDate";
import { handleCancelar } from "utils/handleCadastro";

import { useAdicionarOperacao } from "hooks/useAdicionarOperacao";
import { useCadastroCronograma } from "hooks/useCadastroCronograma";

import { getDuracaoHorasAdicionarAtividade } from "services/get/Estatisticas";

import { ModalFiltrarAtividade } from "./ModalFiltrarAtividade";

interface Props {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
  projeto: any;
  ganttData: any;
}

function ModalAdicionarAtividade({
  setRefresh,
  refresh,
  projeto,
  ganttData,
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

  const optionsOperacao = listaOperacao.map((operacao: Operacao) => ({
    value: operacao.id,
    label: operacao.nom_operacao,
  }));

  const handleDataInicio = () => {
    let ultimaData = new Date();
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
    setDataFinalGantt(ultimaData);
  };

  const handleDataFim = () => {
    const dataInicio = new Date(registerForm.values.data_inicio);
    const duracaoEmHoras = registerForm.values.duracao;
    const dataFinal = new Date(dataInicio.getTime() + duracaoEmHoras * 3600000);
    setDataFinalAtividade(dataFinal);
  };

  const handleDuracao = async () => {
    const horasDuracao = await getDuracaoHorasAdicionarAtividade(
      registerForm.values.operacao_id
    );
    // registerForm.setFieldValue("duracao", horasDuracao.data.hrs_media);
    setMediaHorasFiltradas(horasDuracao.data.hrs_media);
  };

  useEffect(() => {
    handleDataInicio();
    registerForm.setFieldValue("id_sonda", projeto.id_sonda);
    registerForm.setFieldValue("id_poco", projeto.id_poco);
    registerForm.setFieldValue("duracao", 0);
  }, []);

  useEffect(() => {
    handleDataInicio();
  }, [ganttData]);

  useEffect(() => {
    registerForm.setFieldValue("duracao", mediaHorasFiltradas);
  }, [mediaHorasFiltradas]);

  useEffect(() => {
    handleDataFim();
  }, [registerForm.values.duracao]);

  useEffect(() => {
    handleDuracao();
  }, [registerForm.values.operacao_id]);

  useEffect(() => {
    registerForm.setFieldValue("data_inicio", new Date(dataFinalGantt));
  }, [dataFinalGantt]);

  useEffect(() => {
    if (registerForm.values.data_inicio && registerForm.values.duracao) {
      registerForm.setFieldValue("data_fim", new Date(dataFinalAtividade));
    }
  }, [dataFinalAtividade]);

  const handleCancelarModal = () => {
    registerForm.resetForm();
    registerForm.setFieldValue("data_inicio", new Date(dataFinalGantt));
    onClose();
  };

  const handleChange = (event: any) => {
    registerForm.setFieldValue("profundidade", Number(event));
  };

  return (
    <>
      <Button
        h={"56px"}
        borderRadius={"8px"}
        fontSize={"18px"}
        fontWeight={"700"}
        variant="outline"
        border={"2px solid"}
        borderColor={"origem.500"}
        textColor={"origem.500"}
        _hover={{
          borderColor: "origem.600",
          backgroundColor: "origem.500",
          textColor: "white",
          transition: "all 0.4s",
        }}
        onClick={onOpen}
      >
        Adicionar Atividade
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
            Adicionar Atividade
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
                    <ModalFiltrarAtividade
                      operacaoId={registerForm.values.operacao_id}
                      setMediaHorasFiltradas={setMediaHorasFiltradas}
                    />
                  </Flex>
                  <Flex gap={4} w={"100%"}>
                    <InputNumericoGenerico
                      registerForm={registerForm}
                      propName={"duracao"}
                      nomeInput={"DURAÇÃO"}
                      tipo={"hora"}
                      stepper={false}
                      limite={999}
                      required={true}
                    />

                    <Flex flex={1}>
                      <Flex direction={"column"}>
                        <Flex gap={1}>
                          {/* <RequiredField /> */}
                          <Text
                            fontWeight={"bold"}
                            fontSize={"12px"}
                            color={"#949494"}
                          >
                            DATA INÍCIO
                          </Text>
                        </Flex>
                        <Button
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
                          {registerForm.values.data_inicio
                            ? formatDateToddMMyyyyhhmm(
                                registerForm.values.data_inicio
                              )
                            : "Data Início"}
                        </Button>
                      </Flex>
                    </Flex>

                    <Flex flex={1}>
                      <Flex direction={"column"}>
                        <Flex gap={1}>
                          {/* <RequiredField /> */}
                          <Text
                            fontWeight={"bold"}
                            fontSize={"12px"}
                            color={"#949494"}
                          >
                            DATA FIM
                          </Text>
                        </Flex>
                        <Button
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
                  <Flex gap={4} justify={"end"} align={"end"}>
                    <Flex flex={2} w={"50%"} gap={4}>
                      <SelectFiltragem
                        registerForm={registerForm}
                        nomeSelect={"MÉTODO DE ELEVAÇÃO"}
                        propName={"metodo_elevacao_id"}
                        options={optionsMetodosElevacao}
                        required={true}
                      />
                      <Flex direction={"column"} w={"100%"}>
                        <Flex gap={1}>
                          <RequiredField />
                          <Text
                            fontWeight={"bold"}
                            fontSize={"12px"}
                            color={"#949494"}
                          >
                            PROFUNDIDADE
                          </Text>
                        </Flex>

                        <NumberInput
                          min={0}
                          max={999999}
                          step={1}
                          value={registerForm.values.profundidade}
                          onChange={(event) => handleChange(event)}
                          h={"56px"}
                        >
                          <NumberInputField h={"56px"} />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Flex>
                    </Flex>
                  </Flex>
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
