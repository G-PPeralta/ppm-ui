import { useEffect } from "react";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
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
import InputGenerico from "components/InputGenerico";
import InputNumericoGenerico from "components/InputNumericoGenerico";

import { handleCancelar } from "utils/handleCadastro";

import { useOcorrencias } from "hooks/useOcorrencias";

interface RefreshState {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Props {
  idOcorrencia: number;
  refreshState: RefreshState;
  linhaTabela: any;
  idAtividade: number;
}

function ModalEditarOcorrencia({
  idOcorrencia,
  refreshState,
  linhaTabela,
  idAtividade,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading } = useOcorrencias(
    idOcorrencia,
    "post",
    idAtividade
  );

  const { refresh, setRefresh } = refreshState;

  const handleFecharModal = () => {
    registerForm.setFieldValue("impacto", linhaTabela.impacto);
    registerForm.setFieldValue("ocorrencia", linhaTabela.nome_ocorrencia);
    registerForm.setFieldValue("observacoes", "");
    onClose();
  };

  useEffect(() => {
    registerForm.setFieldValue("impacto", linhaTabela.impacto);
    registerForm.setFieldValue("ocorrencia", linhaTabela.nome_ocorrencia);
  }, []);

  // console.log("registerForm", registerForm.values);
  // console.log("linhaTabela", linhaTabela);

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
            fontSize={"1em"}
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
                <InputGenerico
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
                <Button
                  h={"56px"}
                  borderRadius={"10px"}
                  background={"white"}
                  color={"origem.500"}
                  _hover={{
                    background: "origem.500",
                    transition: "all 0.4s",
                    color: "white",
                  }}
                  colorScheme="blue"
                  variant="ghost"
                  rightIcon={<BsFillCloudArrowUpFill size={24} />}
                >
                  Anexar
                </Button>
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Flex gap={2}>
              <Button
                h={"56px"}
                borderRadius={"10px"}
                variant="ghost"
                color="red"
                onClick={() => handleFecharModal()}
                _hover={{
                  background: "red.500",
                  transition: "all 0.4s",
                  color: "white",
                }}
              >
                <Text fontSize="16px" fontWeight={"bold"} mx={12}>
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
