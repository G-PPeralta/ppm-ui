import { FiTrash } from "react-icons/fi";

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
  IconButton,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";

// import { useToast } from "contexts/Toast";

// import { useAuth } from "hooks/useAuth";

// import { deleteInfograficos } from "services/delete/DeleteInfografico";

// import { deleteOperacaoCronograma } from "services/delete/Estatisticas";
// type ModalDeletarProps = {
//   // id: number;
//   // setLoading: Function;
//   // callbackSetRefresh: Function;
//   // handleGetAllData: any;
// };

function ModalDeletar({ id, onDelete }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { toast } = useToast();
  // const { user } = useAuth();

  // console.log("id delete", id);

  // const remove = async () => {
  //   try {
  //     if (!id) throw new Error("Erro ao remover atividade!");
  //     const { status } = await deleteInfograficos(id, user?.nome);
  //     if (status === 200 || status === 201) {
  //       toast.success("Atividade removida com sucesso!", {
  //         id: "toast-principal",
  //       });

  //       onClose();
  //     }
  //   } catch (error) {
  //     toast.error("Erro ao remover a atividade!", {
  //       id: "toast-principal",
  //     });

  //     onClose();
  //   }
  // };

  return (
    <>
      <IconButton
        onClick={onOpen}
        color={"white"}
        fontWeight={"700"}
        backgroundColor={"transparent"}
        aria-label="Botão excluir"
        _hover={{
          backgroundColor: "transparent",
          color: "white",
        }}
        w={"24px"}
        minW={"24px"}
        maxW={"24px"}
        h={"16px"}
        minH={"14px"}
        maxH={"18px"}
      >
        <FiTrash size={16} />
      </IconButton>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton color={"white"} />
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
            Excluir
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
                      Tem certeza que deseja mover esta atividade para a
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
                variant="ghost"
                color="#F40606"
                onClick={() => onClose()}
                _hover={{
                  background: "red.600",
                  transition: "all 0.4s",
                  color: "white",
                }}
                height={"56px"}
                width={"206px"}
                fontSize={"18px"}
                fontWeight={"700"}
              >
                Cancelar
              </Button>
              <Button
                background="origem.500"
                variant="primary"
                color="white"
                onClick={() => {
                  onDelete();
                  onClose();
                }}
                _hover={{
                  background: "origem.600",
                  transition: "all 0.4s",
                }}
                height={"56px"}
                width={"206px"}
                fontSize={"18px"}
                fontWeight={"700"}
              >
                <>
                  <Text>Confirmar</Text>
                </>
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalDeletar;
