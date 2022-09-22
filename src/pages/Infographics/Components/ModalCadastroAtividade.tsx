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
  // Textarea,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

// import { TextError } from "components/TextError";

import { RequiredField } from "components/RequiredField/RequiredField";

import { handleCadastrar, handleCancelar } from "utils/handleCadastro";
import { regexCaracteresEspeciais } from "utils/regex";

import { useCadastroAtividade } from "hooks/useCadastroAtividadeOLD";

import DateTimePicker from "./DateTimePicker";
import SelectFiltragemArea from "./SelectFiltragemArea";
import SelectFiltragemResponsavel from "./SelectFiltragemResponsavel";

function ModalCadastroAtividade() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading } = useCadastroAtividade();

  console.log("registerForm", registerForm.values);

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
                      <Flex flex={1}>
                        <FormControl>
                          <Flex gap={1}>
                            <RequiredField />
                            <FormLabel htmlFor="id_origem">ID</FormLabel>
                          </Flex>
                          <Input
                            isRequired
                            placeholder="Digite o ID"
                            id="id_origem"
                            type="number"
                            name="id_origem"
                            w={useBreakpointValue({ base: "100%", md: "100%" })}
                            value={registerForm.values.id_origem}
                            onChange={registerForm.handleChange}
                          />
                        </FormControl>
                      </Flex>
                      <Flex flex={6}>
                        <FormControl>
                          <Flex gap={1}>
                            <RequiredField />
                            <FormLabel htmlFor="nom_atividade">NOME</FormLabel>
                          </Flex>
                          <Input
                            isRequired
                            placeholder="Digite o nome da atividade"
                            id="nom_atividade"
                            type="text"
                            name="nom_atividade"
                            w={useBreakpointValue({ base: "100%", md: "100%" })}
                            value={regexCaracteresEspeciais(
                              registerForm.values.nom_atividade
                            )}
                            onChange={registerForm.handleChange}
                          />
                        </FormControl>
                      </Flex>
                    </Flex>

                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={5}
                    >
                      <Flex flex={2}>
                        <SelectFiltragemResponsavel
                          registerForm={registerForm}
                        />
                      </Flex>
                      <Flex flex={1}>
                        <SelectFiltragemArea registerForm={registerForm} />
                      </Flex>
                    </Flex>

                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={5}
                    >
                      <Flex flex={1} gap={5}>
                        <DateTimePicker registerForm={registerForm} />

                        <DateTimePicker registerForm={registerForm} />
                      </Flex>
                    </Flex>
                    {/* <Flex direction={"column"} grow={1}>
                        <Flex gap={1}>
                          <RequiredField />
                          <FormLabel htmlFor="dat_fim_plan">DATA FIM</FormLabel>
                        </Flex>
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => handleEndDate(date)}
                          dateFormat="dd/MM/yyyy, hh:mm"
                          showTimeSelect
                          customInput={<ExampleCustomInput />}
                          isClearable={endDate !== ""}
                          locale="pt-BR"
                        />
                      </Flex> */}
                    {/* <FormControl>
                        <InputPorcentagem registerForm={registerForm} />
                      </FormControl> */}

                    {/* <Flex justify={"space-between"} gap={5}>
                      <Flex direction={"column"} grow={1}>
                        <SelectFiltragemAreas registerForm={registerForm} />
                      </Flex>
                      <Flex direction={"column"} grow={1}>
                        <FormLabel htmlFor="nom_recurso">RECURSO</FormLabel>
                        <Input
                          isRequired
                          placeholder="Digite o nome do recurso"
                          id="nom_recurso"
                          type="text"
                          name="nom_recurso"
                          w={useBreakpointValue({ base: "100%", md: "100%" })}
                          value={regexCaracteresEspeciais(
                            registerForm.values.nom_recurso
                          )}
                          onChange={registerForm.handleChange}
                        />
                      </Flex>
                    </Flex> */}

                    {/* <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={5}
                    ></Flex> */}
                    {/* <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={5}
                    >
                      <FormControl>
                        <FormLabel htmlFor="dsc_comentario">
                          OBSERVAÇÕES
                        </FormLabel>
                        <Textarea
                          placeholder="Adicione comentários sobre a atividade"
                          id="dsc_comentario"
                          name="dsc_comentario"
                          value={registerForm.values.dsc_comentario}
                          onChange={registerForm.handleChange}
                        />
                      </FormControl>
                    </Flex> */}
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
