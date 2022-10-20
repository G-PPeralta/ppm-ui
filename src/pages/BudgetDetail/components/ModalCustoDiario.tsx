import { useEffect } from "react";
// import { GrAddCircle } from "react-icons/gr";

import {
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  // ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { Projeto } from "interfaces/Budgets";

// import RealInput from "components/RealInput/input";

import { handleCadastrar, handleCancelar } from "utils/handleCadastro";

import { useCadastroOrcamentoRealizado } from "hooks/useCadastroOrcamentoRealizado";

function ModalCustoDiario(props: { projeto: Projeto }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading, setAtividade } =
    useCadastroOrcamentoRealizado();
  const { id } = props.projeto;

  useEffect(() => {
    setAtividade(id);
  }, []);

  return (
    <>
      <Button
        h={"56px"}
        borderRadius={"10px"}
        background={"white"}
        border={"2px solid"}
        color={"origem.500"}
        _hover={{
          border: "2px solid",
          borderColor: "origem.500",
          background: "origem.500",
          transition: "all 0.4s",
          color: "white",
        }}
        textColor={"origem.500"}
        onClick={onOpen}
      >
        Modal Custo Diario
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
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
            Gestão de Custos
          </ModalHeader>
          {/* <ModalCloseButton color={"white"} /> */}

          <ModalBody mt={3}></ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Flex gap={2}>
              <Button
                variant="ghost"
                color="red"
                onClick={() => handleCancelar(registerForm, onClose)}
                _hover={{
                  background: "red.500",
                  transition: "all 0.4s",
                  color: "white",
                }}
              >
                Cancelar
              </Button>
              <Button
                disabled={!registerForm.isValid || !registerForm.dirty}
                background="origem.300"
                variant="primary"
                color="white"
                onClick={() => handleCadastrar(registerForm, onClose)}
                _hover={{
                  background: "origem.500",
                  transition: "all 0.4s",
                }}
              >
                {loading ? (
                  <Ring speed={2} lineWeight={5} color="white" size={24} />
                ) : (
                  <>
                    <Text>Concluir Cadastro</Text>
                  </>
                )}
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalCustoDiario;
