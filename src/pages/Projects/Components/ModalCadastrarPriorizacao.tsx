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

type PropsType = {
  projeto: number;
};

function ModalCadastrarPriorizacao(projeto: PropsType) {
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
    ranking,
  } = useCadastroPriorizacao(projeto.projeto);

  // useEffect(() => {
  //   registerForm.setFieldValue("id_projeto", Number(projeto.projeto));
  // }, []);

  // Pegar id do projeto

  useEffect(() => {
    const valorRanking = ranking && ranking?.length > 0 ? ranking[0].id : 0;
    registerForm.setFieldValue("beneficio.opcao_id", valorRanking);
  }, [ranking]);

  useEffect(() => {
    registerForm.setFieldValue("id_projeto", Number(projeto.projeto));

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
                          htmlFor="beneficio.opcao_id"
                          fontSize={"12px"}
                          mb={"1px"}
                        >
                          BENEFÍCIO
                        </FormLabel>
                        <Select
                          isRequired
                          placeholder="Selecione"
                          id="beneficio.opcao_id"
                          name="beneficio.opcao_id"
                          value={registerForm.values.beneficio.opcao_id}
                          onChange={registerForm.handleChange}
                        >
                          {/* {registerForm.errors.beneficio && (
                            <TextError>
                              {registerForm.errors.beneficio}
                            </TextError>
                          )} */}
                          {listaBeneficios.map((bene: any, index: any) => (
                            <option value={+bene.opcao_id} key={index}>
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
                        <FormLabel
                          htmlFor="regulatorio.opcao_id"
                          fontSize={"12px"}
                          mb={"1px"}
                        >
                          REGULATÓRIO
                        </FormLabel>
                        <Select
                          isRequired
                          placeholder="Selecione"
                          id="regulatorio.opcao_id"
                          name="regulatorio.opcao_id"
                          value={registerForm.values.regulatorio.opcao_id}
                          onChange={registerForm.handleChange}
                        >
                          {/* {registerForm.errors.nom_campanha &&
                          registerForm.touched.nom_campanha && (
                            <TextError>
                              {registerForm.errors.nom_campanha}
                            </TextError>
                          )} */}
                          {listaRegulatorio.map((reg: any, index: any) => (
                            <option value={Number(reg.opcao_id)} key={index}>
                              {reg.nom_opcao}
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
                      mb={"10px"}
                    >
                      <FormControl>
                        <FormLabel
                          htmlFor="operacao.opcao_id"
                          fontSize={"12px"}
                          mb={"1px"}
                        >
                          OPERAÇÃO
                        </FormLabel>
                        <Select
                          isRequired
                          placeholder="Selecione"
                          id="operacao.opcao_id"
                          name="operacao.opcao_id"
                          value={registerForm.values.operacao.opcao_id}
                          onChange={registerForm.handleChange}
                        >
                          {/* {registerForm.errors.op_priori &&
                            registerForm.touched.op_priori && (
                              <TextError>
                                {registerForm.errors.nom_campanha}
                              </TextError>
                            )} */}
                          {listaOperacao.map((op: any, index: any) => (
                            <option value={Number(op.opcao_id)} key={index}>
                              {op.nom_opcao}
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
                      mb={"10px"}
                    >
                      <FormControl>
                        <FormLabel
                          htmlFor="prioridade.opcao_id"
                          fontSize={"12px"}
                          mb={"1px"}
                        >
                          PRIORIDADE
                        </FormLabel>
                        <Select
                          isRequired
                          placeholder="Selecione"
                          id="prioridade.opcao_id"
                          name="prioridade.opcao_id"
                          value={registerForm.values.prioridade.opcao_id}
                          onChange={registerForm.handleChange}
                        >
                          {/* {registerForm.errors.prioridade_priori &&
                          registerForm.touched.prioridade_priori && (
                            <TextError>
                              {registerForm.errors.prioridade_priori}
                            </TextError>
                          )} */}
                          {listaPrioridade.map((prior: any, index: any) => (
                            <option value={Number(prior.opcao_id)} key={index}>
                              {prior.nom_opcao}
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
                      mb={"10px"}
                    >
                      <FormControl>
                        <FormLabel
                          htmlFor="complexidade.opcao_id"
                          fontSize={"12px"}
                          mb={"1px"}
                        >
                          COMPLEXIDADE
                        </FormLabel>
                        <Select
                          isRequired
                          placeholder="Selecione"
                          id="complexidade.opcao_id"
                          name="complexidade.opcao_id"
                          value={registerForm.values.complexidade.opcao_id}
                          onChange={registerForm.handleChange}
                        >
                          {/* {registerForm.errors.complex_priori &&
                          registerForm.touched.complex_priori && (
                            <TextError>
                              {registerForm.errors.complex_priori}
                            </TextError>
                          )} */}
                          {listaComplexidade.map((compl: any, index: any) => (
                            <option value={Number(compl.opcao_id)} key={index}>
                              {compl.nom_opcao}
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
                      mb={"10px"}
                    >
                      <FormControl>
                        <FormLabel
                          htmlFor="estrategia.opcao_id"
                          fontSize={"12px"}
                          mb={"1px"}
                        >
                          ESTRATÉGIA PARA NEGÓCIO
                        </FormLabel>
                        <Select
                          isRequired
                          placeholder="Selecione"
                          id="estrategia.opcao_id"
                          name="estrategia.opcao_id"
                          value={registerForm.values.estrategia.opcao_id}
                          onChange={registerForm.handleChange}
                        >
                          {/* {registerForm.errors.est_neg_priori &&
                          (
                            <TextError>
                              {registerForm.errors.nom_campanha}
                            </TextError>
                          )} */}
                          {listaEstrategia.map((est: any, index: any) => (
                            <option value={Number(est.opcao_id)} key={index}>
                              {est.nom_opcao}
                            </option>
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
