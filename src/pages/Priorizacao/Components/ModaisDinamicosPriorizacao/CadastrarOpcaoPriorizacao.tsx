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
  useDisclosure,
  Input,
  Select,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

// import { TextError } from "components/TextError";

import { handleCadastrar, handleCancelar } from "utils/handleCadastro";

import { useCadastroNovaOpcaoPriorizacao } from "hooks/useCadastrarOpcaoPriorizacao";

interface TableProps {
  nomeRanking: string;
  idRanking: any;
}

function ModalCadastrarOpcaoPriorizacao(infosRankings: TableProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading } = useCadastroNovaOpcaoPriorizacao();

  // console.log("register opção", registerForm.values);

  useEffect(() => {
    registerForm.setFieldValue("id_ranking", infosRankings.idRanking);
  }, []);

  const rankingNome = infosRankings.nomeRanking;

  return (
    <>
      <Button
        onClick={onOpen}
        color={"white"}
        backgroundColor={"origem.500"}
        aria-label="Plus sign"
        variant="primary"
        _hover={{
          background: "white",
          border: "solid 1px #0047BB",
          borderRadius: "8px",
          transition: "all 0.4s",
          color: "origem.500",
        }}
        h={"56px"}
        w={"105px"}
        fontSize={"18px"}
        fontWeight={"700"}
        borderRadius={"8px"}
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
            {`Priorização ${rankingNome}`}
          </ModalHeader>
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
                      <Flex direction={"column"} gap={3}>
                        <Flex flexDirection="column">
                          <FormControl>
                            <FormLabel
                              htmlFor="nom_opcao"
                              fontSize={"12px"}
                              fontWeight={"700"}
                              color={"#949494"}
                              mb={"1px"}
                              ml={"3px"}
                            >
                              NOME
                            </FormLabel>
                            <Input
                              fontSize={"14px"}
                              fontWeight={"400"}
                              placeholder={"Nome"}
                              color={"black"}
                              _placeholder={{ color: "black" }}
                              ml={"3px"}
                              w={"328px"}
                              border={"1px solid #949494"}
                              h={"56px"}
                              id="nom_opcao"
                              name="nom_opcao"
                              value={registerForm.values.nom_opcao}
                              onChange={registerForm.handleChange}
                            />
                            {/* {registerForm.errors.rank_opcao_name && (
                              <TextError>
                                {registerForm.errors.rank_opcao_name}
                              </TextError>
                            )} */}
                          </FormControl>
                        </Flex>

                        <Flex flexDirection="row" gap={5} mt={"10px"}>
                          <FormControl>
                            <FormLabel
                              htmlFor="num_nota"
                              fontSize={"12px"}
                              fontWeight={"700"}
                              color={"#949494"}
                              mb={"1px"}
                            >
                              NOTA
                            </FormLabel>
                            <Select
                              id="num_nota"
                              name="num_nota"
                              placeholder="Selecione"
                              border={"1px solid #949494"}
                              h={"56px"}
                              w={"328px"}
                              fontSize={"14px"}
                              fontWeight={"400"}
                              color={"black"}
                              value={registerForm.values.num_nota}
                              onChange={registerForm.handleChange}
                            >
                              <option>0</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>6</option>
                            </Select>
                            {/* {registerForm.errors.rank_opcao_grade && (
                              <TextError>
                                {registerForm.errors.rank_opcao_grade}
                              </TextError>
                            )} */}
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
                  color="red"
                  onClick={() => handleCancelar(registerForm, onClose)}
                  _hover={{
                    background: "red.500",
                    transition: "all 0.4s",
                    color: "white",
                  }}
                  w={"208px"}
                  h={"56px"}
                >
                  Cancelar
                </Button>
                <Button
                  disabled={!registerForm.isValid}
                  background="origem.300"
                  variant="primary"
                  color="white"
                  onClick={() => handleCadastrar(registerForm, onClose)}
                  _hover={{
                    background: "origem.500",
                    transition: "all 0.4s",
                  }}
                  w={"208px"}
                  h={"56px"}
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

export default ModalCadastrarOpcaoPriorizacao;
