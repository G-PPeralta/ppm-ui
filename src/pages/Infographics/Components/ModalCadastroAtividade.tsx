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
} from "@chakra-ui/react";
import { Responsavel } from "interfaces/CadastrosModaisInfograficos";

import BotaoAzulPrimary from "components/BotaoAzul/BotaoAzulPrimary";
import BotaoVermelhoGhost from "components/BotaoVermelho/BotaoVermelhoGhost";
import { RequiredField } from "components/RequiredField/RequiredField";
import SelectFiltragem from "components/SelectFiltragem";

import { regexCaracteresEspeciais } from "utils/regex";

import { useCadastroAtividade } from "hooks/useCadastroAtividade";

import Restricoes from "./Restricoes";

function ModalCadastroAtividade() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading, listaResponsaveis } = useCadastroAtividade();
  const [refresh, setRefresh] = useState(false);

  const optionsResponsaveis = listaResponsaveis.map(
    (responsavel: Responsavel) => ({
      value: responsavel.id,
      label: responsavel.nome,
    })
  );

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
                  <Flex flex={1} direction={"column"}>
                    <Text fontWeight={"bold"}>Responsável</Text>
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
                          options={optionsResponsaveis}
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
                >
                  <Text fontWeight={"bold"}>Restrição</Text>
                  <Restricoes registerForm={registerForm} />
                </Flex>
              </Flex>
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Flex gap={2}>
                <BotaoVermelhoGhost
                  text={"Cancelar"}
                  formikForm={registerForm}
                  onClose={onClose}
                />
                <BotaoAzulPrimary
                  text={"Concluir Cadastro"}
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
