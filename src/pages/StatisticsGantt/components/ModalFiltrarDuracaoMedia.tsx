import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RiFilterFill, RiFilterOffFill } from "react-icons/ri";

import {
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalCloseButton,
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

import DatePickerModal from "components/DatePickerGenerico/DatePickerModal";
import SelectFiltragem from "components/SelectFiltragem";

import { handleCancelar } from "utils/handleCadastro";

import { useToast } from "contexts/Toast";

import { useFiltragemCronogramaAtividade } from "hooks/useFiltragemCronogramaAtividade";
import { useRequests } from "hooks/useRequests";

import { postFiltroDuracaoMedia } from "services/post/FiltroCronograma";

export function ModalFiltrarDuracaoMedia({
  // refresh,
  // setRefresh,
  // setDuracao,
  // setOperacao,
  operacaoId,
  setMediaHorasFiltradas,
}: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const { registerForm } = useFiltragemCronogramaAtividade();
  const {
    optionsPocosOperacoes,
    optionsSondasOperacoes,
    optionsMetodosElevacao,
  } = useRequests();
  // const [responsePOST, setResponsePOST] = useState([]);

  // const isEnable = () =>
  //   registerForm.values.pocoId ||
  //   registerForm.values.sondaId ||
  //   registerForm.values.profundidadeIni ||
  //   registerForm.values.profundidadeFim ||
  //   registerForm.values.metodoElevacaoId ||
  //   (registerForm.values.dataDe && registerForm.values.dataAte);

  const getFilter = async () => {
    const payload = {
      idOperacao: operacaoId,
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

    try {
      setLoading(true);
      const res = await postFiltroDuracaoMedia(payload);

      // setDuracao(23, 30);
      // registerFormAct.values.atividades[index].duracao += 3;
      if (res) {
        // setOperacao(result[0].operacao_id);
        // setDuracao(result[0].hrs_media);
        setMediaHorasFiltradas(Number(res));
      }
      onClose();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao executar filtro!", {
        id: "toast-principal",
      });
      setLoading(false);
    }
  };

  const getValue = (options: any, index: number) => ({
    value: options?.[index]?.value,
    label: options?.[index]?.label,
  });

  const getValueByOptionId = (options: any, id: number) => {
    const index = options.findIndex((option: any) => option.value === id);
    return getValue(options, index);
  };

  const handleClearFilter = () => {
    registerForm.setFieldValue("pocoId", 0);
    registerForm.setFieldValue("sondaId", 0);
    registerForm.setFieldValue("profundidadeIni", 0);
    registerForm.setFieldValue("profundidadeFim", 0);
    registerForm.setFieldValue("metodoElevacao", "");
    registerForm.setFieldValue("metodoElevacaoId", 0);
    registerForm.setFieldValue("dataDe", "");
    registerForm.setFieldValue("dataAte", "");
  };

  // useEffect(() => {
  //   const getOperacaoPorOperacaoId: any = responsePOST.find(
  //     (operacao: any) => operacao.id_operacao === operacaoId
  //   );
  //   if (getOperacaoPorOperacaoId) {
  //     setMediaHorasFiltradas(getOperacaoPorOperacaoId.hrs_media);
  //   } else {
  //     setMediaHorasFiltradas(0);
  //   }
  // }, [responsePOST]);

  return (
    <>
      <IconButton
        aria-label="Botão de Editar"
        icon={<RiFilterFill size={24} />}
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
          <ModalCloseButton
            color={"white"}
            onClick={() => handleCancelar(registerForm, onClose)}
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              registerForm.handleSubmit(e);
            }}
          >
            <ModalBody mt={3}>
              {/* {!loading ? ( */}
              <Flex direction={"column"} width="580px" height={"auto"} gap={7}>
                <Flex direction={"row"} height="56px">
                  <SelectFiltragem
                    width={true}
                    registerForm={registerForm}
                    nomeSelect={"CAMPO"}
                    propName={"pocoId"}
                    options={optionsPocosOperacoes}
                    required={false}
                    value={getValueByOptionId(
                      optionsPocosOperacoes,
                      registerForm.values.pocoId
                    )}
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
                      value={getValueByOptionId(
                        optionsSondasOperacoes,
                        registerForm.values.sondaId
                      )}
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
                        value={registerForm.values.profundidadeIni}
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
                        value={registerForm.values.profundidadeFim}
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
                      value={getValueByOptionId(
                        optionsMetodosElevacao,
                        registerForm.values.metodoElevacaoId
                      )}
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
              {/* ) : (
                <Ring speed={2} lineWeight={5} color="white" size={72} />
              )} */}
            </ModalBody>
            <ModalFooter justifyContent={"center"}>
              <Flex gap={2}>
                <Button
                  variant="ghost"
                  color="red.500"
                  onClick={() => handleClearFilter()}
                  _hover={{
                    background: "red.600",
                    transition: "all 0.4s",
                    color: "white",
                  }}
                  w={"208px"}
                  h={"56px"}
                  fontSize={"18px"}
                  fontWeight={"700"}
                  borderRadius={"8px"}
                  fontFamily={"Mulish"}
                  rightIcon={<RiFilterOffFill />}
                >
                  Remover Filtros
                </Button>
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
                  rightIcon={<FiSearch />}
                  // isDisabled={!isEnable()}
                  onClick={getFilter}
                  _hover={{
                    background: "origem.600",
                    transition: "all 0.4s",
                  }}
                >
                  {loading ? (
                    <Ring speed={2} lineWeight={5} color="white" size={24} />
                  ) : (
                    <>
                      <Text
                        fontSize={"18px"}
                        fontWeight={"700"}
                        fontFamily={"Mulish"}
                      >
                        Filtrar
                      </Text>
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
