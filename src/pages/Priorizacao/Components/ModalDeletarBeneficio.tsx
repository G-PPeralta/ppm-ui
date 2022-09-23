import { FiTrash } from "react-icons/fi";

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

// import { useAuth } from "hooks/useAuth";
import { useCadastroPriorizacao } from "hooks/useCadastroPriorizacao";

// import { deleteProject } from "services/delete/DeleteProject";

function ModalDeletarBeneficio() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading } = useCadastroPriorizacao();
  // const { user } = useAuth();
  // const idUser = user?.nome;

  // Pra pegar o id do projeto e depois ser possível deletar
  // console.log(projeto.projeto);

  return (
    <>
      <IconButton
        onClick={onOpen}
        color={"#F40606"}
        backgroundColor={"white"}
        aria-label="Plus sign"
        _hover={{
          backgroundColor: "white",
          color: "#F94144",
        }}
      >
        <FiTrash size={"13px"} />
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
                        color={"#010101"}
                        fontWeight={"700"}
                      >
                        Excluir Priorização
                      </Text>
                    </Flex>
                    <Flex>
                      <Text
                        textAlign={"center"}
                        fontSize={"16px"}
                        mb={"1px"}
                        color={" #010101"}
                      >
                        Tem certeza que deseja mover este Benefício para a
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

export default ModalDeletarBeneficio;
