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
  // ModalCloseButton,
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

import { formatDate, formatDateToYMD } from "utils/formatDate";
import { handleCadastrar, handleCancelar } from "utils/handleCadastro";

import { useCadastroIntervencaoOLD } from "hooks/useCadastroIntervencaoOLD";

// import SelectFiltragemPocos from "./SelectFiltragemPocos";
import SelectFiltragemProjetos from "./SelectFiltragemProjetos";
// import SelectFiltragemSondas from "./SelectFiltragemSonda";

function ModalBotaoCadastrar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { intervencaoForm, loading } = useCadastroIntervencaoOLD();
  const [qtdeDias, setQtdeDias] = useState<any>(0);
  const [dataFinal, setDataFinal] = useState<any>("dd/mm/aaaa");

  const handleCadastrarIntervencao = () => {
    handleCadastrar(intervencaoForm, onClose);
    setDataFinal("dd/mm/aaaa");
  };

  const handleCancelarIntervencao = () => {
    setDataFinal("dd/mm/aaaa");
    intervencaoForm.resetForm();
    handleCancelar(intervencaoForm, onClose);
  };

  useEffect(() => {
    if (intervencaoForm.values.inicioPlanejado) {
      const data = new Date(intervencaoForm.values.inicioPlanejado);
      const dataFinal = new Date(data.setDate(data.getDate() + qtdeDias));
      const dataFormatada = formatDate(dataFinal);
      const dataFormatadaYMD = formatDateToYMD(dataFinal);
      setDataFinal(dataFormatada);
      intervencaoForm.setFieldValue("fimPlanejado", dataFormatadaYMD);
    }
  }, [
    intervencaoForm.values.tipoProjetoId,
    qtdeDias,
    intervencaoForm.values.inicioPlanejado,
  ]);

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
          {/* <ModalCloseButton color={'white'} /> */}
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
                      {/* <SelectFiltragemPocos intervencaoForm={intervencaoForm} />
                      <SelectFiltragemSondas
                        intervencaoForm={intervencaoForm}
                      /> */}
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
                        <FormLabel htmlFor="inicioPlanejado">
                          INÍCIO PREVISTO
                        </FormLabel>
                        <Input
                          isRequired
                          placeholder="dd/mm/aaaa"
                          id="inicioPlanejado"
                          type="date"
                          name="inicioPlanejado"
                          value={intervencaoForm.values.inicioPlanejado}
                          onChange={intervencaoForm.handleChange}
                        />
                        {intervencaoForm.errors.inicioPlanejado &&
                          intervencaoForm.touched.inicioPlanejado && (
                            <TextError>
                              {intervencaoForm.errors.inicioPlanejado}
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
                      <FormLabel htmlFor="observacoes">OBSERVAÇÕES</FormLabel>
                      <Textarea
                        isRequired
                        placeholder="Adicione observações sobre a intervenção"
                        id="observacoes"
                        name="observacoes"
                        value={intervencaoForm.values.observacoes}
                        onChange={intervencaoForm.handleChange}
                        w={useBreakpointValue({ base: "100%", md: "100%" })}
                      />
                      {intervencaoForm.errors.observacoes &&
                        intervencaoForm.touched.observacoes && (
                          <TextError>
                            {intervencaoForm.errors.observacoes}
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
                  onClick={() => handleCancelarIntervencao()}
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
                  onClick={() => handleCadastrarIntervencao()}
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
