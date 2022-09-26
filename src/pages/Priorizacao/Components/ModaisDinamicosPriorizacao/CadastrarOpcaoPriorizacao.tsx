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

import { useCadastroNovaOpcaoPriorizacao } from "hooks/useCadastrarOpcaoPriorizacao";

interface TableProps {
  nomeRanking: string;
  idRanking: any;
}

function ModalCadastrarOpcaoPriorizacao(infosRankings: TableProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading } = useCadastroNovaOpcaoPriorizacao();

  // console.log("register opção", registerForm.values);

  useEffect(() => {
    registerForm.setFieldValue("rank_opcao_id", infosRankings.idRanking);
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
                              htmlFor="rank_opcao_name"
                              fontSize={"12px"}
                              mb={"1px"}
                              w={"350px"}
                              ml={"3px"}
                            >
                              NOME
                            </FormLabel>
                            <Input
                              ml={"3px"}
                              id="rank_opcao_name"
                              name="rank_opcao_name"
                              value={registerForm.values.rank_opcao_name}
                              onChange={registerForm.handleChange}
                            />
                            {/* {registerForm.errors.rank_opcao_name && (
                              <TextError>
                                {registerForm.errors.rank_opcao_name}
                              </TextError>
                            )} */}
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
                              htmlFor="rank_opcao_grade"
                              fontSize={"12px"}
                              mb={"1px"}
                              w={"140px"}
                            >
                              NOTA
                            </FormLabel>
                            <Select
                              id="rank_opcao_grade"
                              name="rank_opcao_grade"
                              placeholder="Selecione"
                              value={registerForm.values.rank_opcao_grade}
                              onChange={registerForm.handleChange}
                              w={useBreakpointValue({
                                base: "100%",
                                md: "95%",
                              })}
                            >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>6</option>
                            </Select>
                            {/* {registerForm.errors.rank_opcao_grade && (
                              <TextError>
                                {registerForm.errors.rank_opcao_grade}
                              </TextError>
                            )} */}
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
