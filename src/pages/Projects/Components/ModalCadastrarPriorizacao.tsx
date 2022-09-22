import { useEffect } from "react";
import { IoIosPodium } from "react-icons/io";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Select,
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
  IconButton,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

// import { TextError } from "components/TextError";

import { handleCadastrar, handleCancelar } from "utils/handleCadastro";

import { useCadastroPriorizacao } from "hooks/useCadastroPriorizacao";

type id = {
  projeto: number;
};

function ModalCadastrarPriorizacao(projeto: id) {
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

  useEffect(() => {
    registerForm.setFieldValue("id_projeto", Number(projeto.projeto));
    // registerForm.setFieldValue("id_ranking", Number(listaBeneficios.map((idRa)) => idRa.id));
  }, []);

  console.log("lista", listaBeneficios);

  // Pegar id do projeto
  console.log("id-cadastrar", projeto.projeto);

  return (
    <>
      <IconButton
        onClick={onOpen}
        color={"origem.500"}
        backgroundColor={"white"}
        aria-label="Plus sign"
        _hover={{
          backgroundColor: "origem.500",
          color: "white",
        }}
      >
        <IoIosPodium />
      </IconButton>
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
            Priorização
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
                <Flex direction={"column"} gap={4}>
                  <Stack gap={2}>
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={5}
                    >
                      <FormControl>
                        <FormLabel
                          htmlFor="beneficio"
                          fontSize={"12px"}
                          mb={"1px"}
                        >
                          BENEFÍCIO
                        </FormLabel>
                        <Select
                          isRequired
                          placeholder="Selecione"
                          id="opcao_id"
                          name="opcao_id"
                          // value={registerForm.values.beneficio}
                          // onChange={registerForm.handleChange}
                        >
                          {/* {registerForm.errors.beneficio &&
                            registerForm.touched.beneficio && (
                              <TextError>
                                {registerForm.errors.beneficio}
                              </TextError>
                            )} */}
                          {listaBeneficios.map((bene: any, index: any) => (
                            <option value={bene.opcao_id} key={index}>
                              {bene.nom_opcao}
                            </option>
                          ))}
                        </Select>
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
                        <FormLabel fontSize={"12px"} mb={"1px"}>
                          REGULATÓRIO
                        </FormLabel>
                        <Select
                          isRequired
                          placeholder="Selecione"
                          id="regulatorio"
                          name="regulatorio"
                          value={registerForm.values.regulatorio}
                          onChange={registerForm.handleChange}
                        >
                          {/* {registerForm.errors.nom_campanha &&
                          registerForm.touched.nom_campanha && (
                            <TextError>
                              {registerForm.errors.nom_campanha}
                            </TextError>
                          )} */}
                          {listaRegulatorio.map((reg: any, index: any) => (
                            <option key={index}>{reg.nom_opcao}</option>
                          ))}
                        </Select>
                      </FormControl>
                    </Flex>

                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={5}
                      mb={"10px"}
                    >
                      <FormControl>
                        <FormLabel fontSize={"12px"} mb={"1px"}>
                          OPERAÇÃO
                        </FormLabel>
                        <Select
                          isRequired
                          placeholder="Selecione"
                          id="op_priori"
                          name="op_priori"
                          value={registerForm.values.operacao}
                          onChange={registerForm.handleChange}
                        >
                          {/* {registerForm.errors.op_priori &&
                            registerForm.touched.op_priori && (
                              <TextError>
                                {registerForm.errors.nom_campanha}
                              </TextError>
                            )} */}
                          {listaOperacao.map((op: any, index: any) => (
                            <option key={index}>{op.nom_opcao}</option>
                          ))}
                        </Select>
                      </FormControl>
                    </Flex>
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={5}
                      mb={"10px"}
                    >
                      <FormControl>
                        <FormLabel fontSize={"12px"} mb={"1px"}>
                          PRIORIDADE
                        </FormLabel>
                        <Select
                          isRequired
                          placeholder="Selecione"
                          id="prioridade_priori"
                          name="prioridade_priori"
                          value={registerForm.values.prioridade}
                          onChange={registerForm.handleChange}
                        >
                          {/* {registerForm.errors.prioridade_priori &&
                          registerForm.touched.prioridade_priori && (
                            <TextError>
                              {registerForm.errors.prioridade_priori}
                            </TextError>
                          )} */}
                          {listaPrioridade.map((prior: any, index: any) => (
                            <option key={index}>{prior.nom_opcao}</option>
                          ))}
                        </Select>
                      </FormControl>
                    </Flex>
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={5}
                      mb={"10px"}
                    >
                      <FormControl>
                        <FormLabel fontSize={"12px"} mb={"1px"}>
                          COMPLEXIDADE
                        </FormLabel>
                        <Select
                          isRequired
                          placeholder="Selecione"
                          id="complex_priori"
                          name="complex_priori"
                          value={registerForm.values.complexidade}
                          onChange={registerForm.handleChange}
                        >
                          {/* {registerForm.errors.complex_priori &&
                          registerForm.touched.complex_priori && (
                            <TextError>
                              {registerForm.errors.complex_priori}
                            </TextError>
                          )} */}
                          {listaComplexidade.map((prior: any, index: any) => (
                            <option key={index}>{prior.nom_opcao}</option>
                          ))}
                        </Select>
                      </FormControl>
                    </Flex>
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={5}
                      mb={"10px"}
                    >
                      <FormControl>
                        <FormLabel fontSize={"12px"} mb={"1px"}>
                          ESTRATÉGIA PARA NEGÓCIO
                        </FormLabel>
                        <Select
                          isRequired
                          placeholder="Selecione"
                          id="est_neg_priori"
                          name="est_neg_priori"
                          value={registerForm.values.estrategia}
                          onChange={registerForm.handleChange}
                        >
                          {/* {registerForm.errors.est_neg_priori &&
                          registerForm.touched.est_neg_priori && (
                            <TextError>
                              {registerForm.errors.nom_campanha}
                            </TextError>
                          )} */}
                          {listaEstrategia.map((prior: any, index: any) => (
                            <option key={index}>{prior.nom_opcao}</option>
                          ))}
                        </Select>
                      </FormControl>
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
                      <Text>Confirmar</Text>
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
