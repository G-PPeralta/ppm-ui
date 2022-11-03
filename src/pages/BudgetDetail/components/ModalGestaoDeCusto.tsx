import { useEffect } from "react";
import { GrAddCircle } from "react-icons/gr";

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
  Stack,
  useBreakpointValue,
  Input,
  IconButton,
  Select,
  Textarea,
  InputGroup,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { Projeto } from "interfaces/Budgets";

import InputGenerico from "components/InputGenerico";
import { RequiredField } from "components/RequiredField/RequiredField";
// import { TextError } from "components/TextError";

import { handleCadastrar, handleCancelar } from "utils/handleCadastro";

import { useCadastroOrcamentoRealizado } from "hooks/useCadastroOrcamentoRealizado";

interface PropsInterface {
  projeto: Projeto;
  toogleRender: () => void;
}

function ModalGestaoDeCusto(props: PropsInterface) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading, setAtividade, fornecedores, classesSevicos } =
    useCadastroOrcamentoRealizado();
  const { projeto, toogleRender } = props;

  useEffect(() => {
    setAtividade(projeto.id);
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
            fontSize={"14px"}
            fontWeight={"700"}
            fontFamily={"Mulish"}
          >
            Gestão de Custos
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
                            <Text
                              fontWeight={"bold"}
                              fontSize={"12px"}
                              color={"#949494"}
                            >
                              VALOR GASTO
                            </Text>
                          </Flex>
                          <InputGroup>
                            <InputGenerico
                              registerForm={registerForm}
                              // nomeInput={"Valor Gasto"}
                              propName={"gasto"}
                              value={registerForm.values.gasto || ""}
                              required={true}
                              placeholder={"0"}
                              maxLength={20}
                              isNumeric={true}
                            />
                          </InputGroup>
                        </FormControl>

                        <FormControl>
                          <Flex gap={1}>
                            <RequiredField />
                            <Text
                              fontWeight={"bold"}
                              fontSize={"12px"}
                              color={"#949494"}
                            >
                              DATA
                            </Text>{" "}
                          </Flex>
                          <Input
                            h={"56px"}
                            placeholder="Selecione a Data"
                            size="md"
                            type="date"
                            id="data"
                            name="data"
                            max="3000-12-31"
                            maxLength={1}
                            value={registerForm.values.data}
                            onChange={registerForm.handleChange}
                          />
                          {/* {registerForm.errors.data && (
                            <TextError>{registerForm.errors.data}</TextError>
                         )} */}
                        </FormControl>
                      </Flex>
                      <FormControl>
                        <Flex gap={1}>
                          <RequiredField />
                          <Text
                            fontWeight={"bold"}
                            fontSize={"12px"}
                            color={"#949494"}
                          >
                            FORNECEDOR
                          </Text>
                        </Flex>
                        <Select
                          h={"56px"}
                          placeholder="Escolha um Fornecedor"
                          id="fornecedor"
                          name="fornecedor"
                          value={registerForm.values.fornecedor}
                          onChange={registerForm.handleChange}
                        >
                          {fornecedores &&
                            fornecedores.map((d) => (
                              <option value={d.id}>{d.nomefornecedor}</option>
                            ))}
                        </Select>

                        {/* {registerForm.errors.fornecedor && (
                          <TextError>
                            {registerForm.errors.fornecedor}
                          </TextError>
                       )} */}
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
                            <Text
                              fontWeight={"bold"}
                              fontSize={"12px"}
                              color={"#949494"}
                            >
                              CLASSE DE SERVIÇO
                            </Text>
                          </Flex>
                          <Select
                            h={"56px"}
                            placeholder="Escolha uma Classe"
                            id="servico"
                            name="servico"
                            value={registerForm.values.servico}
                            onChange={registerForm.handleChange}
                          >
                            {classesSevicos &&
                              classesSevicos.map((d) => (
                                <option value={d.id}>{d.classe_servico}</option>
                              ))}
                          </Select>
                          {/*  {registerForm.errors.servico && (
                            <TextError>{registerForm.errors.servico}</TextError>
                          )}
                          */}
                        </FormControl>
                        <FormControl>
                          <Flex gap={1}>
                            <RequiredField />
                            <Text
                              fontWeight={"bold"}
                              fontSize={"12px"}
                              color={"#949494"}
                            >
                              PEDIDO
                            </Text>
                          </Flex>
                          <Input
                            h={"56px"}
                            placeholder="Pedido"
                            id="pedido"
                            name="pedido"
                            maxLength={100}
                            value={registerForm.values.pedido}
                            onChange={registerForm.handleChange}
                            onKeyPress={(e) => {
                              // eslint-disable-next-line prefer-regex-literals
                              const r = new RegExp(/[a-zA-Z0-9]/);
                              if (!r.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            size="md"
                            type="text"
                          />
                          {/*  {registerForm.errors.pedido && (
                            <TextError>{registerForm.errors.pedido}</TextError>
                        )} */}
                        </FormControl>
                      </Flex>

                      <FormControl>
                        <Flex gap={1}>
                          <RequiredField />
                          <Text
                            fontWeight={"bold"}
                            fontSize={"12px"}
                            color={"#949494"}
                          >
                            TEXTO DO PEDIDO
                          </Text>
                        </Flex>
                        <Textarea
                          placeholder="Ação ou Recomendação"
                          id="pedido-obs"
                          name="pedido_obs"
                          maxLength={240}
                          value={registerForm.values.pedido_obs}
                          onChange={registerForm.handleChange}
                        />

                        {/* {registerForm.errors.pedido_obs && (
                          <TextError>
                            {registerForm.errors.pedido_obs}
                          </TextError>
                        )} */}
                      </FormControl>
                    </Flex>
                  </Stack>
                </Flex>
              </FormControl>
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Flex gap={2}>
                <Button
                  h={"56px"}
                  variant="ghost"
                  color="red.500"
                  w={"208px"}
                  onClick={() => handleCancelar(registerForm, onClose)}
                  _hover={{
                    background: "red.600",
                    transition: "all 0.4s",
                    color: "white",
                  }}
                  fontSize={"18px"}
                  fontWeight={"700"}
                  borderRadius={"8px"}
                  fontFamily={"Mulish"}
                >
                  Cancelar
                </Button>
                <Button
                  w={"208px"}
                  h={"56px"}
                  borderRadius={"8px"}
                  disabled={!registerForm.isValid || !registerForm.dirty}
                  background={"origem.500"}
                  fontSize={"18px"}
                  fontWeight={"700"}
                  fontFamily={"Mulish"}
                  variant="primary"
                  color="white"
                  onClick={() => {
                    handleCadastrar(registerForm, () => {
                      onClose();
                      toogleRender();
                    });
                  }}
                  _hover={{
                    background: "origem.600",
                    transition: "all 0.4s",
                  }}
                >
                  {loading ? (
                    <Ring speed={2} lineWeight={5} color="white" size={24} />
                  ) : (
                    <>
                      <Text>Concluir</Text>
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
