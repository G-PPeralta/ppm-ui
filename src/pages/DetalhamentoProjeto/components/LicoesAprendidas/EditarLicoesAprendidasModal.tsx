import { useEffect, useState } from "react";
// import { BsPlusLg } from "react-icons/bs";

import {
  Flex,
  Box,
  // IconButton,
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
  Textarea,
  // Text,
} from "@chakra-ui/react";
import { LicoesAprendidasNew } from "interfaces/Services";

import { useAuth } from "hooks/useAuth";

import { patchLicaoAprendida } from "services/update/LicoesAprendidas";

interface EditModalProps {
  closeModal: any;
  licao: LicoesAprendidasNew;
  handleUpdateLicoes: any;
}

function EditarLicoesAprendidasModal({
  closeModal,
  licao,
  handleUpdateLicoes,
}: EditModalProps) {
  const { user } = useAuth();
  const [idLicao, setIdLicao] = useState(licao?.id);
  const [licaoAprendida, setLicaoAprendida] = useState(licao?.licao_aprendida);
  const [acao, setAcao] = useState(licao?.acao_e_recomendacao);

  useEffect(() => {
    setLicaoAprendida(licao.licao_aprendida);
    setAcao(licao.acao_e_recomendacao);
    setIdLicao(licao.id);
  }, [licao.licao_aprendida, licao.data, licao.acao_e_recomendacao, licao.id]);

  const camposParaEditar = ["txt_licao_aprendida", "txt_acao"];

  const updatepayload = (campo: string) => {
    if (campo === "txt_licao_aprendida") return licaoAprendida;
    if (campo === "txt_acao") return acao;
    return "";
  };

  const handlePatchLicaoAprendida = async () => {
    const promises = camposParaEditar.map(
      async (lic) =>
        await patchLicaoAprendida(idLicao, lic, updatepayload(lic), user?.nome)
    );
    await Promise.all(promises);
    handleUpdateLicoes();
  };

  const regex = /[^\w\s]/gi;

  return (
    <Flex>
      <Box
      // display={"flex"}
      // alignItems={"center"}
      // border="2px"
      // padding={2}
      // borderRadius={6}
      // borderColor={"origem.300"}
      // _hover={{
      //   background: "#f5f5f5",
      //   transition: "all 0.4s",
      //   color: "origem.300",
      //   cursor: "pointer",
      //   borderColor: "origem.500",
      // }}
      // backgroundColor={"transparent"}
      >
        {/* <IconButton
          aria-label="Plus sign"
          icon={<BsPlusLg />}
          background="origem.300"
          variant="secondary"
          color="white"
          mr={2}
          isRound={true}
          size="sm"
        /> */}
        {/* <Text
          fontSize={useBreakpointValue({ base: "sm", md: "sm" })}
          fontWeight={"bold"}
          color={"origem.500"}
        >
          EDITAR FORNECEDOR
        </Text> */}
      </Box>
      <Modal isOpen={true} onClose={closeModal} size={"lg"}>
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
            Editar Lições Aprendidas
          </ModalHeader>

          <ModalCloseButton color={"white"} />

          <ModalBody>
            <FormControl marginBottom={1} padding={1}>
              <Flex direction={"column"}>
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
                  width={"100%"}
                  height={"56px"}
                  color="black"
                  fontSize={"14px"}
                  fontWeight={"400"}
                  isRequired
                  placeholder="Lição aprendida"
                  type="text"
                  id="licaoAprendida"
                  name="licaoAprendida"
                  value={licaoAprendida.replace(regex, "")}
                  onChange={(event) => setLicaoAprendida(event.target.value)}
                />
              </Flex>
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
            <FormControl padding={1}>
              <Flex direction={"column"}>
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
                  // maxLength={150}
                  borderRadius={"8px"}
                  border={"1px solid #A7A7A7"}
                  mt={"-9px"}
                  width={"100%"}
                  height={"121px"}
                  color="black"
                  fontSize={"14px"}
                  fontWeight={"400"}
                  isRequired
                  placeholder="Ação ou recomendação"
                  // type="text"
                  id="acao"
                  name="acao"
                  value={acao.replace(regex, "")}
                  onChange={(event) => setAcao(event.target.value)}
                />
              </Flex>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Flex gap={2}>
              <Button
                // background="origem.300"
                variant="primary"
                color="#F40606"
                _hover={{
                  background: "red.600",
                  transition: "all 0.4s",
                  color: "white",
                }}
                onClick={closeModal}
                width={"208px"}
                height={"56px"}
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
                _hover={{
                  background: "origem.600",
                  transition: "all 0.4s",
                }}
                onClick={() => handlePatchLicaoAprendida()}
                width={"208px"}
                height={"56px"}
                fontSize={"18px"}
                fontWeight={"700"}
                fontFamily={"Mulish"}
              >
                Salvar{" "}
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default EditarLicoesAprendidasModal;
