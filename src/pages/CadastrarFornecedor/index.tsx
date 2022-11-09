import { BsPlus } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";

import { Box, Button, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import InputGenerico from "components/InputGenerico";
import SelectFiltragem from "components/SelectFiltragem";
import Sidebar from "components/SideBar";
import TextAreaGenerico from "components/TextAreaGenerico";

import formatCellphone from "utils/formatCellphone";
// import { formatCnpj } from "utils/formatCnpj";
import { formatEmail } from "utils/formatEmail";
import { handleCadastrarPagina } from "utils/handleCadastro";
import {
  regexCaracteresEspeciaisENumeros,
  regexCnpj,
  regexSomenteNumeros,
} from "utils/regex";

import { useCadastroFornecedor } from "hooks/useCadastroFornecedor";

export function CadastrarFornecedor() {
  const { registerForm, loading, optionsPolos } = useCadastroFornecedor();

  const optionsMock = [
    { value: 1, label: "Ativo" },
    { value: 2, label: "Inativo" },
  ];

  // console.log(registerForm.values);

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
                <IconButton
                  aria-label="Botão Voltar"
                  icon={<IoIosArrowBack size={20} />}
                  borderRadius={"10px"}
                  background={"white"}
                  _hover={{
                    background: "origem.500",
                    transition: "all 0.4s",
                    color: "white",
                  }}
                  onClick={() => {
                    window.history.back();
                  }}
                />
                <Heading
                  fontSize={"24px"}
                  color={"#2D2926"}
                  fontWeight={"700"}
                  fontFamily={"Mulish"}
                  textAlign={"center"}
                >
                  Cadastrar Fornecedor
                </Heading>
              </Flex>
              <Flex direction={"column"} gap={4} mt={4}>
                <Flex gap={2} align={"start"} w={"60%"}>
                  <SelectFiltragem
                    registerForm={registerForm}
                    nomeSelect={"POLO"}
                    propName={"poloId"}
                    options={optionsPolos}
                    required={true}
                  />
                  <InputGenerico
                    registerForm={registerForm}
                    nomeInput={"SERVIÇO"}
                    propName={"servico_txt"}
                    value={registerForm.values.servico_txt}
                    required={true}
                    placeholder={"Serviço"}
                    maxLength={50}
                  />
                  <SelectFiltragem
                    registerForm={registerForm}
                    nomeSelect={"STATUS"}
                    propName={"statusId"}
                    options={optionsMock}
                    required={true}
                  />
                </Flex>
                <Flex gap={2} align={"start"} w={"65%"}>
                  <InputGenerico
                    registerForm={registerForm}
                    nomeInput={"NOME DO FORNECEDOR"}
                    propName={"nomeFornecedor"}
                    value={registerForm.values.nomeFornecedor}
                    required={true}
                    placeholder={"Nome do fornecedor"}
                    maxLength={50}
                  />
                  <InputGenerico
                    registerForm={registerForm}
                    nomeInput={"NÚMERO DO CONTRATO"}
                    propName={"numeroContrato"}
                    value={regexSomenteNumeros(
                      registerForm.values.numeroContrato
                    )}
                    required={true}
                    placeholder={"Número do contrato"}
                    maxLength={50}
                  />
                </Flex>
                <Flex gap={2} align={"start"} w={"83%"}>
                  <InputGenerico
                    registerForm={registerForm}
                    nomeInput={"REPRESENTANTE/PONTO FOCAL"}
                    propName={"representante"}
                    value={regexCaracteresEspeciaisENumeros(
                      registerForm.values.representante
                    )}
                    required={true}
                    placeholder={"Nome do representante"}
                    maxLength={50}
                  />
                  <InputGenerico
                    registerForm={registerForm}
                    nomeInput={"E-MAIL"}
                    propName={"email"}
                    value={formatEmail(registerForm.values.email)}
                    type={"email"}
                    required={true}
                    placeholder={"E-mail"}
                    maxLength={50}
                  />
                  <InputGenerico
                    registerForm={registerForm}
                    nomeInput={"TELEFONE"}
                    propName={"telefone"}
                    value={formatCellphone(registerForm.values.telefone)}
                    required={true}
                    placeholder={"(00) 90000-0000"}
                    maxLength={14}
                  />
                </Flex>
                <Flex gap={2} align={"start"} w={"35%"}>
                  <InputGenerico
                    registerForm={registerForm}
                    nomeInput={"INVOICE"}
                    propName={"invoice"}
                    value={regexSomenteNumeros(registerForm.values.invoice)}
                    required={true}
                    placeholder={"Número do invoice"}
                    maxLength={50}
                  />
                  <InputGenerico
                    registerForm={registerForm}
                    nomeInput={"CNPJ"}
                    propName={"cnpj"}
                    value={regexCnpj(registerForm.values.cnpj)?.toString()}
                    required={true}
                    placeholder={"Digite o CNPJ"}
                    maxLength={18}
                  />
                </Flex>
                <Flex gap={2} align={"start"} w={"45%"}>
                  <TextAreaGenerico
                    registerForm={registerForm}
                    nomeInput={"JUSTIFICATIVA"}
                    propName={"justificativa"}
                    value={registerForm.values.justificativa}
                    required={true}
                    placeholder={"Escreva a Justificativa"}
                  />
                </Flex>
                <Flex gap={2} align={"start"} w={"45%"}>
                  <TextAreaGenerico
                    registerForm={registerForm}
                    nomeInput={"OUTRAS INFORMAÇÕES"}
                    propName={"outrasInformacoes"}
                    value={registerForm.values.outrasInformacoes}
                    required={false}
                    placeholder={"Escreva a descrição"}
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
                        Cadastrar Fornecedor
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
