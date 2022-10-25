import { useState } from "react";
import { BsPlus } from "react-icons/bs";

import {
  Button,
  Flex,
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
import BotaoVermelhoLargoGhost from "components/BotaoVermelhoLargo/BotaoVermelhoLargoGhost";
import DatePickerGenerico from "components/DatePickerGenerico";
import InputGenerico from "components/InputGenerico";

import { handleCancelar } from "utils/handleCadastro";

import { useLicoesAprendidas } from "hooks/useLicoesAprendidas";

interface Props {
  id: number;
}

function ModalAdicionarLicaoAprendida({ id }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading } = useLicoesAprendidas(id, "post");
  const [refresh, setRefresh] = useState<boolean>(false);

  return (
    <>
      <Button
        h={"56px"}
        borderRadius={"10px"}
        background={"origem.300"}
        variant="primary"
        color="white"
        onClick={() => onOpen()}
        _hover={{
          background: "origem.500",
          transition: "all 0.4s",
        }}
      >
        <Text fontSize="16px" fontWeight={"bold"} mx={12}>
          <Flex gap={1} align={"center"}>
            Adicionar <BsPlus size={24} />
          </Flex>
        </Text>
      </Button>

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
            Adicionar Lição Aprendida
          </ModalHeader>
          <ModalCloseButton
            color={"white"}
            onClick={() => handleCancelar(registerForm, onClose)}
          />
          <ModalBody>
            <Flex direction={"column"} gap={4} mt={4} w={"60%"}>
              <InputGenerico
                registerForm={registerForm}
                nomeInput={"LIÇÃO APRENDIDA"}
                propName={"licao_aprendida"}
                value={registerForm.values.licao_aprendida}
                required={true}
                placeholder={"Digite a lição aprendida"}
                maxLength={50}
              />
              <DatePickerGenerico
                required={true}
                nomeLabel={"DATA"}
                registerForm={registerForm}
                propName={"data"}
                data={registerForm.values.data}
                esconderHorario={true}
              />
              <InputGenerico
                registerForm={registerForm}
                nomeInput={"AÇÃO E RECOMENDAÇÃO"}
                propName={"acoes_e_recomendacoes"}
                value={registerForm.values.acoes_e_recomendacoes}
                required={true}
                placeholder={"Digite a ação e recomendação"}
                maxLength={50}
              />
            </Flex>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Flex gap={2}>
              <BotaoVermelhoLargoGhost
                text="Cancelar"
                onClose={onClose}
                formikForm={registerForm}
              />
              <BotaoAzulLargoPrimary
                text="Adicionar"
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

export default ModalAdicionarLicaoAprendida;
