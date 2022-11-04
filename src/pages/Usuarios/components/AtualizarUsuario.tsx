// import { BsPlusLg } from "react-icons/bs";

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
  useDisclosure,
} from "@chakra-ui/react";

// import { TextError } from 'components/TextError';

export function BotaoAtualizar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex>
        <Button
          type="submit"
          background="white"
          variant="solid"
          border={"2px solid #0047BB"}
          borderRadius={"8px"}
          flex={"none"}
          mt={{ base: 1 }}
          order={0}
          flexGrow={0}
          p={"16px 8px"}
          color="origem.500"
          fontWeight={"700"}
          fontFamily={"Mulish"}
          fontStyle={"normal"}
          fontSize={"18px"}
          lineHeight={"23px"}
          textAlign={"center"}
          letterSpacing={"0.3px"}
          boxShadow="0px 4px 12px rgba(55, 81, 255, 0.24)"
          w={{ base: "100%", md: "98px" }}
          h={"55px"}
          _hover={{
            background: "origem.500",
            transition: "all 0.4s",
            color: "white",
          }}
          onClick={onOpen}
        >
          Atualizar
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
              Editar Usuário
            </ModalHeader>
            <ModalCloseButton color={"white"} />
            <ModalBody>
              <Flex align="end" mb={3} mt={3}>
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
                    placeholder="Nome do Usuário"
                    type="text"
                    id="nome"
                    name="nome"
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
