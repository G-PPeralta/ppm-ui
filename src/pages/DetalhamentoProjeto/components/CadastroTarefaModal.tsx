import { BsPlusLg } from "react-icons/bs";
// import { useParams } from "react-router-dom";

import {
  Flex,
  Box,
  IconButton,
  // useBreakpointValue,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  // useDisclosure,
} from "@chakra-ui/react";

function CadastroTarefasModal({ isModalOpen, closeModal }: any) {
  // const { onClose } = useDisclosure();
  return (
    <Flex>
      <Box
        display={"flex"}
        alignItems={"center"}
        border="2px"
        padding={2}
        borderRadius={6}
        borderColor={"origem.300"}
        _hover={{
          background: "#f5f5f5",
          transition: "all 0.4s",
          color: "origem.300",
          cursor: "pointer",
          borderColor: "origem.500",
        }}
      >
        <IconButton
          aria-label="Plus sign"
          icon={<BsPlusLg />}
          background="origem.300"
          variant="secondary"
          color="white"
          mr={2}
          isRound={true}
          size="sm"
        />
        {/* <Text
          fontSize={useBreakpointValue({ base: "sm", md: "sm" })}
          fontWeight={"bold"}
          color={"origem.500"}
        >
          EDITAR FORNECEDOR
        </Text> */}
      </Box>
      <Modal isOpen={isModalOpen} onClose={closeModal} size="xl">
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
            Cadastrar Tarefa
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl marginBottom={4} padding={1}>
              <FormLabel
                htmlFor="nomeTarefa"
                color="#D6D4D4"
                fontSize="sm"
                fontWeight="500"
              >
                NOME DA TAREFA
              </FormLabel>
              <Input
                isRequired
                placeholder="Nome tarefa"
                type="text"
                id="nomeTarefa"
                name="nomeTarefa"
                width="100%"
              />
            </FormControl>
            <FormControl>
              <FormLabel
                htmlFor="acao"
                color="#D6D4D4"
                fontSize="sm"
                fontWeight="500"
              >
                DESCRIÇÃO DA TAREFA
              </FormLabel>
              <Textarea
                isRequired
                placeholder="Descrição da tarefa"
                id="descrição"
                name="descrição"
                width="100%"
                // value={acao}
                // onChange={(event) => setAcao(event.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Flex gap={2}>
              <Button
                variant="primary"
                color="red"
                _hover={{
                  background: "red.500",
                  transition: "all 0.4s",
                  color: "white",
                }}
                onClick={closeModal}
              >
                Cancelar
              </Button>
              <Button
                background="origem.300"
                variant="primary"
                color="white"
                _hover={{
                  background: "origem.500",
                  transition: "all 0.4s",
                }}
              >
                Confirmar
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default CadastroTarefasModal;
