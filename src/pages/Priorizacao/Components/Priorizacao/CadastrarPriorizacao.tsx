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

// import { TextError } from "components/TextError";

import { handleCadastrar, handleCancelar } from "utils/handleCadastro";

import { useCadastroNovaPriorizacao } from "hooks/useCadastrarNovaPriorizacao";

function ModalCadastrarPriorizacao() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading } = useCadastroNovaPriorizacao();

  // console.log(registerForm.values);
  const perfis = ["Nível 0", "Nível 1", "Nível 2"];

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
              // e.preventDefault();
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
                              ml={"3px"}
                              color={"#949494"}
                              fontWeight={"700"}
                              fontSize={"12px"}
                            >
                              NOME DA PRIORIZAÇÃO
                            </FormLabel>
                            <Input
                              maxLength={30}
                              ml={"3px"}
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
                            {/* {registerForm.errors.nom_ranking && (
                              <TextError>
                                {registerForm.errors.nom_ranking}
                              </TextError> */}
                            {/* )} */}
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
                            >
                              PERFIS COM ACESSO
                            </FormLabel>
                            <Select
                              id="pit"
                              name="pit"
                              placeholder="Selecione"
                              w={"93%"}
                              h={"56px"}
                              fontSize={"14px"}
                              color={"black"}
                              fontWeight={"400"}
                              border={"solid 1px #949494"}
                              // value={activitiesForm.values.acesso}
                              // onChange={activitiesForm.handleChange}
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
                  onClick={() => handleCadastrar(registerForm, onClose)}
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
