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
  Stack,
  useBreakpointValue,
  Input,
  ModalCloseButton,
} from "@chakra-ui/react";

import { postReplanejarCampanha } from "services/post/Infograficos";

import PocosDragAndDrop from "./PocosDragAndDrop";

interface Payload {
  id_cronograma: number;
  ordem: number;
}

function ModalEditarSPT({ column, refresh, setRefresh }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nome, setNome] = useState(column.sonda);
  const [pocos, setPocos] = useState(column.pocos);
  const [payload, setPayload] = useState<Payload[]>([
    {
      id_cronograma: 0,
      ordem: 0,
    },
  ]);

  // console.log("payload", payload);

  const handleClick = async () => {
    await postReplanejarCampanha(payload, column.id_campanha);
    setRefresh(!refresh);
    onClose();
  };

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
            Replanejar Cronograma
          </ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody mt={3}>
            <FormControl>
              <Flex direction={"column"} gap={4}>
                <Stack>
                  <Text fontWeight={"bold"}>Campanha</Text>
                  <Flex
                    flexDirection={useBreakpointValue({
                      base: "column",
                      md: "row",
                    })}
                    gap={5}
                  >
                    <FormControl>
                      <Flex gap={1}>
                        <Text
                          fontWeight={"bold"}
                          fontSize={"12px"}
                          color={"#949494"}
                        >
                          ID
                        </Text>
                      </Flex>
                      <Input
                        h={"56px"}
                        disabled
                        placeholder="id"
                        type="text"
                        value={column.id_campanha}
                      />
                    </FormControl>
                    <FormControl>
                      <Flex gap={1}>
                        <Text
                          fontWeight={"bold"}
                          fontSize={"12px"}
                          color={"#949494"}
                        >
                          SPT
                        </Text>
                      </Flex>
                      <Input
                        h={"56px"}
                        disabled
                        placeholder="Nome do SPT"
                        type="text"
                        value={nome}
                        onChange={(event) => setNome(event.target.value)}
                      />
                    </FormControl>
                  </Flex>
                </Stack>

                <PocosDragAndDrop
                  pocos={pocos}
                  setPocos={setPocos}
                  setPayload={setPayload}
                />
              </Flex>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Flex gap={2}>
              <Button
                onClick={() => onClose()}
                h={"56px"}
                borderRadius={"10px"}
                variant="ghost"
                color="red"
                _hover={{
                  background: "red.500",
                  transition: "all 0.4s",
                  color: "white",
                }}
              >
                <Text fontSize="16px" fontWeight={"bold"}>
                  Cancelar
                </Text>
              </Button>
              <Button
                onClick={() => handleClick()}
                h={"56px"}
                borderRadius={"10px"}
                background={"origem.500"}
                variant="primary"
                color="white"
                _hover={{
                  background: "origem.600",
                  transition: "all 0.4s",
                }}
              >
                <Text fontSize="16px" fontWeight={"bold"}>
                  Salvar
                </Text>
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalEditarSPT;
