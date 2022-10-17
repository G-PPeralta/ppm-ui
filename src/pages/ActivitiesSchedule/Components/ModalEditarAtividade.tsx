import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
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
// import { Ring } from "@uiball/loaders";

// import { useCadastroAtividade } from "hooks/useCadastroAtividade";

import { useToast } from "contexts/Toast";

import { patchEditarAtividadeIntervencao } from "services/post/CadastroModaisInfograficos";

import DateTimePickerDataFim from "./DateTimePickerDataFim";
import DateTimePickerDataInicio from "./DateTimePickerDataInicio";
import PocosDragAndDrop from "./PocosDragAndDrop";

interface Precedente {
  id: any;
  dias: any;
}

function ModalEditarAtividade({
  onClose,
  atividade,
  id,
  setRefresh,
  refresh,
  listaPrecedentes,
  index,
  listaOptions,
}: any) {
  const { toast } = useToast();
  const [campanhaId, setCampanhaId] = useState(0);
  const [atividadeStatus, setAtividadeStatus] = useState(0);
  const [nome, setNome] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [responsavelId, setResponsavelId] = useState(0);
  const [area, setArea] = useState("");
  const [areaId, setAreaId] = useState(0);
  const [observacoes, setObservacoes] = useState("");
  const [inicioPlanejado, setInicioPlanejado] = useState("");
  const [fimPlanejado, setFimPlanejado] = useState("");
  const [inicioReal, setInicioReal] = useState("");
  const [fimReal, setFimReal] = useState("");
  const [precedentes, setPrecedentes] = useState<Precedente[]>([]);

  const payload = {
    atividadeId: atividade.id_atividade,
    atividadeStatus,
    nome,
    responsavelId,
    areaId,
    observacoes,
    inicioPlanejado,
    fimPlanejado,
    inicioReal,
    fimReal,
    precedentes,
  };

  useEffect(() => {
    setNome(atividade.atividade);
    setResponsavel(atividade.nom_responsavel);
    setArea(atividade.nom_area);
    setObservacoes(atividade.sonda);
    setCampanhaId(atividade.id_filho);
    setAtividadeStatus(Number(atividade.pct_real));
    if (atividade.precedentes) {
      setPrecedentes(atividade.precedentes);
    }
    if (index == 0) {
      setInicioPlanejado(new Date(atividade.inicioplanejado).toLocaleString());
    } else {
      const inicio = new Date(atividade.inicioplanejado);
      inicio.setDate(inicio.getDate() + 1);
      setInicioPlanejado(inicio.toLocaleString());
    }
    const fim = new Date(atividade.finalplanejado);
    fim.setHours(fim.getHours() + 9);
    setFimPlanejado(fim.toLocaleString());

    const respId = listaOptions.optionsResponsaveis.find(
      (responsavel: any) => responsavel.label === responsavel
    )?.value;
    setResponsavelId(respId);

    const arId = listaOptions.optionsAreaAtuacao.find(
      (area: any) => area.label === area
    )?.value;
    setAreaId(arId);
  }, []);

  const send = async () => {
    try {
      const { status } = await patchEditarAtividadeIntervencao(
        campanhaId,
        payload
      );
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
            fontSize={"1em"}
          >
            Editar Atividade
          </ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody mt={3}>
            <FormControl>
              <Flex direction={"column"} gap={4}>
                <Stack>
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
                        onChange={(event) => setAtividadeStatus(Number(event))}
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
                      <Input
                        h={"56px"}
                        isDisabled
                        placeholder="Selecione a data e a hora"
                        id="dat_ini_plan"
                        type="text"
                        name="dat_ini_plan"
                        w={useBreakpointValue({ base: "100%", md: "100%" })}
                        value={inicioPlanejado}
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
                      <Input
                        h={"56px"}
                        isDisabled
                        placeholder="Selecione a data e a hora"
                        id="dat_ini_plan"
                        type="text"
                        name="dat_ini_plan"
                        w={useBreakpointValue({ base: "100%", md: "100%" })}
                        value={fimPlanejado}
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
                      <DateTimePickerDataInicio
                        inicioReal={inicioReal}
                        setInicioReal={setInicioReal}
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
                      <DateTimePickerDataFim
                        fimReal={fimReal}
                        setFimReal={setFimReal}
                      />
                    </Flex>
                  </Flex>
                  <Flex
                    flexDirection={useBreakpointValue({
                      base: "column",
                      md: "row",
                    })}
                    pt={2}
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
                      {/* <Input
                        h={"56px"}
                        placeholder="responsavel"
                        id="responsavel"
                        type="text"
                        name="responsavel"
                        w={useBreakpointValue({ base: "100%", md: "100%" })}
                        value={responsavel}
                        onChange={(event) => setResponsavel(event.target.value)}
                      /> */}
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
                      {/* <Input
                        h={"56px"}
                        placeholder="area"
                        id="area"
                        type="text"
                        name="area"
                        w={useBreakpointValue({ base: "100%", md: "100%" })}
                        value={area}
                        onChange={(event) => setArea(event.target.value)}
                      /> */}
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
                    <FormControl>
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
                        value={observacoes}
                        onChange={(event) => setObservacoes(event.target.value)}
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
                borderRadius={"10px"}
                variant="ghost"
                color="red"
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
              <Button
                disabled={
                  !nome ||
                  !responsavel ||
                  !area ||
                  precedentes.filter((item) => item.id == 0).length > 0
                }
                onClick={() => send()}
                h={"56px"}
                borderRadius={"10px"}
                background={"origem.300"}
                variant="primary"
                color="white"
                _hover={{
                  background: "origem.500",
                  transition: "all 0.4s",
                }}
              >
                <Text fontSize="16px" fontWeight={"bold"} mx={12}>
                  Atualizar
                </Text>
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalEditarAtividade;
