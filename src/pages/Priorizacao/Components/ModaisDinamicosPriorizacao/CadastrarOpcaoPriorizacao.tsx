import { useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
  Input,
  Select,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

// import { TextError } from "components/TextError";

import { handleCadastrar, handleCancelar } from "utils/handleCadastro";

// import { useCadastroNovaOpcao } from "hooks/useCadastrarNovaPriorizacaoo";
import { useCadastroNovaOpcaoPriorizacao } from "hooks/useCadastrarOpcaoPriorizacao";

interface TableProps {
  nomeRanking: string;
  idRanking: any;
}

function ModalCadastrarOpcaoPriorizacao(infosRankings: TableProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading } = useCadastroNovaOpcaoPriorizacao();

  // console.log(nomeRanking.nomeRanking);
  // console.log("register opção-prio", registerForm.values.rankingOpcao);
  // console.log(infosRankings.idRanking);

  useEffect(() => {
    registerForm.setFieldValue("rankingId", Number("1"));
  }, []);

  const rankingNome = infosRankings.nomeRanking;

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
            {`Priorização ${rankingNome}`}
          </ModalHeader>
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
                            mb={"8px"}
                          >
                            <IoIosArrowBack /> {`Priorização ${rankingNome}`}
                          </Button>
                        </Text>
                      </Flex>
                      <Flex direction={"row"}>
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
                              htmlFor="rankingOpcao"
                              fontSize={"12px"}
                              mb={"1px"}
                              w={"350px"}
                              ml={"3px"}
                            >
                              NOME
                            </FormLabel>
                            <Input
                              ml={"3px"}
                              isRequired
                              id="rankingOpcao"
                              name="rankingOpcao"
                              value={registerForm.values.rankingOpcao}
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
                          ml={"15px"}
                        >
                          <FormControl>
                            <FormLabel
                              htmlFor="regulatorio.opcao_id"
                              fontSize={"12px"}
                              mb={"1px"}
                              w={"140px"}
                            >
                              NOTA
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

export default ModalCadastrarOpcaoPriorizacao;
