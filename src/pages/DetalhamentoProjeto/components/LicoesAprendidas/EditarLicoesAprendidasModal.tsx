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
  Textarea,
  // Text,
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

  const updatepayload = (campo: string) => {
    if (campo === "txt_licao_aprendida") return licaoAprendida;
    if (campo === "txt_acao") return acao;
  };

  const regex = /[^\w\s]/gi;

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
        backgroundColor={"transparent"}
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
      <Modal isOpen={true} onClose={closeModal} size={"lg"}>
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
                  width={"328px"}
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
                  maxLength={150}
                  borderRadius={"8px"}
                  border={"1px solid #A7A7A7"}
                  mt={"-9px"}
                  width={"456px"}
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
                color="red"
                _hover={{
                  background: "red.500",
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
                background="#0047BB"
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
