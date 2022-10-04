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
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import Restricoes from "pages/Infographics/Components/Restricoes";

import { RequiredField } from "components/RequiredField/RequiredField";
import SelectFiltragem from "components/SelectFiltragem";

// import { handleCadastrarRefresh, handleCancelar } from "utils/handleCadastro";

import { regexCaracteresEspeciais } from "utils/regex";

import { useCadastroAtividadeProjeto } from "hooks/useCadastroAtividadeProjeto";

// import AtividadesDragAndDrop from "./AtividadesDragAndDrop";

interface Responsavel {
  id: number;
  nome: string;
}

function ModalCadastroAtividade({ setRefresh, refresh, atividades }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading, listaResponsaveis, listaAreaAtuacao } =
    useCadastroAtividadeProjeto();

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
  //   if (id === 0) {
  //     registerForm.setFieldValue("id_intervencao", id);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (registerForm.values.id_intervencao === 0) {
  //     registerForm.setFieldValue("id_intervencao", id);
  //   }
  // }, [registerForm.values]);

  // console.log("registerForm", registerForm.values);

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

                <Flex
                  flexDirection={useBreakpointValue({
                    base: "column",
                    md: "column",
                  })}
                  gap={2}
                >
                  <Text fontWeight={"bold"}>Restrições</Text>
                  <Restricoes registerForm={registerForm} />
                </Flex>
                {/* <AtividadesDragAndDrop
                  registerForm={registerForm}
                  atividades={atividades}
                /> */}
              </Flex>
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Flex gap={2}>
                <Button
                  variant="ghost"
                  color="red"
                  // onClick={() => handleCancelar(registerForm, onClose)}
                  _hover={{
                    background: "red.500",
                    transition: "all 0.4s",
                    color: "white",
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  // disabled={!registerForm.isValid || !registerForm.dirty}
                  background="origem.300"
                  variant="primary"
                  color="white"
                  // onClick={() =>
                  //   handleCadastrarRefresh(
                  //     registerForm,
                  //     onClose,
                  //     setRefresh,
                  //     refresh
                  //   )
                  // }
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

export default ModalCadastroAtividade;
