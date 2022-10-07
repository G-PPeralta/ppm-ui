import { IoMdArrowDropdown } from "react-icons/io";

import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  RadioGroup,
  Stack,
  Radio,
  Checkbox,
} from "@chakra-ui/react";

function ExibirModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        rightIcon={<IoMdArrowDropdown />}
        colorScheme="blue"
        variant="ghost"
      >
        Exibir
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
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
          >
            Exibir
          </ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody mt={4}>
            <Flex>
              <Flex direction={"column"} grow={1} gap={2}>
                <Text fontWeight={600}>Data</Text>
                <RadioGroup defaultValue="1">
                  <Stack spacing={5} direction="row">
                    <Radio value="1">Início</Radio>
                    <Radio value="2">Fim</Radio>
                  </Stack>
                </RadioGroup>
              </Flex>
              <Flex direction={"column"} grow={1} gap={2}>
                <Text fontWeight={600}>Status</Text>
                <Checkbox colorScheme="blue" defaultChecked>
                  Checkbox
                </Checkbox>
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter display={"flex"} justifyContent={"center"}>
            <Flex gap={2}>
              <Button
                variant="ghost"
                color="red"
                onClick={() => onClose()}
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
                onClick={() => onClose()}
                _hover={{
                  background: "origem.500",
                  transition: "all 0.4s",
                }}
              >
                Filtrar
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ExibirModal;
