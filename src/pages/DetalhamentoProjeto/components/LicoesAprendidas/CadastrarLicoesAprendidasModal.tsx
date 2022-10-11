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

function CadastrarLicoesAprendidasModal({
  closeModal,
  onCloseModal,
  callBack,
}: any) {
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
    await postLicaoAprendida(payload);
    callBack();
    onCloseModal();
  }

  const regex = /[^a-z ]/gi;

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
      <Modal isOpen={true} onClose={closeModal} size="lg">
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
            Adicionar lições aprendidas
          </ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody>
            <FormControl marginBottom={4}>
              <FormLabel
                htmlFor="fornecedorNome"
                color="#949494"
                fontSize="12px"
                fontWeight="700"
                mt={"6px"}
              >
                LIÇÃO APRENDIDA
              </FormLabel>
              <Input
                maxLength={50}
                borderRadius={"8px"}
                border={"1px solid #A7A7A7"}
                mt={"-9px"}
                width={"328px"}
                height={"56px"}
                _placeholder={{ color: "black" }}
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
                AÇÃO OU RECOMENDAÇÃO
              </FormLabel>
              <Textarea
                borderRadius={"8px"}
                border={"1px solid #A7A7A7"}
                mt={"-9px"}
                width={"456px"}
                height={"56px"}
                _placeholder={{ color: "black" }}
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
                  background: "red.500",
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
                background="#0047BB"
                variant="primary"
                color="white"
                _hover={{
                  background: "origem.500",
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
