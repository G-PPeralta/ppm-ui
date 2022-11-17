import { useEffect } from "react";

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
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import BotaoAzulPrimary from "components/BotaoAzul/BotaoAzulPrimary";
import BotaoVermelhoGhost from "components/BotaoVermelho/BotaoVermelhoGhost";
import { RequiredField } from "components/RequiredField/RequiredField";
import SelectFiltragem from "components/SelectFiltragem";

import { regexCaracteresEspeciais } from "utils/regex";

import { useDetalhamentoProjeto } from "contexts/DetalhamentoDeProjetos";

import { useCadastroAtividadeProjeto } from "hooks/useCadastroAtividadeProjeto";

// import PopOverRelacao from "./PopOverRelacao";

import AtividadesDragAndDrop from "./AtividadesDragAndDrop";
import DateTimePickerDataInicio from "./DateTimePickerDataInicio";

interface Props {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refreshGanttCriacao: boolean;
  setRefreshGanttCriacao: React.Dispatch<React.SetStateAction<boolean>>;
  // atividades?: any;
  idProjeto?: number;
}

interface AreaResponsavel {
  id: number;
  id_classe: number;
  nom_responsavel: string;
  num_peso: string;
}
function ModalCadastroAtividades({
  refresh,
  setRefresh,
  setRefreshGanttCriacao,
  refreshGanttCriacao,
  idProjeto,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading, listaAtividadesRelacao } =
    useCadastroAtividadeProjeto(
      refreshGanttCriacao,
      setRefreshGanttCriacao,
      idProjeto
    );
  const { data, isLoading } = useDetalhamentoProjeto();

  const relacoesOptions = listaAtividadesRelacao.map((atividade: any) => ({
    value: atividade.id,
    label: atividade.valor,
  }));

  useEffect(() => {
    if (idProjeto) {
      registerForm.setFieldValue("id_projeto", idProjeto);
    }
  }, []);

  useEffect(() => {
    if (idProjeto) {
      registerForm.setFieldValue("id_projeto", idProjeto);
    }
  }, [registerForm.values.id_projeto]);

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
              {!isLoading ? (
                <Flex flexDirection={"column"} gap={5}>
                  <Flex flex={1} direction={"column"}>
                    {/* <Text fontWeight={"bold"}>Nome</Text> */}
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

                  <Flex flex={1} direction={"row"} gap={2}>
                    {/* <Text fontWeight={"bold"}>Relação</Text> */}
                    <Flex gap={5} flex={1}>
                      <SelectFiltragem
                        registerForm={registerForm}
                        nomeSelect={"RELAÇÃO"}
                        propName={"relacao_id"}
                        options={relacoesOptions}
                        required={true}
                      />
                    </Flex>
                    {/* <Text fontWeight={"bold"}>Responsável</Text> */}
                    <Flex gap={5} flex={1}>
                      <SelectFiltragem
                        registerForm={registerForm}
                        nomeSelect={"ÁREA RESPONSÁVEL"}
                        propName={"responsavel_id"}
                        options={data
                          .map((areaResponsavel: AreaResponsavel) => ({
                            value: areaResponsavel.id,
                            label: areaResponsavel.nom_responsavel,
                          }))
                          .sort((a: any, b: any) =>
                            a.label.localeCompare(b.label)
                          )}
                        required={true}
                      />
                    </Flex>
                  </Flex>

                  <Flex flex={1} direction={"column"}>
                    {/* <Text fontWeight={"bold"}>Datas</Text> */}
                    <Flex gap={5}>
                      <Flex>
                        <DateTimePickerDataInicio registerForm={registerForm} />
                      </Flex>
                      <Flex direction={"column"} w={"20%"}>
                        <Flex gap={1}>
                          <RequiredField />
                          <Text
                            fontWeight={"700"}
                            fontSize={"12px"}
                            color={"#949494"}
                          >
                            DIAS ÚTEIS
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
                            maxLength={5}
                            bg={"#fff"}
                            h={"56px"}
                          />
                        </NumberInput>
                      </Flex>
                    </Flex>
                  </Flex>

                  <AtividadesDragAndDrop
                    registerForm={registerForm}
                    atividades={relacoesOptions}
                  />
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
