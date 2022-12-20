import { BsPlus } from "react-icons/bs";

import {
  Box,
  Button,
  Flex,
  Heading,
  InputGroup,
  // InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import BotaoSetaVoltar from "components/BotaoSetaVoltar/BotaoSetaVoltar";
import InputGenerico from "components/InputGenerico";
import SelectFiltragem from "components/SelectFiltragem";
import Sidebar from "components/SideBar";
import TextAreaGenerico from "components/TextAreaGenerico";

import { handleCadastrarPagina } from "utils/handleCadastro";
import { regexSomenteNumerosMonetario } from "utils/regex";

import { useProjetos } from "hooks/useCadastroProjeto";

import InputCadastroInline from "./Components/InputCadastroInline";

function CadastrarProjeto() {
  const {
    registerForm,
    loading,
    refreshState,
    optionsResponsaveis,
    optionsCoordenadores,
    optionsPolos,
    optionsLocais,
    optionsSolicitantes,
    // optionsPrioridades,
    optionsStatus,
    // optionsComplexidades,
    optionsDivisoes,
    optionsClassificacoes,
    optionsTipoProjetos,
    optionsGates,
  } = useProjetos();

  type Options = {
    value: number;
    label: string;
  };

  const tiposProjetos = optionsTipoProjetos.filter(
    (option: Options) => option.label !== "Intervenção"
  );

  const innerWidth = window.innerWidth;

  const getValue = (options: Array<Options>, chave: string) => {
    const index = options
      .map(({ value }: Options) => value)
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
              <Flex align={"center"} gap={1} h={"56px"} ml={-7} mt={-5}>
                <BotaoSetaVoltar />
                <Heading
                  fontSize={"24px"}
                  color={"#2D2926"}
                  fontWeight={"700"}
                  fontFamily={"Mulish"}
                >
                  Cadastrar Projetos
                </Heading>
              </Flex>

              <Flex direction={"column"} gap={4} mt={4} ml={-3} mr={-3}>
                <Flex
                  gap={2}
                  align={innerWidth > 428 ? "start" : "stretch"}
                  w={innerWidth > 428 ? "50%" : "100%"}
                  wrap={"wrap"}
                  direction={innerWidth > 428 ? "row" : "column"}
                >
                  <Flex flex={1}>
                    {registerForm.values.responsavelId === 0 ? (
                      <InputCadastroInline
                        required={true}
                        refreshState={refreshState}
                        registerForm={registerForm}
                        listaOptions={optionsResponsaveis}
                        nomeLabel={"RESPONSAVEL"}
                        payloadKey={"nome"}
                        propName={"responsavelId"}
                        rota={"/responsavel"}
                        respOuCoord={true}
                      />
                    ) : (
                      <SelectFiltragem
                        registerForm={registerForm}
                        nomeSelect={"RESPONSAVEL"}
                        propName={"responsavelId"}
                        options={optionsResponsaveis}
                        required={true}
                        value={getValue(optionsResponsaveis, "responsavelId")}
                      />
                    )}
                  </Flex>
                  <Flex flex={1}>
                    {registerForm.values.coordenadorId === 0 ? (
                      <InputCadastroInline
                        required={true}
                        refreshState={refreshState}
                        registerForm={registerForm}
                        listaOptions={optionsCoordenadores}
                        nomeLabel={"COORDENADOR"}
                        payloadKey={"coordenadorNome"}
                        propName={"coordenadorId"}
                        rota={"/coordenador"}
                        respOuCoord={true}
                      />
                    ) : (
                      <SelectFiltragem
                        registerForm={registerForm}
                        nomeSelect={"COORDENADOR"}
                        propName={"coordenadorId"}
                        options={optionsCoordenadores}
                        required={true}
                        value={getValue(optionsCoordenadores, "coordenadorId")}
                      />
                    )}
                  </Flex>
                </Flex>

                <Flex
                  gap={2}
                  align={innerWidth > 428 ? "start" : "stretch"}
                  w={"100%"}
                  wrap={"wrap"}
                  direction={innerWidth > 428 ? "row" : "column"}
                >
                  <Flex flex={1}>
                    {registerForm.values.poloId === 0 ? (
                      <InputCadastroInline
                        required={true}
                        refreshState={refreshState}
                        registerForm={registerForm}
                        listaOptions={optionsPolos}
                        nomeLabel={"POLO"}
                        payloadKey={"polo"}
                        propName={"poloId"}
                        rota={"/polo"}
                      />
                    ) : (
                      <SelectFiltragem
                        registerForm={registerForm}
                        nomeSelect={"POLO"}
                        propName={"poloId"}
                        options={optionsPolos}
                        required={true}
                        value={getValue(optionsPolos, "poloId")}
                      />
                    )}
                  </Flex>
                  <Flex flex={1}>
                    {registerForm.values.localId === 0 ? (
                      <InputCadastroInline
                        required={true}
                        refreshState={refreshState}
                        registerForm={registerForm}
                        listaOptions={optionsLocais}
                        nomeLabel={"LOCAL"}
                        payloadKey={"local"}
                        propName={"localId"}
                        rota={"/local"}
                      />
                    ) : (
                      <SelectFiltragem
                        registerForm={registerForm}
                        nomeSelect={"LOCAL"}
                        propName={"localId"}
                        options={optionsLocais}
                        required={true}
                        value={getValue(optionsLocais, "localId")}
                      />
                    )}
                  </Flex>
                  <Flex flex={1}>
                    {registerForm.values.solicitanteId === 0 ? (
                      <InputCadastroInline
                        required={true}
                        refreshState={refreshState}
                        registerForm={registerForm}
                        listaOptions={optionsSolicitantes}
                        nomeLabel={"SOLICITANTE"}
                        payloadKey={"solicitante"}
                        propName={"solicitanteId"}
                        rota={"/solicitante"}
                      />
                    ) : (
                      <SelectFiltragem
                        registerForm={registerForm}
                        nomeSelect={"SOLICITANTE"}
                        propName={"solicitanteId"}
                        options={optionsSolicitantes}
                        required={true}
                        value={getValue(optionsSolicitantes, "solicitanteId")}
                      />
                    )}
                  </Flex>
                  {/* <SelectFiltragem
                    registerForm={registerForm}
                    nomeSelect={"PRIORIDADE"}
                    propName={"prioridadeId"}
                    options={optionsPrioridades}
                    required={true}
                  /> */}
                  <Flex flex={1}>
                    {registerForm.values.statusId === 0 ? (
                      <InputCadastroInline
                        required={true}
                        refreshState={refreshState}
                        registerForm={registerForm}
                        listaOptions={optionsStatus}
                        nomeLabel={"STATUS"}
                        payloadKey={"status"}
                        propName={"statusId"}
                        rota={"/status-projeto"}
                      />
                    ) : (
                      <SelectFiltragem
                        registerForm={registerForm}
                        nomeSelect={"STATUS"}
                        propName={"statusId"}
                        options={optionsStatus}
                        required={true}
                        value={getValue(optionsStatus, "statusId")}
                      />
                    )}
                  </Flex>
                </Flex>

                <Flex
                  gap={2}
                  align={innerWidth > 428 ? "end" : "stretch"}
                  w={innerWidth > 428 ? "62%" : "100%"}
                  wrap={"wrap"}
                  direction={innerWidth > 428 ? "row" : "column"}
                >
                  <Flex flex={2} gap={2}>
                    <InputGenerico
                      registerForm={registerForm}
                      nomeInput={"CAMPO ID"}
                      propName={"campoId"}
                      value={registerForm.values.campoId}
                      required={true}
                      placeholder={"Valor do ID"}
                      maxLength={50}
                    />
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
                </Flex>

                <Flex
                  gap={2}
                  align={innerWidth > 428 ? "end" : "stretch"}
                  w={innerWidth > 428 ? "35%" : "100%"}
                  wrap={"wrap"}
                  direction={innerWidth > 428 ? "row" : "column"}
                >
                  <Flex flex={1}>
                    <InputGroup>
                      <InputGenerico
                        registerForm={registerForm}
                        nomeInput={"CAPEX PREVISTO"}
                        propName={"capexPrevisto"}
                        value={
                          regexSomenteNumerosMonetario(
                            registerForm.values.capexPrevisto
                          ) || ""
                        }
                        required={true}
                        placeholder={"0"}
                        maxLength={50}
                        isNumeric={true}
                      />
                    </InputGroup>
                  </Flex>

                  {/* <Flex flex={1}>
                    {registerForm.values.complexidadeId === 0 ? (
                      <InputCadastroInline
                        required={true}
                        refreshState={refreshState}
                        registerForm={registerForm}
                        listaOptions={optionsComplexidades}
                        nomeLabel={"COMPLEXIDADE"}
                        payloadKey={"complexidade"}
                        propName={"complexidadeId"}
                        rota={"/complexidade"}
                      />
                    ) : (
                      <SelectFiltragem
                        registerForm={registerForm}
                        nomeSelect={"COMPLEXIDADE"}
                        propName={"complexidadeId"}
                        options={optionsComplexidades}
                        required={true}
                        value={getValue(optionsComplexidades, "complexidadeId")}
                      />
                    )}
                  </Flex> */}
                </Flex>

                <Flex
                  gap={2}
                  align={innerWidth > 428 ? "start" : "stretch"}
                  w={innerWidth > 428 ? "80%" : "100%"}
                  wrap={"wrap"}
                  direction={innerWidth > 428 ? "row" : "column"}
                >
                  <Flex flex={1}>
                    {registerForm.values.divisaoId === 0 ? (
                      <InputCadastroInline
                        required={true}
                        refreshState={refreshState}
                        registerForm={registerForm}
                        listaOptions={optionsDivisoes}
                        nomeLabel={"DIVISÃO"}
                        payloadKey={"divisao"}
                        propName={"divisaoId"}
                        rota={"/divisao"}
                      />
                    ) : (
                      <SelectFiltragem
                        registerForm={registerForm}
                        nomeSelect={"DIVISÃO"}
                        propName={"divisaoId"}
                        options={optionsDivisoes}
                        required={true}
                        value={getValue(optionsDivisoes, "divisaoId")}
                      />
                    )}
                  </Flex>
                  <Flex flex={1}>
                    {registerForm.values.classificacaoId === 0 ? (
                      <InputCadastroInline
                        required={true}
                        refreshState={refreshState}
                        registerForm={registerForm}
                        listaOptions={optionsClassificacoes}
                        nomeLabel={"CLASSIFICAÇÃO"}
                        payloadKey={"classificacao"}
                        propName={"classificacaoId"}
                        rota={"/classificacao"}
                      />
                    ) : (
                      <SelectFiltragem
                        registerForm={registerForm}
                        nomeSelect={"CLASSIFICAÇÃO"}
                        propName={"classificacaoId"}
                        options={optionsClassificacoes}
                        required={true}
                        value={getValue(
                          optionsClassificacoes,
                          "classificacaoId"
                        )}
                      />
                    )}
                  </Flex>
                  <Flex flex={1}>
                    {registerForm.values.tipoProjetoId === 0 ? (
                      <InputCadastroInline
                        required={true}
                        refreshState={refreshState}
                        registerForm={registerForm}
                        listaOptions={tiposProjetos}
                        nomeLabel={"TIPO"}
                        payloadKey={"tipo"}
                        propName={"tipoProjetoId"}
                        rota={"/tipo-projeto"}
                      />
                    ) : (
                      <SelectFiltragem
                        registerForm={registerForm}
                        nomeSelect={"TIPO"}
                        propName={"tipoProjetoId"}
                        options={tiposProjetos}
                        required={true}
                        value={getValue(tiposProjetos, "tipoProjetoId")}
                      />
                    )}
                  </Flex>
                  <Flex flex={1}>
                    {registerForm.values.gateId === 0 ? (
                      <InputCadastroInline
                        required={true}
                        refreshState={refreshState}
                        registerForm={registerForm}
                        listaOptions={optionsGates}
                        nomeLabel={"GATE"}
                        payloadKey={"gate"}
                        propName={"gateId"}
                        rota={"/gate"}
                      />
                    ) : (
                      <SelectFiltragem
                        registerForm={registerForm}
                        nomeSelect={"GATE"}
                        propName={"gateId"}
                        options={optionsGates}
                        required={true}
                        value={getValue(optionsGates, "gateId")}
                      />
                    )}
                  </Flex>
                </Flex>

                <Flex
                  gap={2}
                  align={innerWidth > 428 ? "start" : "stretch"}
                  w={"100%"}
                  wrap={"wrap"}
                  direction={innerWidth > 428 ? "row" : "column"}
                >
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
                <Flex
                  gap={2}
                  align={innerWidth > 428 ? "start" : "stretch"}
                  w={innerWidth > 428 ? "49.%" : "100%"}
                  wrap={"wrap"}
                  direction={innerWidth > 428 ? "row" : "column"}
                >
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
