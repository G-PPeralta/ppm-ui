//  CRIADO EM: 9/2022
//  AUTOR: Bruno Fracaro, Eduardo Muchak.
//  DESCRIÇÃO DO ARQUIVO: Botão e Modal para cadastrar novo poco

import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  FormControl,
  Stack,
  useBreakpointValue,
  Input,
  Text,
  ModalCloseButton,
} from "@chakra-ui/react";

import BotaoAzulLargoPrimary from "components/BotaoAzulLargo/BotaoAzulLargoPrimary";
import BotaoVermelhoLargoGhost from "components/BotaoVermelhoLargo/BotaoVermelhoLargoGhost";
import { RequiredField } from "components/RequiredField/RequiredField";

import { handleCancelar } from "utils/handleCadastro";
import { regexCaracteresEspeciais } from "utils/regex";

import { useCadastroPoco } from "hooks/useCadastroPoco";

interface Props {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalCadastroPoco({ refresh, setRefresh }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading } = useCadastroPoco();

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
        Poço
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
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
            Cadastrar Poço
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
              <FormControl>
                <Flex direction={"column"} gap={4}>
                  <Stack>
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={5}
                    >
                      <FormControl>
                        <Flex gap={1}>
                          <RequiredField />
                          <Text
                            fontWeight={"700"}
                            fontSize={"12px"}
                            color={"#949494"}
                          >
                            POÇO
                          </Text>
                        </Flex>
                        <Input
                          w={"100%"}
                          h={"56px"}
                          borderRadius={"8px"}
                          fontSize={"14px"}
                          fontWeight={"400"}
                          fontFamily={"Mulish"}
                          border={"1px solid #949494"}
                          _placeholder={{ color: "#949494" }}
                          isRequired
                          placeholder="Nome do Poço"
                          id="poco"
                          type="text"
                          name="poco"
                          value={regexCaracteresEspeciais(
                            registerForm.values.poco
                          )}
                          onChange={registerForm.handleChange}
                          maxLength={10}
                        />
                      </FormControl>
                    </Flex>
                  </Stack>
                </Flex>
              </FormControl>
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Flex gap={2}>
                <BotaoVermelhoLargoGhost
                  text={"Cancelar"}
                  formikForm={registerForm}
                  onClose={onClose}
                />
                <BotaoAzulLargoPrimary
                  text={"Cadastrar"}
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

export default ModalCadastroPoco;
