import { FaTrash } from "react-icons/fa";

import {
  Button,
  Flex,
  FormControl,
  // FormLabel,
  Modal,
  ModalBody,
  // ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text,
  // Textarea,
  useBreakpointValue,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

// import { TextError } from "components/TextError";

import { handleCadastrar, handleCancelar } from "utils/handleCadastro";

import { useCadastroPriorizacao } from "hooks/useCadastroPriorizacao";

function ModalDeletarProjeto() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading } = useCadastroPriorizacao();

  return (
    <>
      <IconButton
        onClick={onOpen}
        color={"#F94144"}
        backgroundColor={"white"}
        aria-label="Plus sign"
      >
        <FaTrash />
      </IconButton>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent>
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
                  <Stack gap={2}>
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={5}
                    >
                      <Text
                        fontSize={"17px"}
                        mb={"1px"}
                        color={" #010101"}
                        fontWeight={"700"}
                      >
                        Excluir Projeto
                      </Text>
                    </Flex>
                    <Flex>
                      <Text fontSize={"14px"} mb={"1px"} color={" #010101"}>
                        Tem certeza que deseja mover este Projeto para a
                        Lixeira?
                      </Text>
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

export default ModalDeletarProjeto;
