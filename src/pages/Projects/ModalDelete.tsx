import { useState, useEffect } from "react";
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

import { useCadastroCampanha } from "hooks/useCadastroCampanha";

import { getProjetosRanking } from "services/get/Projetos-Ranking";

function ModalCadastrarPriorizacao() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading } = useCadastroCampanha();
  const [/* priorizacao, */ setPriorizacao] = useState<any>([]);

  const handlePriorizacao = async () => {
    const dataPriorizacao = await getProjetosRanking();
    if (dataPriorizacao) setPriorizacao(dataPriorizacao);
  };

  useEffect(() => {
    handlePriorizacao();
  }, []);

  // console.log(
  //   "prio",
  //   priorizacao.data.Benefício.map((x: any) => x.nom_opcao)
  // );
  // console.log(priorizacao.data.Benefício.map((x: any) => x.nom_opcao));

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
              e.preventDefault();
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
                        <FormLabel fontSize={"12px"} mb={"1px"}>
                          BENEFÍCIO
                        </FormLabel>
                        <Select
                          isRequired
                          placeholder="Selecione"
                          id="ben_priori"
                          name="ben_priori"
                          // value={registerForm.values.ben_priori}
                          // onChange={registerForm.handleChange}
                        >
                          {/* {registerForm.errors.ben_priori &&
                          registerForm.touched.ben_priori && (
                            <TextError>
                              {registerForm.errors.ben_priori}
                            </TextError>
                          )} */}
                          {/* {priorizacao.data.Benefício.map(
                            (bene: any, index: any) => (
                              <option value={bene.id} key={index}>
                                {bene.nom_opcao}
                              </option>
                            )
                          )} */}
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
                          id="reg_priori"
                          name="reg_priori"
                          mt={"10px"}
                          // value={registerForm.values.nom_campanha}
                          // onChange={registerForm.handleChange}
                        >
                          {/* {registerForm.errors.nom_campanha &&
                          registerForm.touched.nom_campanha && (
                            <TextError>
                              {registerForm.errors.nom_campanha}
                            </TextError>
                          )} */}
                          {/* {priorizacao.data.Regulatório.map(
                            (reg: any, index: any) => (
                              <option value={reg.id} key={index}>
                                {reg.nom_opcao}
                              </option>
                            )
                          )} */}
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
                          // value={registerForm.values.op_priori}
                          // onChange={registerForm.handleChange}
                        >
                          {/* {registerForm.errors.op_priori &&
                          registerForm.touched.op_priori && (
                            <TextError>
                              {registerForm.errors.nom_campanha}
                            </TextError>
                          )} */}
                          {/* {priorizacao.data.Operação.map(
                            (op: any, index: any) => (
                              <option value={op.id} key={index}>
                                {op.nom_opcao}
                              </option>
                            )
                          )} */}
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
                          // value={registerForm.values.prioridade_priori}
                          // onChange={registerForm.handleChange}
                        >
                          {/* {registerForm.errors.prioridade_priori &&
                          registerForm.touched.prioridade_priori && (
                            <TextError>
                              {registerForm.errors.prioridade_priori}
                            </TextError>
                          )} */}
                          {/* {priorizacao.data.Prioridade.map(
                            (prior: any, index: any) => (
                              <option value={prior.id} key={index}>
                                {prior.nom_opcao}
                              </option>
                            )
                          )} */}
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
                          // value={registerForm.values.complex_priori}
                          // onChange={registerForm.handleChange}
                        >
                          {/* {registerForm.errors.complex_priori &&
                          registerForm.touched.complex_priori && (
                            <TextError>
                              {registerForm.errors.complex_priori}
                            </TextError>
                          )} */}
                          {/* {priorizacao.data.Complexidade.map(
                            (prior: any, index: any) => (
                              <option value={prior.id} key={index}>
                                {prior.nom_opcao}
                              </option>
                            )
                          )} */}
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
                          // value={registerForm.values.est_neg_priori}
                          // onChange={registerForm.handleChange}
                        >
                          {/* {registerForm.errors.est_neg_priori &&
                          registerForm.touched.est_neg_priori && (
                            <TextError>
                              {registerForm.errors.nom_campanha}
                            </TextError>
                          )} */}
                          {/* {priorizacao.data.Operação.map(
                            (prior: any, index: any) => (
                              <option value={prior.id} key={index}>
                                {prior.nom_opcao}
                              </option>
                            )
                          )} */}
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
