//  CRIADO EM: 10/2022
//  AUTOR: Geovana Augusta.
//  DESCRIÇÃO DO ARQUIVO: Modal e botão pra edtar priorização

import { useEffect } from "react";

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
  ModalCloseButton,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import { handleCadastrar, handleCancelar } from "utils/handleCadastro";

import { useEdicaoPriorizacao } from "hooks/useEditarPriorizacao";

interface TableProps {
  nomeRanking: string;
  idRanking: number;
}

function EditarPriorizacao(infosRanking: TableProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading } = useEdicaoPriorizacao(
    infosRanking.nomeRanking
  );

  const perfis = ["Nível 0", "Nível 1", "Nível 2"];

  useEffect(() => {
    registerForm.setFieldValue("idRanking", infosRanking.idRanking);
  }, []);

  return (
    <>
      <Button
        onClick={onOpen}
        background="white"
        variant="primary"
        border={"#0047BB solid 1px"}
        color="origem.500"
        _hover={{
          background: "origem.500",
          color: "white",
          transition: "all 0.4s",
        }}
        h={"56px"}
        w={"134px"}
        fontSize={"18px"}
        fontWeight={"700"}
        borderRadius={"8px"}
        fontFamily={"Mulish"}
      >
        <Text>Configuração</Text>
      </Button>
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
            {`Editar Priorização`}
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
                              htmlFor="rankingName"
                              mb={"1px"}
                              ml={"2px"}
                              color={"#949494"}
                              fontWeight={"700"}
                              fontSize={"12px"}
                            >
                              NOME DA PRIORIZAÇÃO
                            </FormLabel>
                            <Input
                              maxLength={45}
                              ml={"2px"}
                              w={"93%"}
                              h={"56px"}
                              _placeholder={{ color: "black" }}
                              fontSize={"14px"}
                              fontWeight={"400"}
                              border={"solid 1px #949494"}
                              isRequired
                              placeholder="Nome"
                              id="rankingName"
                              name="rankingName"
                              value={registerForm.values.rankingName}
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
                              htmlFor="acesso"
                              fontSize={"12px"}
                              color={"#949494"}
                              fontWeight={"700"}
                              mb={"1px"}
                              ml={"2px"}
                              w={"550px"}
                              mt={"5px"}
                            >
                              PERFIS COM ACESSO
                            </FormLabel>
                            <Select
                              ml={"2px"}
                              w={"93%"}
                              h={"56px"}
                              fontSize={"14px"}
                              _placeholder={{ color: "black" }}
                              fontWeight={"400"}
                              border={"solid 1px #949494"}
                              id="acesso"
                              name="acesso"
                              placeholder="Selecione"
                              value={registerForm.values.acesso}
                              onChange={registerForm.handleChange}
                            >
                              {perfis.map((perfil: any, index: any) => (
                                <option key={index}>{perfil}</option>
                              ))}
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
                  fontSize="18px"
                  fontWeight={"700"}
                  fontFamily={"Mulish"}
                >
                  Cancelar
                </Button>
                <Button
                  w={"208px"}
                  h={"56px"}
                  background={"origem.500"}
                  variant="primary"
                  color="white"
                  onClick={() => handleCadastrar(registerForm, onClose)}
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

export default EditarPriorizacao;
