//  CRIADO EM: 07/2022
//  AUTOR: Felipe Mateus
//  DESCRIÇÃO DO ARQUIVO: Botão e modal de editar valor previsto.

import { useEffect } from "react";
import { MdModeEdit } from "react-icons/md";

import {
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  FormControl,
  Stack,
  useBreakpointValue,
  IconButton,
  InputGroup,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { Projeto } from "interfaces/Budgets";

import InputGenerico from "components/InputGenerico";

import { handleCadastrar, handleCancelar } from "utils/handleCadastro";

import { useCadastroOrcamentoPrevisto } from "hooks/useCadastroOrcamentoPrevisto";

interface PropsInterface {
  projeto: Projeto;
  toogleRender: () => void;
  value: string;
}

function ModalValorPrevisto(props: PropsInterface) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading, setAtividade, setProjeto } =
    useCadastroOrcamentoPrevisto();
  const { projeto, toogleRender, value } = props;

  useEffect(() => {
    setAtividade(projeto.id);
  }, []);

  useEffect(() => {
    setProjeto(projeto.id_projeto);
  }, []);

  return (
    <>
      <IconButton
        ml={3}
        aria-label="Edit Realizado"
        variant={"outline"}
        icon={<MdModeEdit />}
        onClick={onOpen}
        backgroundColor={"transparent"}
        border={"none"}
        _hover={{
          backgroundColor: "origem.500",
          color: "white",
        }}
        color={"origem.500"}
      />

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
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
            Mobilização/Desmobilização
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
                          <InputGroup>
                            <InputGenerico
                              registerForm={registerForm}
                              nomeInput={"VALOR PREVISTO"}
                              propName={"valor"}
                              value={registerForm.values.valor || value}
                              required={true}
                              placeholder={"0"}
                              maxLength={20}
                              isNumeric={true}
                            />
                          </InputGroup>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Stack>
                </Flex>
              </FormControl>
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Flex gap={2}>
                <Button
                  h={"56px"}
                  w={"208px"}
                  variant="ghost"
                  color="red.500"
                  onClick={() => handleCancelar(registerForm, onClose)}
                  _hover={{
                    background: "red.600",
                    transition: "all 0.4s",
                    color: "white",
                  }}
                  fontSize="18px"
                  fontWeight={"700"}
                  fontFamily={"Mulish"}
                >
                  Cancelar
                </Button>

                <Button
                  h={"56px"}
                  w={"208px"}
                  disabled={!registerForm.isValid || !registerForm.dirty}
                  background="origem.500"
                  variant="primary"
                  color="white"
                  _hover={{
                    background: "origem.600",
                    transition: "all 0.4s",
                  }}
                  onClick={() => {
                    handleCadastrar(registerForm, () => {
                      onClose();
                      toogleRender();
                    });
                  }}
                  fontSize="18px"
                  fontWeight={"700"}
                  fontFamily={"Mulish"}
                >
                  {loading ? (
                    <Ring speed={2} lineWeight={5} color="white" size={24} />
                  ) : (
                    <>
                      <Text>Confirmar</Text>
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

export default ModalValorPrevisto;
