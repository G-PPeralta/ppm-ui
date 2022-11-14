import {
  Button,
  Flex,
  FormControl,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

// import { TextError } from "components/TextError";

import { handleCancelar } from "utils/handleCadastro";

import { useCadastroPriorizacao } from "hooks/useCadastroPriorizacao";

interface TableProps {
  id: number;
}

export function RestoreModal(id: TableProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading } = useCadastroPriorizacao();

  return (
    <>
      <Button
        background="transparent"
        color="origem.500"
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        backgroundColor={"transparent"}
        border={"none"}
        textAlign={"center"}
        _hover={{
          backgroundColor: "origem.500",
          color: "white",
        }}
      >
        Restaurar
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton color={"white"} />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              registerForm.handleSubmit(e);
            }}
          >
            <ModalHeader
              backgroundColor={"#2E69FD"}
              borderTopRadius={7}
              display={"flex"}
              justifyContent={"center"}
              color={"white"}
              fontSize={"14px"}
              fontWeight={"700"}
              height={"48px"}
            >
              Restaurar
            </ModalHeader>

            <ModalCloseButton color={"white"} />
            <ModalBody mt={3}>
              <FormControl>
                <Flex direction={"column"} gap={4}>
                  <Stack gap={2}>
                    <Flex>
                      <Text
                        // textAlign={"center"}
                        fontSize={"24px"}
                        mb={"1px"}
                        color={"#010101"}
                        fontWeight={"400"}
                      >
                        Tem certeza que deseja restaurar esta informação?
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
                  height={"56px"}
                  width={"100px"}
                  fontSize={"18px"}
                  fontWeight={"600"}
                >
                  Cancelar
                </Button>
                <Button
                  background="#0047BB"
                  variant="primary"
                  color="white"
                  // onClick={() => handleCadastrar(registerForm, onClose)}
                  _hover={{
                    background: "origem.500",
                    transition: "all 0.4s",
                  }}
                  height={"56px"}
                  width={"185px"}
                  fontSize={"18px"}
                  fontWeight={"700"}
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
