import { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";

import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";

import BotaoAzulLargoPrimary from "components/BotaoAzulLargo/BotaoAzulLargoPrimary";
import InputGenerico from "components/InputGenerico";
import SelectFiltragem from "components/SelectFiltragem";

import { regexCaracteresEspeciais } from "utils/regex";
import { parserString } from "utils/regexCoinMask";

import { useCentroDeCusto } from "hooks/useCentroDeCusto";

import DatePickerGenericoFinanceiro from "./DatePickerGenericoFinanceiro";

interface RefreshState {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LinhaTabela {
  idCusto: number;
  prestadorDeServico: string;
  prestadorDeServicoId: number;
  classeDoServico: string;
  classeDeServicoId: number;
  dataPagamento: string;
  valor: number;
  descricaoDoServico: string;
  pedido: string;
  bm: string;
  id_nf: string;
  valor_bm_nf: number;
  status: number;
  data_pagamento: string;
  valor_pago: number;
}

interface Options {
  value: number;
  label: string;
}

interface Props {
  refreshState: RefreshState;
  linhaTabela: LinhaTabela;
  optionsSelects: any;
  mes: number;
}

function ModalEditar({
  refreshState,
  linhaTabela,
  optionsSelects,
  mes,
}: Props) {
  const { refresh, setRefresh } = refreshState;
  const { optionsFornecedores, optionsClassesDeServico } = optionsSelects;
  const { loading, registerForm } = useCentroDeCusto(
    linhaTabela.idCusto,
    "patch"
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [dataPagamento, setDataPagamento] = useState<Date>();
  const [data_Pagamento, setData_Pagamento] = useState<Date>();

  const setInicialValues = async () => {
    registerForm.setFieldValue("valor", parserString(linhaTabela.valor));
    registerForm.setFieldValue("data", linhaTabela.dataPagamento);
    setDataPagamento(new Date(linhaTabela.dataPagamento));
    setData_Pagamento(new Date(linhaTabela.data_pagamento));
    registerForm.setFieldValue(
      "prestadorServicoId",
      linhaTabela.prestadorDeServicoId
    );
    registerForm.setFieldValue(
      "classeDeServicoId",
      linhaTabela.classeDeServicoId
    );
    registerForm.setFieldValue("pedido", linhaTabela.pedido);
    registerForm.setFieldValue(
      "descricaoDoServico",
      linhaTabela.descricaoDoServico
    );
    registerForm.setFieldValue("bm", linhaTabela.bm);
    registerForm.setFieldValue("id_nf", linhaTabela.id_nf);
    registerForm.setFieldValue("valor_bm_nf", linhaTabela.valor_bm_nf);
    registerForm.setFieldValue("status", linhaTabela.status);
    registerForm.setFieldValue("data_pagamento", linhaTabela.data_pagamento);
    registerForm.setFieldValue("valor_pago", linhaTabela.valor_pago);
  };

  const handleCancelar = () => {
    registerForm.setFieldValue("valor", linhaTabela.valor);
    registerForm.setFieldValue("data", linhaTabela.dataPagamento);
    registerForm.setFieldValue(
      "prestadorServicoId",
      linhaTabela.prestadorDeServicoId
    );
    registerForm.setFieldValue(
      "classeDeServicoId",
      linhaTabela.classeDeServicoId
    );
    registerForm.setFieldValue("pedido", linhaTabela.pedido);
    registerForm.setFieldValue(
      "descricaoDoServico",
      linhaTabela.descricaoDoServico
    );
    registerForm.setFieldValue("bm", linhaTabela.bm);
    registerForm.setFieldValue("id_nf", linhaTabela.id_nf);
    registerForm.setFieldValue("valor_bm_nf", linhaTabela.valor_bm_nf);
    registerForm.setFieldValue("status", linhaTabela.status);
    registerForm.setFieldValue("data_pagamento", linhaTabela.data_pagamento);
    registerForm.setFieldValue("valor_pago", linhaTabela.valor_pago);
    onClose();
  };

  const getValue = (options: Options[], chave: string) => {
    const index = options
      .map(({ value }) => value)
      .indexOf(registerForm?.values?.[chave]);

    return {
      value: options?.[index]?.value,
      label: options?.[index]?.label,
    };
  };

  useEffect(() => {
    setInicialValues();
  }, []);

  return (
    <>
      <IconButton
        aria-label="Botão de Editar"
        icon={<MdModeEdit />}
        borderRadius={"10px"}
        background={"transparent"}
        color={"origem.500"}
        _hover={{
          background: "origem.500",
          transition: "all 0.4s",
          color: "white",
        }}
        onClick={onOpen}
      />

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
            Editar Despesa
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
                  <DatePickerGenericoFinanceiro
                    registerForm={registerForm}
                    nomeLabel="DATA"
                    propName={"data"}
                    required={true}
                    data={dataPagamento}
                    esconderHorario
                  />
                </Flex>
              </Flex>
              <Flex gap={4}>
                <SelectFiltragem
                  registerForm={registerForm}
                  nomeSelect={"PRESTADOR DE SERVIÇO"}
                  propName={"prestadorServicoId"}
                  options={optionsFornecedores}
                  value={getValue(optionsFornecedores, "prestadorServicoId")}
                />

                <SelectFiltragem
                  registerForm={registerForm}
                  nomeSelect={"CLASSE DE SERVIÇO"}
                  propName={"classeDeServicoId"}
                  options={optionsClassesDeServico}
                  value={getValue(optionsClassesDeServico, "classeDeServicoId")}
                />
                <Flex direction={"column"}>
                  <Flex gap={1}>
                    <Text
                      fontWeight={"700"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      PEDIDO
                    </Text>
                  </Flex>
                  <Input
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
                      required={true}
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
                    value={getValue(
                      [
                        { label: "Pendente", value: 0 },
                        { label: "Pago", value: 1 },
                      ],
                      "status"
                    )}
                  />
                </Flex>
                <Flex direction={"column"}>
                  <DatePickerGenericoFinanceiro
                    registerForm={registerForm}
                    nomeLabel="DATA PAGAMENTO"
                    propName={"data_pagamento"}
                    data={data_Pagamento}
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
              <Button
                h={"56px"}
                borderRadius={"8px"}
                variant="ghost"
                color="red.500"
                onClick={() => handleCancelar()}
                _hover={{
                  background: "red.600",
                  transition: "all 0.4s",
                  color: "white",
                }}
                // mx={12}
                fontSize={"18px"}
                fontWeight={"700"}
                fontFamily={"Mulish"}
                width={"208px"}
              >
                {/* <Text fontSize="16px" fontWeight={"bold"}> */}
                Cancelar
                {/* </Text> */}
              </Button>
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

export default ModalEditar;
