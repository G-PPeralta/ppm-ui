import { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";

import {
  Flex,
  Text,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  FormControl,
  Stack,
  Textarea,
  Alert,
  AlertIcon,
  AlertTitle,
  ModalCloseButton,
  Button,
  Progress,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { ProjetoTipo } from "interfaces/CadastrosModaisInfograficos";

import { formatDate } from "utils/formatDate";
import { handleCadastrarRefresh, handleCancelar } from "utils/handleCadastro";

import { useCadastroIntervencao } from "hooks/useCadastroIntervencao";

import {
  getAtividadasByProjetosTipoId,
  getProjetosTipo,
  getServicoDataIntervencaoId,
} from "services/get/CadastroModaisInfograficos";

import SelectFiltragem from "../../../components/SelectFiltragem";
import AtividadesCadastroIntervencao from "./AtividadesCadastroIntervencao";
import DateTimePickerDataInicio from "./DateTimePickerDataInicio";

function ModalCadastroIntervencao({
  idCampanha,
  data,
  refresh,
  setRefresh,
  listaServicosPocos,
}: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    registerForm,
    loading,
    listaSondaCampanha,
    listaAtividadesPrecedentes,
  } = useCadastroIntervencao();

  const [listaProjetos, setListaProjetos] = useState<any>([]);
  const [dataLimite, setDataLimite] = useState<any>("");
  const [valueProgressoMensagemErro, setValueProgressoMensagemErro] =
    useState<number>(100);
  const [dataFinalPrevista, setDataFinalPrevista] = useState<any>("");

  const innerWidth = window.innerWidth;

  const optionsPocos = listaServicosPocos.map((poco: any) => ({
    value: poco.nom_poco,
    label: poco.nom_poco,
  }));

  const optionsProjetoTipo = listaProjetos.map((projetoTipo: ProjetoTipo) => ({
    value: projetoTipo.id,
    label: projetoTipo.nom_projeto_tipo,
  }));

  const optionsSondaCampanha = listaSondaCampanha.map((sondaCampanha: any) => ({
    value: sondaCampanha.id,
    label: sondaCampanha.nom_campanha,
  }));

  const reqGetAtividadesByProjetoTipoId = async (id: number) => {
    if (id === 0) {
      registerForm.setFieldValue("atividades", [
        {
          id_origem: "",
          area_id: 0,
          tarefa_id: 0,
          qtde_dias: 0,
          precedentes: listaAtividadesPrecedentes,
        },
      ]);
    } else {
      const atividades = await getAtividadasByProjetosTipoId(id);

      const atividadesFormatadas = atividades.data.map((atividade: any) => ({
        id_origem: atividade.nome_atividade,
        area_id: atividade.id_area,
        tarefa_id: atividade.id_tarefa,
        qtde_dias: atividade.qtde_dias,
        precedentes: atividade.precedentes,
        ind_atv_execucao: false,
      }));

      registerForm.setFieldValue("atividades", atividadesFormatadas);
    }
  };

  const handleClick = async () => {
    const projetos = await getProjetosTipo();
    const projetosTipoSorted = projetos.data.sort(
      (a: ProjetoTipo, b: ProjetoTipo) =>
        a.nom_projeto_tipo.localeCompare(b.nom_projeto_tipo)
    );
    setListaProjetos(projetosTipoSorted);
    onOpen();
  };

  const handleDataLimite = async () => {
    const pocoCompleto = listaServicosPocos.filter(
      (poco: any) => poco.nom_poco === registerForm.values.poco_id
    );

    const { data } = await getServicoDataIntervencaoId(
      registerForm.values.projeto_tipo_id,
      new Date(registerForm.values.dat_ini_prev).toISOString(),
      pocoCompleto[0].dat_ini_limite
    );

    const { cod_erro } = data;

    if (cod_erro === 0) {
      registerForm.setFieldValue("erroDataIntervencao", false);
    } else if (cod_erro === null) {
      registerForm.setFieldValue("erroDataIntervencao", false);
    } else {
      registerForm.setFieldValue("erroDataIntervencao", true);
    }

    const quantidadeDias = registerForm.values.atividades.reduce(
      (acc: number, atividade: any) => acc + atividade.qtde_dias,
      0
    );

    const dataInicio = new Date(registerForm.values.dat_ini_prev);
    const dataFimPrevista = new Date(
      dataInicio.setDate(dataInicio.getDate() + quantidadeDias)
    );
    setDataFinalPrevista(dataFimPrevista);

    if (dataFimPrevista > dataLimite) {
      registerForm.setFieldValue("erroDataIntervencao", true);
    }
  };

  useEffect(() => {
    registerForm.setFieldValue("id_campanha", idCampanha);
    setRefresh(!refresh);
  }, []);

  useEffect(() => {
    if (registerForm.values.id_campanha !== idCampanha) {
      registerForm.setFieldValue("id_campanha", idCampanha);
    }
  }, [registerForm.values]);

  useEffect(() => {
    reqGetAtividadesByProjetoTipoId(registerForm.values.projeto_tipo_id);
  }, [registerForm.values.projeto_tipo_id]);

  useEffect(() => {
    if (
      registerForm.values.dat_ini_prev !== new Date(data) &&
      registerForm.values.projeto_tipo_id !== 0 &&
      registerForm.values.poco_id !== 0
    ) {
      handleDataLimite();
    }
    setValueProgressoMensagemErro(100);
    if (registerForm.values.erroDataIntervencao) {
      const interval = setInterval(() => {
        setValueProgressoMensagemErro((value) => {
          if (value === 0) {
            return 0;
          }
          return value - 1;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [
    registerForm.values.dat_ini_prev,
    registerForm.values.projeto_tipo_id,
    registerForm.values.poco_id,
    registerForm.values.atividades,
  ]);

  useEffect(() => {
    if (
      registerForm.values.dat_ini_prev !== new Date(data) &&
      registerForm.values.projeto_tipo_id !== 0 &&
      registerForm.values.poco_id !== 0
    ) {
      const poco = listaServicosPocos.filter(
        (poco: any) => poco.nom_poco === registerForm.values.poco_id
      );
      const dataPoco = poco[0].dat_ini_limite;

      setDataLimite(dataPoco);
      registerForm.setFieldValue("data_limite", dataPoco);
    }
  }, [registerForm.values.erroDataIntervencao, registerForm.values.poco_id]);

  useEffect(() => {
    if (registerForm.values.poco_id !== "") {
      const poco = listaServicosPocos.filter(
        (poco: any) => poco.nom_poco === registerForm.values.poco_id
      );
      const dataPoco = poco[0].dat_ini_limite;
      registerForm.setFieldValue("data_limite", dataPoco);
    }
  }, [registerForm.values.poco_id]);

  useEffect(() => {
    if (registerForm.values.poco_id.split("-")[0] === "0 ") {
      registerForm.setFieldValue("nova_campanha", true);
    } else {
      registerForm.setFieldValue("nova_campanha", false);
    }
  }, [registerForm.values.poco_id]);

  useEffect(() => {
    setValueProgressoMensagemErro(100);
  }, [dataLimite]);

  return (
    <>
      <Flex
        mt={2}
        py={3}
        w="220px"
        border={"2px"}
        borderStyle={"dashed"}
        borderColor={"origem.500"}
        borderRadius={"3xl"}
        direction={"column"}
        gap={4}
        align={"center"}
        justify={"center"}
        _hover={{
          cursor: "pointer",
          backgroundColor: "grey.100",
          transition: "all 0.4s",
        }}
        onClick={() => handleClick()}
        mb={3}
      >
        <IconButton
          aria-label="Plus sign"
          icon={<BsPlusLg />}
          background="origem.300"
          variant="secondary"
          color="white"
          isRound={true}
          size="md"
        />

        <Text color={"origem.500"} fontWeight={600} textAlign={"center"}>
          Cadastrar Intervenção
        </Text>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
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
            Cadastrar Nova Intervenção/Perfuração
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
              {!loading ? (
                <FormControl>
                  <Flex direction={"column"} gap={4}>
                    <Stack>
                      {/* <Text fontWeight={"bold"}>Nome</Text> */}
                      <Flex
                        direction={innerWidth >= 460 ? "row" : "column"}
                        gap={5}
                      >
                        <SelectFiltragem
                          registerForm={registerForm}
                          nomeSelect={"SONDA"}
                          propName={"id_campanha"}
                          options={optionsSondaCampanha}
                          idCampanha={idCampanha}
                          isDisabled={true}
                        />
                        <SelectFiltragem
                          registerForm={registerForm}
                          nomeSelect={"POÇO"}
                          propName={"poco_id"}
                          options={optionsPocos}
                          required={true}
                        />
                        <DateTimePickerDataInicio registerForm={registerForm} />
                      </Flex>
                    </Stack>

                    <Flex justify={"space-between"}>
                      <Flex flexDirection={"row"} gap={4} w={"50%"}>
                        <SelectFiltragem
                          registerForm={registerForm}
                          nomeSelect={"PROJETO"}
                          propName={"projeto_tipo_id"}
                          options={optionsProjetoTipo}
                          required={true}
                        />
                      </Flex>
                      {dataFinalPrevista !== "" && (
                        <Flex direction={"column"}>
                          <Flex gap={1}>
                            <Text
                              fontWeight={"bold"}
                              fontSize={"12px"}
                              color={"#949494"}
                            >
                              DATA FINAL PREVISTA
                            </Text>
                          </Flex>
                          <Button
                            isDisabled={true}
                            h={"56px"}
                            variant="outline"
                            px={5}
                            minW={"220px"}
                          >
                            {formatDate(dataFinalPrevista)}
                          </Button>
                        </Flex>
                      )}
                    </Flex>

                    {registerForm.values.erroDataIntervencao && (
                      <Flex direction={"column"}>
                        <Alert colorScheme={"red"} variant={"solid"}>
                          <AlertIcon />
                          <AlertTitle>ATENÇÃO:</AlertTitle>
                          <Text>
                            {`O planejamento configurado ultrapassa a data de início
                              de execução do poço selecionado, previsto para ser iniciado na data ${formatDate(
                                dataLimite
                              )}.`}
                          </Text>
                        </Alert>
                        <Progress
                          hasStripe
                          size="sm"
                          value={valueProgressoMensagemErro}
                          colorScheme={"red"}
                          isAnimated={true}
                        />
                      </Flex>
                    )}

                    <AtividadesCadastroIntervencao
                      registerForm={registerForm}
                      listaAtividadesPrecedentes={listaAtividadesPrecedentes}
                    />

                    <Stack>
                      <FormControl>
                        <Flex gap={1}>
                          <Text
                            fontWeight={"bold"}
                            fontSize={"12px"}
                            color={"#949494"}
                          >
                            COMENTÁRIOS
                          </Text>
                        </Flex>
                        <Textarea
                          isRequired
                          placeholder="Adicione comentários sobre a intervenção"
                          id="comentarios"
                          name="comentarios"
                          value={registerForm.values.comentarios}
                          onChange={registerForm.handleChange}
                          maxLength={255}
                          _placeholder={{ color: "#949494" }}
                          fontSize={"14px"}
                          fontWeight={"400"}
                        />
                      </FormControl>
                    </Stack>
                  </Flex>
                </FormControl>
              ) : (
                <Ring speed={2} lineWeight={5} color="white" size={72} />
              )}
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Flex gap={2}>
                <Button
                  h={"56px"}
                  variant="ghost"
                  color="red.500"
                  w={"208px"}
                  onClick={() => {
                    setDataFinalPrevista("");
                    handleCancelar(registerForm, onClose);
                  }}
                  _hover={{
                    background: "red.600",
                    transition: "all 0.4s",
                    color: "white",
                  }}
                  fontSize={"18px"}
                  fontWeight={"700"}
                  borderRadius={"8px"}
                  fontFamily={"Mulish"}
                >
                  <Text
                    fontSize="18px"
                    fontWeight={"700"}
                    fontFamily={"Mulish"}
                    mx={12}
                  >
                    Cancelar
                  </Text>
                </Button>
                <Button
                  w={"208px"}
                  h={"56px"}
                  borderRadius={"8px"}
                  disabled={
                    !registerForm.isValid ||
                    !registerForm.dirty ||
                    registerForm.values.atividades.every(
                      (atividade: any) => atividade.ind_atv_execucao === false
                    )
                  }
                  background={"origem.500"}
                  fontSize={"18px"}
                  fontWeight={"700"}
                  fontFamily={"Mulish"}
                  variant="primary"
                  color="white"
                  onClick={() =>
                    handleCadastrarRefresh(
                      registerForm,
                      onClose,
                      setRefresh,
                      refresh
                    )
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
                      <Text
                        fontSize="18px"
                        fontWeight={"700"}
                        fontFamily={"Mulish"}
                        mx={12}
                      >
                        Cadastrar
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

export default ModalCadastroIntervencao;
