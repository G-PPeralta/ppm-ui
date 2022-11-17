import { useState } from "react";
import { MdSettingsBackupRestore } from "react-icons/md";

import {
  Button,
  Flex,
  FormControl,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  ModalHeader,
  ModalCloseButton,
  IconButton,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

// import { TextError } from "components/TextError";

import { useToast } from "contexts/Toast";

import { restoreLixeira } from "services/update/Lixeira";

interface TableProps {
  id: number;
  tableName: string;
  newRender: Function;
}

export function RestoreModal({ id, tableName, newRender }: TableProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const update = async () => {
    try {
      if (!id) throw new Error("Erro ao restaurar o item!");
      const { status } = await restoreLixeira(id, tableName);
      if (status === 200 || status === 201) {
        toast.success("Item restaurado com sucesso!", {
          id: "toast-principal",
        });
        setLoading(false);
        onClose();
      }
    } catch (error) {
      toast.error("Erro ao restaurar o item!", {
        id: "toast-principal",
      });
      setLoading(false);
      onClose();
    }
  };

  return (
    <>
      <IconButton
        onClick={onOpen}
        color={"origem.500"}
        fontWeight={"700"}
        backgroundColor={"transparent"}
        aria-label="Plus sign"
        _hover={{
          backgroundColor: "origem.500",
          color: "white",
        }}
      >
        <MdSettingsBackupRestore />
      </IconButton>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton color={"white"} />
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <ModalHeader
              backgroundColor={"#2E69FD"}
              borderTopRadius={7}
              display={"flex"}
              justifyContent={"center"}
              color={"white"}
              fontSize={"14px"}
              fontWeight={"700"}
              height={"48px"}
            >
              Restaurar
            </ModalHeader>

            <ModalCloseButton color={"white"} />
            <ModalBody mt={3}>
              <FormControl>
                <Flex direction={"column"} gap={4}>
                  <Stack gap={2}>
                    <Flex>
                      <Text
                        // textAlign={"center"}
                        fontSize={"20px"}
                        mb={"1px"}
                        color={"#010101"}
                        fontWeight={"400"}
                      >
                        Tem certeza que deseja restaurar esta informação?
                      </Text>
                    </Flex>
                  </Stack>
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
                    background: "red.600",
                    transition: "all 0.4s",
                    color: "white",
                  }}
                  height={"56px"}
                  width={"204px"}
                  fontSize={"18px"}
                  fontWeight={"600"}
                >
                  Cancelar
                </Button>
                <Button
                  background="origem.500"
                  variant="primary"
                  color="white"
                  onClick={() => {
                    newRender();
                    update();
                  }}
                  _hover={{
                    background: "origem.600",
                    transition: "all 0.4s",
                  }}
                  height={"56px"}
                  width={"204px"}
                  fontSize={"18px"}
                  fontWeight={"600"}
                >
                  {loading ? (
                    <Ring speed={2} lineWeight={5} color="white" size={24} />
                  ) : (
                    <>
                      <Text>Confirmar</Text>
                    </>
                  )}
                </Button>
              </Flex>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
