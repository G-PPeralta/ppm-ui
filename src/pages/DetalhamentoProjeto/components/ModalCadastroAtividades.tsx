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
  useBreakpointValue,
  Input,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";

// import Restricoes from "pages/Infographics/Components/Restricoes";

import BotaoAzulPrimary from "components/BotaoAzul/BotaoAzulPrimary";
import BotaoVermelhoGhost from "components/BotaoVermelho/BotaoVermelhoGhost";
import { RequiredField } from "components/RequiredField/RequiredField";
import SelectFiltragem from "components/SelectFiltragem";

import { regexCaracteresEspeciais } from "utils/regex";

import { useCadastroAtividadeProjeto } from "hooks/useCadastroAtividadeProjeto";

// import PopOverRelacao from "./PopOverRelacao";

import AtividadesDragAndDrop from "./AtividadesDragAndDrop";
import DateTimePickerDataInicio from "./DateTimePickerDataInicio";

interface Responsavel {
  id: number;
  nome: string;
}

interface Props {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refreshGanttCriacao: boolean;
  setRefreshGanttCriacao: React.Dispatch<React.SetStateAction<boolean>>;
  // atividades?: any;
  idProjeto?: number;
}

function ModalCadastroAtividades({
  refresh,
  setRefresh,
  setRefreshGanttCriacao,
  refreshGanttCriacao,
  idProjeto,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    registerForm,
    loading,
    listaResponsaveis,
    listaAreaAtuacao,
    listaAtividadesRelacao,
  } = useCadastroAtividadeProjeto(
    refreshGanttCriacao,
    setRefreshGanttCriacao,
    idProjeto
  );

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

  const relacoesOptions = listaAtividadesRelacao.map((atividade: any) => ({
    value: atividade.id,
    label: atividade.valor,
  }));

  useEffect(() => {
    if (idProjeto) {
      registerForm.setFieldValue("id_projeto", idProjeto);
    }
  }, []);

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
            fontSize={"1em"}
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
                    <Flex direction={"column"} flex={1}>
                      <Flex gap={1}>
                        <RequiredField />
                        <Text
                          fontWeight={"bold"}
                          fontSize={"12px"}
                          color={"#949494"}
                        >
                          ID
                        </Text>
                      </Flex>
                      <Input
                        h={"56px"}
                        isRequired
                        placeholder="Digite o ID"
                        id="id_origem"
                        type="text"
                        name="id_origem"
                        w={useBreakpointValue({
                          base: "100%",
                          md: "100%",
                        })}
                        value={regexCaracteresEspeciais(
                          registerForm.values.id_origem
                        )}
                        onChange={registerForm.handleChange}
                        maxLength={10}
                      />
                    </Flex>
                    <Flex direction={"column"} flex={2}>
                      <Flex gap={1}>
                        <RequiredField />
                        <Text
                          fontWeight={"bold"}
                          fontSize={"12px"}
                          color={"#949494"}
                        >
                          NOME
                        </Text>
                      </Flex>
                      <Input
                        h={"56px"}
                        isRequired
                        placeholder="Digite o nome da atividade"
                        id="nom_atividade"
                        type="text"
                        name="nom_atividade"
                        w={useBreakpointValue({
                          base: "100%",
                          md: "100%",
                        })}
                        value={regexCaracteresEspeciais(
                          registerForm.values.nom_atividade
                        )}
                        onChange={registerForm.handleChange}
                        maxLength={100}
                      />
                    </Flex>
                  </Flex>
                </Flex>

                <Flex flex={1} direction={"column"}>
                  <Text fontWeight={"bold"}>Relação</Text>
                  <SelectFiltragem
                    registerForm={registerForm}
                    nomeSelect={"RELAÇÃO"}
                    propName={"relacao_id"}
                    options={relacoesOptions}
                    required={false}
                  />
                </Flex>

                <Flex flex={1} direction={"column"}>
                  <Text fontWeight={"bold"}>Responsável</Text>
                  <Flex gap={5} flex={1}>
                    <SelectFiltragem
                      registerForm={registerForm}
                      nomeSelect={"RESPONSÁVEL"}
                      propName={"responsavel_id"}
                      options={responsaveisOptions}
                      required={true}
                    />

                    <SelectFiltragem
                      registerForm={registerForm}
                      nomeSelect={"ÁREA"}
                      propName={"area_atuacao"}
                      options={areaAtuacaoOptions}
                      required={true}
                    />
                  </Flex>
                </Flex>

                <Flex flex={1} direction={"column"}>
                  <Text fontWeight={"bold"}>Datas</Text>
                  <Flex gap={5}>
                    <Flex>
                      <DateTimePickerDataInicio registerForm={registerForm} />
                    </Flex>
                    <Flex direction={"column"} w={"20%"}>
                      <Flex gap={1}>
                        <RequiredField />
                        <Text
                          fontWeight={"bold"}
                          fontSize={"12px"}
                          color={"#949494"}
                        >
                          DURAÇÃO EM DIAS
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

                <AtividadesDragAndDrop
                  registerForm={registerForm}
                  atividades={relacoesOptions}
                />
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

export default ModalCadastroAtividades;
