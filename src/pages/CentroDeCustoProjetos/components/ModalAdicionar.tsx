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
}

function ModalAdicionar({
  refreshState,
  idProjeto,
  optionsSelects,
  mes,
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
            Lançar Despesa
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
              LANÇAR DESPESA
            </Text> */}
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
                    nomeLabel="Data"
                    propName={"data"}
                    required={true}
                    esconderHorario
                  />
                </Flex>
              </Flex>
              <Flex gap={4} w={"43%"}>
                <SelectFiltragem
                  registerForm={registerForm}
                  nomeSelect={"PRESTADOR DE SERVIÇO"}
                  propName={"prestadorServicoId"}
                  options={optionsFornecedores}
                  required={true}
                />
              </Flex>
              <Flex gap={4} w={"87%"}>
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
