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

import BotaoAzulLargoPrimary from "components/BotaoAzulLargo/BotaoAzulLargoPrimary";
import BotaoVermelhoLargoGhost from "components/BotaoVermelhoLargo/BotaoVermelhoLargoGhost";
// import DatePickerGenerico from "components/DatePickerGenerico";
import InputNumericoGenerico from "components/InputNumericoGenerico";
import { RequiredField } from "components/RequiredField/RequiredField";
import SelectFiltragem from "components/SelectFiltragem";

import { formatDate } from "utils/formatDate";
import { handleCancelar } from "utils/handleCadastro";

import { useAdicionarOperacao } from "hooks/useAdicionarOperacao";

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

  const [dataFinalGantt, setDataFinalGantt] = useState<any>();
  const [dataFinalAtividade, setDataFinalAtividade] = useState<any>();

  const optionsOperacoesMock = [
    {
      value: 1,
      label: "Operação 1",
    },
    {
      value: 2,
      label: "Operação 2",
    },
    {
      value: 3,
      label: "Operação 3",
    },
  ];

  const handleDataInicio = () => {
    const ultimaData = ganttData?.reduce((acc: any, curr: any) => {
      if (acc.EndDate > curr.EndDate) {
        return acc.EndDate;
      } else {
        return curr.EndDate;
      }
    });
    setDataFinalGantt(ultimaData);
  };

  const handleDataFim = () => {
    const dataInicio = new Date(registerForm.values.data_inicio);
    const duracaoEmHoras = registerForm.values.duracao;
    const dataFinal = new Date(dataInicio.getTime() + duracaoEmHoras * 3600000);
    setDataFinalAtividade(dataFinal);
  };

  useEffect(() => {
    handleDataInicio();
    registerForm.setFieldValue("id_sonda", projeto.id_sonda);
    registerForm.setFieldValue("id_poco", projeto.id_poco);
    registerForm.setFieldValue("duracao", 0);
  }, []);

  useEffect(() => {
    handleDataFim();
  }, [registerForm.values.duracao]);

  useEffect(() => {
    registerForm.setFieldValue("data_inicio", new Date(dataFinalGantt));
  }, [dataFinalGantt]);

  useEffect(() => {
    if (registerForm.values.data_inicio && registerForm.values.duracao) {
      registerForm.setFieldValue("data_fim", new Date(dataFinalAtividade));
    }
  }, [dataFinalAtividade]);

  // console.log("registerForm", registerForm.values);
  // console.log("dataFinalAtividade", dataFinalAtividade);

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
                <Flex w={"100%"} direction={"column"} gap={5}>
                  <Flex gap={4}>
                    <Flex flex={2}>
                      <SelectFiltragem
                        registerForm={registerForm}
                        nomeSelect={"NOME"}
                        propName={"operacao_id"}
                        options={optionsOperacoesMock}
                        required={true}
                      />
                    </Flex>
                  </Flex>
                  <Flex gap={4} w={"70%"}>
                    <InputNumericoGenerico
                      registerForm={registerForm}
                      propName={"duracao"}
                      nomeInput={"DURAÇÃO"}
                      tipo={"hora"}
                      stepper={false}
                      limite={999}
                    />
                    {
                      <Flex flex={1}>
                        <Flex direction={"column"}>
                          <Flex gap={1}>
                            <RequiredField />
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
                              ? formatDate(registerForm.values.data_inicio)
                              : "Data Início"}
                          </Button>
                        </Flex>
                      </Flex>
                    }
                    <Flex flex={1}>
                      <Flex direction={"column"}>
                        <Flex gap={1}>
                          <RequiredField />
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
                            ? formatDate(registerForm.values.data_fim)
                            : "Data Fim"}
                        </Button>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
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

export default ModalAdicionarAtividade;
