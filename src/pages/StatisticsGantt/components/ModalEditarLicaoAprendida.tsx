//  CRIADO EM: 8/2022
//  AUTOR: Eduardo Muchak.
//  DESCRIÇÃO DO ARQUIVO: Modar lição aprendida

import { useEffect } from "react";
import { MdModeEdit } from "react-icons/md";

import {
  Button,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import BotaoAzulLargoPrimary from "components/BotaoAzulLargo/BotaoAzulLargoPrimary";
import DatePickerGenerico from "components/DatePickerGenerico";
import InputGenerico from "components/InputGenerico";

import { handleCancelar } from "utils/handleCadastro";

import { useLicoesAprendidas } from "hooks/useLicoesAprendidas";

interface RefreshState {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Props {
  idLicao: number;
  refreshState: RefreshState;
  linhaTabela: any;
  idAtividade: number;
}

function ModalEditarLicaoAprendida({
  idLicao,
  refreshState,
  linhaTabela,
  idAtividade,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading } = useLicoesAprendidas(
    idLicao,
    "patch",
    idAtividade
  );

  const { refresh, setRefresh } = refreshState;

  const handleFecharModal = () => {
    registerForm.setFieldValue("data", new Date(linhaTabela.data));
    registerForm.setFieldValue(
      "acao_e_recomendacao",
      linhaTabela.acao_e_recomendacao
    );
    registerForm.setFieldValue("licao_aprendida", linhaTabela.licao_aprendida);
    onClose();
  };

  useEffect(() => {
    registerForm.setFieldValue("data", new Date(linhaTabela.data));
    registerForm.setFieldValue(
      "acoes_e_recomendacoes",
      linhaTabela.acao_e_recomendacao
    );
    registerForm.setFieldValue("licao_aprendida", linhaTabela.licao_aprendida);
  }, []);

  return (
    <>
      <IconButton
        aria-label="Botão de Editar"
        icon={<MdModeEdit />}
        borderRadius={"10px"}
        background={"transparent"}
        color={"origem.500"}
        _hover={{
          background: "origem.500",
          transition: "all 0.4s",
          color: "white",
        }}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
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
            Editar Lição Aprendida
          </ModalHeader>
          <ModalCloseButton
            color={"white"}
            onClick={() => handleCancelar(registerForm, onClose)}
          />
          <ModalBody>
            <Flex direction={"column"} gap={4} mt={4} w={"100%"}>
              <InputGenerico
                registerForm={registerForm}
                nomeInput={"LIÇÃO APRENDIDA"}
                propName={"licao_aprendida"}
                value={registerForm.values.licao_aprendida}
                placeholder={"Digite a lição aprendida"}
                maxLength={50}
              />
              <Flex w={"63%"}>
                <DatePickerGenerico
                  nomeLabel={"DATA"}
                  registerForm={registerForm}
                  propName={"data"}
                  data={registerForm.values.data}
                  esconderHorario={true}
                />
              </Flex>

              <InputGenerico
                registerForm={registerForm}
                nomeInput={"AÇÃO E RECOMENDAÇÃO"}
                propName={"acoes_e_recomendacoes"}
                value={registerForm.values.acoes_e_recomendacoes}
                placeholder={"Digite a ação e recomendação"}
                maxLength={50}
              />
            </Flex>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Flex gap={2}>
              <Button
                h={"56px"}
                borderRadius={"10px"}
                variant="ghost"
                color="red.500"
                onClick={() => handleFecharModal()}
                _hover={{
                  background: "red.600",
                  transition: "all 0.4s",
                  color: "white",
                }}
                w={"208px"}
              >
                <Text fontSize="18px" fontWeight={"700"} mx={12}>
                  Cancelar
                </Text>
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
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalEditarLicaoAprendida;
