import { useState } from "react";

import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  // ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  useBreakpointValue,
  Input,
} from "@chakra-ui/react";

import BotaoAzulPrimary from "components/BotaoAzul/BotaoAzulPrimary";
import BotaoVermelhoGhost from "components/BotaoVermelho/BotaoVermelhoGhost";
import { RequiredField } from "components/RequiredField/RequiredField";
import { TextError } from "components/TextError";

import { regexCaracteresEspeciais } from "utils/regex";

import { useCadastroSonda } from "hooks/useCadastroSonda";

function ModalCadastrarSonda() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading } = useCadastroSonda("operacao");
  const [refresh, setRefresh] = useState(false);

  return (
    <>
      <Button
        h={"46px"}
        borderRadius={"10px"}
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
        Sonda
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="md">
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
            Cadastrar SPT
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
                  <Flex
                    flexDirection={useBreakpointValue({
                      base: "column",
                      md: "row",
                    })}
                    gap={5}
                    align={"center"}
                    justify={"center"}
                  >
                    <FormControl w={"275px"}>
                      <Flex gap={1}>
                        <RequiredField />
                        <FormLabel htmlFor="nome">NOME</FormLabel>
                      </Flex>
                      <Input
                        isRequired
                        placeholder="Nome da Sonda"
                        id="nome"
                        type="text"
                        name="nome"
                        value={regexCaracteresEspeciais(
                          registerForm.values.nome
                        )}
                        onChange={registerForm.handleChange}
                        maxLength={10}
                      />
                      {registerForm.errors.nome && (
                        <TextError>{registerForm.errors.nome}</TextError>
                      )}
                    </FormControl>
                  </Flex>
                </Flex>
              </FormControl>
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Flex gap={2}>
                <BotaoVermelhoGhost
                  text={"Cancelar"}
                  formikForm={registerForm}
                  onClose={onClose}
                />
                <BotaoAzulPrimary
                  text={"Concluir Cadastro"}
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

export default ModalCadastrarSonda;
