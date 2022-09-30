import { useEffect } from "react";
import { GrAddCircle } from "react-icons/gr";

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
import { Projeto } from "interfaces/Budgets";

import { RequiredField } from "components/RequiredField/RequiredField";
import { TextError } from "components/TextError";

import { handleCadastrar, handleCancelar } from "utils/handleCadastro";

import { useCadastroOrcamentoPlanejado } from "hooks/useCadastroOrcamentoPlanejado";

function ModalGestaoDeCusto(props: { projeto: Projeto }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading, setAtividade } =
    useCadastroOrcamentoPlanejado();
  const { id } = props.projeto;

  useEffect(() => {
    setAtividade(id);
  }, []);

  return (
    <>
      <IconButton
        aria-label="Edit Realizado"
        variant={"outline"}
        icon={<GrAddCircle />}
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
                        md: "column",
                      })}
                      gap={5}
                    >
                      <Flex
                        flexDirection={useBreakpointValue({
                          base: "row",
                          md: "row",
                        })}
                        gap={5}
                      >
                        <FormControl>
                          <Flex gap={1}>
                            <RequiredField />
                            <FormLabel htmlFor="gasto">Valor</FormLabel>{" "}
                          </Flex>
                          <Input
                            isRequired
                            placeholder="Valor Gasto"
                            id="gasto"
                            type="number"
                            name="gasto"
                            value={registerForm.values.gasto}
                            onChange={registerForm.handleChange}
                          />
                          {registerForm.errors.gasto && (
                            <TextError>{registerForm.errors.gasto}</TextError>
                          )}
                        </FormControl>

                        <FormControl>
                          <Flex gap={1}>
                            <RequiredField />
                            <FormLabel htmlFor="data">Data</FormLabel>{" "}
                          </Flex>
                          <Input
                            placeholder="Selecione a Data"
                            size="md"
                            type="date"
                            id="data"
                            name="data"
                            value={registerForm.values.data}
                            onChange={registerForm.handleChange}
                          />
                        </FormControl>
                      </Flex>
                      <FormControl>
                        <Flex gap={1}>
                          <RequiredField />
                          <FormLabel htmlFor="fornecedor">Fornecedor</FormLabel>
                        </Flex>
                        <Select
                          placeholder="Escolha um Forncedor"
                          id="fornecedor"
                          name="fornecedor"
                          value={registerForm.values.fornecedor}
                          onChange={registerForm.handleChange}
                        >
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </Select>
                      </FormControl>
                      <Flex
                        flexDirection={useBreakpointValue({
                          base: "row",
                          md: "row",
                        })}
                        gap={5}
                      >
                        <FormControl>
                          <Flex gap={1}>
                            <RequiredField />
                            <FormLabel htmlFor="servico">
                              Classe de Serviço
                            </FormLabel>
                          </Flex>
                          <Select
                            placeholder="Escolha uma Classe"
                            id="servico"
                            name="servico"
                            value={registerForm.values.servico}
                            onChange={registerForm.handleChange}
                          >
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                          </Select>
                        </FormControl>
                        <FormControl>
                          <Flex gap={1}>
                            <RequiredField />
                            <FormLabel htmlFor="pedido">Pedido</FormLabel>
                          </Flex>
                          <Input
                            placeholder="Pedido"
                            id="pedido"
                            name="pedido"
                            value={registerForm.values.pedido}
                            onChange={registerForm.handleChange}
                            size="md"
                            type="text"
                          />
                        </FormControl>
                      </Flex>

                      <FormControl>
                        <Flex gap={1}>
                          <RequiredField />
                          <FormLabel htmlFor="pedido-obs">
                            Texto do Pedido
                          </FormLabel>
                        </Flex>
                        <Textarea
                          placeholder="Ação ou Recomendação"
                          id="pedido-obs"
                          name="pedido_obs"
                          value={registerForm.values.pedido_obs}
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
                  disabled={registerForm.isValid}
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
