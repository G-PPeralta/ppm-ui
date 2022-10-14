import { BsPlus } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";

import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  NumberInput,
  NumberInputField,
  Text,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import DatePickerDataInicioGenerico from "components/DatePickerGenerico";
import InputGenerico from "components/InputGenerico";
import { RequiredField } from "components/RequiredField/RequiredField";
import SelectFiltragem from "components/SelectFiltragem";
import Sidebar from "components/SideBar";
import TextAreaGenerico from "components/TextAreaGenerico";

import { handleCadastrarPagina } from "utils/handleCadastro";

import { useProjetos } from "hooks/useCadastroProjeto";

function CadastrarProjeto() {
  const {
    registerForm,
    loading,
    optionsResponsaveis,
    optionsCoordenadores,
    optionsPolos,
    optionsLocais,
    optionsSolicitantes,
    // optionsPrioridades,
    optionsStatus,
    optionsComplexidades,
    optionsDivisoes,
    optionsClassificacoes,
    optionsTipoProjetos,
    optionsGates,
  } = useProjetos();

  const getValue = (options: any, chave: any) => {
    const index = options
      .map(({ value }: any) => value)
      .indexOf(registerForm?.values?.[chave]);

    return {
      value: options?.[index]?.value,
      label: options?.[index]?.label,
    };
  };

  return (
    <>
      <Sidebar>
        {!loading ? (
          <Flex w={"auto"} align="center" justify="center" bg={"#EDF2F7"}>
            <Box
              py={{ base: "6", sm: "6" }}
              px={{ base: "6", sm: "8" }}
              w={"100%"}
              bg={"white"}
              borderRadius={{ base: "xl", sm: "xl" }}
            >
              <Flex align={"center"} gap={2} h={"56px"}>
                <IconButton
                  aria-label="Botão Voltar"
                  icon={<IoIosArrowBack size={20} />}
                  borderRadius={"10px"}
                  background={"white"}
                  color={"origem.500"}
                  _hover={{
                    background: "origem.500",
                    transition: "all 0.4s",
                    color: "white",
                  }}
                  onClick={() => {
                    window.history.back();
                  }}
                />
                <Heading as="h3" size="md" textAlign={"center"}>
                  Cadastrar Projeto
                </Heading>
              </Flex>

              <Flex direction={"column"} gap={4} mt={4}>
                <Flex gap={2} align={"start"} w={"35%"}>
                  <SelectFiltragem
                    registerForm={registerForm}
                    nomeSelect={"RESPONSAVEL"}
                    propName={"responsavelId"}
                    options={optionsResponsaveis}
                    required={true}
                    value={getValue(optionsResponsaveis, "responsavelId")}
                  />
                  <SelectFiltragem
                    registerForm={registerForm}
                    nomeSelect={"COORDENADOR"}
                    propName={"coordenadorId"}
                    options={optionsCoordenadores}
                    required={true}
                    value={getValue(optionsCoordenadores, "coordenadorId")}
                  />
                </Flex>

                <Flex gap={2} align={"start"} w={"100%"}>
                  <SelectFiltragem
                    registerForm={registerForm}
                    nomeSelect={"POLO"}
                    propName={"poloId"}
                    options={optionsPolos}
                    required={true}
                    value={getValue(optionsPolos, "poloId")}
                  />
                  <SelectFiltragem
                    registerForm={registerForm}
                    nomeSelect={"LOCAL"}
                    propName={"localId"}
                    options={optionsLocais}
                    required={true}
                    value={getValue(optionsLocais, "localId")}
                  />
                  <SelectFiltragem
                    registerForm={registerForm}
                    nomeSelect={"SOLICITANTE"}
                    propName={"solicitanteId"}
                    options={optionsSolicitantes}
                    required={true}
                    value={getValue(optionsSolicitantes, "solicitanteId")}
                  />
                  {/* <SelectFiltragem
                    registerForm={registerForm}
                    nomeSelect={"PRIORIDADE"}
                    propName={"prioridadeId"}
                    options={optionsPrioridades}
                    required={true}
                  /> */}
                  <SelectFiltragem
                    registerForm={registerForm}
                    nomeSelect={"STATUS"}
                    propName={"statusId"}
                    options={optionsStatus}
                    required={true}
                    value={getValue(optionsStatus, "statusId")}
                  />
                </Flex>

                <Flex gap={2} align={"start"} w={"60%"}>
                  <Flex flex={2}>
                    <InputGenerico
                      registerForm={registerForm}
                      nomeInput={"NOME DO PROJETO"}
                      propName={"nomeProjeto"}
                      value={registerForm.values.nomeProjeto}
                      required={true}
                      placeholder={"Nome do projeto"}
                      maxLength={50}
                    />
                  </Flex>
                  <Flex flex={1}>
                    <InputGenerico
                      registerForm={registerForm}
                      nomeInput={"ELEMENTO PEP"}
                      propName={"elementoPep"}
                      value={registerForm.values.elementoPep}
                      required={true}
                      placeholder={"Elemento PEP"}
                      maxLength={50}
                    />
                  </Flex>
                  <Flex flex={1}>
                    <DatePickerDataInicioGenerico
                      registerForm={registerForm}
                      propName={"dataInicio"}
                    />
                  </Flex>
                </Flex>

                <Flex gap={2} align={"start"} w={"35%"}>
                  <Flex direction={"column"}>
                    <Flex gap={1}>
                      <RequiredField />
                      <Text
                        fontWeight={"bold"}
                        fontSize={"12px"}
                        color={"#949494"}
                      >
                        CAPEX PREVISTO
                      </Text>
                    </Flex>
                    <NumberInput
                      h={"56px"}
                      precision={2}
                      max={9999999}
                      min={0}
                      id="capexPrevisto"
                      name="capexPrevisto"
                      value={registerForm.values.capexPrevisto}
                      onChange={(value) =>
                        registerForm.setFieldValue(
                          "capexPrevisto",
                          Number(value)
                        )
                      }
                    >
                      <NumberInputField bg={"#fff"} h={"56px"} />
                    </NumberInput>
                  </Flex>

                  <SelectFiltragem
                    registerForm={registerForm}
                    nomeSelect={"COMPLEXIDADE"}
                    propName={"complexidadeId"}
                    options={optionsComplexidades}
                    required={true}
                    value={getValue(optionsComplexidades, "complexidadeId")}
                  />
                </Flex>

                <Flex gap={2} align={"start"} w={"80%"}>
                  <SelectFiltragem
                    registerForm={registerForm}
                    nomeSelect={"DIVISÃO"}
                    propName={"divisaoId"}
                    options={optionsDivisoes}
                    required={true}
                    value={getValue(optionsDivisoes, "divisaoId")}
                  />
                  <SelectFiltragem
                    registerForm={registerForm}
                    nomeSelect={"CLASSIFICAÇÃO"}
                    propName={"classificacaoId"}
                    options={optionsClassificacoes}
                    required={true}
                    value={getValue(optionsClassificacoes, "classificacaoId")}
                  />
                  <SelectFiltragem
                    registerForm={registerForm}
                    nomeSelect={"TIPO"}
                    propName={"tipoProjetoId"}
                    options={optionsTipoProjetos}
                    required={true}
                    value={getValue(optionsTipoProjetos, "tipoProjetoId")}
                  />
                  <SelectFiltragem
                    registerForm={registerForm}
                    nomeSelect={"GATE"}
                    propName={"gateId"}
                    options={optionsGates}
                    required={true}
                    value={getValue(optionsGates, "gateId")}
                  />
                </Flex>

                <Flex gap={2} align={"start"} w={"100%"}>
                  <TextAreaGenerico
                    registerForm={registerForm}
                    nomeInput={"DESCRIÇÃO"}
                    propName={"descricao"}
                    value={registerForm.values.descricao}
                    required={true}
                    placeholder={"Escreva a descrição do projeto"}
                  />
                  <TextAreaGenerico
                    registerForm={registerForm}
                    nomeInput={"JUSTIFICATIVA"}
                    propName={"justificativa"}
                    value={registerForm.values.justificativa}
                    required={true}
                    placeholder={"Escreva a justificativa do projeto"}
                  />
                </Flex>
                <Flex gap={2} align={"start"} w={"49.5%"}>
                  <TextAreaGenerico
                    registerForm={registerForm}
                    nomeInput={"COMENTÁRIOS"}
                    propName={"comentarios"}
                    value={registerForm.values.comentarios}
                    required={false}
                    placeholder={"Escreva a comentários sobre o projeto"}
                  />
                </Flex>
              </Flex>
              <Flex w={"100%"} mt={6}>
                <Button
                  w={"100%"}
                  h={"56px"}
                  borderRadius={"10px"}
                  disabled={!registerForm.isValid || !registerForm.dirty}
                  background={"origem.500"}
                  variant="primary"
                  color="white"
                  onClick={() => handleCadastrarPagina(registerForm)}
                  _hover={{
                    background: "origem.600",
                    transition: "all 0.4s",
                  }}
                  rightIcon={<BsPlus size={24} />}
                >
                  {loading ? (
                    <Ring speed={2} lineWeight={5} color="white" size={24} />
                  ) : (
                    <>
                      <Text fontSize="16px" fontWeight={"bold"}>
                        Cadastrar Projeto
                      </Text>
                    </>
                  )}
                </Button>
              </Flex>
            </Box>
          </Flex>
        ) : (
          <Flex display={"flex"} align={"center"} justify={"center"} h={"90vh"}>
            <Ring speed={2} lineWeight={5} color="blue" size={64} />
          </Flex>
        )}
      </Sidebar>
    </>
  );
}

export default CadastrarProjeto;
