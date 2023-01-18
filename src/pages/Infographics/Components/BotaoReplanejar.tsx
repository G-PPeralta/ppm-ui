//  CRIADO EM: 9/2022
//  AUTOR: Bruno Fracaro, Eduardo Muchak.
//  DESCRIÇÃO DO ARQUIVO: Botão confirmar replanejamento de intervenções

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

interface Props {
  execute: Function;
}

function BotaoReplanejar({ execute }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        w={"208px"}
        h={"56px"}
        fontSize="18px"
        fontWeight={"700"}
        fontFamily={"Mulish"}
        borderRadius={"8px"}
        background={"origem.500"}
        variant="primary"
        color="white"
        _hover={{
          background: "origem.600",
          transition: "all 0.4s",
        }}
      >
        <Text>Salvar</Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton color={"white"} />
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
                  <Flex direction={"column"}>
                    <Text
                      fontSize={"20px"}
                      mb={"1px"}
                      color={"#010101"}
                      fontWeight={"400"}
                    >
                      Tem certeza que deseja alterar o planejamento?
                    </Text>
                    <Text
                      fontSize={"16px"}
                      mt={"30px"}
                      color={"origem.600"}
                      fontWeight={"400"}
                    >
                      OBS: O replanejamento da datas levará alguns segundos.
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
                color="#F40606"
                onClick={() => onClose()}
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
                onClick={() => execute()}
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
                <Text>Confirmar</Text>
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BotaoReplanejar;
