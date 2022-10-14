import { useState } from "react";
// import { BsPlusLg } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  // IconButton,
  useDisclosure,
  // Box,
  // Text,
} from "@chakra-ui/react";

// import { TextError } from 'components/TextError';

import { postResponsavel } from "services/post/ProjectRegister";

export function AdicionarResponsavelModal(projectsForm: any) {
  const [responsavel, setResponsavel] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleChange(event: any): void {
    setResponsavel(event.target.value);
  }

  async function saveResponsible() {
    const { data } = await postResponsavel({ nome: responsavel });

    projectsForm.projectsForm.setFieldValue("responsavel_id", data.id);
    projectsForm.projectsForm.setFieldValue("responsavel", data.nome);
    onClose();
  }

  return (
    <>
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
          Adicionar Responsável
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
              Adicionar Responsável
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
                    htmlFor="nome"
                  >
                    NOME
                  </FormLabel>
                  <Input
                    isRequired
                    placeholder="Nome do responsável"
                    type="text"
                    id="nome"
                    name="nome"
                    value={responsavel}
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
                  {/* {projectsForm.projectsForm.errors.responsavel &&
                  projectsForm.projectsForm.touched.responsavel && (
                    <TextError>
                      {projectsForm.projectsForm.errors.responsavel}
                    </TextError>
                  )} */}
                </FormControl>
              </Flex>
              <Flex
                flexDirection={useBreakpointValue({
                  base: "column",
                  md: "row",
                })}
              ></Flex>
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
    </>
  );
}
