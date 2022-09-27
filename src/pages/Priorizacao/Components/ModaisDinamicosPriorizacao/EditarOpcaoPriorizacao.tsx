import { useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";

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
  IconButton,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import { handleCadastrar, handleCancelar } from "utils/handleCadastro";

import { useEdicaoOpcaoPriorizacao } from "hooks/useEditarOpcaoPriorizacao";

interface TableProps {
  opcaoId: number;
  opcaoName: string;
  idRanking: any;
  nameRanking: string;
  initialGrade: number;
}

function ModalEditarOpcaoPriorizacao(infosOption: TableProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading } = useEdicaoOpcaoPriorizacao(
    infosOption.opcaoName,
    infosOption.initialGrade
  );

  // console.log("registerForm", registerForm.values);
  // console.log("infosOption", infosOption);

  useEffect(() => {
    registerForm.setFieldValue("idOpcao", infosOption.opcaoId);
    registerForm.setFieldValue("idRanking", infosOption.idRanking.idRanking);
  }, []);

  return (
    <>
      <IconButton
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        color={"origem.500"}
        backgroundColor={"white"}
        border={"none"}
        textAlign={"center"}
        icon={<MdModeEdit />}
      />
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
            {`Priorização ${infosOption.nameRanking}`}
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
                            <IoIosArrowBack />{" "}
                            {`Priorização ${infosOption.nameRanking}`}
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
                              htmlFor="num_nota"
                              fontSize={"12px"}
                              mb={"1px"}
                              w={"140px"}
                            >
                              NOTA
                            </FormLabel>
                            <Select
                              id="num_nota"
                              name="num_nota"
                              placeholder="Selecione"
                              value={Number(registerForm.values.num_nota)}
                              onChange={registerForm.handleChange}
                              w={useBreakpointValue({
                                base: "100%",
                                md: "95%",
                              })}
                            >
                              <option>0</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>6</option>
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
                      <Text>Atualizar</Text>
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

export default ModalEditarOpcaoPriorizacao;
