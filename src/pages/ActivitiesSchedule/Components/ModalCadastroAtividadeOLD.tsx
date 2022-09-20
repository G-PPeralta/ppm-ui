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
  Select,
  Textarea,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

// import ListDnD from 'components/ListDnD';
import { TextError } from "components/TextError";

import { handleCadastrar, handleCancelar } from "utils/handleCadastro";

import { useCadastroAtividade } from "hooks/useCadastroAtividadeOLD";

function ModalCadastroAtividade() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    registerForm,
    loading,
    ListaResponsavel,
    listaArea,
    // listaAtividades,
  } = useCadastroAtividade();

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
                        <FormLabel>NOME</FormLabel>
                        <Input
                          isRequired
                          placeholder="Digite o nome da atividade"
                          id="nomeAtividade"
                          type="text"
                          name="nomeAtividade"
                          value={registerForm.values.nomeAtividade}
                          onChange={registerForm.handleChange}
                        />
                        {registerForm.errors.nomeAtividade &&
                          registerForm.touched.nomeAtividade && (
                            <TextError>
                              {registerForm.errors.nomeAtividade}
                            </TextError>
                          )}
                      </FormControl>
                    </Flex>

                    <FormLabel>RESPONSÁVEL</FormLabel>
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={5}
                    >
                      <FormControl>
                        <FormLabel htmlFor="responsavel">NOME</FormLabel>
                        <Select
                          id="responsavel"
                          name="responsavel"
                          placeholder="Selecione"
                          // value={registerForm.values.responsavel}
                          onChange={registerForm.handleChange}
                        >
                          {ListaResponsavel.map((data, index) => (
                            <option value={data.id} key={index}>
                              {data.nome}
                            </option>
                          ))}
                        </Select>
                      </FormControl>

                      <FormControl>
                        <FormLabel htmlFor="area">ÁREA</FormLabel>
                        <Select
                          id="area"
                          name="area"
                          placeholder="Selecione"
                          value={registerForm.values.area}
                          onChange={registerForm.handleChange}
                        >
                          {listaArea.map((data, index) => (
                            <option value={data.id} key={index}>
                              {data.tipo}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </Flex>

                    <FormLabel>PRECEDENTES</FormLabel>

                    {/* <ListDnD atividades={registerForm.values.precedente} /> */}

                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={5}
                    >
                      {/* <FormControl>
                        <FormLabel htmlFor="precedente[0].atividade">
                          ATIVIDADE
                        </FormLabel>
                        <Select
                          id="precedente[0].atividade"
                          name="precedente[0].atividade"
                          placeholder="Selecione"
                          value={registerForm.values.precedente[0].atividade}
                          onChange={registerForm.handleChange}
                        >
                          {listaAtividades.map((data, index) => (
                            <option value={data.id} key={index}>
                              {data.nome}
                            </option>
                          ))}
                        </Select>
                      </FormControl> */}

                      {/* <FormControl>
                        <FormLabel htmlFor="precedente[0].tipo">TIPO</FormLabel>
                        <Select
                          id="precedente[0].tipo"
                          name="precedente[0].tipo"
                          placeholder="Selecione"
                          value={registerForm.values.precedente[0].tipo}
                          onChange={registerForm.handleChange}
                        >
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </Select>
                      </FormControl> */}

                      {/* <FormControl>
                        <FormLabel>DIAS</FormLabel>
                        <Input
                          isRequired
                          placeholder="Digite o nome da atividade"
                          id="precedente[0].dias"
                          type="number"
                          name="precedente[0].dias"
                          value={registerForm.values.precedente[0].dias}
                          onChange={registerForm.handleChange}
                        />
                      </FormControl> */}

                      {/* <FormControl>
                        <FormLabel htmlFor="precedente[0].restricao">
                          RESTRIÇÃO
                        </FormLabel>
                        <Select
                          id="precedente[0].restricao"
                          name="precedente[0].restricao"
                          placeholder="Selecione"
                          value={registerForm.values.precedente[0].restricao}
                          onChange={registerForm.handleChange}
                        >
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </Select>
                      </FormControl> */}
                    </Flex>
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={5}
                    >
                      <FormControl>
                        <FormLabel htmlFor="comentarios">COMENTÁRIOS</FormLabel>
                        <Textarea
                          isRequired
                          placeholder="Adicione comentários sobre a atividade"
                          id="comentarios"
                          name="comentarios"
                          value={registerForm.values.comentarios}
                          onChange={registerForm.handleChange}
                        />
                        {registerForm.errors.comentarios &&
                          registerForm.touched.comentarios && (
                            <TextError>
                              {registerForm.errors.comentarios}
                            </TextError>
                          )}
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
                      <Text>Concluir Cadastro</Text>
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

export default ModalCadastroAtividade;
