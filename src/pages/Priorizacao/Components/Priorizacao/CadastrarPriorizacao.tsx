//  CRIADO EM: 10/2022
//  AUTOR: Geovana Augusta.
//  DESCRIÇÃO DO ARQUIVO: Cadastrar nova priorização

import { useEffect } from "react";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
  Input,
  Select,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import { handleCadastrar, handleCancelar } from "utils/handleCadastro";

import { useCadastroNovaPriorizacao } from "hooks/useCadastrarNovaPriorizacao";

type props = {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

function ModalCadastrarPriorizacao({ refresh, setRefresh }: props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading } = useCadastroNovaPriorizacao();

  const perfis = ["Administrador", "Operador"];

  useEffect(() => {
    registerForm.setFieldValue("id_area_responsavel", 1);
    registerForm.setFieldValue("num_peso", 1);
  }, []);

  return (
    <>
      <Button
        onClick={onOpen}
        color={"white"}
        background={"origem.500"}
        aria-label="Plus sign"
        variant="primary"
        _hover={{
          background: "origem.600",
          transition: "all 0.4s",
        }}
        h={"56px"}
        w={"121px"}
        fontSize={"18px"}
        fontWeight={"700"}
        borderRadius={"8px"}
        fontFamily={"Mulish"}
      >
        Cadastrar
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            backgroundColor={"#2E69FD"}
            display={"flex"}
            justifyContent={"center"}
            color={"white"}
            fontSize={"14px"}
            fontWeight={"700"}
          >
            Cadastrar Priorização
          </ModalHeader>
          <ModalCloseButton color={"white"} />
          <form
            onSubmit={(e) => {
              registerForm.handleSubmit(e);
            }}
          >
            <ModalBody mt={3}>
              <FormControl>
                <Flex gap={4}>
                  <Stack gap={2}>
                    <Flex direction={"column"}>
                      <Flex direction={"column"}>
                        <Flex
                          flexDirection={useBreakpointValue({
                            base: "column",
                            md: "row",
                          })}
                          gap={5}
                          mt={"10px"}
                        >
                          <FormControl>
                            <FormLabel
                              htmlFor="nom_ranking"
                              mb={"1px"}
                              ml={"2px"}
                              color={"#949494"}
                              fontWeight={"700"}
                              fontSize={"12px"}
                            >
                              NOME DA PRIORIZAÇÃO
                            </FormLabel>
                            <Input
                              maxLength={30}
                              ml={"2px"}
                              w={"93%"}
                              h={"56px"}
                              fontSize={"14px"}
                              color={"black"}
                              _placeholder={{ color: "#949494" }}
                              fontWeight={"400"}
                              border={"solid 1px #949494"}
                              isRequired
                              placeholder="Nome"
                              id="nom_ranking"
                              name="nom_ranking"
                              value={registerForm.values.nom_ranking}
                              onChange={registerForm.handleChange}
                            />
                          </FormControl>
                        </Flex>

                        <Flex
                          flexDirection={useBreakpointValue({
                            base: "column",
                            md: "row",
                          })}
                          gap={5}
                          mt={"10px"}
                        >
                          <FormControl>
                            <FormLabel
                              htmlFor="regulatorio.opcao_id"
                              fontSize={"12px"}
                              color={"#949494"}
                              fontWeight={"700"}
                              mb={"1px"}
                              w={"550px"}
                              mt={"5px"}
                              ml={"2px"}
                            >
                              PERFIS COM ACESSO
                            </FormLabel>
                            <Select
                              ml={"2px"}
                              id="pit"
                              name="pit"
                              placeholder="Selecione"
                              w={"93%"}
                              h={"56px"}
                              fontSize={"14px"}
                              color={"black"}
                              fontWeight={"400"}
                              border={"solid 1px #949494"}
                            >
                              {perfis.map((perfil: any, index: any) => (
                                <option key={index}>{perfil}</option>
                              ))}
                            </Select>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Stack>
                </Flex>
              </FormControl>
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Flex gap={2} ml={9}>
                <Button
                  variant="ghost"
                  color="red.500"
                  onClick={() => handleCancelar(registerForm, onClose)}
                  _hover={{
                    background: "red.600",
                    transition: "all 0.4s",
                    color: "white",
                  }}
                  w={"208px"}
                  h={"56px"}
                  fontSize={"18px"}
                  fontWeight={"700"}
                  fontFamily={"Mulish"}
                >
                  Cancelar
                </Button>
                <Button
                  disabled={!registerForm.isValid}
                  w={"208px"}
                  h={"56px"}
                  background="origem.500"
                  variant="primary"
                  color="white"
                  onClick={() => {
                    handleCadastrar(registerForm, onClose);
                    setRefresh(!refresh);
                  }}
                  _hover={{
                    background: "origem.600",
                    transition: "all 0.4s",
                  }}
                  fontSize={"18px"}
                  fontWeight={"700"}
                  fontFamily={"Mulish"}
                >
                  {loading ? (
                    <Ring speed={2} lineWeight={5} color="white" size={24} />
                  ) : (
                    <>
                      <Text>Cadastrar</Text>
                    </>
                  )}
                </Button>
              </Flex>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalCadastrarPriorizacao;
