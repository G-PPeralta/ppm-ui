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
} from "@chakra-ui/react";

import BotaoAzulLargoPrimary from "components/BotaoAzulLargo/BotaoAzulLargoPrimary";
import BotaoVermelhoLargoGhost from "components/BotaoVermelhoLargo/BotaoVermelhoLargoGhost";
import DatePickerGenerico from "components/DatePickerGenerico";
import InputNumericoGenerico from "components/InputNumericoGenerico";
import SelectFiltragem from "components/SelectFiltragem";

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

  useEffect(() => {
    handleDataInicio();
    registerForm.setFieldValue("id_sonda", projeto.id_sonda);
    registerForm.setFieldValue("id_poco", projeto.id_poco);
  }, []);

  useEffect(() => {
    registerForm.setFieldValue("data_inicio", new Date(dataFinalGantt));
  }, [dataFinalGantt]);

  console.log("registerForm", registerForm.values);

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
                      propName={"hrs_reais"}
                      nomeInput={"DURAÇÃO"}
                      tipo={"hora"}
                      stepper={false}
                    />
                    {
                      <DatePickerGenerico
                        nomeLabel={"DATA INÍCIO"}
                        registerForm={registerForm}
                        propName={"data_inicio"}
                        data={registerForm.values.data_inicio}
                        selecionaHorario={true}
                        isDisabled={true}
                      />
                    }
                    <DatePickerGenerico
                      nomeLabel={"DATA FIM"}
                      registerForm={registerForm}
                      propName={"data_fim"}
                      data={registerForm.values.data_fim}
                      selecionaHorario={true}
                      isDisabled={true}
                    />
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
