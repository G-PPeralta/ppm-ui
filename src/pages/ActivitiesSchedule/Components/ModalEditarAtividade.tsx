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

import { useToast } from "contexts/Toast";

import { postEditarAtividadeStatus } from "services/post/CadastroModaisInfograficos";

function ModalEditarAtividade({
  onClose,
  atividade,
  id,
  setRefresh,
  refresh,
}: any) {
  // const { registerForm, loading } = useCadastroAtividade();
  // const { state }: any = useLocation();
  const { toast } = useToast();
  const [campanhaId, setCampanhaId] = useState(0);
  const [atividadeStatus, setAtividadeStatus] = useState(0);
  const [obs, setObs] = useState("");

  useEffect(() => {
    setCampanhaId(atividade.id_filho);
    setObs(atividade.sonda);
    setAtividadeStatus(Number(atividade.pct_real));
  }, []);

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
      <Modal isOpen={true} onClose={onClose} size="3xl">
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
                    <FormControl>
                      <FormLabel htmlFor="nom_atividade">NOME</FormLabel>
                      <Input
                        isDisabled
                        placeholder="Digite o nome da atividade"
                        id="nom_atividade"
                        type="text"
                        name="nom_atividade"
                        w={useBreakpointValue({ base: "100%", md: "100%" })}
                        value={atividade.atividade}
                      />
                    </FormControl>
                  </Flex>

                  <Flex
                    flexDirection={useBreakpointValue({
                      base: "column",
                      md: "row",
                    })}
                    gap={5}
                  ></Flex>

                  <Flex justify={"space-between"} gap={5}>
                    <Flex direction={"column"} grow={1}>
                      <FormLabel htmlFor="dat_ini_plan">DATA INÍCIO</FormLabel>
                      <Input
                        isDisabled
                        placeholder="Selecione a data e a hora"
                        id="dat_ini_plan"
                        type="text"
                        name="dat_ini_plan"
                        w={200}
                        value={new Date(
                          atividade.inicioplanejado
                        ).toLocaleString()}
                      />
                    </Flex>
                    <Flex direction={"column"} grow={1}>
                      <FormLabel htmlFor="dat_ini_plan">DATA FIM</FormLabel>
                      <Input
                        isDisabled
                        placeholder="Selecione a data e a hora"
                        id="dat_ini_plan"
                        type="text"
                        name="dat_ini_plan"
                        w={200}
                        value={new Date(
                          atividade.finalplanejado
                        ).toLocaleString()}
                      />
                    </Flex>
                    <FormControl>
                      <FormLabel htmlFor="pct_real">STATUS</FormLabel>
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
                    gap={5}
                  ></Flex>
                  <Flex
                    flexDirection={useBreakpointValue({
                      base: "column",
                      md: "row",
                    })}
                    gap={5}
                  >
                    <FormControl>
                      <FormLabel htmlFor="dsc_comentario">
                        OBSERVAÇÕES
                      </FormLabel>
                      <Textarea
                        isDisabled
                        placeholder="Adicione comentários sobre a atividade"
                        id="dsc_comentario"
                        name="dsc_comentario"
                        value={obs}
                        onChange={(event) => setObs(event.target.value)}
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
                disabled={!atividadeStatus}
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
