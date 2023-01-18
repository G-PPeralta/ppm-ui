//  CRIADO EM: 10/2022
//  AUTOR: Geovana Augusta.
//  DESCRIÇÃO DO ARQUIVO: Deletar projeto da tabela

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
  ModalCloseButton,
  ModalHeader,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import { useToast } from "contexts/Toast";

import { useAuth } from "hooks/useAuth";

import { deleteProject } from "services/delete/DeleteProject";

type id = {
  projeto: number;
  newRender: Function;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
};

function ModalDeletarProjeto(projeto: id) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();

  const remove = async () => {
    try {
      if (!projeto.projeto) throw new Error("Erro ao remover projeto!");
      const { status } = await deleteProject(projeto.projeto, user?.nome);
      if (status === 200 || status === 201) {
        toast.success("Projeto removido com sucesso!", {
          id: "toast-principal",
        });
        setLoading(false);
        onClose();
      }
    } catch (error) {
      toast.error("Erro ao remover o projeto!", {
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
          <ModalHeader
            backgroundColor={"#2E69FD"}
            display={"flex"}
            justifyContent={"center"}
            color={"white"}
            fontSize={"14px"}
            fontWeight={"700"}
          >
            Excluir
          </ModalHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <ModalBody mt={3}>
              <FormControl>
                <Flex direction={"column"} gap={4}>
                  <Stack gap={2}>
                    <Flex>
                      <Text
                        fontSize={"20px"}
                        mb={"1px"}
                        color={"#010101"}
                        fontWeight={"400"}
                      >
                        Tem certeza que deseja mover este Projeto para a
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
                    projeto.setRefresh(!projeto.refresh);
                    remove();
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

export default ModalDeletarProjeto;
