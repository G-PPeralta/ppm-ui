import { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";

import {
  Flex,
  Text,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useBreakpointValue,
  Textarea,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import ListDnD from "pages/Infographics/Components/ListaIntervencao";

import { TextError } from "components/TextError";

import { formatDate } from "utils/formatDate";
import { handleCadastrar, handleCancelar } from "utils/handleCadastro";

import { useCadastroIntervencao } from "hooks/useCadastroIntervencao";

import SelectFiltragemPocos from "./SelectFiltragemPocos";
import SelectFiltragemProjetos from "./SelectFiltragemProjetos";
import SelectFiltragemSondas from "./SelectFiltragemSonda";

function ModalBotaoCadastrar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { intervencaoForm, loading } = useCadastroIntervencao();
  const [qtdeDias, setQtdeDias] = useState<any>(0);
  const [dataFinal, setDataFinal] = useState<any>("");

  // console.log(intervencaoForm.values);

  useEffect(() => {
    if (intervencaoForm.values.inicioPrevisto) {
      const data = new Date(intervencaoForm.values.inicioPrevisto);
      const dataFinal = new Date(data.setDate(data.getDate() + qtdeDias));
      setDataFinal(formatDate(dataFinal));
    }
  }, [intervencaoForm.values.projetoId]);

  return (
    <>
      <Flex
        mt={2}
        py={3}
        w="75%"
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
          size="lg"
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
          <ModalCloseButton color={"white"} />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              intervencaoForm.handleSubmit(e);
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
                        <FormLabel>NOME</FormLabel>
                        <Input
                          isRequired
                          placeholder="Nome da Intervenção"
                          id="nome"
                          type="text"
                          name="nome"
                          value={intervencaoForm.values.nome}
                          onChange={intervencaoForm.handleChange}
                        />
                        {intervencaoForm.errors.nome &&
                          intervencaoForm.touched.nome && (
                            <TextError>{intervencaoForm.errors.nome}</TextError>
                          )}
                      </FormControl>
                    </Flex>

                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={5}
                    >
                      <SelectFiltragemPocos intervencaoForm={intervencaoForm} />
                      <SelectFiltragemSondas
                        intervencaoForm={intervencaoForm}
                      />
                    </Flex>

                    <Stack>
                      <SelectFiltragemProjetos
                        intervencaoForm={intervencaoForm}
                      />
                    </Stack>

                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={5}
                    >
                      <FormControl>
                        <FormLabel htmlFor="inicioPrevisto">
                          INÍCIO PREVISTO
                        </FormLabel>
                        <Input
                          isRequired
                          placeholder="dd/mm/aaaa"
                          id="inicioPrevisto"
                          type="date"
                          name="inicioPrevisto"
                          value={intervencaoForm.values.inicioPrevisto}
                          onChange={intervencaoForm.handleChange}
                        />
                        {intervencaoForm.errors.inicioPrevisto &&
                          intervencaoForm.touched.inicioPrevisto && (
                            <TextError>
                              {intervencaoForm.errors.inicioPrevisto}
                            </TextError>
                          )}
                      </FormControl>
                      <FormControl>
                        <FormLabel htmlFor="fimPrevisto">
                          FIM PREVISTO
                        </FormLabel>
                        <Input
                          placeholder="dd/mm/aaaa"
                          id="fimPrevisto"
                          type="text"
                          name="fimPrevisto"
                          value={dataFinal}
                          isDisabled
                        />
                      </FormControl>
                    </Flex>
                  </Stack>

                  <ListDnD
                    intervencaoForm={intervencaoForm}
                    qtdeDias={qtdeDias}
                    setQtdeDias={setQtdeDias}
                  />

                  <Stack>
                    <FormControl>
                      <FormLabel htmlFor="comentarios">OBSERVAÇÕES</FormLabel>
                      <Textarea
                        isRequired
                        placeholder="Adicione observações sobre a intervenção"
                        id="comentarios"
                        name="comentarios"
                        value={intervencaoForm.values.comentarios}
                        onChange={intervencaoForm.handleChange}
                        w={useBreakpointValue({ base: "100%", md: "100%" })}
                      />
                      {intervencaoForm.errors.comentarios &&
                        intervencaoForm.touched.comentarios && (
                          <TextError>
                            {intervencaoForm.errors.comentarios}
                          </TextError>
                        )}
                    </FormControl>
                  </Stack>
                </Flex>
              </FormControl>
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

export default ModalBotaoCadastrar;
