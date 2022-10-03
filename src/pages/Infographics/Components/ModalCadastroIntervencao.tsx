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
  // Button,
  FormControl,
  FormLabel,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import {
  ListaCampo,
  ListaPoco,
  ProjetoTipo,
} from "interfaces/CadastrosModaisInfograficos";

import BotaoAzulPrimary from "components/BotaoAzul/BotaoAzulPrimary";
import BotaoVermelhoGhost from "components/BotaoVermelho/BotaoVermelhoGhost";
import BotaoVermelhoOutline from "components/BotaoVermelho/BotaoVermelhoOutline";
import BotaoVermelhoPrimary from "components/BotaoVermelho/BotaoVermelhoPrimary";
import { RequiredField } from "components/RequiredField/RequiredField";

// import { handleCancelar } from "utils/handleCadastro";

import { useCadastroIntervencao } from "hooks/useCadastroIntervencao";

import {
  getAtividadasByProjetosTipoId,
  getProjetosTipo,
} from "services/get/CadastroModaisInfograficos";

import SelectFiltragem from "../../../components/SelectFiltragem";
import AtividadesCadastroIntervencao from "./AtividadesCadastroIntervencao";
import DateTimePickerDataInicio from "./DateTimePickerDataInicio";
// import SelectFiltragemSondas from "./SelectFiltragemSonda";

function ModalCadastroIntervencao({
  idCampanha,
  data,
  refresh,
  setRefresh,
}: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    registerForm,
    loading,
    listaPocos,
    listaCampos,
    listaSondaCampanha,
    listaAtividadesPrecedentes,
  } = useCadastroIntervencao();

  const [listaProjetos, setListaProjetos] = useState<any>([]);

  const innerWidth = window.innerWidth;

  const optionsPocos = listaPocos.map((poco: ListaPoco) => ({
    value: poco.id,
    label: poco.poco,
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

  const handleGet = async () => {
    const projetos = await getProjetosTipo();
    const projetosTipoSorted = projetos.data.sort(
      (a: ProjetoTipo, b: ProjetoTipo) =>
        a.nom_projeto_tipo.localeCompare(b.nom_projeto_tipo)
    );
    setListaProjetos(projetosTipoSorted);
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

  useEffect(() => {
    handleGet();
    registerForm.setFieldValue("id_campanha", idCampanha);
    const newDate = new Date(data);
    newDate.setDate(newDate.getDate() + 15);
    registerForm.setFieldValue("dat_ini_prev", newDate);
    setRefresh(!refresh);
  }, []);

  useEffect(() => {
    reqGetAtividadesByProjetoTipoId(registerForm.values.projeto_tipo_id);
  }, [registerForm.values.projeto_tipo_id]);

  // console.log("registerForm", registerForm.values);

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
                          data={data}
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

                    <AtividadesCadastroIntervencao
                      registerForm={registerForm}
                      listaAtividadesPrecedentes={listaAtividadesPrecedentes}
                    />

                    <Stack>
                      <FormControl>
                        <Flex gap={1}>
                          <RequiredField />
                          <FormLabel htmlFor="comentarios">
                            COMENTÁRIOS
                          </FormLabel>
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
                {/* <Button
                  variant="ghost"
                  color="red"
                  onClick={() => handleCancelar(registerForm, onClose)}
                  _hover={{
                    background: "red.500",
                    transition: "all 0.4s",
                    color: "white",
                  }}
                >
                  Cancelar
                </Button> */}
                <BotaoVermelhoGhost
                  text={"Cancelar"}
                  formikForm={registerForm}
                  onClose={onClose}
                />
                <BotaoVermelhoOutline
                  text={"Cancelar"}
                  formikForm={registerForm}
                  onClose={onClose}
                />
                <BotaoVermelhoPrimary
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
                {/* <Button
                  disabled={!registerForm.isValid || !registerForm.dirty}
                  background="origem.300"
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
                    background: "origem.500",
                    transition: "all 0.4s",
                  }}
                >
                  {loading ? (
                    <Ring speed={2} lineWeight={5} color="white" size={24} />
                  ) : (
                    <>
                      <Text>Concluir Cadastro</Text>
                    </>
                  )}
                </Button> */}
              </Flex>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalCadastroIntervencao;
