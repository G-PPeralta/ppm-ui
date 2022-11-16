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

import { postReplanejarCampanha } from "services/post/Infograficos";

interface Payload {
  id_cronograma: number;
  ordem: number;
}

interface Props {
  payload: Payload[];
  id: any;
}

function BotaoReplanejar({ payload, id }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading } = useCadastroPriorizacao();

  const handleClick = async () => {
    await postReplanejarCampanha(payload, id);
    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        h={"56px"}
        borderRadius={"10px"}
        background={"origem.500"}
        variant="primary"
        color="white"
        _hover={{
          background: "origem.600",
          transition: "all 0.4s",
        }}
      >
        <Text fontSize="16px" fontWeight={"bold"}>
          Salvar
        </Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
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
              Alterar
            </ModalHeader>

            <ModalCloseButton color={"white"} />
            <ModalBody mt={3}>
              <FormControl>
                <Flex direction={"column"} gap={4}>
                  <Stack gap={2}>
                    <Flex>
                      <Text
                        // textAlign={"center"}
                        fontSize={"20px"}
                        mb={"1px"}
                        color={"#010101"}
                        fontWeight={"400"}
                      >
                        Tem certeza que deseja alterar o planejamento?
                      </Text>
                    </Flex>
                  </Stack>
                </Flex>
              </FormControl>
            </ModalBody>

            <ModalFooter justifyContent={"center"} mt={4}>
              <Flex gap={2}>
                <Button
                  variant="ghost"
                  color="red.500"
                  onClick={() => handleCancelar(registerForm, onClose)}
                  _hover={{
                    background: "red.600",
                    transition: "all 0.4s",
                    color: "white",
                  }}
                  height={"56px"}
                  width={"208px"}
                  fontSize={"18px"}
                  fontWeight={"700"}
                  fontFamily={"Mulish"}
                >
                  Cancelar
                </Button>
                <Button
                  background="#0047BB"
                  variant="primary"
                  color="white"
                  onClick={() => handleClick()}
                  _hover={{
                    background: "origem.600",
                    transition: "all 0.4s",
                  }}
                  height={"56px"}
                  width={"208px"}
                  fontSize={"18px"}
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

export default BotaoReplanejar;
