//  CRIADO EM: 09/2022
//  AUTOR: Bruno Fracaro
//  DESCRIÇÃO DO ARQUIVO: Modal de cadastrar atividade na tela da intervenção.

import { useEffect } from "react";

import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  useBreakpointValue,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import InputCadastroInline from "pages/CadastrarProjeto/Components/InputCadastroInline";

import BotaoVermelhoLargoGhost from "components/BotaoVermelhoLargo/BotaoVermelhoLargoGhost";
import InputNumericoGenerico from "components/InputNumericoGenerico";
import SelectFiltragem from "components/SelectFiltragem";

import { handleCadastrar, handleCancelar } from "utils/handleCadastro";
import { getUniqueActivities } from "utils/removeDuplicateObjectsFromArray";

import { useCadastroAtividadeIntervencao } from "hooks/useCadastroAtividadeIntervencao";

import AtividadesDragAndDrop from "./AtividadesDragAndDrop";

interface Responsavel {
  id: number;
  nome: string;
}

function ModalCadastroAtividadeIntervencao({
  id,
  setRefresh,
  refresh,
  atividades,
}: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    registerForm,
    loading,
    listaResponsaveis,
    listaAreaAtuacao,
    listaAtividades,
    hookRefreshState,
  } = useCadastroAtividadeIntervencao();

  const newRender = () => {
    setRefresh(!refresh);
  };

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

  const atividadesOptions = getUniqueActivities(
    listaAtividades.map((atividade: any) => ({
      value: atividade.id,
      label: atividade.nom_atividade,
    })),
    "label"
  );

  const getValue = (options: any, chave: any) => {
    const index = options
      .map(({ value }: any) => value)
      .indexOf(registerForm?.values?.[chave]);

    return {
      value: options?.[index]?.value,
      label: options?.[index]?.label,
    };
  };

  useEffect(() => {
    if (id === 0) {
      registerForm.setFieldValue("id_intervencao", id);
    }
  }, []);

  useEffect(() => {
    if (registerForm.values.id_intervencao === 0) {
      registerForm.setFieldValue("id_intervencao", id);
    }
  }, [registerForm.values]);

  useEffect(() => {}, [refresh, atividades]);

  return (
    <>
      <Button
        h={"56px"}
        borderRadius={"10px"}
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
          >
            Cadastrar Atividade de Intervenção
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
              <Flex direction={"column"} gap={4}>
                <Flex
                  flexDirection={useBreakpointValue({
                    base: "column",
                    md: "row",
                  })}
                  gap={5}
                >
                  <Flex flex={1} direction={"column"}>
                    <Flex flex={1}>
                      {registerForm.values.atividade_id === 0 ? (
                        <InputCadastroInline
                          required={true}
                          refreshState={hookRefreshState}
                          registerForm={registerForm}
                          listaOptions={atividadesOptions}
                          nomeLabel={"ATIVIDADE"}
                          payloadKey={"nom_atividade"}
                          propName={"atividade_id"}
                          rota={"/nova-atividade/outros"}
                          respOuCoord={false}
                        />
                      ) : (
                        <SelectFiltragem
                          registerForm={registerForm}
                          nomeSelect={"ATIVIDADE"}
                          propName={"atividade_id"}
                          options={atividadesOptions}
                          required={true}
                          value={getValue(atividadesOptions, "atividade_id")}
                        />
                      )}
                    </Flex>
                  </Flex>
                </Flex>

                <Flex
                  flexDirection={useBreakpointValue({
                    base: "column",
                    md: "row",
                  })}
                  gap={5}
                >
                  <Flex flex={2}>
                    {registerForm.values.responsavel_id === 0 ? (
                      <InputCadastroInline
                        required={true}
                        refreshState={hookRefreshState}
                        registerForm={registerForm}
                        listaOptions={responsaveisOptions}
                        nomeLabel={"RESPONSAVEL"}
                        payloadKey={"nome"}
                        propName={"responsavel_id"}
                        rota={"/responsavel"}
                        respOuCoord={true}
                      />
                    ) : (
                      <SelectFiltragem
                        registerForm={registerForm}
                        nomeSelect={"RESPONSÁVEL"}
                        propName={"responsavel_id"}
                        options={responsaveisOptions}
                        required={true}
                        value={getValue(responsaveisOptions, "responsavel_id")}
                      />
                    )}
                  </Flex>

                  <Flex flex={1}>
                    {registerForm.values.area_atuacao === 0 ? (
                      <InputCadastroInline
                        required={true}
                        refreshState={hookRefreshState}
                        registerForm={registerForm}
                        listaOptions={responsaveisOptions}
                        nomeLabel={"ÁREA"}
                        payloadKey={"nome"}
                        propName={"area_atuacao"}
                        rota={"/nova-atividade/area/outros"}
                        respOuCoord={false}
                      />
                    ) : (
                      <SelectFiltragem
                        registerForm={registerForm}
                        nomeSelect={"ÁREA"}
                        propName={"area_atuacao"}
                        options={areaAtuacaoOptions}
                        required={true}
                        value={getValue(areaAtuacaoOptions, "area_atuacao")}
                      />
                    )}
                  </Flex>
                </Flex>

                <Flex
                  flexDirection={useBreakpointValue({
                    base: "column",
                    md: "row",
                  })}
                  gap={5}
                >
                  <InputNumericoGenerico
                    required={true}
                    registerForm={registerForm}
                    propName={"duracao"}
                    nomeInput={"DURAÇÃO"}
                    tipo={"dias"}
                    stepper={true}
                  />
                </Flex>

                <Flex
                  flexDirection={useBreakpointValue({
                    base: "column",
                    md: "column",
                  })}
                  gap={2}
                ></Flex>
                <AtividadesDragAndDrop
                  registerForm={registerForm}
                  atividades={atividades}
                />
              </Flex>
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Flex gap={2}>
                <BotaoVermelhoLargoGhost
                  text={"Cancelar"}
                  formikForm={registerForm}
                  onClose={onClose}
                />
                <Button
                  background="origem.500"
                  variant="primary"
                  color="white"
                  onClick={() => {
                    newRender();
                    handleCadastrar(registerForm, onClose);
                  }}
                  _hover={{
                    background: "origem.600",
                    transition: "all 0.4s",
                  }}
                  borderRadius={"8px"}
                  w={"208px"}
                  h={"56px"}
                  fontSize="18px"
                  fontWeight={"700"}
                  fontFamily={"Mulish"}
                  disabled={!registerForm.isValid}
                >
                  {loading ? (
                    <Ring speed={2} lineWeight={5} color="white" size={24} />
                  ) : (
                    <>
                      <Text>Cadastrar</Text>
                    </>
                  )}
                </Button>
              </Flex>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalCadastroAtividadeIntervencao;
