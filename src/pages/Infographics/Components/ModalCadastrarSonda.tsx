import { useState } from "react";

import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  FormControl,
  useBreakpointValue,
  Input,
  Text,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import LoadingButton from "components/LoadingButton";
import { RequiredField } from "components/RequiredField/RequiredField";

import { regexCaracteresEspeciais } from "utils/regex";

import { useToast } from "contexts/Toast";

import { useAuth } from "hooks/useAuth";

import { postCadastroSondaOperacaoRQ } from "services/react-query/sondasCRUD";

function ModalCadastrarSonda() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<any>({
    nom_usu_create: user?.nome,
    nome: "",
  });

  const reqPostCadastroSondaRQ = useMutation({
    mutationFn: postCadastroSondaOperacaoRQ,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sonda"] });
      setIsButtonLoading(false);
      toast.success(`Sonda cadastrada com sucesso!`, {
        id: "toast-principal",
      });
      onClose();
    },
    onError: () => {
      setIsButtonLoading(false);
      toast.error(`Erro ao cadastrar sonda!`, {
        id: "toast-principal",
      });
      onClose();
    },
  });

  const handleClickCadastrar = () => {
    // Seta a animação de loading do botão para True
    setIsButtonLoading(true);

    const payload = {
      ...formValues,
      nom_usu_create: user?.nome,
    };

    // Chama a função de cadastro
    reqPostCadastroSondaRQ.mutate(payload);

    // Limpa os campos do formulário
    setFormValues({ nome: "" });
  };

  const handleCloseModal = () => {
    // Limpa os campos do formulário
    setFormValues({ nome: "" });
    onClose();
  };

  const isButtonDisabled = formValues.nome === "";

  return (
    <>
      <Button variant={"origemBlueOutline"} w={"fit-content"} onClick={onOpen}>
        Sonda
      </Button>
      <Modal isOpen={isOpen} onClose={handleCloseModal} size="lg">
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
          >
            Cadastrar SPT
          </ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody mt={3}>
            <Flex direction={"column"} gap={4}>
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
                    <Text
                      fontWeight={"bold"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      SPT
                    </Text>
                  </Flex>
                  <Input
                    variant={"origem"}
                    placeholder="Nome do SPT"
                    id="nome"
                    name="nome"
                    type="text"
                    value={regexCaracteresEspeciais(formValues.nome)}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        nome: e.target.value,
                      })
                    }
                    maxLength={10}
                  />
                </FormControl>
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Flex gap={2}>
              <Button
                variant={"origemRedSolid"}
                onClick={() => handleCloseModal()}
              >
                <Text fontSize="18px" fontWeight={"700"} mx={12}>
                  Cancelar
                </Text>
              </Button>
              <Button
                variant={"origemBlueSolid"}
                disabled={isButtonDisabled}
                onClick={() => handleClickCadastrar()}
              >
                {isButtonLoading ? (
                  <LoadingButton />
                ) : (
                  <Text fontSize="18px" fontWeight={"700"} mx={12}>
                    Cadastrar
                  </Text>
                )}
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalCadastrarSonda;
