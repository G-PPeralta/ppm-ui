import { MdDeleteOutline } from "react-icons/md";

import {
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  // ModalCloseButton,
  // ModalBody,
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
        icon={<MdDeleteOutline />}
        onClick={onOpen}
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
            Deseja Exluir custo?
          </ModalHeader>
          <ModalCloseButton color={"white"} />

          {/* <ModalBody mt={3}></ModalBody> */}
          <ModalFooter justifyContent={"center"}>
            <Flex gap={2}>
              <Button
                h={"56px"}
                w={"208px"}
                variant="ghost"
                color="red.500"
                onClick={onClose}
                _hover={{
                  background: "red.500",
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
