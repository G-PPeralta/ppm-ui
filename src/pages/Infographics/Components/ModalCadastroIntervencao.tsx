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
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import {
  ListaCampo,
  ProjetoTipo,
} from "interfaces/CadastrosModaisInfograficos";

import BotaoAzulPrimary from "components/BotaoAzul/BotaoAzulPrimary";
import BotaoVermelhoGhost from "components/BotaoVermelho/BotaoVermelhoGhost";
// import { RequiredField } from "components/RequiredField/RequiredField";

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
    listaCampos,
    listaSondaCampanha,
    listaAtividadesPrecedentes,
  } = useCadastroIntervencao();

  // console.log("idCampanha", idCampanha);
  // console.log("registerForm", registerForm.values);

  // const [erroDataIntervencao, setErroDataIntervencao] = useState(false);
  const [listaProjetos, setListaProjetos] = useState<any>([]);

  const innerWidth = window.innerWidth;

  const optionsPocos = listaServicosPocos.map((poco: any) => ({
    value: poco.id,
    label: poco.nom_poco,
  }));

  const optionsCampo = listaCampos.map((campo: ListaCampo) => ({
    value: campo.id,
    label: campo.campo,
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
          area_id: 0,
          tarefa_id: 0,
          responsavel_id: 0,
          qtde_dias: 0,
          precedentes: listaAtividadesPrecedentes,
        },
      ]);
    } else {
      const atividades = await getAtividadasByProjetosTipoId(id);

      const atividadesFormatadas = atividades.data.map((atividade: any) => ({
        area_id: atividade.id_area,
        tarefa_id: atividade.id_tarefa,
        responsavel_id: atividade.responsavel_id,
        qtde_dias: atividade.qtde_dias,
        precedentes: atividade.precedentes,
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
      (poco: any) => poco.id === registerForm.values.poco_id
    );

    const { data } = await getServicoDataIntervencaoId(
      registerForm.values.projeto_tipo_id,
      new Date(registerForm.values.dat_ini_prev).toISOString(),
      pocoCompleto[0].dat_ini_limite
    );

    const { cod_erro } = data;

    if (cod_erro === 0) {
      registerForm.setFieldValue("erroDataIntervencao", true);
      // setErroDataIntervencao(true);
    } else {
      registerForm.setFieldValue("erroDataIntervencao", false);
      // setErroDataIntervencao(false);
    }
  };

  useEffect(() => {
    // handleGet();
    registerForm.setFieldValue("id_campanha", idCampanha);
    // const newDate = new Date(data);
    // newDate.setDate(newDate.getDate() + 15);
    // registerForm.setFieldValue("dat_ini_prev", newDate);
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
  }, [
    registerForm.values.dat_ini_prev,
    registerForm.values.projeto_tipo_id,
    registerForm.values.poco_id,
  ]);

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
            fontSize={"1em"}
          >
            Cadastrar Nova Intervenção/Perfuração
          </ModalHeader>
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
                      <Text fontWeight={"bold"}>Nome</Text>
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
                        />
                        <SelectFiltragem
                          registerForm={registerForm}
                          nomeSelect={"POÇO"}
                          propName={"poco_id"}
                          options={optionsPocos}
                          required={true}
                        />
                        <SelectFiltragem
                          registerForm={registerForm}
                          nomeSelect={"CAMPO"}
                          propName={"campo_id"}
                          options={optionsCampo}
                          required={true}
                        />
                        <DateTimePickerDataInicio
                          registerForm={registerForm}
                          // data={data}
                        />
                      </Flex>
                    </Stack>

                    <Stack>
                      <Flex flexDirection={"row"} gap={4} w={"50%"}>
                        <SelectFiltragem
                          registerForm={registerForm}
                          nomeSelect={"PROJETO"}
                          propName={"projeto_tipo_id"}
                          options={optionsProjetoTipo}
                          required={true}
                        />
                      </Flex>
                    </Stack>

                    {registerForm.values.erroDataIntervencao && (
                      <Alert colorScheme={"red"} variant={"solid"}>
                        <AlertIcon />
                        <AlertTitle>ATENÇÃO:</AlertTitle>
                        <Text>
                          O planejamento configurado ultrapassa a data de início
                          de execução do poço selecionado.
                        </Text>
                      </Alert>
                    )}

                    <AtividadesCadastroIntervencao
                      registerForm={registerForm}
                      listaAtividadesPrecedentes={listaAtividadesPrecedentes}
                    />

                    <Stack>
                      <Text fontWeight={"bold"}>Comentários</Text>
                      <FormControl>
                        <Flex gap={1}>
                          {/* <RequiredField /> */}
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
                <BotaoVermelhoGhost
                  text={"Cancelar"}
                  formikForm={registerForm}
                  onClose={onClose}
                />
                <BotaoAzulPrimary
                  text={"Concluir Cadastro"}
                  formikForm={registerForm}
                  onClose={onClose}
                  setRefresh={setRefresh}
                  refresh={refresh}
                  loading={loading}
                />
              </Flex>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalCadastroIntervencao;
