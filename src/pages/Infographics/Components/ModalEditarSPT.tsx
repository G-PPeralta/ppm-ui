import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

import {
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Stack,
  useBreakpointValue,
  Input,
} from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";

import PocosDragAndDrop from "./PocosDragAndDrop";

function ModalEditarSPT({ column }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nome, setNome] = useState(column.sonda);
  const [pocos, setPocos] = useState(column.pocos);

  return (
    <>
      <Button
        variant={"none"}
        _hover={{
          background: "#ddd",
          transition: "all 0.4s",
        }}
        onClick={onOpen}
        py={1}
        px={1}
        ml={1}
      >
        <BsThreeDotsVertical size={22} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
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
            Editar SPT
          </ModalHeader>
          <ModalBody mt={3}>
            <FormControl>
              <Flex direction={"column"} gap={4}>
                <Stack>
                  <Flex
                    flexDirection={useBreakpointValue({
                      base: "column",
                      md: "row",
                    })}
                    gap={5}
                  >
                    <FormControl>
                      <Flex gap={1}>
                        <RequiredField />
                        <FormLabel htmlFor="nom_projeto_tipo">ID</FormLabel>
                      </Flex>
                      <Input
                        disabled
                        isRequired
                        placeholder="id"
                        type="text"
                        value={column.id_campanha}
                      />
                    </FormControl>
                    <FormControl>
                      <Flex gap={1}>
                        <RequiredField />
                        <FormLabel htmlFor="nom_projeto_tipo">SPT</FormLabel>
                      </Flex>
                      <Input
                        isRequired
                        placeholder="Nome do SPT"
                        type="text"
                        value={nome}
                        onChange={(event) => setNome(event.target.value)}
                      />
                    </FormControl>
                  </Flex>
                </Stack>

                <PocosDragAndDrop pocos={pocos} setPocos={setPocos} />
              </Flex>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
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
                <Text>Salvar</Text>
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalEditarSPT;
