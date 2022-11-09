import { FiTrash } from "react-icons/fi";

import {
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  // ModalCloseButton,
  FormControl,
  Stack,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  IconButton,
  ModalCloseButton,
} from "@chakra-ui/react";

import { useToast } from "contexts/Toast";

import { deleteCustoReal } from "services/delete/Financeiro";

interface PropsInterface {
  id: number;
  toogleRender: () => void;
}

function ModalDeleteCustoDiario(props: PropsInterface) {
  const { toast } = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { id, toogleRender } = props;

  const deleteCusto = async () => {
    const { status } = await deleteCustoReal(id);

    if (status === 200 || status === 201) {
      toast.success(`Gasto removido com sucesso!`, {
        id: "toast-principal",
      });
      onClose();
      toogleRender();
    }
  };
  return (
    <>
      <IconButton
        variant="outline"
        aria-label="Remove"
        icon={<FiTrash size={"13px"} />}
        onClick={onOpen}
        _hover={{
          backgroundColor: "#F40606",
          color: "white",
        }}
        color={"#F40606"}
        fontWeight={"700"}
        backgroundColor={"transparent"}
        border={"none"}
      />

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
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
            fontFamily={"Mulish"}
          >
            Excluir Custo Diário
          </ModalHeader>
          <ModalCloseButton color={"white"} />

          <ModalBody mt={3}>
            <FormControl>
              <Flex direction={"column"} gap={4}>
                <Stack gap={2}>
                  <Flex>
                    <Text
                      // textAlign={"center"}
                      fontSize={"24px"}
                      mb={"1px"}
                      color={"#010101"}
                      fontWeight={"400"}
                    >
                      Tem certeza que deseja mover este Custo Diário para a
                      Lixeira?
                    </Text>
                  </Flex>
                </Stack>
              </Flex>
            </FormControl>
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Flex gap={2}>
              <Button
                h={"56px"}
                w={"208px"}
                variant="ghost"
                color="red.500"
                onClick={onClose}
                _hover={{
                  background: "red.600",
                  transition: "all 0.4s",
                  color: "white",
                }}
                fontSize="18px"
                fontWeight={"700"}
                fontFamily={"Mulish"}
              >
                Cancelar
              </Button>

              <Button
                h={"56px"}
                w={"208px"}
                background="origem.500"
                variant="primary"
                color="white"
                _hover={{
                  background: "origem.600",
                  transition: "all 0.4s",
                }}
                onClick={deleteCusto}
                fontSize="18px"
                fontWeight={"700"}
                fontFamily={"Mulish"}
              >
                <Text>Confirmar</Text>
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalDeleteCustoDiario;
