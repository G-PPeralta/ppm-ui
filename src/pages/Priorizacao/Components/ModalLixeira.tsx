import { MdArrowForwardIos } from "react-icons/md";

import {
  Button,
  Flex,
  FormControl,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  Icon,
  Box,
  ModalCloseButton,
} from "@chakra-ui/react";

import { handleCancelar } from "utils/handleCadastro";

import { useCadastroPriorizacao } from "hooks/useCadastroPriorizacao";

function ModalLixeira() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm } = useCadastroPriorizacao();

  return (
    <>
      <Button
        onClick={onOpen}
        background="transparent"
        color="#0047BB"
        float={"right"}
        fontSize="18px"
      >
        Lixeira
        <Icon
          as={MdArrowForwardIos}
          fontSize="20px"
          fontWeight={"700"}
          ml={1}
          color="#0047BB"
        />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            h={"48px"}
            backgroundColor={"#2E69FD"}
            borderTopRadius={7}
            display={"flex"}
            justifyContent={"center"}
            color={"white"}
            fontSize={"14px"}
            fontWeight={"700"}
          >
            Lixeira
          </ModalHeader>
          <ModalCloseButton color={"white"} />
          <form
            onSubmit={(e) => {
              // e.preventDefault();
              registerForm.handleSubmit(e);
            }}
          >
            <ModalBody mt={3}>
              <FormControl>
                <Flex gap={4}>
                  <Stack gap={2}>
                    <Flex direction={"column"} gap={10}>
                      <Box
                        border={"solid #9FA2B4 0.5px"}
                        w="850px"
                        h={"87px"}
                        borderRadius={"8px"}
                        p={4}
                        fontSize={"12px"}
                        fontWeight={"700"}
                        color={"#9FA2B4"}
                        gap={5}
                      >
                        <Flex flex={"flex-start"} justify={"space-between"}>
                          <Flex flex={"flex-end"}>
                            <Text
                              fontSize={"12px"}
                              fontWeight={"700"}
                              color={"#D6D4D4"}
                              fontFamily={"Mulish"}
                            >
                              ITENS EXCLUÍDOS AQUI
                            </Text>
                          </Flex>
                          <Flex direction={"row"} flex={"flex-end"}>
                            <Button
                              disabled={!registerForm.isValid}
                              background="white"
                              variant="primary"
                              border={"#0047BB solid 1px"}
                              color="origem.500"
                              _hover={{
                                background: "origem.500",
                                color: "white",
                                transition: "all 0.4s",
                              }}
                              h={"56px"}
                              w={"103px"}
                            >
                              <Text fontSize={"18px"} fontWeight={"700"}>
                                Restaurar
                              </Text>
                            </Button>
                          </Flex>
                        </Flex>
                      </Box>

                      <Box
                        border={"solid #9FA2B4 0.5px"}
                        w="850px"
                        h={"87px"}
                        borderRadius={"8px"}
                        p={4}
                        fontSize={"12px"}
                        fontWeight={"700"}
                        color={"#9FA2B4"}
                        flexDir={"column"}
                        mt={"-25px"}
                      >
                        <Flex flex={"flex-start"} justify={"space-between"}>
                          <Flex flex={"flex-end"}>
                            <Text
                              fontSize={"12px"}
                              fontWeight={"700"}
                              color={"#D6D4D4"}
                              fontFamily={"Mulish"}
                            >
                              ITENS EXCLUÍDOS AQUI
                            </Text>
                          </Flex>
                          <Flex direction={"row"} flex={"flex-end"}>
                            <Button
                              disabled={!registerForm.isValid}
                              background="white"
                              variant="primary"
                              border={"#0047BB solid 1px"}
                              color="origem.500"
                              _hover={{
                                background: "origem.500",
                                color: "white",
                                transition: "all 0.4s",
                              }}
                              h={"56px"}
                              w={"103px"}
                            >
                              <Text fontSize={"18px"} fontWeight={"700"}>
                                Restaurar
                              </Text>
                            </Button>
                          </Flex>
                        </Flex>
                        <Flex justifyContent={"center"}>
                          <Button
                            variant="ghost"
                            color="red"
                            onClick={() =>
                              handleCancelar(registerForm, onClose)
                            }
                            _hover={{
                              background: "red.500",
                              transition: "all 0.4s",
                              color: "white",
                            }}
                          >
                            Cancelar
                          </Button>
                        </Flex>
                      </Box>
                    </Flex>
                  </Stack>
                </Flex>
              </FormControl>
            </ModalBody>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalLixeira;
