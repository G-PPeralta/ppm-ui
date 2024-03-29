//  CRIADO EM: 10/2022
//  AUTOR: Geovana Augusta.
//  DESCRIÇÃO DO ARQUIVO: Editar opção priorizada

import { useEffect } from "react";
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
  ModalCloseButton,
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
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalEditarOpcaoPriorizacao(infosOption: TableProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading } = useEdicaoOpcaoPriorizacao(
    infosOption.opcaoName,
    infosOption.initialGrade
  );

  useEffect(() => {
    registerForm.setFieldValue("idOpcao", infosOption.opcaoId);
    registerForm.setFieldValue("idRanking", infosOption.idRanking.idRanking);
  }, []);

  useEffect(() => {
    registerForm.setFieldValue("idOpcao", infosOption.opcaoId);
    registerForm.setFieldValue("idRanking", infosOption.idRanking.idRanking);
    registerForm.setFieldValue("rankingOpcao", infosOption.opcaoName);
    registerForm.setFieldValue("num_nota", infosOption.initialGrade);
  }, [infosOption.opcaoName, infosOption.initialGrade]);

  return (
    <>
      <IconButton
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        color={"origem.500"}
        backgroundColor={"transparent"}
        _hover={{
          backgroundColor: "origem.500",
          color: "white",
        }}
        border={"none"}
        textAlign={"center"}
        icon={<MdModeEdit />}
      />
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            backgroundColor={"#2E69FD"}
            borderTopRadius={"8px"}
            display={"flex"}
            justifyContent={"center"}
            color={"white"}
            fontSize={"14px"}
            fontWeight={"700"}
            h={"48px"}
          >
            {`Editar Priorização ${infosOption.nameRanking}`}
          </ModalHeader>
          <ModalCloseButton color={"white"} />

          <form
            onSubmit={(e) => {
              registerForm.handleSubmit(e);
            }}
          >
            <ModalBody mt={3}>
              <FormControl>
                <Flex gap={4}>
                  <Stack gap={2}>
                    <Flex direction={"column"}>
                      <Flex direction={"column"} gap={3}>
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
                              mb={"1px"}
                              color={"#949494"}
                              fontWeight={"700"}
                              fontSize={"12px"}
                              ml={1}
                            >
                              NOME DA PRIORIZAÇÃO
                            </FormLabel>
                            <Input
                              mr={1}
                              maxLength={35}
                              fontSize={"14px"}
                              fontWeight={"400"}
                              color={"black"}
                              _placeholder={{ color: "#949494" }}
                              ml={"3px"}
                              w={"523px"}
                              border={"1px solid #949494"}
                              h={"56px"}
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
                        >
                          <FormControl>
                            <FormLabel
                              htmlFor="num_nota"
                              fontSize={"12px"}
                              fontWeight={"700"}
                              color={"#949494"}
                              mb={"1px"}
                              ml={1}
                            >
                              NOTA
                            </FormLabel>
                            <Select
                              ml={1}
                              border={"1px solid #949494"}
                              h={"56px"}
                              w={"208px"}
                              fontSize={"14px"}
                              fontWeight={"400"}
                              _placeholder={{ color: "black" }}
                              id="num_nota"
                              name="num_nota"
                              placeholder="Selecione"
                              value={Number(registerForm.values.num_nota)}
                              onChange={registerForm.handleChange}
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
              <Flex gap={2} ml={9}>
                <Button
                  variant="ghost"
                  color="red.500"
                  onClick={() => handleCancelar(registerForm, onClose)}
                  _hover={{
                    background: "red.600",
                    transition: "all 0.4s",
                    color: "white",
                  }}
                  w={"208px"}
                  h={"56px"}
                  borderRadius={"8px"}
                  fontSize="18px"
                  fontWeight={"700"}
                  fontFamily={"Mulish"}
                >
                  Cancelar
                </Button>
                <Button
                  disabled={!registerForm.isValid}
                  background="origem.500"
                  variant="primary"
                  color="white"
                  onClick={() => {
                    handleCadastrar(registerForm, onClose);
                    infosOption.setRefresh(!infosOption.refresh);
                  }}
                  _hover={{
                    background: "origem.600",
                    transition: "all 0.4s",
                  }}
                  borderRadius={"8px"}
                  w={"208px"}
                  h={"56px"}
                  fontSize="18px"
                  fontWeight={"700"}
                  fontFamily={"Mulish"}
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
