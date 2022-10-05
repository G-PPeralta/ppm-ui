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
  Text,
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
        color={"#0047BB"}
        _hover={{
          background: "#0047BB",
          color: "white",
          transition: "all 0.4s",
        }}
        px={6}
        py={9}
        borderTopRadius={"6px"}
        borderBottomRadius={"0px"}
        fontSize={"16px"}
        fontWeight={"700"}
        flexWrap={"wrap"}
      >
        Descrição e Justificativa
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
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
            Justificativa e Descrição
          </ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody>
            <FormControl marginBottom={4} padding={1}>
              <Flex direction={"column"}>
                <Text fontSize={"14px"} fontWeight={"700"}>
                  Justificativa
                </Text>
                <FormLabel
                  mt={"6px"}
                  htmlFor="justificativa"
                  color="#949494"
                  fontSize="12px"
                  fontWeight="700"
                >
                  JUSTIFICATIVA
                </FormLabel>
                <Textarea
                  mt={"-9px"}
                  fontSize={"14px"}
                  color={"#949494"}
                  fontWeight={"400"}
                  isRequired
                  placeholder="Digite a justificativa"
                  id="justificativa"
                  name="justificativa"
                  width="456px"
                  height={"121px"}
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
                <Text fontSize={"14px"} fontWeight={"700"}>
                  Descrição
                </Text>
                <FormLabel
                  htmlFor="descricao"
                  color="#949494"
                  fontSize="12px"
                  fontWeight="700"
                  mt={"6px"}
                >
                  DESCRIÇÃO
                </FormLabel>
                <Textarea
                  mt={"-9px"}
                  fontSize={"14px"}
                  color={"#949494"}
                  fontWeight={"400"}
                  isRequired
                  placeholder="Digite a descrição"
                  id="descricao"
                  name="descricao"
                  width="456px"
                  height={"121px"}
                  value={descricao}
                  onChange={(event) => setDescricao(event.target.value)}
                />
              </Flex>
            </FormControl>
          </ModalBody>
          <ModalFooter
            justifyContent={"center"}
            alignContent={"center"}
            alignItems={"center"}
          >
            <Flex gap={16} align={"center"}>
              <Button
                // background="origem.300"
                variant="primary"
                color="#F40606"
                _hover={{
                  background: "red.500",
                  transition: "all 0.4s",
                  color: "white",
                }}
                onClick={onClose}
                width={"76px"}
                height={"20px"}
                fontSize={"18px"}
                fontWeight={"600"}
              >
                Cancelar
              </Button>
              <Button
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
                width={"206px"}
                height={"55px"}
                bg={"#0047BB"}
              >
                Salvar
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BotaoDescricaoEJustificativa;
