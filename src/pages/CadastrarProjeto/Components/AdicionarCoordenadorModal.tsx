//  CRIADO EM: 07/2022
//  AUTOR: Eduardo Muchak, Bruno Fracaro
//  DESCRIÇÃO DO ARQUIVO: Botão e Modal de inclusão de coordenador.

import { useState } from "react";
import { FiPlus } from "react-icons/fi";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { postCoordenador } from "services/post/ProjectRegister";

export function AdicionarCoordenadorModal(projectsForm: any) {
  const [coordenador, setCoordenador] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleChange(event: any): void {
    setCoordenador(event.target.value);
  }

  async function saveResponsible() {
    const { data } = await postCoordenador({ coordenadorNome: coordenador });

    projectsForm.projectsForm.setFieldValue(
      "coordenador_id",
      data.id_coordenador
    );
    projectsForm.projectsForm.setFieldValue(
      "coordenador",
      data.coordenadorNome
    );
    onClose();
  }

  return (
    <Flex>
      <Button
        onClick={onOpen}
        h={"56px"}
        background={"#0047BB"}
        border={"2.3px solid"}
        color={"white"}
        variant="primary"
        _hover={{
          background: "white",
          color: "#0047BB",
          transition: "all 0.4s",
        }}
        rightIcon={<FiPlus />}
        fontSize={"18px"}
        fontWeight={"700"}
      >
        Adicionar Coordenador
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            backgroundColor={"#2E69FD"}
            display={"flex"}
            justifyContent={"center"}
            color={"white"}
            fontSize={"14px"}
            fontWeight={"700"}
          >
            Adicionar Coordenador
          </ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody>
            <Flex align="end" mb={3}>
              <FormControl>
                <FormLabel
                  fontSize={"12px"}
                  fontWeight={"700"}
                  color={"#949494"}
                  mb={"1px"}
                  ml={"3px"}
                  htmlFor="coordenadorNome"
                >
                  NOME
                </FormLabel>
                <Input
                  isRequired
                  placeholder="Nome do coordenador"
                  type="text"
                  id="coordenadorNome"
                  name="coordenadorNome"
                  value={coordenador}
                  onChange={(event) => handleChange(event)}
                  maxLength={40}
                  fontSize={"14px"}
                  fontWeight={"400"}
                  color={"black"}
                  _placeholder={{ color: "#949494" }}
                  ml={"3px"}
                  w={"328px"}
                  border={"1px solid #949494"}
                  h={"56px"}
                />
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              background="origem.300"
              variant="primary"
              color="white"
              onClick={() => saveResponsible()}
              _hover={{
                background: "origem.500",
                transition: "all 0.4s",
              }}
            >
              SALVAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
