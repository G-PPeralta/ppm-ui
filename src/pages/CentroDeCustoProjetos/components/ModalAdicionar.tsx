import { BsPlus } from "react-icons/bs";

import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  Text,
  Textarea,
  useDisclosure,
  InputGroup,
} from "@chakra-ui/react";

import BotaoAzulLargoPrimary from "components/BotaoAzulLargo/BotaoAzulLargoPrimary";
import BotaoVermelhoLargoGhost from "components/BotaoVermelhoLargo/BotaoVermelhoLargoGhost";
import InputGenerico from "components/InputGenerico";
import { RequiredField } from "components/RequiredField/RequiredField";
import SelectFiltragem from "components/SelectFiltragem";

import { regexCaracteresEspeciais } from "utils/regex";

import { useCentroDeCusto } from "hooks/useCentroDeCusto";

import DatePickerGenericoDataInicial from "./DatePickerDatainicial";
import DatePickerGenericoFinanceiro from "./DatePickerGenericoFinanceiro";

interface RefreshState {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Props {
  refreshState: RefreshState;
  idProjeto: number;
  optionsSelects: any;
  mes: number;
  dataInicial: Date;
}

function ModalAdicionar({
  refreshState,
  idProjeto,
  optionsSelects,
  mes,
  dataInicial,
}: Props) {
  const { refresh, setRefresh } = refreshState;
  const { optionsFornecedores, optionsClassesDeServico } = optionsSelects;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, registerForm } = useCentroDeCusto(idProjeto, "post");

