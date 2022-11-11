// import { FaTrash } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";

import {
  Button,
  Flex,
  FormControl,
  // FormLabel,
  Modal,
  ModalBody,
  // ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  IconButton,
  ModalCloseButton,
  ModalHeader,
} from "@chakra-ui/react";

// import { TextError } from "components/TextError";

import BotaoAzulLargoPrimary from "components/BotaoAzulLargo/BotaoAzulLargoPrimary";

import { handleCancelar } from "utils/handleCadastro";

// import { useAuth } from "hooks/useAuth";
import { useDeletarCentroDeCusto } from "hooks/useDeletarCentroDeCusto";

interface RefreshState {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

type PropsType = {
  refreshState: RefreshState;
  idCusto: number;
};

function ModalDeletarCentroDeCusto({ idCusto, refreshState }: PropsType) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading } = useDeletarCentroDeCusto(idCusto);
  const { refresh, setRefresh } = refreshState;
  registerForm.dirty = true;

  return (
    <>
      <IconButton
        onClick={onOpen}
        color={"#F40606"}
        backgroundColor={"transparent"}
        aria-label="Plus sign"
        _hover={{
          backgroundColor: "#F94144",
          color: "white",
        }}
        // w={"14px"}
        // h={"18px"}
      >
        <FiTrash />
      </IconButton>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton color={"white"} />
          <ModalHeader
            backgroundColor={"#2E69FD"}
            display={"flex"}
            justifyContent={"center"}
            color={"white"}
            fontSize={"14px"}
            fontWeight={"700"}
          >
            Excluir
          </ModalHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              registerForm.handleSubmit(e);
            }}
          >
            <ModalBody mt={3}>
              <FormControl>
                <Flex direction={"column"} gap={4}>
                  <Stack gap={2}>
                    <Flex>
                      <Text
                        textAlign={"center"}
                        fontSize={"20px"}
                        mb={"1px"}
                        color={"#010101"}
                        fontWeight={"400"}
                      >
                        Tem certeza que deseja mover este Centro de Custo para a
                        Lixeira?
                      </Text>
                    </Flex>
                  </Stack>
                </Flex>
              </FormControl>
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Flex gap={2}>
                <Button
                  variant="ghost"
                  color="red.500"
                  onClick={() => handleCancelar(registerForm, onClose)}
                  _hover={{
                    background: "red.600",
                    transition: "all 0.4s",
                    color: "white",
                  }}
                  height={"56px"}
                  width={"206px"}
                  fontSize={"18px"}
                  fontWeight={"700"}
                >
                  Cancelar
                </Button>
                {/* <Button
                  background="origem.500"
                  variant="primary"
                  color="white"
                  onClick={() => handleCadastrar(registerForm, onClose)}
                  _hover={{
                    background: "origem.600",
                    transition: "all 0.4s",
                  }}
                  height={"56px"}
                  width={"206px"}
                  fontSize={"18px"}
                  fontWeight={"700"}
                >
                  {loading ? (
                    <Ring speed={2} lineWeight={5} color="white" size={24} />
                  ) : (
                    <>
                      <Text>Confirmar</Text>
                    </>
                  )}
                </Button> */}
                <BotaoAzulLargoPrimary
                  text={"Confirmar"}
                  formikForm={registerForm}
                  onClose={onClose}
                  setRefresh={setRefresh}
                  refresh={refresh}
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

export default ModalDeletarCentroDeCusto;
