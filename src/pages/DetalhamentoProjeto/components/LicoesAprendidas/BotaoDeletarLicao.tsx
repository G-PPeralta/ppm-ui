//  CRIADO EM: 07/2022
//  AUTOR:Bruno Fracaro e Eduardo Muchak
//  DESCRIÇÃO DO ARQUIVO: Botão deletar lição aprendido no detalhamento.

import { useState } from "react";
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
import { Ring } from "@uiball/loaders";

import { useToast } from "contexts/Toast";

import { useAuth } from "hooks/useAuth";

import { deleteLicao } from "services/delete/DeleteLicoesProjetos";

type ModalDeletarProps = {
  id: number;
  newRender: Function;
};

function ModalDeletarLicao({ id, newRender }: ModalDeletarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useAuth();

  const remove = async () => {
    try {
      if (!id) throw new Error("Erro ao remover lição!");
      const { status } = await deleteLicao(Number(id), user?.nome);
      if (status === 200 || status === 201) {
        toast.success("Lição removida com sucesso!", {
          id: "toast-principal",
        });
        setLoading(false);
        onClose();
      }
    } catch (error) {
      toast.error("Erro ao remover lição!", {
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
        color={"#F40606"}
        fontWeight={"700"}
        backgroundColor={"transparent"}
        aria-label="Plus sign"
        _hover={{
          backgroundColor: "#F40606",
          color: "white",
        }}
      >
        <FiTrash size={"13px"} />
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
                        Tem certeza que deseja mover esta lição para a Lixeira?
                      </Text>
                    </Flex>
                  </Stack>
                </Flex>
              </FormControl>
            </ModalBody>

            <ModalFooter justifyContent={"center"} mt={4}>
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
                  width={"208px"}
                  fontSize={"18px"}
                  fontWeight={"700"}
                  fontFamily={"Mulish"}
                >
                  Cancelar
                </Button>
                <Button
                  background="origem.500"
                  variant="primary"
                  color="white"
                  onClick={() => {
                    newRender();
                    remove();
                  }}
                  _hover={{
                    background: "origem.600",
                    transition: "all 0.4s",
                  }}
                  height={"56px"}
                  width={"208px"}
                  fontSize={"18px"}
                  fontWeight={"700"}
                  fontFamily={"Mulish"}
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

export default ModalDeletarLicao;
