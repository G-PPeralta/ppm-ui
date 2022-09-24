import { useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
// import { IoIosPodium } from "react-icons/io";

// import { Link } from "react-router-dom";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  // ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  // Textarea,
  useBreakpointValue,
  useDisclosure,
  Input,
  Select,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

// import { TextError } from "components/TextError";

import { handleCadastrar, handleCancelar } from "utils/handleCadastro";

import { useCadastroPriorizacao } from "hooks/useCadastroPriorizacao";

function ModalCadastrarPriorizacao() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    registerForm,
    loading,
    listaBeneficios,
    listaOperacao,
    listaEstrategia,
    listaComplexidade,
    listaPrioridade,
    listaRegulatorio,
  } = useCadastroPriorizacao();

  // console.log("registerform", registerForm.values);

  // console.log("isvalid", registerForm.isValid);

  // useEffect(() => {
  //   registerForm.setFieldValue("id_projeto", Number(projeto.projeto));
  // }, []);

  // Pegar id do projeto
  // console.log("id-cadastrar", projeto.projeto);

  useEffect(() => {
    // registerForm.setFieldValue("id_projeto", Number(projeto.projeto));
    registerForm.setFieldValue(
      "beneficio.id_ranking",
      Number(listaBeneficios[0]?.id)
    );
    registerForm.setFieldValue(
      "regulatorio.id_ranking",
      Number(listaRegulatorio[0]?.id)
    );
    registerForm.setFieldValue(
      "operacao.id_ranking",
      Number(listaOperacao[0]?.id)
    );
    registerForm.setFieldValue(
      "prioridade.id_ranking",
      Number(listaPrioridade[0]?.id)
    );
    registerForm.setFieldValue(
      "complexidade.id_ranking",
      Number(listaComplexidade[0]?.id)
    );
    registerForm.setFieldValue(
      "estrategia.id_ranking",
      Number(listaEstrategia[0]?.id)
    );
  }, [registerForm.values]);

  return (
    <>
      <Button
        onClick={onOpen}
        color={"white"}
        backgroundColor={"origem.500"}
        aria-label="Plus sign"
        variant="primary"
        _hover={{
          background: "origem.300",
          transition: "all 0.4s",
        }}
        mr={"18px"}
      >
        Cadastrar
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
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
            Configuração
          </ModalHeader>
          {/* <ModalCloseButton color={"white"} /> */}
          <form
            onSubmit={(e) => {
              // e.preventDefault();
              registerForm.handleSubmit(e);
            }}
          >
            <ModalBody mt={3}>
              <FormControl>
                <Flex gap={4}>
                  <Stack gap={2}>
                    <Flex direction={"column"}>
                      <Flex>
                        <Text>
                          <Button
                            aria-label=""
                            backgroundColor={"white"}
                            color={"black"}
                            onClick={() =>
                              handleCancelar(registerForm, onClose)
                            }
                            _hover={{
                              background: "white",
                              transition: "all 0.4s",
                              color: "origem.500",
                            }}
                            fontSize={"20px"}
                          >
                            <IoIosArrowBack /> Priorização
                          </Button>
                        </Text>
                      </Flex>
                      <Flex direction={"column"}>
                        <Flex
                          flexDirection={useBreakpointValue({
                            base: "column",
                            md: "row",
                          })}
                          gap={5}
                          mt={"10px"}
                        >
                          <FormControl>
                            <FormLabel
                              htmlFor="regulatorio.opcao_id"
                              fontSize={"12px"}
                              mb={"1px"}
                              ml={"3px"}
                            >
                              NOME DA PRIORIZAÇÃO
                            </FormLabel>
                            <Input
                              ml={"3px"}
                              w={"400px"}
                              isRequired
                              placeholder="Nome"
                              id="beneficio.opcao_id"
                              name="beneficio.opcao_id"
                              value={registerForm.values.beneficio.opcao_id}
                              onChange={registerForm.handleChange}
                            />
                          </FormControl>
                        </Flex>

                        <Flex
                          flexDirection={useBreakpointValue({
                            base: "column",
                            md: "row",
                          })}
                          gap={5}
                          mt={"10px"}
                        >
                          <FormControl>
                            <FormLabel
                              htmlFor="regulatorio.opcao_id"
                              fontSize={"12px"}
                              mb={"1px"}
                              w={"550px"}
                              mt={"5px"}
                            >
                              PERFIS COM ACESSO
                            </FormLabel>
                            <Select
                              id="pit"
                              name="pit"
                              placeholder="Selecione"
                              // value={activitiesForm.values.pit}
                              // onChange={activitiesForm.handleChange}
                              w={useBreakpointValue({
                                base: "100%",
                                md: "95%",
                              })}
                            >
                              <option value="not1">1</option>
                              <option value="not2">2</option>
                              <option value="not3">3</option>
                              <option value="not4">4</option>
                              <option value="not5">5</option>
                              <option value="not6">6</option>
                            </Select>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Flex>
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
                  disabled={!registerForm.isValid}
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

export default ModalCadastrarPriorizacao;
