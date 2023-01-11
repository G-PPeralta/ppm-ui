import { useEffect } from "react";

import {
  useDisclosure,
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  Flex,
  ModalFooter,
  Text,
  Input,
} from "@chakra-ui/react";

import BotaoAzulLargoPrimary from "components/BotaoAzulLargo/BotaoAzulLargoPrimary";
import { RequiredField } from "components/RequiredField/RequiredField";

import { handleCancelar } from "utils/handleCadastro";
import { regexNumerosEPonto } from "utils/regexNumerosEPonto";

import { useDefinirPrioridade } from "hooks/useDefinirProfundidade";

import { getProfundidadeProjeto } from "services/get/Estatisticas";

interface Props {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
  projeto: any;
}

function ModalDefinirProfundidade({ setRefresh, refresh, projeto }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading } = useDefinirPrioridade(projeto);

  const getProfundidade = async () => {
    const { data } = await getProfundidadeProjeto(projeto.id_poco);
    if (data.length === 0) return;
    // PEGAR A MAIOR PROFUNDIDADE RECEBIDA
    const maiorProfundidade = data.reduce((acc: any, curr: any) =>
      Number(acc.profundidade) > Number(curr.profundidade) ? acc : curr
    );
    registerForm.setFieldValue("profundidade", maiorProfundidade.profundidade);
  };

  const handleCancelarModal = () => {
    registerForm.resetForm();
    onClose();
  };

  useEffect(() => {
    getProfundidade();
  }, [isOpen]);

  return (
    <>
      <Button
        h={"46px"}
        borderRadius={"8px"}
        fontSize={"14px"}
        fontWeight={"700"}
        variant="outline"
        border={"2px solid"}
        borderColor={"origem.500"}
        textColor={"origem.500"}
        _hover={{
          borderColor: "origem.600",
          backgroundColor: "origem.500",
          textColor: "white",
          transition: "all 0.4s",
        }}
        onClick={onOpen}
      >
        Definir Profundidade
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
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
            Definir Profundidade
          </ModalHeader>
          <ModalCloseButton
            color={"white"}
            onClick={() => handleCancelar(registerForm, onClose)}
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              registerForm.handleSubmit(e);
            }}
          >
            <ModalBody mt={3}>
              <Flex direction={"column"} w={"100%"}>
                <Flex gap={1}>
                  <RequiredField />
                  <Text fontWeight={"700"} fontSize={"12px"} color={"#949494"}>
                    PROFUNDIDADE
                  </Text>
                </Flex>
                <Input
                  variant={"origem"}
                  placeholder="Defina a profundidade"
                  id="profundidade"
                  type="profundidade"
                  name="profundidade"
                  value={regexNumerosEPonto(registerForm.values.profundidade)}
                  onChange={(event) => {
                    registerForm.setFieldValue(
                      "profundidade",
                      regexNumerosEPonto(event.target.value)
                    );
                  }}
                  maxLength={20}
                />
              </Flex>
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Flex gap={2}>
                <Button
                  h={"56px"}
                  variant="ghost"
                  color="red.500"
                  w={"208px"}
                  _hover={{
                    background: "red.600",
                    transition: "all 0.4s",
                    color: "white",
                  }}
                  fontSize={"18px"}
                  fontWeight={"700"}
                  borderRadius={"8px"}
                  fontFamily={"Mulish"}
                  onClick={() => handleCancelarModal()}
                >
                  Cancelar
                </Button>
                <BotaoAzulLargoPrimary
                  text="Concluir"
                  onClose={onClose}
                  formikForm={registerForm}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  loading={loading}
                />
              </Flex>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalDefinirProfundidade;
