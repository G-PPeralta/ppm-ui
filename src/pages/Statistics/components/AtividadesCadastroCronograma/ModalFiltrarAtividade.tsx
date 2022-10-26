import { useState } from "react";
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
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

// import BotaoAzulLargoPrimary from "components/BotaoAzulLargo/BotaoAzulLargoPrimary";
import BotaoVermelhoLargoGhost from "components/BotaoVermelhoLargo/BotaoVermelhoLargoGhost";
import DatePickerModal from "components/DatePickerGenerico/DatePickerModal";
import SelectFiltragem from "components/SelectFiltragem";

import { useToast } from "contexts/Toast";

import { useFiltragemCronogramaAtividade } from "hooks/useFiltragemCronogramaAtividade";

import { getDataIdPoco } from "services/get/FiltroCronograma";
import { postFiltroCronograma } from "services/post/FiltroCronograma";

export function ModalFiltrarAtividade({
  refresh,
  setRefresh,
  setDuracao,
  setOperacao,
  setOpcoesFiltro,
  setDataInicio,
  filterData,
}: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, pocos, sonda, metodoElevacao, loading } =
    useFiltragemCronogramaAtividade();
  const { toast } = useToast();
  const [loadingBtn, setLoading] = useState(false);

  const optionsPocos = pocos.map((poco: any) => ({
    value: poco.id,
    label: poco.nom_atividade,
  }));

  const optionsSondas = sonda.map((_sonda: any) => ({
    value: _sonda.id,
    label: _sonda.nom_atividade,
  }));

  const optionsMetodo = metodoElevacao.map((metodo: any) => ({
    value: metodo.id,
    label: metodo.metodo,
  }));

  const getFilter = async () => {
    const payload = {
      pocoId: registerForm.values.pocoId,
      sondaId: registerForm.values.sondaId,
      profundidadeIni: registerForm.values.profundidadeIni,
      profundidadeFim: registerForm.values.profundidadeFim,
      metodoElevacaoId: registerForm.values.metodoElevacaoId,
      dataDe: registerForm.values.dataDe,
      dataAte: registerForm.values.dataAte,
    };
    setLoading(true);
    const result = await postFiltroCronograma(payload);
    const dataIni = await getDataIdPoco(registerForm.values.pocoId);
    setLoading(false);
    if (result && result.length > 0) {
      setOperacao(result[0].id_operacao);
      setDuracao(result[0].hrs_media);
      if (dataIni && dataIni.length > 0) {
        setDataInicio(dataIni[0].prox_ini);
      }
      setOpcoesFiltro({
        duracao: result[0].hrs_media,
        operacao: result[0].id_operacao,
        dataInicio: dataIni[0].prox_ini,
      });
      filterData({
        duracao: result[0].hrs_media,
        operacao: result[0].id_operacao,
        dataInicio: dataIni[0].prox_ini,
      });
      onClose();
    } else {
      toast.error("Nenhum registro encontrado!", {
        id: "toast-filtro-operacao",
      });
    }
  };

  return (
    <>
      <MdFilterAlt onClick={onOpen} color="#0047BB" size="22px" />
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
                      options={optionsPocos}
                      required={true}
                    />
                  </Flex>
                  <Flex direction={"row"} height="56px" gap={3}>
                    <Flex>
                      <SelectFiltragem
                        width={true}
                        registerForm={registerForm}
                        nomeSelect={"SONDA"}
                        propName={"sondaId"}
                        options={optionsSondas}
                        required={true}
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
                            PRODUNDIDADE DE
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
                            PRODUNDIDADE ATE
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
                        nomeSelect={"Metodo Elevação"}
                        propName={"metodoElevacaoId"}
                        options={optionsMetodo}
                        required={true}
                      />
                    </Flex>
                    <Flex direction={"column"} grow={1} marginLeft="16px">
                      <Flex gap={1}>
                        <Text fontSize={"12px"} color={"#949494"}>
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
                        <Text fontSize={"12px"} color={"#949494"}>
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
                  // disabled={!registerForm.isValid}
                  background="origem.300"
                  variant="primary"
                  color="white"
                  onClick={getFilter}
                  height="56px"
                  width={174}
                  disabled={
                    !registerForm.values.pocoId || !registerForm.values.sondaId
                  }
                >
                  {loadingBtn ? (
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
