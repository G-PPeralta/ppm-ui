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

  const setInicialValues = async () => {
    registerForm.setFieldValue("valor", parserString(linhaTabela.valor));
    registerForm.setFieldValue("data", linhaTabela.dataPagamento);
    setDataPagamento(new Date(linhaTabela.dataPagamento));
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

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
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
            {/* <Text
              fontSize={"18px"}
              fontWeight={"700"}
              fontFamily={"Mulish"}
              mb={3}
              color={"#2D2926"}
            >
              EDITAR DESPESA
            </Text> */}
            <Flex direction={"column"} gap={4}>
              <Flex gap={4}>
                <Flex direction={"column"}>
                  <InputGroup>
                    <InputGenerico
                      registerForm={registerForm}
                      nomeInput={"Valor Previsto"}
                      propName={"valor"}
                      value={
                        registerForm.values.valor && registerForm.values.valor
                      }
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
                    propName={"data"}
                    nomeLabel="Data"
                    required={true}
                    data={dataPagamento}
                    esconderHorario
                    mes={mes}
                  />
                </Flex>
              </Flex>
              <Flex gap={4} w={"43%"}>
                <SelectFiltragem
                  registerForm={registerForm}
                  nomeSelect={"PRESTADOR DE SERVIÇO"}
                  propName={"prestadorServicoId"}
                  options={optionsFornecedores}
                  value={getValue(optionsFornecedores, "prestadorServicoId")}
                />
              </Flex>
              <Flex gap={4} w={"87%"}>
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
                      fontWeight={"bold"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      PEDIDO
                    </Text>
                  </Flex>
                  <Input
                    h={"56px"}
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
                <Flex direction={"column"} flex={1}>
                  <Flex gap={1}>
                    <Text
                      fontWeight={"bold"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      DESCRIÇÃO DO SERVIÇO
                    </Text>
                  </Flex>
                  <Textarea
                    isRequired
                    placeholder="Ação ou recomendação"
                    id="descricaoDoServico"
                    name="descricaoDoServico"
                    value={regexCaracteresEspeciais(
                      registerForm.values.descricaoDoServico
                    )}
                    onChange={registerForm.handleChange}
                    maxLength={255}
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
