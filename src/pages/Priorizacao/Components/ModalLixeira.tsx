import { FaGreaterThan } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

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
  // Textarea,
  useDisclosure,
  Icon,
  Box,
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
        fontSize="17px"
      >
        Lixeira
        <Icon
          as={FaGreaterThan}
          fontSize="13px"
          fontWeight={"none"}
          ml={1}
          color="#0047BB"
        />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
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
            Lixeira
          </ModalHeader>
          {/* <ModalCloseButton color={"white"} /> */}
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
                    <Flex direction={"column"}>
                      <Flex>
                        <Text>
                          <Button
                            aria-label=""
                            backgroundColor={"white"}
                            color={"black"}
                            onClick={() =>
                              handleCancelar(registerForm, onClose)
                            }
                            _hover={{
                              background: "white",
                              transition: "all 0.4s",
                              color: "origem.500",
                            }}
                            fontSize={"15px"}
                            mb={"8px"}
                            mr={"-800px"}
                          >
                            <IoIosArrowBack />
                          </Button>
                        </Text>
                      </Flex>
                      <Flex
                        mb={"10px"}
                        mr={"13px"}
                        fontSize={"15px"}
                        fontWeight={"700"}
                      >
                        <Text>Itens Excluídos</Text>
                      </Flex>

                      <Box
                        border={"solid #9FA2B4 0.5px"}
                        w="530px"
                        borderRadius={"10px"}
                        p={4}
                      >
                        <Flex flex={"flex-start"} justify={"space-between"}>
                          <Flex flex={"flex-end"}>
                            <Text color={"black"}>Itens excluídos aqui</Text>
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
                            >
                              <Text>Restaurar</Text>
                            </Button>
                          </Flex>
                        </Flex>
                      </Box>

                      <Box
                        border={"solid #9FA2B4 0.5px"}
                        w="530px"
                        borderRadius={"10px"}
                        p={4}
                        mt={"15px"}
                      >
                        <Flex flex={"flex-start"} justify={"space-between"}>
                          <Flex flex={"flex-end"}>
                            <Text color={"black"}>Itens excluídos aqui</Text>
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
                            >
                              <Text>Restaurar</Text>
                            </Button>
                          </Flex>
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