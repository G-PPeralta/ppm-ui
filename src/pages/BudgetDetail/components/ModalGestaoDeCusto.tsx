import { FiEdit } from "react-icons/fi";

import {
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  // ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Stack,
  useBreakpointValue,
  Input,
  IconButton,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { Projeto } from "models/Budget.model";

import { RequiredField } from "components/RequiredField/RequiredField";
import { TextError } from "components/TextError";

import { handleCadastrar, handleCancelar } from "utils/handleCadastro";
import { regexCaracteresEspeciais } from "utils/regex";

import { useCadastroOrcamentoPrevisto } from "hooks/useCadastroOrcamentoPrevisto";

function ModalGestaoDeCusto(props: { projeto: Projeto }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading } = useCadastroOrcamentoPrevisto();

  return (
    <>
      <IconButton
        aria-label="Edit Realizado"
        variant={"outline"}
        icon={<FiEdit />}
        onClick={onOpen}
      />

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
            Gestão de Custos
          </ModalHeader>
          {/* <ModalCloseButton color={"white"} /> */}
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
                        <Flex gap={1}>
                          <RequiredField />
                          <FormLabel htmlFor="previsto">Valor</FormLabel>{" "}
                        </Flex>
                        <Input
                          isRequired
                          placeholder="Valor Previsto"
                          id="previsto"
                          type="text"
                          name="previsto"
                          value={regexCaracteresEspeciais(
                            registerForm.values.previsto
                          )}
                          onChange={registerForm.handleChange}
                          maxLength={10}
                        />
                        {registerForm.errors.previsto && (
                          <TextError>{registerForm.errors.previsto}</TextError>
                        )}
                      </FormControl>

                      <FormControl>
                        <Flex gap={1}>
                          <RequiredField />
                          <FormLabel htmlFor="previsto">Data</FormLabel>{" "}
                        </Flex>
                        <Input
                          placeholder="Select Date and Time"
                          size="md"
                          type="date"
                        />
                      </FormControl>

                      <FormControl>
                        <Flex gap={1}>
                          <RequiredField />
                          <FormLabel htmlFor="previsto">Fornecedor</FormLabel>
                        </Flex>
                        <Select placeholder="Select option">
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <Flex gap={1}>
                          <RequiredField />
                          <FormLabel htmlFor="previsto">
                            Classe de Serviço
                          </FormLabel>
                        </Flex>
                        <Select placeholder="Select option">
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <Flex gap={1}>
                          <RequiredField />
                          <FormLabel htmlFor="previsto">Pedido</FormLabel>
                        </Flex>
                        <Input placeholder="Pedido" size="md" type="text" />
                      </FormControl>

                      <FormControl>
                        <Flex gap={1}>
                          <RequiredField />
                          <FormLabel htmlFor="previsto">
                            Texto do Pedido
                          </FormLabel>
                        </Flex>
                        <Textarea placeholder="Ação ou Recomendação" />
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
                  disabled={
                    !registerForm.isValid || !registerForm.values.previsto
                  }
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

export default ModalGestaoDeCusto;
