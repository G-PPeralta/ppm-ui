//  CRIADO EM: 8/2022
//  AUTOR: Eduardo Muchak.
//  DESCRIÇÃO DO ARQUIVO: Modal editar ocorrencia

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
import InputGenericoDesabilitado from "components/InputGenericoDesabilitado";
import InputNumericoGenerico from "components/InputNumericoGenerico";

import { formatMinutesToHours } from "utils/formatDate";
import { handleCancelar } from "utils/handleCadastro";

import { useOcorrencias } from "hooks/useOcorrencias";

import BotaoUploadArquivo from "./BotaoUpload2";

interface RefreshState {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Props {
  refreshState: RefreshState;
  linhaTabela: any;
  idAtividade: number;
  index: number;
}

function ModalEditarOcorrencia({
  refreshState,
  linhaTabela,
  idAtividade,
  index,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading } = useOcorrencias(idAtividade, "patch");

  const { refresh, setRefresh } = refreshState;

  const handleFecharModal = () => {
    registerForm.setFieldValue(
      "impacto",
      formatMinutesToHours(linhaTabela.impacto)
    );
    registerForm.setFieldValue("ocorrencia", linhaTabela.dsc_ocorrencia);
    registerForm.setFieldValue("observacoes", "");
    onClose();
  };

  useEffect(() => {
    registerForm.setFieldValue(
      "impacto",
      formatMinutesToHours(linhaTabela.impacto)
    );
    registerForm.setFieldValue("ocorrencia", linhaTabela.dsc_ocorrencia);
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

      <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
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
            Editar Ocorrência
          </ModalHeader>
          <ModalCloseButton
            color={"white"}
            onClick={() => handleCancelar(registerForm, onClose)}
          />
          <ModalBody>
            <Flex gap={4} direction={"column"} mt={4}>
              <Flex direction={"column"} gap={4} w={"70%"}>
                <InputGenericoDesabilitado
                  registerForm={registerForm}
                  nomeInput={"OCORRÊNCIA"}
                  propName={"ocorrencia"}
                  value={registerForm.values.ocorrencia}
                  placeholder={"Digite a ocorrência"}
                  maxLength={50}
                  isDisabled={true}
                />
              </Flex>
              <Flex justify={"space-between"} align={"end"} flex={1} gap={4}>
                <Flex w={"40%"}>
                  <InputNumericoGenerico
                    registerForm={registerForm}
                    propName={"impacto"}
                    nomeInput={"DURAÇÃO"}
                    tipo={"hora"}
                    stepper={true}
                    limite={999}
                    step={0.5}
                  />
                </Flex>
                <BotaoUploadArquivo
                  registerForm={registerForm}
                  index={index}
                  nomeArquivo={linhaTabela.anexo}
                  propName={"anexo"}
                />
              </Flex>
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

export default ModalEditarOcorrencia;
