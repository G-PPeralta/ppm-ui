import { IoMdArrowDropdown } from "react-icons/io";

import {
  Button,
  Flex,
  Modal,
  ModalBody,
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

type Props = {
  exibirDataInicio: boolean;
  setExibirDataInicio: React.Dispatch<React.SetStateAction<boolean>>;
};

function ExibirModal({ exibirDataInicio, setExibirDataInicio }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        rightIcon={<IoMdArrowDropdown />}
        textColor={"origem.500"}
        backgroundColor={"transparent"}
        _hover={{
          borderColor: "origem.600",
          backgroundColor: "origem.500",
          textColor: "white",
          transition: "all 0.4s",
        }}
        onClick={onOpen}
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
            fontSize={"1em"}
          >
            Exibir
          </ModalHeader>
          <ModalBody mt={4}>
            <Flex>
              <Flex direction={"column"} grow={1} gap={2}>
                <Text fontWeight={600}>Data</Text>
                <RadioGroup
                  defaultValue={exibirDataInicio ? "inicio" : "fim"}
                  onChange={(value) => {
                    if (value === "inicio") {
                      setExibirDataInicio(true);
                    } else {
                      setExibirDataInicio(false);
                    }
                  }}
                >
                  <Stack spacing={5} direction="row">
                    <Radio value={"inicio"}>Início</Radio>
                    <Radio value={"fim"}>Fim</Radio>
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
