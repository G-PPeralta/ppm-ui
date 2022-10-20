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
  ModalCloseButton,
} from "@chakra-ui/react";

import Restricoes from "pages/Infographics/Components/Restricoes";

import BotaoAzulLargoPrimary from "components/BotaoAzulLargo/BotaoAzulLargoPrimary";
import BotaoVermelhoLargoGhost from "components/BotaoVermelhoLargo/BotaoVermelhoLargoGhost";
import { RequiredField } from "components/RequiredField/RequiredField";
import SelectFiltragem from "components/SelectFiltragem";

import { handleCancelar } from "utils/handleCadastro";
import { regexCaracteresEspeciais } from "utils/regex";

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
  const { registerForm, loading, listaResponsaveis, listaAreaAtuacao } =
    useCadastroAtividadeIntervencao();

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

  // console.log("registerForm", registerForm.values);

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
            fontSize={"1em"}
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
                    <Text fontWeight={"bold"}>Nome</Text>
                    <Flex
                      gap={5}
                      flex={1}
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                    >
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
                </Flex>

                <Flex
                  flexDirection={useBreakpointValue({
                    base: "column",
                    md: "row",
                  })}
                  gap={5}
                >
                  <Flex flex={2}>
                    <SelectFiltragem
                      registerForm={registerForm}
                      nomeSelect={"RESPONSÁVEL"}
                      propName={"responsavel_id"}
                      options={responsaveisOptions}
                      required={true}
                    />
                  </Flex>
                  <Flex flex={1}>
                    <SelectFiltragem
                      registerForm={registerForm}
                      nomeSelect={"ÁREA"}
                      propName={"area_atuacao"}
                      options={areaAtuacaoOptions}
                      required={true}
                    />
                  </Flex>
                </Flex>

                <Flex
                  flexDirection={useBreakpointValue({
                    base: "column",
                    md: "column",
                  })}
                  gap={2}
                >
                  <Text fontWeight={"bold"}>Restrição</Text>
                  <Restricoes registerForm={registerForm} />
                </Flex>
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
                <BotaoAzulLargoPrimary
                  text={"Cadastrar"}
                  formikForm={registerForm}
                  onClose={onClose}
                  setRefresh={setRefresh}
                  refresh={refresh}
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

export default ModalCadastroAtividadeIntervencao;
