import {
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Stack,
  useBreakpointValue,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import { handleCadastrar, handleCancelar } from "utils/handleCadastro";

import { useCadastroAtividade } from "hooks/useCadastroAtividade";

function Teste() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading } = useCadastroAtividade();

  return (
    <>
      <Button
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
        Atividade
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
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
            Cadastrar Atividade
          </ModalHeader>
          <ModalCloseButton color={"white"} />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              registerForm.handleSubmit(e);
            }}
          >
            <ModalBody mt={3}>
              <FormControl>
                <Flex direction={"column"} gap={4}>
                  <Stack>
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={5}
                    >
                      <FormControl>
                        <FormLabel htmlFor="nome">NOME</FormLabel>
                        <Input
                          isRequired
                          placeholder="Digite o nome da atividade"
                          id="nome"
                          type="text"
                          name="nome"
                          w={useBreakpointValue({ base: "100%", md: "100%" })}
                          value={registerForm.values.nome}
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
                    ></Flex>

                    <Flex justify={"space-between"} gap={5}>
                      <Flex direction={"column"} grow={1}>
                        <FormLabel htmlFor="dataInicio">DATA INÍCIO</FormLabel>
                        <Input
                          isRequired
                          placeholder="Selecione a data e a hora"
                          id="dataInicio"
                          type="datetime-local"
                          name="dataInicio"
                          w={"100%"}
                          value={registerForm.values.dataInicio}
                          onChange={registerForm.handleChange}
                        />
                      </Flex>
                      <Flex direction={"column"} grow={1}>
                        <FormLabel htmlFor="dataFim">DATA FIM</FormLabel>
                        <Input
                          isRequired
                          placeholder="Selecione a data e a hora"
                          id="dataFim"
                          type="datetime-local"
                          name="dataFim"
                          w={"100%"}
                          value={registerForm.values.dataFim}
                          onChange={registerForm.handleChange}
                        />
                      </Flex>
                      <FormControl>
                        <FormLabel htmlFor="status">STATUS</FormLabel>
                        <Input
                          placeholder="0%"
                          id="status"
                          type="number"
                          name="status"
                          w={"100%"}
                          value={registerForm.values.status}
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
                    ></Flex>
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={5}
                    >
                      <FormControl>
                        <FormLabel htmlFor="observacoes">OBSERVAÇÕES</FormLabel>
                        <Textarea
                          placeholder="Adicione comentários sobre a atividade"
                          id="observacoes"
                          name="observacoes"
                          value={registerForm.values.observacoes}
                          onChange={registerForm.handleChange}
                        />
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
                      <Text>Gravar</Text>
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

export default Teste;
