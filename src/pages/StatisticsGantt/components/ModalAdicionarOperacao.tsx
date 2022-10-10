// import { useEffect } from "react";

import {
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  useBreakpointValue,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";

// import Restricoes from "pages/Infographics/Components/Restricoes";

import BotaoAzulPrimary from "components/BotaoAzul/BotaoAzulPrimary";
import BotaoVermelhoGhost from "components/BotaoVermelho/BotaoVermelhoGhost";
import { RequiredField } from "components/RequiredField/RequiredField";
import SelectFiltragem from "components/SelectFiltragem";

import { useAdicionarOperacao } from "hooks/useAdicionarOperacao";

// import PopOverRelacao from "./PopOverRelacao";

// import AtividadesDragAndDrop from "./AtividadesDragAndDrop";
import DateTimePicker from "./DateTimePicker";

interface Responsavel {
  id: number;
  nome: string;
}

interface Props {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
  atividades?: any;
  projeto?: any;
}

function ModalAdicionarOperacao({
  setRefresh,
  refresh,
  atividades,
  projeto,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    registerForm,
    loading,
    listaOperacao,
    listaResponsaveis,
    listaAreaAtuacao,
  } = useAdicionarOperacao(refresh, setRefresh, projeto);

  const operacoesOptions = listaOperacao.map((a: any) => ({
    value: a.id,
    label: a.nom_operacao,
  }));

  const responsaveisOptions = listaResponsaveis.map(
    (responsavel: Responsavel) => ({
      value: responsavel.id,
      label: responsavel.nome,
    })
  );

  const areaAtuacaoOptions = listaAreaAtuacao.map((area: any) => ({
    value: area.id,
    label: area.tipo,
  }));

  // useEffect(() => {
  //   // if (projeto) {
  //   //   registerForm.setFieldValue("id_projeto", idProjeto);
  //   // }
  // }, []);

  return (
    <>
      <Button
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
        Adicionar Operação
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
            fontSize={"1em"}
          >
            Adicionar Operação
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
                      <SelectFiltragem
                        registerForm={registerForm}
                        nomeSelect={"OPERAÇÃO"}
                        propName={`id_atividade`}
                        options={operacoesOptions}
                        required={true}
                      />
                    </Flex>
                  </Flex>
                </Flex>

                <Flex flex={1} direction={"column"}>
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
                </Flex>

                <Flex flex={1} direction={"column"}>
                  <Text fontWeight={"bold"}>Datas</Text>
                  <Flex gap={5}>
                    <Flex>
                      <DateTimePicker
                        registerForm={registerForm}
                        value={"inicio_planejado"}
                        label={"DATA PLANEJADA"}
                        required={true}
                      />
                    </Flex>
                    <Flex direction={"column"} flex={1}>
                      <Flex gap={1}>
                        <RequiredField />
                        <Text
                          fontWeight={"bold"}
                          fontSize={"12px"}
                          color={"#949494"}
                        >
                          DURAÇÃO PLANEJADA
                        </Text>
                      </Flex>
                      <NumberInput
                        max={99999}
                        min={0}
                        id={"hrs_totais"}
                        name={"hrs_totais"}
                        value={registerForm.values.hrs_totais}
                        onChange={(value) => {
                          registerForm.setFieldValue(
                            "hrs_totais",
                            Number(value)
                          );
                        }}
                      >
                        <NumberInputField bg={"#fff"} h={"56px"} />
                      </NumberInput>
                    </Flex>
                  </Flex>
                  <Flex gap={5}>
                    <Flex>
                      <DateTimePicker
                        registerForm={registerForm}
                        value={"inicio_realizado"}
                        label={"DATA REAL"}
                        required={false}
                      />
                    </Flex>
                    <Flex direction={"column"} flex={1}>
                      <Flex gap={1}>
                        <Text
                          fontWeight={"bold"}
                          fontSize={"12px"}
                          color={"#949494"}
                        >
                          DURAÇÃO REAL
                        </Text>
                      </Flex>
                      <NumberInput
                        max={99999}
                        min={0}
                        id={"hrs_reais"}
                        name={"hrs_reais"}
                        value={registerForm.values.hrs_reais}
                        onChange={(value) => {
                          registerForm.setFieldValue(
                            "hrs_reais",
                            Number(value)
                          );
                        }}
                      >
                        <NumberInputField bg={"#fff"} h={"56px"} />
                      </NumberInput>
                    </Flex>
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
