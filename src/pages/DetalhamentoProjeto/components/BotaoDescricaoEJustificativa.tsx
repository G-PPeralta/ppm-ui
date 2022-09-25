import { useState } from "react";
import { useParams } from "react-router-dom";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";

import { patchProjeto } from "services/update/Projeto";

function BotaoDescricaoEJustificativa() {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [descricao, setDescricao] = useState("");
  const [justificativa, setJustificativa] = useState("");
  return (
    <>
      <Button
        onClick={onOpen}
        background={"white"}
        color={"origem.300"}
        _hover={{
          background: "origem.500",
          color: "white",
          transition: "all 0.4s",
        }}
        px={6}
        py={9}
        borderTopRadius={"6px"}
        borderBottomRadius={"0px"}
      >
        Descrição e Justificativa
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
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
            Justificativa e Descrição
          </ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody>
            <FormControl marginBottom={4} padding={1}>
              <Flex direction={"column"}>
                <FormLabel
                  htmlFor="justificativa"
                  color="#D6D4D4"
                  fontSize="sm"
                  fontWeight="500"
                >
                  JUSTIFICATIVA
                </FormLabel>
                <Textarea
                  isRequired
                  placeholder="Justificativa"
                  id="justificativa"
                  name="justificativa"
                  width="100%"
                  value={justificativa}
                  onChange={(event) => setJustificativa(event.target.value)}
                />
              </Flex>
            </FormControl>
            {/* <FormControl>
                <FormLabel htmlFor="data">DATA</FormLabel>
                <Input
                  isRequired
                  placeholder="dd/mm/aaaa"
                  type="text"
                  id="data"
                  name="data"
                  width="100%"
                  value={data}
                  onChange={(event) => setData(event.target.value)}
                />
              </FormControl> */}
            <FormControl padding={1}>
              <Flex direction={"column"}>
                <FormLabel
                  htmlFor="descricao"
                  color="#D6D4D4"
                  fontSize="sm"
                  fontWeight="500"
                >
                  DESCRIÇÃO
                </FormLabel>
                <Textarea
                  isRequired
                  placeholder="Descrição"
                  // type="text"
                  id="descricao"
                  name="descricao"
                  width="100%"
                  value={descricao}
                  onChange={(event) => setDescricao(event.target.value)}
                />
              </Flex>
            </FormControl>
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Flex gap={2}>
              <Button
                // background="origem.300"
                variant="primary"
                color="red"
                _hover={{
                  background: "red.500",
                  transition: "all 0.4s",
                  color: "white",
                }}
                onClick={onClose}
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
                onClick={async () => {
                  await patchProjeto(Number(id), { descricao, justificativa });
                  setDescricao("");
                  setJustificativa("");
                  onClose();
                }}
              >
                Confirmar
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BotaoDescricaoEJustificativa;
