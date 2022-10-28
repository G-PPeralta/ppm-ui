import { useEffect } from "react";
import { FiEdit2 } from "react-icons/fi";

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
  Stack,
  useBreakpointValue,
  IconButton,
  InputGroup,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { Projeto } from "interfaces/Budgets";

// import RealInput from "components/RealInput/input";
import InputGenerico from "components/InputGenerico";

import { handleCadastrar, handleCancelar } from "utils/handleCadastro";
import { formatReal, getMoney } from "utils/regexCoinMask";

import { useCadastroOrcamentoPrevisto } from "hooks/useCadastroOrcamentoPrevisto";

interface PropsInterface {
  projeto: Projeto;
  toogleRender: () => void;
  value: string;
}

function ModalValorPrevisto(props: PropsInterface) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading, setAtividade } =
    useCadastroOrcamentoPrevisto();
  const { projeto, toogleRender, value } = props;

  useEffect(() => {
    setAtividade(projeto.id);
  }, []);

  return (
    <>
      <IconButton
        aria-label="Edit Realizado"
        variant={"outline"}
        icon={<FiEdit2 />}
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
                              nomeInput={"Valor Previsto"}
                              propName={"valor"}
                              value={
                                registerForm.values.valor ||
                                formatReal(getMoney(value + "00"))
                              }
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
                  disabled={!registerForm.isValid || !registerForm.dirty}
                  background="origem.300"
                  variant="primary"
                  color="white"
                  onClick={() => {
                    handleCadastrar(registerForm, () => {
                      onClose();
                      toogleRender();
                    });
                  }}
                  _hover={{
                    background: "origem.500",
                    transition: "all 0.4s",
                  }}
                >
                  {loading ? (
                    <Ring speed={2} lineWeight={5} color="white" size={24} />
                  ) : (
                    <>
                      <Text>Editar Valor</Text>
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
