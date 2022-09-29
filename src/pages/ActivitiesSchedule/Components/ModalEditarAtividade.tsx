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
  FormLabel,
  Stack,
  useBreakpointValue,
  Input,
  Textarea,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
// import { Ring } from "@uiball/loaders";

// import { useCadastroAtividade } from "hooks/useCadastroAtividade";

import { RequiredField } from "components/RequiredField/RequiredField";

import { useToast } from "contexts/Toast";

import { postEditarAtividadeStatus } from "services/post/CadastroModaisInfograficos";

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
}: any) {
  const { toast } = useToast();
  const [campanhaId, setCampanhaId] = useState(0);
  const [atividadeStatus, setAtividadeStatus] = useState(0);
  const [nome, setNome] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [area, setArea] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [inicoReal, setInicioReal] = useState("");
  const [fimReal, setFimReal] = useState("");
  const [precedentes, setPrecedentes] = useState<Precedente[]>([]);

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
  }, []);

  // const payload = {
  //   nome,
  //   responsavel,
  //   area,
  //   observacoes,
  //   campanhaId,
  //   atividadeStatus,
  //   precedentes,
  // };

  // console.log("payload", payload);

  const send = async () => {
    try {
      const { status } = await postEditarAtividadeStatus(
        campanhaId,
        atividadeStatus
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
                      <Flex>
                        <RequiredField />
                        <FormLabel htmlFor="nom_atividade">ID</FormLabel>
                      </Flex>
                      <Input
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
                      <Flex>
                        <RequiredField />
                        <FormLabel htmlFor="nom_atividade">NOME</FormLabel>
                      </Flex>
                      <Input
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
                      <Flex>
                        <RequiredField />
                        <FormLabel htmlFor="pct_real">STATUS</FormLabel>
                      </Flex>
                      <NumberInput
                        min={0}
                        max={100}
                        value={format(atividadeStatus)}
                        onChange={(event) => setAtividadeStatus(Number(event))}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
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
                      <FormLabel htmlFor="dat_ini_plan">
                        DATA INÍCIO PLANEJADO
                      </FormLabel>
                      <Input
                        isDisabled
                        placeholder="Selecione a data e a hora"
                        id="dat_ini_plan"
                        type="text"
                        name="dat_ini_plan"
                        w={useBreakpointValue({ base: "100%", md: "100%" })}
                        value={new Date(
                          atividade.inicioplanejado
                        ).toLocaleString()}
                      />
                    </Flex>
                    <Flex direction={"column"} grow={1}>
                      <FormLabel htmlFor="dat_ini_plan">
                        DATA FIM PLANEJADO
                      </FormLabel>
                      <Input
                        isDisabled
                        placeholder="Selecione a data e a hora"
                        id="dat_ini_plan"
                        type="text"
                        name="dat_ini_plan"
                        w={useBreakpointValue({ base: "100%", md: "100%" })}
                        value={new Date(
                          atividade.finalplanejado
                        ).toLocaleString()}
                      />
                    </Flex>
                    <Flex direction={"column"} grow={1}>
                      <FormLabel htmlFor="dat_ini_plan">
                        DATA INÍCIO REAL
                      </FormLabel>
                      <DateTimePickerDataInicio
                        inicoReal={inicoReal}
                        setInicioReal={setInicioReal}
                      />
                    </Flex>
                    <Flex direction={"column"} grow={1}>
                      <FormLabel htmlFor="dat_ini_plan">
                        DATA FIM REAL
                      </FormLabel>
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
                      <Flex>
                        <RequiredField />
                        <FormLabel htmlFor="nom_atividade">
                          RESPONSÁVEL
                        </FormLabel>
                      </Flex>
                      <Input
                        placeholder="responsavel"
                        id="responsavel"
                        type="text"
                        name="responsavel"
                        w={useBreakpointValue({ base: "100%", md: "100%" })}
                        value={responsavel}
                        onChange={(event) => setResponsavel(event.target.value)}
                      />
                    </FormControl>
                    <FormControl flex={2}>
                      <Flex>
                        <RequiredField />
                        <FormLabel htmlFor="nom_atividade">ÁREA</FormLabel>
                      </Flex>
                      <Input
                        placeholder="area"
                        id="area"
                        type="text"
                        name="area"
                        w={useBreakpointValue({ base: "100%", md: "100%" })}
                        value={area}
                        onChange={(event) => setArea(event.target.value)}
                      />
                    </FormControl>
                  </Flex>
                  <Flex
                    flexDirection={useBreakpointValue({
                      base: "column",
                      md: "column",
                    })}
                    gap={5}
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
                      <FormLabel htmlFor="dsc_comentario">
                        OBSERVAÇÕES
                      </FormLabel>
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
                variant="ghost"
                color="red"
                onClick={() => onClose()}
                _hover={{
                  background: "red.500",
                  transition: "all 0.4s",
                  color: "white",
                }}
              >
                Cancelar
              </Button>
              <Button
                disabled={
                  !atividadeStatus ||
                  !nome ||
                  !responsavel ||
                  !area ||
                  precedentes.filter((item) => item.id == 0).length > 0
                }
                background="origem.300"
                variant="primary"
                color="white"
                onClick={() => send()}
                _hover={{
                  background: "origem.500",
                  transition: "all 0.4s",
                }}
              >
                <Text>Atualizar</Text>
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalEditarAtividade;
