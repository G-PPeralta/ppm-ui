import {
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Stack,
  useBreakpointValue,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import { RequiredField } from "components/RequiredField/RequiredField";
import { TextError } from "components/TextError";

import { handleCadastrar, handleCancelar } from "utils/handleCadastro";

import { useCadastroProjetoTipo } from "hooks/useCadastroProjetoTipo";

import ListaPrecedentes from "./ListaPrecedentes";

// import ListaPrecedentes from "./ListaPrecedentes";

function ModalCadastroProjetoTipo() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading, listaAtividadesPrecedentes } =
    useCadastroProjetoTipo();

  // const [atividadesList, setAtividadesList] = useState([]);

  // const handleParent = (newList: any) => {
  //   setAtividadesList(newList);
  // };

  // const handleSubmit = () => {
  //   const payload = atividadesList;

  //   const payloadFiltrado: any[] = [];
  //   let ordem = 0;

  //   payload.forEach((pay: any) => {
  //     ordem += 1;
  //     const precedentesArray: any[] = [];
  //     for (let i = 0; i < pay.precedentes.length; i += 1) {
  //       if (pay.precedentes[i].checked) {
  //         precedentesArray.push(pay.precedentes[i].id);
  //       }
  //     }
  //     const newPay = pay;
  //     newPay.precedentes = precedentesArray;
  //     newPay.ordem = ordem;

  //     payloadFiltrado.push(newPay);
  //   });
  //   registerForm.setFieldValue("atividades", payloadFiltrado);

  //   registerForm.handleSubmit();
  //   onClose();
  // };

  return (
    <>
      <Button
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
        Projeto
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
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
            Cadastrar Projeto Tipo
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
                          <FormLabel htmlFor="nom_projeto_tipo">NOME</FormLabel>
                        </Flex>

                        <Input
                          isRequired
                          placeholder="Nome do Tipo de Projeto"
                          id="nom_projeto_tipo"
                          type="text"
                          name="nom_projeto_tipo"
                          value={registerForm.values.nom_projeto_tipo}
                          onChange={registerForm.handleChange}
                        />
                        {registerForm.errors.nom_projeto_tipo && (
                          <TextError>
                            {registerForm.errors.nom_projeto_tipo}
                          </TextError>
                        )}
                      </FormControl>
                    </Flex>
                  </Stack>

                  <ListaPrecedentes
                    registerForm={registerForm}
                    listaAtividadesPrecedentes={listaAtividadesPrecedentes}
                  />

                  <Stack>
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={5}
                    >
                      <FormControl>
                        <FormLabel htmlFor="comentarios">COMENTÁRIOS</FormLabel>
                        <Textarea
                          isRequired
                          placeholder="Adicione comentários sobre o projeto"
                          id="comentarios"
                          name="comentarios"
                          value={registerForm.values.comentarios}
                          onChange={registerForm.handleChange}
                        />
                        {registerForm.errors.comentarios && (
                          <TextError>
                            {registerForm.errors.comentarios}
                          </TextError>
                        )}
                      </FormControl>
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
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalCadastroProjetoTipo;
