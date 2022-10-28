import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Stack,
  useBreakpointValue,
  Input,
  Text,
  ModalCloseButton,
} from "@chakra-ui/react";

import BotaoAzulLargoPrimary from "components/BotaoAzulLargo/BotaoAzulLargoPrimary";
import BotaoVermelhoLargoGhost from "components/BotaoVermelhoLargo/BotaoVermelhoLargoGhost";
import { RequiredField } from "components/RequiredField/RequiredField";

import { handleCancelar } from "utils/handleCadastro";
import { regexCaracteresEspeciais } from "utils/regex";

import { useCadastroOperacao } from "hooks/useCadastroOperacao";

function ModalCadastroOperacao({ refresh, setRefresh }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading } = useCadastroOperacao();

  return (
    <>
      <Button
        h={"56px"}
        borderRadius={"8px"}
        fontSize={"18px"}
        fontWeight={"700"}
        variant="outline"
        border={"2px solid"}
        borderColor={"origem.500"}
        textColor={"origem.500"}
        _hover={{
          borderColor: "origem.600",
          backgroundColor: "origem.500",
          textColor: "white",
          transition: "all 0.4s",
        }}
        onClick={onOpen}
      >
        Cadastrar Operação
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            backgroundColor={"#2E69FD"}
            borderTopRadius={7}
            display={"flex"}
            justifyContent={"center"}
            color={"white"}
            fontSize={"14px"}
            fontWeight={"700"}
          >
            Cadastrar Operação
          </ModalHeader>
          <ModalCloseButton
            color={"white"}
            onClick={() => handleCancelar(registerForm, onClose)}
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              registerForm.handleSubmit(e);
            }}
          >
            <ModalBody mt={3}>
              <Flex direction={"column"} gap={4}>
                <Stack>
                  <Flex
                    flexDirection={useBreakpointValue({
                      base: "column",
                      md: "row",
                    })}
                    gap={5}
                  >
                    <Flex flex={1} direction={"column"}>
                      <Text fontWeight={"bold"}>Nome</Text>
                      <Flex gap={5} flex={1}>
                        <Flex direction={"column"} flex={1}>
                          <Flex gap={1}>
                            <RequiredField />
                            <Text
                              fontWeight={"bold"}
                              fontSize={"12px"}
                              color={"#949494"}
                            >
                              ID
                            </Text>
                          </Flex>
                          <Input
                            h={"56px"}
                            isRequired
                            placeholder="Digite o ID"
                            id="id_origem"
                            type="text"
                            name="id_origem"
                            w={useBreakpointValue({
                              base: "100%",
                              md: "100%",
                            })}
                            value={regexCaracteresEspeciais(
                              registerForm.values.id_origem
                            )}
                            onChange={registerForm.handleChange}
                            maxLength={10}
                          />
                        </Flex>
                        <Flex direction={"column"} flex={1}>
                          <Flex gap={1}>
                            <RequiredField />
                            <Text
                              fontWeight={"bold"}
                              fontSize={"12px"}
                              color={"#949494"}
                            >
                              NOME
                            </Text>
                          </Flex>
                          <Input
                            h={"56px"}
                            isRequired
                            placeholder="Digite o nome da operação"
                            id="nom_operacao"
                            type="text"
                            name="nom_operacao"
                            w={useBreakpointValue({
                              base: "100%",
                              md: "100%",
                            })}
                            value={regexCaracteresEspeciais(
                              registerForm.values.nom_operacao
                            )}
                            onChange={registerForm.handleChange}
                            maxLength={100}
                          />
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                </Stack>
              </Flex>
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Flex gap={2}>
                <BotaoVermelhoLargoGhost
                  text={"Cancelar"}
                  formikForm={registerForm}
                  onClose={onClose}
                />
                <BotaoAzulLargoPrimary
                  text={"Cadastrar"}
                  formikForm={registerForm}
                  onClose={onClose}
                  setRefresh={setRefresh}
                  refresh={refresh}
                  loading={loading}
                />
              </Flex>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalCadastroOperacao;
