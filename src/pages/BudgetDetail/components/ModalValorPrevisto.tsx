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
                  h={"56px"}
                  w={"208px"}
                  variant="ghost"
                  color="red.500"
                  onClick={() => handleCancelar(registerForm, onClose)}
                  _hover={{
                    background: "red.500",
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
