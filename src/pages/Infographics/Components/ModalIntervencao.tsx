import { BsPlusLg } from "react-icons/bs";

import {
  Flex,
  Text,
  IconButton,
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
  Textarea,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import { TextError } from "components/TextError";

import { handleCadastrar, handleCancelar } from "utils/handleCadastro";

import { useCadastroIntervencao } from "hooks/useCadastroIntervencao";

import SelectFiltragemPocos from "./SelectFiltragemPocos";
import SelectFiltragemSondas from "./SelectFiltragemSonda";

function ModalIntervencao() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { intervencaoForm, loading } = useCadastroIntervencao();

  return (
    <>
      <Flex
        mt={2}
        py={3}
        w="70%"
        border={"2px"}
        borderStyle={"dashed"}
        borderColor={"origem.500"}
        borderRadius={"3xl"}
        direction={"column"}
        gap={4}
        align={"center"}
        justify={"center"}
        _hover={{
          cursor: "pointer",
          backgroundColor: "grey.100",
          transition: "all 0.4s",
        }}
        onClick={onOpen}
      >
        <IconButton
          aria-label="Plus sign"
          icon={<BsPlusLg />}
          background="origem.300"
          variant="secondary"
          color="white"
          isRound={true}
          size="md"
        />

        <Text color={"origem.500"} fontWeight={600}>
          Cadastrar
        </Text>
      </Flex>
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
            Cadastrar Nova Intervenção/Perfuração
          </ModalHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              intervencaoForm.handleSubmit(e);
            }}
          >
            <ModalBody mt={3}>
              {!loading ? (
                <FormControl>
                  <Flex direction={"column"} gap={4}>
                    <Stack>
                      <Flex flexDirection={"row"} gap={5}>
                        <SelectFiltragemPocos
                          intervencaoForm={intervencaoForm}
                        />
                        <SelectFiltragemSondas
                          intervencaoForm={intervencaoForm}
                        />
                      </Flex>
                    </Stack>

                    <Stack>
                      <FormControl>
                        <FormLabel htmlFor="dsc_comentario">
                          COMENTÁRIOS
                        </FormLabel>
                        <Textarea
                          isRequired
                          placeholder="Adicione comentários sobre a intervenção"
                          id="dsc_comentario"
                          name="dsc_comentario"
                          value={intervencaoForm.values.dsc_comentario}
                          onChange={intervencaoForm.handleChange}
                          w={"100%"}
                        />
                        {intervencaoForm.errors.dsc_comentario &&
                          intervencaoForm.touched.dsc_comentario && (
                            <TextError>
                              {intervencaoForm.errors.dsc_comentario}
                            </TextError>
                          )}
                      </FormControl>
                    </Stack>
                  </Flex>
                </FormControl>
              ) : (
                <Ring speed={2} lineWeight={5} color="white" size={72} />
              )}
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Flex gap={2}>
                <Button
                  variant="ghost"
                  color="red"
                  onClick={() => handleCancelar(intervencaoForm, onClose)}
                  _hover={{
                    background: "red.500",
                    transition: "all 0.4s",
                    color: "white",
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  disabled={!intervencaoForm.isValid}
                  background="origem.300"
                  variant="primary"
                  color="white"
                  onClick={() => handleCadastrar(intervencaoForm, onClose)}
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

export default ModalIntervencao;
