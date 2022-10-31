import { useEffect, useState } from "react";
import { IoIosPodium } from "react-icons/io";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  // Textarea,
  useBreakpointValue,
  useDisclosure,
  // IconButton,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

// import { TextError } from "components/TextError";

import { handleCancelar } from "utils/handleCadastro";

import { useAuth } from "hooks/useAuth";
import { useCadastroPriorizacao } from "hooks/useCadastroPriorizacao";

import { postProject } from "services/post/Priorizacao";

import { getInitialRaking } from "../../../services/get/Ranking";

type PropsType = {
  projeto: number;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
  isPriorizacaoModalOpen?: boolean;
  setIsPriorizacaoModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

function ModalCadastrarPriorizacao({
  projeto,
  refresh,
  setRefresh,
  isPriorizacaoModalOpen,
  setIsPriorizacaoModalOpen,
}: PropsType) {
  const { user } = useAuth();
  const [initialValues, setInitialValues] = useState([]);
  const [beneficio, setBeneficio] = useState("");
  const [regulatorio, setRegulatorio] = useState("");
  const [operacao, setOperacao] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [complexidade, setComplexidade] = useState("");
  const [estrategia, setEstrategia] = useState("");

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
  } = useCadastroPriorizacao(projeto);

  async function handleGetInitialValues(id: any) {
    const response = await getInitialRaking(id);
    setInitialValues(response.data);
    // console.log(response.data);
  }

  useEffect(() => {
    const valorRanking = ranking && ranking?.length > 0 ? ranking[0].id : 0;
    registerForm.setFieldValue("beneficio.opcao_id", valorRanking);
  }, [ranking]);

  useEffect(() => {
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

  useEffect(() => {
    registerForm.setFieldValue("id_projeto", Number(projeto));

    if (registerForm.values.id_projeto !== 0) {
      // handleGetInitialValues(registerForm.values.id_projeto);
      // console.log(initialValues);

      if (initialValues.length > 0) {
        initialValues.forEach((rank: any) => {
          if (rank.id_ranking == 1) setBeneficio(rank.id_opcao);
          if (rank.id_ranking == 2) setRegulatorio(rank.id_opcao);
          if (rank.id_ranking == 3) setOperacao(rank.id_opcao);
          if (rank.id_ranking == 4) setPrioridade(rank.id_opcao);
          if (rank.id_ranking == 5) setComplexidade(rank.id_opcao);
          if (rank.id_ranking == 6) setEstrategia(rank.id_opcao);
        });
      }
    }
  }, [initialValues]);

  const handleClick = () => {
    onOpen();

    handleGetInitialValues(registerForm.values.id_projeto);
  };

  const payload = {
    id_projeto: registerForm.values.id_projeto,
    beneficio: {
      opcao_id: Number(beneficio),
      id_ranking: 1,
    },
    regulatorio: {
      opcao_id: Number(regulatorio),
      id_ranking: 2,
    },
    operacao: {
      opcao_id: Number(operacao),
      id_ranking: 3,
    },
    prioridade: {
      opcao_id: Number(prioridade),
      id_ranking: 4,
    },
    complexidade: {
      opcao_id: Number(complexidade),
      id_ranking: 5,
    },
    estrategia: {
      opcao_id: Number(estrategia),
      id_ranking: 6,
    },
    dsc_comentario: "",
    nom_usu_create: user?.nome,
  };

  useEffect(() => {
    if (isPriorizacaoModalOpen == true) {
      onOpen();
      handleGetInitialValues(registerForm.values.id_projeto);
    }
  }, [isPriorizacaoModalOpen]);

  return (
    <>
      <Button
        onClick={handleClick}
        // w={"232px"}
        // h={"56px"}
        color={"origem.500"}
        backgroundColor={"transparent"}
        border="none"
        _hover={{
          // backgroundColor: "origem.500",
          color: "white",
        }}
        fontSize={"18px"}
        fontWeight={"700"}
        fontFamily={"Mulish"}
        rightIcon={<IoIosPodium />}
      >
        Priorização
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            backgroundColor={"#2E69FD"}
            display={"flex"}
            justifyContent={"center"}
            color={"white"}
            fontSize={"14px"}
            fontWeight={"700"}
          >
            Priorização
          </ModalHeader>
          <ModalCloseButton
            color={"white"}
            onClick={() => {
              if (setIsPriorizacaoModalOpen) setIsPriorizacaoModalOpen(false);
            }}
          />
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
                          fontWeight={"700"}
                          color={"#949494"}
                          mb={"1px"}
                        >
                          BENEFÍCIO
                        </FormLabel>
                        <Select
                          // mt={"-9px"}
                          h={"56px"}
                          w={"530px"}
                          fontSize={"14px"}
                          fontWeight={"400"}
                          // color={"#A7A7A7"}
                          isRequired
                          placeholder="Selecione"
                          id="beneficio.opcao_id"
                          name="beneficio.opcao_id"
                          value={beneficio}
                          onChange={(event) => setBeneficio(event.target.value)}
                        >
                          {/* {registerForm.errors.beneficio && (
                            <TextError>
                              {registerForm.errors.beneficio}
                            </TextError>
                          )} */}
                          {listaBeneficios.map((bene: any, index: any) => (
                            <option
                              color={"#2D2926"}
                              value={+bene.opcao_id}
                              key={index}
                            >
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
                          fontWeight={"700"}
                          color={"#949494"}
                          mb={"1px"}
                        >
                          REGULATÓRIO
                        </FormLabel>
                        <Select
                          h={"56px"}
                          w={"530px"}
                          fontSize={"14px"}
                          fontWeight={"400"}
                          // color={"#A7A7A7"}
                          isRequired
                          placeholder="Selecione"
                          id="regulatorio.opcao_id"
                          name="regulatorio.opcao_id"
                          value={regulatorio}
                          onChange={(event) =>
                            setRegulatorio(event.target.value)
                          }
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
                          fontWeight={"700"}
                          color={"#949494"}
                          mb={"1px"}
                        >
                          OPERAÇÃO
                        </FormLabel>
                        <Select
                          h={"56px"}
                          w={"530px"}
                          fontSize={"14px"}
                          fontWeight={"400"}
                          // color={"#A7A7A7"}
                          isRequired
                          placeholder="Selecione"
                          id="operacao.opcao_id"
                          name="operacao.opcao_id"
                          value={operacao}
                          onChange={(event) => setOperacao(event.target.value)}
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
                          fontWeight={"700"}
                          color={"#949494"}
                          mb={"1px"}
                        >
                          PRIORIDADE
                        </FormLabel>
                        <Select
                          h={"56px"}
                          w={"530px"}
                          fontSize={"14px"}
                          fontWeight={"400"}
                          // color={"#A7A7A7"}
                          isRequired
                          placeholder="Selecione"
                          id="prioridade.opcao_id"
                          name="prioridade.opcao_id"
                          value={prioridade}
                          onChange={(event) =>
                            setPrioridade(event?.target.value)
                          }
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
                          fontWeight={"700"}
                          color={"#949494"}
                          mb={"1px"}
                        >
                          COMPLEXIDADE
                        </FormLabel>
                        <Select
                          h={"56px"}
                          w={"530px"}
                          fontSize={"14px"}
                          fontWeight={"400"}
                          // color={"#A7A7A7"}
                          isRequired
                          placeholder="Selecione"
                          id="complexidade.opcao_id"
                          name="complexidade.opcao_id"
                          value={complexidade}
                          onChange={(event) =>
                            setComplexidade(event.target.value)
                          }
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
                          fontWeight={"700"}
                          color={"#949494"}
                          mb={"1px"}
                        >
                          ESTRATÉGIA PARA NEGÓCIO
                        </FormLabel>
                        <Select
                          h={"56px"}
                          w={"530px"}
                          fontSize={"14px"}
                          fontWeight={"400"}
                          // color={"#A7A7A7"}
                          isRequired
                          placeholder="Selecione"
                          id="estrategia.opcao_id"
                          name="estrategia.opcao_id"
                          value={estrategia}
                          onChange={(event) =>
                            setEstrategia(event.target.value)
                          }
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
                  color="red.500"
                  onClick={() => {
                    if (setIsPriorizacaoModalOpen)
                      setIsPriorizacaoModalOpen(false);
                    handleCancelar(registerForm, onClose);
                  }}
                  _hover={{
                    background: "red.500",
                    transition: "all 0.4s",
                    color: "white",
                  }}
                  w={"208px"}
                  h={"56px"}
                  fontSize="18px"
                  fontWeight={"700"}
                  fontFamily={"Mulish"}
                >
                  Cancelar
                </Button>
                <Button
                  w={"208px"}
                  h={"56px"}
                  // disabled={!registerForm.isValid}
                  background="origem.500"
                  variant="primary"
                  color="white"
                  onClick={() => {
                    postProject(payload);
                    onClose();
                    setRefresh(!refresh);
                  }}
                  _hover={{
                    background: "origem.600",
                    transition: "all 0.4s",
                  }}
                  fontSize="18px"
                  fontWeight={"700"}
                  fontFamily={"Mulish"}
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