  return (
    <>
      <Button
        h={"56px"}
        fontSize={"18px"}
        fontWeight={"700"}
        fontFamily={"Mulish"}
        borderRadius={"8px"}
        background={"origem.500"}
        variant="primary"
        color="white"
        _hover={{
          background: "origem.600",
          transition: "all 0.4s",
        }}
        rightIcon={<BsPlus size={24} />}
        onClick={onOpen}
      >
        Adicionar
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            backgroundColor={"#2E69FD"}
            borderTopRadius={7}
            display={"flex"}
            justifyContent={"center"}
            color={"white"}
            fontSize={"14px"}
            fontWeight={"700"}
            fontFamily={"Mulish"}
          >
            Lançar Despesa
          </ModalHeader>
          <ModalCloseButton color={"white"} />

          <ModalBody mt={3}>
            <Flex direction={"column"} gap={4}>
              <Flex gap={4}>
                <Flex direction={"column"}>
                  <InputGroup>
                    <InputGenerico
                      registerForm={registerForm}
                      nomeInput={"VALOR PREVISTO"}
                      propName={"valor"}
                      value={registerForm.values.valor || ""}
                      required={true}
                      placeholder={"0"}
                      maxLength={20}
                      isNumeric={true}
                    />
                  </InputGroup>
                </Flex>
                <Flex direction={"column"}>
                  <DatePickerGenericoDataInicial
                    registerForm={registerForm}
                    nomeLabel="DATA"
                    propName={"data"}
                    required={true}
                    esconderHorario
                    dataInicial={dataInicial}
                  />
                </Flex>
              </Flex>
              <Flex gap={4}>
                <SelectFiltragem
                  registerForm={registerForm}
                  nomeSelect={"PRESTADOR DE SERVIÇO"}
                  propName={"prestadorServicoId"}
                  options={optionsFornecedores}
                  required={true}
                />

                <SelectFiltragem
                  registerForm={registerForm}
                  nomeSelect={"CLASSE DE SERVIÇO"}
                  propName={"classeDeServicoId"}
                  options={optionsClassesDeServico}
                  required={true}
                />
                <Flex direction={"column"}>
                  <Flex gap={1}>
                    <RequiredField />
                    <Text
                      fontWeight={"700"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      PEDIDO
                    </Text>
                  </Flex>
                  <Input
                    _placeholder={{ color: "#949494" }}
                    fontWeight={"400"}
                    fontSize={"14px"}
                    h={"56px"}
                    w="100px"
                    isRequired
                    placeholder="Pedido"
                    id="pedido"
                    type="text"
                    name="pedido"
                    value={regexCaracteresEspeciais(registerForm.values.pedido)}
                    onChange={registerForm.handleChange}
                    maxLength={30}
                  />
                </Flex>
              </Flex>

              <Flex gap={4}>
                <Flex direction={"column"}>
                  <Flex gap={1}>
                    <Text
                      fontWeight={"700"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      BM
                    </Text>
                  </Flex>
                  <Input
                    fontSize={"14px"}
                    fontWeight={"400"}
                    _placeholder={{ color: "#949494" }}
                    h={"56px"}
                    isRequired
                    placeholder="BM"
                    id="bm"
                    type="text"
                    name="bm"
                    value={regexCaracteresEspeciais(registerForm.values.bm)}
                    onChange={registerForm.handleChange}
                    maxLength={150}
                  />
                </Flex>

                <Flex direction={"column"}>
                  <Flex gap={1}>
                    <Text
                      fontWeight={"700"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      NOTA FISCAL
                    </Text>
                  </Flex>
                  <Input
                    fontSize={"14px"}
                    fontWeight={"400"}
                    _placeholder={{ color: "#949494" }}
                    h={"56px"}
                    isRequired
                    placeholder="Nota Fiscal"
                    id="id_nf"
                    type="text"
                    name="id_nf"
                    value={regexCaracteresEspeciais(registerForm.values.id_nf)}
                    onChange={registerForm.handleChange}
                    maxLength={150}
                  />
                </Flex>
                <Flex direction={"column"}>
                  <InputGroup>
                    <InputGenerico
                      registerForm={registerForm}
                      nomeInput={"VALOR NF"}
                      propName={"valor_bm_nf"}
                      value={registerForm.values.valor_bm_nf || ""}
                      required={false}
                      placeholder={"0"}
                      maxLength={20}
                      isNumeric={true}
                    />
                  </InputGroup>
                </Flex>
              </Flex>

              <Flex gap={4}>
                <Flex direction={"column"}>
                  <SelectFiltragem
                    width="190px"
                    registerForm={registerForm}
                    nomeSelect={"STATUS"}
                    propName={"status"}
                    options={[
                      { label: "Pendente", value: 0 },
                      { label: "Pago", value: 1 },
                    ]}
                  />
                </Flex>
                <Flex direction={"column"}>
                  <DatePickerGenericoFinanceiro
                    registerForm={registerForm}
                    nomeLabel="DATA PAGAMENTO"
                    propName={"data_pagamento"}
                    esconderHorario
                  />
                </Flex>

                <Flex direction={"column"}>
                  <InputGroup>
                    <InputGenerico
                      registerForm={registerForm}
                      nomeInput={"VALOR PAGO"}
                      propName={"valor_pago"}
                      value={registerForm.values.valor_pago || ""}
                      placeholder={"0"}
                      maxLength={20}
                      isNumeric={true}
                    />
                  </InputGroup>
                </Flex>
              </Flex>

              <Flex gap={4}>
                <Flex direction={"column"} flex={1}>
                  <Flex gap={1}>
                    <Text
                      fontWeight={"700"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      DESCRIÇÃO DO SERVIÇO
                    </Text>
                  </Flex>
                  <Textarea
                    _placeholder={{ color: "#949494" }}
                    fontSize={"14px"}
                    fontWeight={"400"}
                    color={"black"}
                    isRequired
                    placeholder="Ação ou recomendação"
                    id="descricaoDoServico"
                    name="descricaoDoServico"
                    value={regexCaracteresEspeciais(
                      registerForm.values.descricaoDoServico
                    )}
                    onChange={registerForm.handleChange}
                  />
                </Flex>
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Flex gap={2}>
              <BotaoVermelhoLargoGhost
                text={"Cancelar"}
                formikForm={registerForm}
                onClose={onClose}
              />
              <BotaoAzulLargoPrimary
                text={"Salvar"}
                formikForm={registerForm}
                onClose={onClose}
                setRefresh={setRefresh}
                refresh={refresh}
                loading={loading}
              />
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalAdicionar;
