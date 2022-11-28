import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import {
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  Stack,
  useBreakpointValue,
  Input,
  Textarea,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
} from "@chakra-ui/react";

import { useToast } from "contexts/Toast";

import { useAuth } from "hooks/useAuth";

import { patchEditarAtividadeIntervencao } from "services/post/Infograficos";

import DateTimePickerDataFimPlan from "./DateTimePickerDataFimPlan";
import DateTimePickerDataFimReal from "./DateTimePickerDataFimReal";
import DateTimePickerDataInicioPlan from "./DateTimePickerDataInicioPlan";
import DateTimePickerDataInicioReal from "./DateTimePickerDataInicioReal";
import PocosDragAndDrop from "./PocosDragAndDrop";

interface Precedente {
  id: any;
  dias: any;
}

function ModalEditarAtividade({
  onClose,
  atividade,
  // id,
  setRefresh,
  refresh,
  listaPrecedentes,
  index,
  listaOptions,
  // poco,
  intervencaoIniciada,
}: any) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [atividadeStatus, setAtividadeStatus] = useState(0);
  const [nome, setNome] = useState("");
  const [responsavelId, setResponsavelId] = useState(
    listaOptions.optionsResponsaveis.filter(
      (responsavel: any) => responsavel.label === atividade.nom_responsavel
    )[0].value
  );
  const [areaId, setAreaId] = useState(0);
  const [comentario, setComentario] = useState("");
  const [inicioPlanejado, setInicioPlanejado] = useState<any>("");
  const [fimPlanejado, setFimPlanejado] = useState<any>("");
  const [inicioReal, setInicioReal] = useState<any>(null);
  const [fimReal, setFimReal] = useState<any>(null);
  const [precedentes, setPrecedentes] = useState<Precedente[]>([]);

  const payload = {
    nom_usu_edit: user?.nome,
    atividadeId: atividade.id_filho,
    atividadeStatus,
    nome,
    responsavelId,
    areaId,
    comentario,
    inicioPlanejado,
    fimPlanejado,
    inicioReal,
    fimReal,
    precedentes,
  };

  const send = async () => {
    try {
      const { status } = await patchEditarAtividadeIntervencao(payload);
      if (status === 200 || status === 201) {
        toast.success(`Atividade editada com sucesso!`, {
          id: "toast-principal",
        });
      }
    } catch (error) {
      toast.error(`Erro ao editar a atividade!`, {
        id: "toast-principal",
      });
    }
    onClose();
    setRefresh(!refresh);
  };
  const format = (val: number) => val + "%";

  useEffect(() => {
    setNome(atividade.atividade);
    setComentario(atividade.comentario);
    setAtividadeStatus(Number(atividade.pct_real));
    if (atividade.precedentes) {
      setPrecedentes(atividade.precedentes);
    }
    if (index == 0) {
      setInicioPlanejado(new Date(atividade.inicioplanejadohrs));
    } else {
      const inicio = new Date(atividade.inicioplanejadohrs);
      inicio.setDate(inicio.getDate() + 1);
      setInicioPlanejado(inicio);
    }
    const fim = new Date(atividade.finalplanejadohrs);
    fim.setHours(fim.getHours() + 9);
    setFimPlanejado(fim);

    if (atividade.inicioreal !== null) {
      setInicioReal(new Date(atividade.inicioreal));
    }
    if (atividade.fimreal !== null) {
      setFimReal(new Date(atividade.fimreal));
    }

    const respId = listaOptions.optionsResponsaveis.filter(
      (responsavel: any) => responsavel.label === atividade.nom_responsavel
    )[0].value;

    setResponsavelId(respId);

    const arId = listaOptions.optionsAreaAtuacao.filter(
      (area: any) => area.label === atividade.nom_area
    )[0].value;
    setAreaId(arId);
  }, []);

  const handlePercentInput = async (val: any) => {
    if (atividadeStatus === 0 && Number(atividade.pct_real) === 0) {
      setInicioReal(new Date());
    }
    if (atividadeStatus === 100) {
      setFimReal(null);
    }
    setAtividadeStatus(Number(val));
  };

  const validateStatusEDataInicioReal =
    atividadeStatus > 0 && inicioReal !== null;

  return (
    <>
      <Modal isOpen={true} onClose={onClose} size="5xl">
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
          >
            Editar Atividade
          </ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody mt={3}>
            <FormControl>
              <Flex direction={"column"} gap={4}>
                <Stack>
                  <Text fontWeight={"bold"}>Atividade</Text>
                  <Flex
                    flexDirection={useBreakpointValue({
                      base: "column",
                      md: "row",
                    })}
                    gap={5}
                  >
                    <FormControl flex={1}>
                      <Flex gap={1}>
                        <Text
                          fontWeight={"bold"}
                          fontSize={"12px"}
                          color={"#949494"}
                        >
                          ID
                        </Text>
                      </Flex>
                      <Input
                        h={"56px"}
                        isDisabled
                        placeholder="Id"
                        id="id"
                        type="text"
                        name="id"
                        w={useBreakpointValue({ base: "100%", md: "100%" })}
                        value={atividade.id_atividade}
                      />
                    </FormControl>
                    <FormControl flex={2}>
                      <Flex gap={1}>
                        <Text
                          fontWeight={"bold"}
                          fontSize={"12px"}
                          color={"#949494"}
                        >
                          NOME
                        </Text>
                      </Flex>
                      <Input
                        h={"56px"}
                        placeholder="Digite o nome da atividade"
                        id="nom_atividade"
                        type="text"
                        name="nom_atividade"
                        w={useBreakpointValue({ base: "100%", md: "100%" })}
                        value={nome}
                        onChange={(event) => setNome(event.target.value)}
                      />
                    </FormControl>
                    <FormControl flex={2}>
                      <Flex gap={1}>
                        <Text
                          fontWeight={"bold"}
                          fontSize={"12px"}
                          color={"#949494"}
                        >
                          STATUS
                        </Text>
                      </Flex>
                      <NumberInput
                        h={"56px"}
                        min={0}
                        max={100}
                        value={format(atividadeStatus)}
                        onChange={(event) => handlePercentInput(event)}
                      >
                        <NumberInputField h={"56px"} />
                        <NumberInputStepper h={"56px"}>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  </Flex>

                  <Flex
                    flexDirection={useBreakpointValue({
                      base: "column",
                      md: "row",
                    })}
                    pt={2}
                    gap={4}
                  >
                    <Flex direction={"column"} grow={1}>
                      <Flex gap={1}>
                        <Text
                          fontWeight={"bold"}
                          fontSize={"12px"}
                          color={"#949494"}
                        >
                          DATA INÍCIO PLANEJADO
                        </Text>
                      </Flex>
                      <DateTimePickerDataInicioPlan
                        inicioPlanejado={inicioPlanejado}
                        setInicioPlanejado={setInicioPlanejado}
                        intervencaoIniciada={intervencaoIniciada}
                        atividadeStatus={atividadeStatus}
                      />
                    </Flex>
                    <Flex direction={"column"} grow={1}>
                      <Flex gap={1}>
                        <Text
                          fontWeight={"bold"}
                          fontSize={"12px"}
                          color={"#949494"}
                        >
                          DATA FIM PLANEJADO
                        </Text>
                      </Flex>
                      <DateTimePickerDataFimPlan
                        fimPlanejado={fimPlanejado}
                        setFimPlanejado={setFimPlanejado}
                        intervencaoIniciada={intervencaoIniciada}
                        atividadeStatus={atividadeStatus}
                      />
                    </Flex>
                    <Flex direction={"column"} grow={1}>
                      <Flex gap={1}>
                        <Text
                          fontWeight={"bold"}
                          fontSize={"12px"}
                          color={"#949494"}
                        >
                          DATA INÍCIO REAL
                        </Text>
                      </Flex>
                      <DateTimePickerDataInicioReal
                        inicioReal={inicioReal}
                        setInicioReal={setInicioReal}
                        intervencaoIniciada={intervencaoIniciada}
                        atividadeStatus={atividadeStatus}
                        fimReal={fimReal}
                      />
                    </Flex>
                    <Flex direction={"column"} grow={1}>
                      <Flex gap={1}>
                        <Text
                          fontWeight={"bold"}
                          fontSize={"12px"}
                          color={"#949494"}
                        >
                          DATA FIM REAL
                        </Text>
                      </Flex>
                      <DateTimePickerDataFimReal
                        fimReal={fimReal}
                        setFimReal={setFimReal}
                        intervencaoIniciada={intervencaoIniciada}
                        atividadeStatus={atividadeStatus}
                        inicioReal={inicioReal}
                      />
                    </Flex>
                  </Flex>
                  <Text fontWeight={"bold"}>Responsável</Text>
                  <Flex
                    flexDirection={useBreakpointValue({
                      base: "column",
                      md: "row",
                    })}
                    gap={5}
                  >
                    <FormControl flex={1}>
                      <Flex gap={1}>
                        <Text
                          fontWeight={"bold"}
                          fontSize={"12px"}
                          color={"#949494"}
                        >
                          RESPONSÁVEL
                        </Text>
                      </Flex>
                      <Select
                        h={"56px"}
                        placeholder="Selecione o responsável"
                        id="responsavelId"
                        name="responsavelId"
                        value={responsavelId}
                        onChange={(event) =>
                          setResponsavelId(Number(event.target.value))
                        }
                      >
                        {listaOptions.optionsResponsaveis.map((option: any) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl flex={2}>
                      <Flex gap={1}>
                        <Text
                          fontWeight={"bold"}
                          fontSize={"12px"}
                          color={"#949494"}
                        >
                          ÁREA
                        </Text>
                      </Flex>
                      <Select
                        h={"56px"}
                        placeholder="Selecione o responsável"
                        id="areaId"
                        name="areaId"
                        value={areaId}
                        onChange={(event) =>
                          setAreaId(Number(event.target.value))
                        }
                      >
                        {listaOptions.optionsAreaAtuacao.map((option: any) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Flex>
                  <Flex
                    flexDirection={useBreakpointValue({
                      base: "column",
                      md: "column",
                    })}
                    gap={2}
                  >
                    <PocosDragAndDrop
                      listaPrecedentes={listaPrecedentes}
                      precedentes={precedentes}
                      setPrecedentes={setPrecedentes}
                    />
                  </Flex>
                  <Flex
                    flexDirection={useBreakpointValue({
                      base: "column",
                      md: "row",
                    })}
                    pt={2}
                    gap={5}
                  >
                    <FormControl gap={3}>
                      <Text fontWeight={"bold"} mb={2}>
                        Observações
                      </Text>
                      <Flex gap={1}>
                        <Text
                          fontWeight={"bold"}
                          fontSize={"12px"}
                          color={"#949494"}
                        >
                          OBSERVAÇÕES
                        </Text>
                      </Flex>
                      <Textarea
                        placeholder="Adicione comentários sobre a atividade"
                        id="dsc_comentario"
                        name="dsc_comentario"
                        value={comentario}
                        onChange={(event) => setComentario(event.target.value)}
                      />
                    </FormControl>
                  </Flex>
                </Stack>
              </Flex>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Flex gap={2}>
              <Button
                onClick={() => onClose()}
                h={"56px"}
                borderRadius={"8px"}
                variant="ghost"
                color="red"
                _hover={{
                  background: "red.600",
                  transition: "all 0.4s",
                  color: "white",
                }}
                fontSize={"18px"}
                fontWeight={"700"}
                fontFamily={"Mulish"}
                w={"208px"}
              >
                <Text mx={12}>Cancelar</Text>
              </Button>
              <Button
                disabled={
                  !nome ||
                  !responsavelId ||
                  !areaId ||
                  precedentes.filter((item) => item.id == 0).length > 0 ||
                  !validateStatusEDataInicioReal
                }
                onClick={() => send()}
                h={"56px"}
                borderRadius={"8px"}
                background={"origem.500"}
                variant="primary"
                color="white"
                _hover={{
                  background: "origem.600",
                  transition: "all 0.4s",
                }}
                fontSize={"18px"}
                fontWeight={"700"}
                fontFamily={"Mulish"}
                w={"208px"}
              >
                <Text mx={12}>Concluir</Text>
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalEditarAtividade;
