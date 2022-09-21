import { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";

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
import { LicoesAprendidas } from "interfaces/Services";

import { useAuth } from "hooks/useAuth";

interface EditModalProps {
  closeModal: any;
  licao: LicoesAprendidas;
  handleUpdateLicoes: any;
}

function EditarLicoesAprendidasModal({
  closeModal,
  licao,
  handleUpdateLicoes,
}: EditModalProps) {
  const { user } = useAuth();
  const [idLicao, setIdLicao] = useState(licao?.id);
  const [licaoAprendida, setLicaoAprendida] = useState(
    licao?.txt_licao_aprendida
  );
  const [acao, setAcao] = useState(licao?.txt_acao);

  useEffect(() => {
    setLicaoAprendida(licao.txt_licao_aprendida);
    setAcao(licao.txt_acao);
    setIdLicao(licao.id);
  }, [
    licao.txt_licao_aprendida,
    licao.dat_usu_create,
    licao.txt_acao,
    licao.id,
  ]);

  const camposParaEditar = ["txt_licao_aprendida", "txt_acao"];

  console.log(idLicao);

  const updatepayload = (campo: string) => {
    if (campo === "txt_licao_aprendida") return licaoAprendida;
    if (campo === "txt_acao") return acao;
  };

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
              <FormLabel htmlFor="fornecedorNome">Lição Aprendida</FormLabel>
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
            {/* <FormControl>
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
            </FormControl> */}
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
              onClick={() => {
                camposParaEditar.forEach((lic) =>
                  handleUpdateLicoes(
                    idLicao,
                    lic,
                    updatepayload(lic),
                    user?.nome
                  )
                );
              }}
            >
              CONFIRMADO
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default EditarLicoesAprendidasModal;
