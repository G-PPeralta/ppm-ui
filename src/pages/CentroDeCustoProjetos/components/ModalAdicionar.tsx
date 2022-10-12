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
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";

import BotaoAzulPrimary from "components/BotaoAzul/BotaoAzulPrimary";
import BotaoVermelhoGhost from "components/BotaoVermelho/BotaoVermelhoGhost";
import { RequiredField } from "components/RequiredField/RequiredField";
import SelectFiltragem from "components/SelectFiltragem";

import { regexCaracteresEspeciais } from "utils/regex";

import { useCentroDeCusto } from "hooks/useCentroDeCusto";

import DateTimePickerData from "./DateTimePickerData";

interface RefreshState {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Props {
  refreshState: RefreshState;
}

function ModalAdicionar({ refreshState }: Props) {
  const { refresh, setRefresh } = refreshState;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, registerForm } = useCentroDeCusto();

  const optionsFornecedor = [
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

  return (
    <>
      <Button
        h={"56px"}
        borderRadius={"10px"}
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
              LANÇAR DESPESA
            </Text>
            <Flex direction={"column"} gap={4}>
              <Flex gap={4}>
                <Flex direction={"column"}>
                  <Flex gap={1}>
                    <RequiredField />
                    <Text
                      fontWeight={"bold"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      VALOR
                    </Text>
                  </Flex>
                  <Input
                    h={"56px"}
                    isRequired
                    placeholder="Valor"
                    id="valor"
                    type="text"
                    name="valor"
                    value={regexCaracteresEspeciais(registerForm.values.valor)}
                    onChange={registerForm.handleChange}
                    maxLength={30}
                  />
                </Flex>
                <Flex direction={"column"}>
                  <DateTimePickerData registerForm={registerForm} />
                </Flex>
              </Flex>
              <Flex gap={4} w={"43%"}>
                <SelectFiltragem
                  registerForm={registerForm}
                  nomeSelect={"FORNECEDOR"}
                  propName={"fornecedorId"}
                  options={optionsFornecedor}
                  required={true}
                />
              </Flex>
              <Flex gap={4} w={"87%"}>
                <SelectFiltragem
                  registerForm={registerForm}
                  nomeSelect={"CLASSE DE SERVIÇO"}
                  propName={"classeDeServicoId"}
                  options={optionsClasseDeServico}
                  required={true}
                />
                <Flex direction={"column"}>
                  <Flex gap={1}>
                    <RequiredField />
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
                    <RequiredField />
                    <Text
                      fontWeight={"bold"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      TEXTO DO PEDIDO
                    </Text>
                  </Flex>
                  <Textarea
                    isRequired
                    placeholder="Ação ou recomendação"
                    id="textoDoPedido"
                    name="textoDoPedido"
                    value={regexCaracteresEspeciais(
                      registerForm.values.textoDoPedido
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
              <BotaoVermelhoGhost
                text={"Cancelar"}
                formikForm={registerForm}
                onClose={onClose}
              />
              <BotaoAzulPrimary
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
