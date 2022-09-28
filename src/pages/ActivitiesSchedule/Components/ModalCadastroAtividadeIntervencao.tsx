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
  FormControl,
  FormLabel,
  Stack,
  useBreakpointValue,
  Input,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import Restricoes from "pages/Infographics/Components/Restricoes";

import { RequiredField } from "components/RequiredField/RequiredField";
import SelectFiltragem from "components/SelectFiltragem";

import { handleCadastrar, handleCancelar } from "utils/handleCadastro";
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

  return (
    <>
      <Button
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
            Cadastrar Atividade de Intervenção
          </ModalHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              registerForm.handleSubmit(e);
            }}
          >
            <ModalBody mt={3}>
              <FormControl>
                <Flex direction={"column"} gap={4}>
                  <Stack>
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={5}
                    >
                      <Flex flex={1}>
                        <FormControl>
                          <Flex gap={1}>
                            <RequiredField />
                            <FormLabel htmlFor="id_origem">ID</FormLabel>
                          </Flex>
                          <Input
                            isRequired
                            placeholder="Digite o ID"
                            id="id_origem"
                            type="text"
                            name="id_origem"
                            w={useBreakpointValue({ base: "100%", md: "100%" })}
                            value={regexCaracteresEspeciais(
                              registerForm.values.id_origem
                            )}
                            onChange={registerForm.handleChange}
                            maxLength={10}
                          />
                        </FormControl>
                      </Flex>
                      <Flex flex={4}>
                        <FormControl>
                          <Flex gap={1}>
                            <RequiredField />
                            <FormLabel htmlFor="nom_atividade">NOME</FormLabel>
                          </Flex>
                          <Input
                            isRequired
                            placeholder="Digite o nome da atividade"
                            id="nom_atividade"
                            type="text"
                            name="nom_atividade"
                            w={useBreakpointValue({ base: "100%", md: "100%" })}
                            value={regexCaracteresEspeciais(
                              registerForm.values.nom_atividade
                            )}
                            onChange={registerForm.handleChange}
                            maxLength={100}
                          />
                        </FormControl>
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
                          nomeSelect={"Responsável"}
                          propName={"responsavel_id"}
                          options={responsaveisOptions}
                          required={true}
                        />
                      </Flex>
                      <Flex flex={1}>
                        <SelectFiltragem
                          registerForm={registerForm}
                          nomeSelect={"Área"}
                          propName={"area_atuacao_id"}
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
                      <FormLabel mt={2}>RESTRIÇÕES</FormLabel>
                      <Restricoes registerForm={registerForm} />
                    </Flex>
                    <AtividadesDragAndDrop
                      registerForm={registerForm}
                      atividades={atividades}
                    />
                  </Stack>
                </Flex>
              </FormControl>
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Flex gap={2}>
                <Button
                  variant="ghost"
                  color="red"
                  onClick={() => handleCancelar(registerForm, onClose)}
                  _hover={{
                    background: "red.500",
                    transition: "all 0.4s",
                    color: "white",
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  disabled={!registerForm.isValid || !registerForm.dirty}
                  background="origem.300"
                  variant="primary"
                  color="white"
                  onClick={() => handleCadastrar(registerForm, onClose)}
                  _hover={{
                    background: "origem.500",
                    transition: "all 0.4s",
                  }}
                >
                  {loading ? (
                    <Ring speed={2} lineWeight={5} color="white" size={24} />
                  ) : (
                    <>
                      <Text>Concluir Cadastro</Text>
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
