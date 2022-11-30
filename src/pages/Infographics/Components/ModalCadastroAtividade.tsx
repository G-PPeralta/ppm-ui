import { useState } from "react";

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
  Input,
  Text,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Responsavel } from "interfaces/CadastrosModaisInfograficos";

import BotaoAzulLargoPrimary from "components/BotaoAzulLargo/BotaoAzulLargoPrimary";
import BotaoVermelhoLargoGhost from "components/BotaoVermelhoLargo/BotaoVermelhoLargoGhost";
import { RequiredField } from "components/RequiredField/RequiredField";
import SelectFiltragem from "components/SelectFiltragem";

import { handleCancelar } from "utils/handleCadastro";
import { opcoesFase } from "utils/opcoesFase";
import { regexCaracteresEspeciais } from "utils/regex";

import { useCadastroAtividade } from "hooks/useCadastroAtividade";

function ModalCadastroAtividade() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading, listaResponsaveis, listaAreaAtuacao } =
    useCadastroAtividade();
  const [refresh, setRefresh] = useState(false);

  const optionsResponsaveis = listaResponsaveis.map(
    (responsavel: Responsavel) => ({
      value: responsavel.id,
      label: responsavel.nome,
    })
  );

  const optionsAreaAtuacao = listaAreaAtuacao.map((area: any) => ({
    value: area.id,
    label: area.tipo,
  }));

  return (
    <>
      <Button
        h={"56px"}
        borderRadius={"10px"}
        background={"white"}
        border={"2px solid"}
        color={"origem.500"}
        _hover={{
          border: "2px solid",
          borderColor: "origem.500",
          background: "origem.500",
          transition: "all 0.4s",
          color: "white",
        }}
        textColor={"origem.500"}
        onClick={onOpen}
      >
        Atividade
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
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
            Cadastrar Atividade
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
                          _placeholder={{ color: "#949494" }}
                          fontSize={"14px"}
                          fontWeight={"400"}
                          color={"black"}
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
                            fontWeight={"700"}
                            fontSize={"12px"}
                            color={"#949494"}
                          >
                            NOME
                          </Text>
                        </Flex>
                        <Input
                          h={"56px"}
                          _placeholder={{ color: "#949494" }}
                          fontSize={"14px"}
                          fontWeight={"400"}
                          color={"black"}
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
                      <Flex flex={1}>
                        <SelectFiltragem
                          registerForm={registerForm}
                          nomeSelect={"FASE"}
                          propName={"fase_id"}
                          options={opcoesFase}
                          required={true}
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
                  <Flex flex={1} direction={"column"}>
                    <Flex
                      gap={5}
                      flex={1}
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                    >
                      <Flex direction={"column"} flex={2}>
                        <SelectFiltragem
                          registerForm={registerForm}
                          nomeSelect={"RESPONSÁVEL"}
                          propName={"responsavel_id"}
                          options={optionsResponsaveis}
                          required={true}
                        />
                      </Flex>
                      <Flex direction={"column"} flex={1}>
                        <SelectFiltragem
                          registerForm={registerForm}
                          nomeSelect={"ÁREA"}
                          propName={"area_atuacao"}
                          options={optionsAreaAtuacao}
                          required={true}
                        />
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>

                <Flex
                  flexDirection={useBreakpointValue({
                    base: "column",
                    md: "column",
                  })}
                  gap={2}
                ></Flex>
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

export default ModalCadastroAtividade;
