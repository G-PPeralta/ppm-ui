import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { useParams } from "react-router-dom";

import {
  Flex,
  Box,
  IconButton,
  // useBreakpointValue,
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

import { postLicaoAprendida } from "services/post/AdicionarLicaoAprendida";

function CadastrarLicoesAprendidasModal({ closeModal, onCloseModal }: any) {
  const { id } = useParams();
  const [licaoAprendida, setLicaoAprendida] = useState("");
  const [acao, setAcao] = useState("");

  async function handleSubmitLicao() {
    const payload = {
      id_projeto: Number(id),
      txt_licao_aprendida: licaoAprendida,
      txt_acao: acao,
      id_categoria: null,
      nom_usu_create: "teste",
    };
    postLicaoAprendida(payload);
    onCloseModal();
  }

  return (
    <Flex>
      <Box
        display={"flex"}
        alignItems={"center"}
        border="2px"
        padding={2}
        borderRadius={6}
        borderColor={"origem.300"}
        _hover={{
          background: "#f5f5f5",
          transition: "all 0.4s",
          color: "origem.300",
          cursor: "pointer",
          borderColor: "origem.500",
        }}
      >
        <IconButton
          aria-label="Plus sign"
          icon={<BsPlusLg />}
          background="origem.300"
          variant="secondary"
          color="white"
          mr={2}
          isRound={true}
          size="sm"
        />
        {/* <Text
          fontSize={useBreakpointValue({ base: "sm", md: "sm" })}
          fontWeight={"bold"}
          color={"origem.500"}
        >
          EDITAR FORNECEDOR
        </Text> */}
      </Box>
      <Modal isOpen={true} onClose={closeModal} size="xl">
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
            Lição Aprendida
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl marginBottom={4} padding={1}>
              <FormLabel
                htmlFor="fornecedorNome"
                color="#D6D4D4"
                fontSize="sm"
                fontWeight="500"
              >
                LIÇÃO APRENDIDA
              </FormLabel>
              <Input
                isRequired
                placeholder="Lição aprendida"
                type="text"
                id="licaoAprendida"
                name="licaoAprendida"
                width="100%"
                value={licaoAprendida}
                onChange={(event) => setLicaoAprendida(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel
                htmlFor="acao"
                color="#D6D4D4"
                fontSize="sm"
                fontWeight="500"
              >
                AÇÃO OU RECOMENDAÇÃO
              </FormLabel>
              <Textarea
                isRequired
                placeholder="Ação ou recomendação"
                id="acao"
                name="acao"
                width="100%"
                value={acao}
                onChange={(event) => setAcao(event.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Flex gap={2}>
              <Button
                variant="primary"
                color="red"
                _hover={{
                  background: "red.500",
                  transition: "all 0.4s",
                  color: "white",
                }}
                onClick={closeModal}
              >
                Cancelar
              </Button>
              <Button
                background="origem.300"
                variant="primary"
                color="white"
                _hover={{
                  background: "origem.500",
                  transition: "all 0.4s",
                }}
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
