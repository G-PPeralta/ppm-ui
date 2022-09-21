import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { useParams } from "react-router-dom";

import {
  Flex,
  Box,
  IconButton,
  // useBreakpointValue,
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
  const [data, setData] = useState("");
  const [acao, setAcao] = useState("");

  async function handleSubmitLicao() {
    const payload = {
      id_projeto: Number(id),
      // dat_usu_create: data,
      txt_licao_aprendida: licaoAprendida,
      txt_acao: acao,
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
      <Modal isOpen={true} onClose={closeModal} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>LIÇÃO APRENDIDA</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="fornecedorNome">LIÇÃO APRENDIDA</FormLabel>
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
              <FormLabel htmlFor="data">DATA</FormLabel>
              <Input
                isRequired
                placeholder="dd/mm/aaaa"
                type="text"
                id="data"
                name="data"
                width="100%"
                value={data}
                onChange={(event) => setData(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="acao">AÇÃO OU RECOMENDAÇÃO</FormLabel>
              <Input
                isRequired
                placeholder="Ação ou recomendação"
                type="text"
                id="acao"
                name="acao"
                width="100%"
                value={acao}
                onChange={(event) => setAcao(event.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              background="origem.300"
              variant="primary"
              color="white"
              _hover={{
                background: "origem.500",
                transition: "all 0.4s",
              }}
            >
              CANCELAR
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
              CONFIRMAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default CadastrarLicoesAprendidasModal;
