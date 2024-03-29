//  CRIADO EM: 06/2022
//  AUTOR: Eduardo Muchak, Bruno Fracaro.
//  DESCRIÇÃO DO ARQUIVO: Modal Cadastro nova atividade.

import { useEffect, useState } from "react";

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
  Input,
  NumberInput,
  NumberInputField,
  ModalCloseButton,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import {
  Atividade,
  Precedentes,
  Relacao,
} from "interfaces/CadastroAtividadeDeta";

import BotaoAzulPrimary from "components/BotaoAzul/BotaoAzulPrimary";
import BotaoVermelhoGhost from "components/BotaoVermelho/BotaoVermelhoGhost";
import { RequiredField } from "components/RequiredField/RequiredField";
import SelectFiltragem from "components/SelectFiltragem";

import { addOutroFinalArray } from "utils/AdicionaOpcaoOutroAoFinalArray";
import { formatDateToddMMyyyyhhmmCronograma } from "utils/formatDate";
import { getSelectFiltragemValue } from "utils/GetSelectFiltragemValue";
import { regexCaracteresEspeciais } from "utils/regex";

import { useDetalhamentoProjeto } from "contexts/DetalhamentoDeProjetos";

import { useCadastroAtividadeProjeto } from "hooks/useCadastroAtividadeProjeto";

import { getAreaResponsavel2 } from "services/get/Projetos";

import AtividadesDragAndDrop from "./AtividadesDragAndDrop";
import DateTimePickerDataInicio from "./DateTimePickerDataInicio";
import InputCadastroArea from "./InputCadastroOutraArea";

interface Props {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refreshGanttCriacao: boolean;
  setRefreshGanttCriacao: React.Dispatch<React.SetStateAction<boolean>>;
  idProjeto?: number;
  infoProjeto: Atividade;
}

