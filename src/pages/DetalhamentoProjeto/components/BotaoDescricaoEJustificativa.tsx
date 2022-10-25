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
  // Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { ICardInfoProjeto } from "interfaces/DetalhamentoProjetos";

import { patchProjetoDescJust } from "services/update/Projeto";

interface DescricaoEJustificativaProps {
  infoProjeto: ICardInfoProjeto;
  setRender: () => void;
}

function BotaoDescricaoEJustificativa({
  infoProjeto,
  setRender,
}: DescricaoEJustificativaProps) {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [descricao, setDescricao] = useState(infoProjeto?.descricao);
  const [justificativa, setJustificativa] = useState(
    infoProjeto?.justificativa
  );

  const handleCancelar = () => {
    setDescricao("");
    setJustificativa("");
    onClose();
  };

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
        p={4}
        borderTopRadius={"6px"}
        borderBottomRadius={"0px"}
        fontSize={"16px"}
        fontWeight={"700"}
        flexWrap={"wrap"}
        flex={1}
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
                  maxLength={255}
                  mt={"-9px"}
                  fontSize={"14px"}
                  color={"black"}
                  _placeholder={{ color: "#949494" }}
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
                  maxLength={255}
                  mt={"-9px"}
                  fontSize={"14px"}
                  isRequired
                  color={"black"}
                  _placeholder={{ color: "#949494" }}
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
            <Flex gap={2} align={"center"}>
              <Button
                // background="origem.300"
                variant="primary"
                color="red.500"
                onClick={handleCancelar}
                h={"56px"}
                w={"206px"}
                borderRadius={"10px"}
                background={"white"}
                _hover={{
                  background: "red.600",
                  transition: "all 0.4s",
                  color: "white",
                }}
                fontSize={"18px"}
                fontWeight={"700"}
              >
                Cancelar
              </Button>
              <Button
                h={"56px"}
                w={"206px"}
                background={"origem.500"}
                variant="primary"
                color="white"
                onClick={async () => {
                  await patchProjetoDescJust(Number(id), {
                    descricao,
                    justificativa,
                  });
                  setDescricao("");
                  setJustificativa("");
                  setRender();
                  onClose();
                }}
                _hover={{
                  background: "origem.600",
                  transition: "all 0.4s",
                }}
                fontSize={"18px"}
                fontWeight={"700"}
                borderRadius={"8px"}
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
