import { useEffect } from "react";
import { MdModeEdit } from "react-icons/md";

import {
  Button,
  Flex,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";

import BotaoAzulLargoPrimary from "components/BotaoAzulLargo/BotaoAzulLargoPrimary";
import SelectFiltragem from "components/SelectFiltragem";

import { regexCaracteresEspeciais } from "utils/regex";

import { useCentroDeCusto } from "hooks/useCentroDeCusto";

import DateTimePickerData from "./DateTimePickerData";

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
}

function ModalEditar({ refreshState, linhaTabela }: Props) {
  const { refresh, setRefresh } = refreshState;
  const { loading, registerForm } = useCentroDeCusto(linhaTabela.idCusto);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const optionsPrestadorServico = [
    {
      value: 1,
      label: "Fornecedor 1",
    },
    {
      value: 2,
      label: "Fornecedor 2",
    },
    {
      value: 3,
      label: "Fornecedor 3",
    },
  ];

  const optionsClasseDeServico = [
    {
      value: 1,
      label: "Classe de Serviço 1",
    },
    {
      value: 2,
      label: "Classe de Serviço 2",
    },
    {
      value: 3,
      label: "Classe de Serviço 3",
    },
  ];

  const setInicialValues = () => {
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
            fontSize={"1em"}
          >
            Gestão de Custos
          </ModalHeader>

          <ModalBody mt={3}>
            <Text fontWeight={"bold"} mb={3}>
              EDITAR DESPESA
            </Text>
            <Flex direction={"column"} gap={4}>
              <Flex gap={4}>
                <Flex direction={"column"}>
                  <Flex gap={1}>
                    <Text
                      fontWeight={"bold"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      VALOR
                    </Text>
                  </Flex>
                  <NumberInput
                    h={"56px"}
                    precision={2}
                    max={9999999}
                    min={0}
                    id="valor"
                    name="valor"
                    value={registerForm.values.valor}
                    onChange={(value) =>
                      registerForm.setFieldValue("valor", Number(value))
                    }
                  >
                    <NumberInputField bg={"#fff"} h={"56px"} />
                  </NumberInput>
                </Flex>
                <Flex direction={"column"}>
                  <DateTimePickerData
                    registerForm={registerForm}
                    value={registerForm.values.data}
                  />
                </Flex>
              </Flex>
              <Flex gap={4} w={"43%"}>
                <SelectFiltragem
                  registerForm={registerForm}
                  nomeSelect={"PRESTADOR DE SERVIÇO"}
                  propName={"prestadorServicoId"}
                  options={optionsPrestadorServico}
                  value={getValue(
                    optionsPrestadorServico,
                    "prestadorServicoId"
                  )}
                />
              </Flex>
              <Flex gap={4} w={"87%"}>
                <SelectFiltragem
                  registerForm={registerForm}
                  nomeSelect={"CLASSE DE SERVIÇO"}
                  propName={"classeDeServicoId"}
                  options={optionsClasseDeServico}
                  value={getValue(optionsClasseDeServico, "classeDeServicoId")}
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
                borderRadius={"10px"}
                variant="ghost"
                color="red"
                onClick={() => handleCancelar()}
                _hover={{
                  background: "red.500",
                  transition: "all 0.4s",
                  color: "white",
                }}
              >
                <Text fontSize="16px" fontWeight={"bold"} mx={12}>
                  Cancelar
                </Text>
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
