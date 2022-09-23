import { FaGreaterThan } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";

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
  IconButton,
  Icon,
} from "@chakra-ui/react";
// import { Ring } from "@uiball/loaders";

// import { TextError } from "components/TextError";

import { handleCancelar } from "utils/handleCadastro";

import { useCadastroPriorizacao } from "hooks/useCadastroPriorizacao";

import ModalCadastrarBeneficio from "./ModalCadastrarBeneficio";
import { TabelaBeneficio } from "./TabelaBeneficio";

function ModalEditarBeneficio() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm } = useCadastroPriorizacao();

  return (
    <>
      <IconButton
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        color={"origem.500"}
        backgroundColor={"white"}
        border={"none"}
        textAlign={"center"}
        icon={<MdModeEdit />}
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
            Priorização Benefício
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
                            fontSize={"20px"}
                            mb={"8px"}
                          >
                            <IoIosArrowBack /> Priorização
                          </Button>
                        </Text>
                        <Flex>
                          <ModalCadastrarBeneficio />
                        </Flex>
                        <Flex>
                          <Button
                            // disabled={!registerForm.isValid}
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
                            <Text>Configuração</Text>
                          </Button>
                        </Flex>
                        <Flex>
                          <Button
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
                        </Flex>
                      </Flex>
                      <TabelaBeneficio />
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

export default ModalEditarBeneficio;
