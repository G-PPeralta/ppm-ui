//  CRIADO EM: 09/2022
//  AUTOR: Gabriel Peralta.
//  DESCRIÇÃO DO ARQUIVO: Modal de cadastra lição aprendida.

import { useState } from "react";
import { useParams } from "react-router-dom";

import {
  Flex,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";

import { useAuth } from "hooks/useAuth";

import { postLicaoAprendida } from "services/post/AdicionarLicaoAprendida";

interface CadasProps {
  closeModal: () => void;
  onCloseModal: () => void;
  callBack: () => void;
}

function CadastrarLicoesAprendidasModal({
  closeModal,
  onCloseModal,
  callBack,
}: CadasProps) {
  const { id } = useParams();
  const [licaoAprendida, setLicaoAprendida] = useState("");
  const [acao, setAcao] = useState("");
  const { user } = useAuth();

  async function handleSubmitLicao() {
    const payload = {
      id_atividade: Number(id),
      licao_aprendida: licaoAprendida,
      acoes_e_recomendacoes: acao,
      data: new Date(),
      user: user?.nome,
    };
    await postLicaoAprendida(payload);
    await callBack();
    onCloseModal();
  }

  const regex = /[^\w\s]/gi;

  return (
    <Flex>
      <Modal isOpen={true} onClose={closeModal} size="lg">
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
            Adicionar Lições Aprendidas
          </ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody>
            <FormControl marginBottom={4}>
              <FormLabel
                mt={3}
                htmlFor="fornecedorNome"
                color="#949494"
                fontSize="12px"
                fontWeight="700"
              >
                <Flex gap={1}>
                  <RequiredField /> LIÇÃO APRENDIDA
                </Flex>
              </FormLabel>
              <Input
                maxLength={40}
                borderRadius={"8px"}
                border={"1px solid #949494"}
                mt={"-9px"}
                width={"100%"}
                height={"56px"}
                color={"black"}
                _placeholder={{ color: "#949494" }}
                isRequired
                placeholder="Lição aprendida"
                type="text"
                id="licaoAprendida"
                name="licaoAprendida"
                fontSize={"14px"}
                value={licaoAprendida.replace(regex, "")}
                onChange={(event) => setLicaoAprendida(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel
                htmlFor="acao"
                color="#949494"
                fontSize="12px"
                fontWeight="700"
                mt={"6px"}
              >
                <Flex gap={1}>
                  <RequiredField /> AÇÃO OU RECOMENDAÇÃO
                </Flex>
              </FormLabel>
              <Textarea
                borderRadius={"8px"}
                border={"1px solid #949494"}
                mt={"-9px"}
                width={"100%"}
                height={"121px"}
                color={"black"}
                _placeholder={{ color: "#949494" }}
                isRequired
                fontSize={"14px"}
                placeholder="Ação ou recomendação"
                id="acao"
                name="acao"
                value={acao.replace(regex, "")}
                onChange={(event) => setAcao(event.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Flex gap={2}>
              <Button
                variant="primary"
                color="#F40606"
                _hover={{
                  background: "red.600",
                  transition: "all 0.4s",
                  color: "white",
                }}
                onClick={closeModal}
                fontSize="18px"
                fontWeight="700"
                width={"208px"}
                height={"56px"}
              >
                Cancelar
              </Button>
              <Button
                width={"208px"}
                height={"56px"}
                background="origem.500"
                variant="primary"
                color="white"
                _hover={{
                  background: "origem.600",
                  transition: "all 0.4s",
                }}
                fontSize="18px"
                fontWeight="700"
                disabled={licaoAprendida.length < 1 || acao.length < 1}
                onClick={handleSubmitLicao}
              >
                Confirmar
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default CadastrarLicoesAprendidasModal;
