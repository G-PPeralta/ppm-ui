import { useEffect, useState } from "react";
import { MdFilterAlt } from "react-icons/md";

import {
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Flex,
  ModalFooter,
  FormControl,
  Text,
  NumberInputField,
  NumberInput,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import BotaoVermelhoLargoGhost from "components/BotaoVermelhoLargo/BotaoVermelhoLargoGhost";
import DatePickerModal from "components/DatePickerGenerico/DatePickerModal";
import SelectFiltragem from "components/SelectFiltragem";

import { useFiltragemCronogramaAtividade } from "hooks/useFiltragemCronogramaAtividade";
import { useRequests } from "hooks/useRequests";

import { postFiltroCronograma } from "services/post/FiltroCronograma";

export function ModalFiltrarAtividade({
  refresh,
  setRefresh,
  setDuracao,
  setOperacao,
  operacaoId,
  setMediaHorasFiltradas,
}: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm } = useFiltragemCronogramaAtividade();
  const {
    optionsPocosOperacoes,
    optionsSondasOperacoes,
    optionsMetodosElevacao,
  } = useRequests();
  const [loading, setLoading] = useState(false);
  const [responsePOST, setResponsePOST] = useState([]);

  // console.log("operacaoId", operacaoId);

  const getFilter = async () => {
    const payload = {
      pocoId: registerForm.values.pocoId,
      sondaId: registerForm.values.sondaId,
      profundidadeIni: registerForm.values.profundidadeIni,
      profundidadeFim: registerForm.values.profundidadeFim,
      metodoElevacao: optionsMetodosElevacao
        ? optionsMetodosElevacao.find(
            (x) => x.value == registerForm.values.metodoElevacaoId
          )?.label
        : "",
      metodoElevacaoId: registerForm.values.metodoElevacaoId,
      dataDe: registerForm.values.dataDe,
      dataAte: registerForm.values.dataAte,
    };
    setLoading(true);
    const result = await postFiltroCronograma(payload);
    setResponsePOST(result);
    onClose();

    setLoading(false);
    // setDuracao(23, 30);
    // registerFormAct.values.atividades[index].duracao += 3;
    if (result && result.length > 0) {
      setOperacao(result[0].operacao_id);
      setDuracao(result[0].hrs_media);
    }
  };

  useEffect(() => {
    const getOperacaoPorOperacaoId: any = responsePOST.find(
      (operacao: any) => operacao.id_operacao === operacaoId
    );
    if (getOperacaoPorOperacaoId) {
      setMediaHorasFiltradas(getOperacaoPorOperacaoId.hrs_media);
    } else {
      setMediaHorasFiltradas(0);
    }
  }, [responsePOST]);

  // console.log("registerForm", registerForm.values);
  // console.log("responsePOST", responsePOST);

  return (
    <>
      <IconButton
        aria-label="Botão de Editar"
        icon={<MdFilterAlt size={24} />}
        w={"56px"}
        h={"56px"}
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
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
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
            Filtrar
          </ModalHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              registerForm.handleSubmit(e);
            }}
          >
            <ModalBody mt={3}>
              {!loading ? (
                <Flex
                  direction={"column"}
                  width="580px"
                  height={"auto"}
                  gap={7}
                >
                  <Flex direction={"row"} height="56px">
                    <SelectFiltragem
                      width={true}
                      registerForm={registerForm}
                      nomeSelect={"POÇO"}
                      propName={"pocoId"}
                      options={optionsPocosOperacoes}
                      required={false}
                    />
                  </Flex>
                  <Flex direction={"row"} height="56px" gap={3}>
                    <Flex>
                      <SelectFiltragem
                        width={true}
                        registerForm={registerForm}
                        nomeSelect={"SONDA"}
                        propName={"sondaId"}
                        options={optionsSondasOperacoes}
                        required={false}
                      />
                    </Flex>
                    <Flex direction={"column"}>
                      <FormControl>
                        <Flex gap={1}>
                          <Text
                            fontWeight={"bold"}
                            fontSize={"12px"}
                            color={"#949494"}
                          >
                            PROFUNDIDADE DE
                          </Text>
                        </Flex>

                        <NumberInput
                          max={999999}
                          min={0}
                          id={`profundidadeIni`}
                          name={`profundidade`}
                          // value={registerForm.values.profundidade}
                          onChange={(value) => {
                            registerForm.setFieldValue(
                              `profundidadeIni`,
                              Number(value)
                            );
                          }}
                        >
                          <NumberInputField bg={"#fff"} h={"56px"} />
                        </NumberInput>
                      </FormControl>
                    </Flex>
                    <Flex direction={"column"}>
                      <FormControl>
                        <Flex gap={1}>
                          <Text
                            fontWeight={"bold"}
                            fontSize={"12px"}
                            color={"#949494"}
                          >
                            PROFUNDIDADE ATE
                          </Text>
                        </Flex>

                        <NumberInput
                          max={999999}
                          min={0}
                          id={`profundidadeFim`}
                          name={`profundidade`}
                          // value={registerForm.values.profundidade}
                          onChange={(value) => {
                            registerForm.setFieldValue(
                              `profundidadeFim`,
                              Number(value)
                            );
                          }}
                        >
                          <NumberInputField bg={"#fff"} h={"56px"} />
                        </NumberInput>
                      </FormControl>
                    </Flex>
                  </Flex>
                  <Flex direction={"row"}>
                    <Flex>
                      <SelectFiltragem
                        width={true}
                        registerForm={registerForm}
                        nomeSelect={"METODO DE ELEVAÇÃO"}
                        propName={"metodoElevacaoId"}
                        options={optionsMetodosElevacao}
                        required={false}
                      />
                    </Flex>
                    <Flex direction={"column"} grow={1} marginLeft="16px">
                      <Flex gap={1}>
                        <Text
                          fontWeight={"700"}
                          fontSize={"12px"}
                          color={"#949494"}
                        >
                          DATA INÍCIO
                        </Text>
                      </Flex>
                      <DatePickerModal
                        width="174px"
                        registerForm={registerForm}
                        propName={"dataDe"}
                        data={registerForm.values.dataDe}
                        dateFormat="dd/MM/yyyy"
                        locale="pt-BR"
                      />
                    </Flex>
                    <Flex
                      direction={"column"}
                      grow={1}
                      marginLeft="16px"
                      width={174}
                    >
                      <Flex gap={1}>
                        <Text
                          fontWeight={"700"}
                          fontSize={"12px"}
                          color={"#949494"}
                        >
                          DATA FIM
                        </Text>
                      </Flex>
                      <DatePickerModal
                        locale="pt-BR"
                        registerForm={registerForm}
                        propName={"dataAte"}
                        data={registerForm.values.dataAte}
                      />
                    </Flex>
                  </Flex>
                </Flex>
              ) : (
                <Ring speed={2} lineWeight={5} color="white" size={72} />
              )}
            </ModalBody>
            <ModalFooter justifyContent={"center"}>
              <Flex gap={2}>
                <BotaoVermelhoLargoGhost
                  text={"Cancelar"}
                  formikForm={registerForm}
                  onClose={onClose}
                />
                <Button
                  w={"208px"}
                  h={"56px"}
                  borderRadius={"8px"}
                  background={"origem.500"}
                  fontSize={"18px"}
                  fontWeight={"700"}
                  fontFamily={"Mulish"}
                  variant="primary"
                  color="white"
                  onClick={getFilter}
                  disabled={
                    !registerForm.values.pocoId || !registerForm.values.sondaId
                  }
                  _hover={{
                    background: "origem.600",
                    transition: "all 0.4s",
                  }}
                >
                  {loading ? (
                    <Ring speed={2} lineWeight={5} color="white" size={24} />
                  ) : (
                    <>
                      <Text>Buscar</Text>
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