function ModalCadastroAtividades({
  refresh,
  setRefresh,
  setRefreshGanttCriacao,
  refreshGanttCriacao,
  idProjeto,
  infoProjeto,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [listaResponsaveis, setListaResponsaveis] = useState<any>([]);
  const [refresh1, setRefresh1] = useState(false);
  const { registerForm, loading, listaAtividadesRelacao, reqGet, isFetching } =
    useCadastroAtividadeProjeto(
      refreshGanttCriacao,
      setRefreshGanttCriacao,
      idProjeto
    );

  const { areaResponsavel } = useDetalhamentoProjeto();

  const reqGetRes = async () => {
    const { data } = await getAreaResponsavel2();

    const responsaveisSorted =
      data &&
      data.sort((a: any, b: any) =>
        a.nom_responsavel.localeCompare(b.nom_responsavel)
      );

    const responsaveisComOutrosAoFinalArray = addOutroFinalArray(
      responsaveisSorted,
      "nom_responsavel"
    );
    setListaResponsaveis(responsaveisComOutrosAoFinalArray);
  };

  const optionsResponsaveis = listaResponsaveis.map((responsavel: any) => ({
    value: responsavel.id,
    label: responsavel.nom_responsavel,
  }));

  useEffect(() => {
    reqGet();
  }, [registerForm.values]);

  const refreshState = {
    refresh1,
    setRefresh1,
  };

  const relacoesOptions = listaAtividadesRelacao.map((atividade: Relacao) => ({
    value: atividade.id,
    label: atividade.valor,
  }));

  const getSumOfDays = registerForm.values.precedentes
    .map((i: Precedentes) => i.dias)
    .reduce((partialSum: number, a: number) => partialSum + a, 0);

  const getNomeProjeto = listaAtividadesRelacao
    .map((atividade: Relacao) => ({
      value: atividade.id,
      label: atividade.valor,
    }))
    .find((item) => item.label === infoProjeto.nome_projeto);

  useEffect(() => {
    registerForm.setFieldValue("relacao_id", getNomeProjeto?.value);
  }, [isOpen]);

  useEffect(() => {
    if (idProjeto) {
      registerForm.setFieldValue("id_projeto", idProjeto);
    }
  }, [registerForm.values.id_projeto]);

  useEffect(() => {
    if (registerForm.values.precedentes.length === 0) {
      registerForm.setFieldValue("dat_inicio_plan", "");
      registerForm.setFieldValue("dat_fim_plan", "");
    }
  }, [registerForm.values]);

  const macroOptions = [
    {
      value: 1,
      label: "Pré-Projeto - 25",
    },
    {
      value: 2,
      label: "Engenharia - 15",
    },
    {
      value: 3,
      label: "Suprimentos - 65",
    },
    {
      value: 4,
      label: "C&M - 20",
    },
  ];

  useEffect(() => {
    reqGetRes();
  }, [refresh1]);

  return (
    <>
      <Button
        h={"56px"}
        borderRadius={"10px"}
        background={"white"}
        color={"origem.500"}
        onClick={() => {
          reqGet();
          onOpen();
        }}
        _hover={{
          background: "origem.500",
          transition: "all 0.4s",
          color: "white",
        }}
      >
        Nova Atividade
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
            fontFamily={"Mulish"}
          >
            Cadastrar Atividade
          </ModalHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              registerForm.handleSubmit(e);
            }}
          >
            <ModalBody mt={3}>
              {!areaResponsavel.isLoading && !isFetching ? (
                <Flex flexDirection={"column"} gap={5}>
                  <Flex flex={1} direction={"column"}>
                    <Flex gap={5} flex={1}>
                      <Flex direction={"column"} flex={2}>
                        <Flex gap={1}>
                          <RequiredField />
                          <Text
                            fontWeight={"700"}
                            fontSize={"12px"}
                            color={"#949494"}
                          >
                            NOME
                          </Text>
                        </Flex>
                        <Input
                          fontSize={"14px"}
                          fontWeight={"400"}
                          fontFamily={"Mulish"}
                          _placeholder={{ color: "#949494" }}
                          h={"56px"}
                          isRequired
                          placeholder="Digite o nome da atividade"
                          id="nom_atividade"
                          type="text"
                          name="nom_atividade"
                          w={"100%"}
                          value={regexCaracteresEspeciais(
                            registerForm.values.nom_atividade
                          )}
                          onChange={registerForm.handleChange}
                          maxLength={100}
                        />
                      </Flex>
                    </Flex>
                  </Flex>

                  <Flex gap={5} flex={1}>
                    <SelectFiltragem
                      registerForm={registerForm}
                      nomeSelect={"RELAÇÃO"}
                      propName={"relacao_id"}
                      options={relacoesOptions}
                      required={true}
                      value={getSelectFiltragemValue(
                        relacoesOptions,
                        "relacao_id",
                        registerForm
                      )}
                    />
                  </Flex>
                  <Flex flex={1} direction={"row"} gap={2}>
                    <Flex gap={5} flex={1}>
                      <SelectFiltragem
                        registerForm={registerForm}
                        nomeSelect={"MACRO"}
                        propName={"macro_id"}
                        options={macroOptions}
                        required={true}
                      />
                    </Flex>
                    <Flex gap={5} flex={1}>
                      {registerForm.values.responsavel_id === 0 ? (
                        <InputCadastroArea
                          required={true}
                          registerForm={registerForm}
                          listaOptions={optionsResponsaveis}
                          nomeLabel={"RESPONSAVEL"}
                          payloadKey={"nom_responsavel"}
                          propName={"responsavel_id"}
                          rota={"/area-responsavel"}
                          respOuCoord={true}
                          refreshState={refreshState}
                        />
                      ) : (
                        <SelectFiltragem
                          registerForm={registerForm}
                          nomeSelect={"ÁREA RESPONSÁVEL"}
                          propName={"responsavel_id"}
                          options={optionsResponsaveis}
                          required={true}
                        />
                      )}
                    </Flex>
                  </Flex>

                  <AtividadesDragAndDrop
                    registerForm={registerForm}
                    atividades={relacoesOptions}
                  />

                  <Flex flex={1} direction={"column"}>
                    <Flex gap={5}>
                      <Flex>
                        {registerForm.values.dat_fim_plan === "" ? (
                          <DateTimePickerDataInicio
                            hidden
                            registerForm={registerForm}
                          />
                        ) : (
                          <Flex direction={"column"}>
                            <Flex gap={1}>
                              <Text
                                fontWeight={"700"}
                                fontSize={"12px"}
                                color={"#949494"}
                              >
                                DATA INÍCIO
                              </Text>
                            </Flex>
                            <Button
                              h={"56px"}
                              variant="outline"
                              px={5}
                              minW={"220px"}
                              fontSize={"14px"}
                              fontWeight={"700"}
                              fontFamily={"Mulish"}
                              isDisabled={true}
                            >
                              {formatDateToddMMyyyyhhmmCronograma(
                                new Date(
                                  new Date(
                                    registerForm.values.dat_fim_plan
                                  ).setHours(
                                    new Date(
                                      registerForm.values.dat_fim_plan
                                    ).getHours() +
                                      getSumOfDays * 24
                                  )
                                ),
                                "inicio"
                              )}
                            </Button>
                          </Flex>
                        )}
                      </Flex>
                      <Flex direction={"column"} w={"20%"}>
                        <Flex gap={1}>
                          <RequiredField />
                          <Text
                            fontWeight={"700"}
                            fontSize={"12px"}
                            color={"#949494"}
                          >
                            DURAÇÃO
                          </Text>
                        </Flex>
                        <NumberInput
                          max={99999}
                          min={0}
                          id={"duracao_plan"}
                          name={"duracao_plan"}
                          value={registerForm.values.duracao_plan}
                          onChange={(value) => {
                            registerForm.setFieldValue(
                              "duracao_plan",
                              Number(value)
                            );
                          }}
                        >
                          <NumberInputField
                            maxLength={10}
                            bg={"#fff"}
                            h={"56px"}
                          />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              ) : (
                <Flex align={"center"} justify={"center"} w={"100%"} h={"50vh"}>
                  <Ring speed={2} lineWeight={5} color="blue" size={64} />
                </Flex>
              )}
            </ModalBody>

            <ModalCloseButton color={"white"} onClick={() => onClose()} />

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

export default ModalCadastroAtividades;
