import { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
// import { useParams } from "react-router-dom";

import {
  Flex,
  Box,
  IconButton,
  // useBreakpointValue,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  // useDisclosure,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { AtividadesProjeto, TarefaAtividade } from "interfaces/Services";
// import { Text } from "recharts";

import { useAuth } from "hooks/useAuth";

import { patchTarefa } from "services/update/Tarefa";

interface EditModalProps {
  isModalOpen: any;
  closeModal: any;
  editTarefa: TarefaAtividade;
  atividadesProjeto: AtividadesProjeto[];
  newRender: any;
}

function EditarTarefaModal({
  isModalOpen,
  closeModal,
  editTarefa,
  atividadesProjeto,
  newRender,
}: EditModalProps) {
  // const { onClose } = useDisclosure();

  const regex = /[^\w\s]/gi;

  const novaData = format(new Date(editTarefa?.data_tarefa), "yyyy-MM-dd");

  const { user } = useAuth();
  // console.log(user);
  // console.log(editTarefa);

  const [tarefaId, setTarefaId] = useState(editTarefa?.id);
  const [nome, setNome] = useState(editTarefa?.nome_tarefa);
  const [data, setData] = useState(novaData);
  const [atividade, setAtividade] = useState(editTarefa?.atividade_relacionada);
  const [responsavel, setResponsavel] = useState(editTarefa?.responsavel);
  const [status, setStatus] = useState(editTarefa?.status);
  const [descricao, setDescricao] = useState(editTarefa?.descricao_tarefa);

  useEffect(() => {
    setNome(editTarefa.nome_tarefa);
    setData(novaData);
    setAtividade(editTarefa.atividade_relacionada);
    setDescricao(editTarefa.descricao_tarefa);
    setTarefaId(editTarefa.id);
  }, [
    // editTarefa.dat_usu_create,
    novaData,
    editTarefa.nome_tarefa,
    editTarefa.id,
    editTarefa.atividade_relacionada,
  ]);

  const camposParaEditar = [
    "nome_tarefa",
    "data_tarefa",
    "atividade_relacionada",
    "descricao_tarefa",
    "responsavel",
    "status",
  ];

  function updatePayload(campo: string) {
    if (campo === "nome_tarefa") return nome;
    if (campo === "data_tarefa") return data;
    if (campo === "atividade_relacionada") return atividade;
    if (campo === "descricao_tarefa") return descricao;
    if (campo === "responsavel") return responsavel;
    if (campo === "status") return status;
  }

  const formataParaPorcentagem = (val: number | undefined) => val + "%";

  return (
    <Flex>
      <Box
        display={"flex"}
        alignItems={"center"}
        border="2px"
        padding={2}
        borderRadius={6}
        borderColor={"origem.300"}
        _hover={{
          background: "#f5f5f5",
          transition: "all 0.4s",
          color: "origem.300",
          cursor: "pointer",
          borderColor: "origem.500",
        }}
      >
        <IconButton
          aria-label="Plus sign"
          icon={<BsPlusLg />}
          background="origem.300"
          variant="secondary"
          color="white"
          mr={2}
          isRound={true}
          size="sm"
        />
        {/* <Text
          fontSize={useBreakpointValue({ base: "sm", md: "sm" })}
          fontWeight={"bold"}
          color={"origem.500"}
        >
          EDITAR FORNECEDOR
        </Text> */}
      </Box>
      <Modal isOpen={isModalOpen} onClose={closeModal} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            backgroundColor={"#2E69FD"}
            borderTopRadius={7}
            display={"flex"}
            justifyContent={"center"}
            color={"white"}
            fontSize={"14px"}
          >
            Editar Tarefa
          </ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody>
            <FormControl
              marginBottom={1}
              padding={1}
              display={"flex"}
              justifyContent={"space-between"}
              gap={3}
            >
              <Flex flexDir={"column"} flexGrow={4}>
                <FormLabel
                  htmlFor="nomeTarefa"
                  color="#949494"
                  fontSize="12px"
                  fontWeight="700"
                  mt={"6px"}
                >
                  TAREFA
                </FormLabel>
                <Input
                  maxLength={50}
                  fontSize={"14px"}
                  borderRadius={"8px"}
                  border={"1px solid #A7A7A7"}
                  mt={"-9px"}
                  width={"328px"}
                  height={"56px"}
                  color="black"
                  isRequired
                  placeholder="Nome tarefa"
                  type="text"
                  id="nomeTarefa"
                  name="nomeTarefa"
                  value={nome.replace(regex, "")}
                  onChange={(event) => setNome(event.target.value)}
                />
              </Flex>
              <Flex flexDir={"column"} flexGrow={1}>
                <FormLabel
                  htmlFor="data"
                  color="#949494"
                  fontSize="12px"
                  fontWeight="700"
                  mt={"6px"}
                >
                  DATA
                </FormLabel>
                <Input
                  max="9999-12-31"
                  maxLength={1}
                  borderRadius={"8px"}
                  border={"1px solid #A7A7A7"}
                  mt={"-9px"}
                  width={"136px"}
                  height={"56px"}
                  fontSize={"14px"}
                  color="black"
                  id="data"
                  type="date"
                  name="data"
                  value={data}
                  onChange={(event) => setData(event.target.value)}
                />
              </Flex>
            </FormControl>
            <FormControl
              padding={1}
              marginBottom={1}
              width={"204px"}
              display="flex"
              gap={4}
            >
              <Flex direction={"column"}>
                <FormLabel
                  htmlFor="atividadeRel"
                  color="#949494"
                  fontSize="12px"
                  fontWeight="700"
                  mt={"6px"}
                >
                  ATIVIDADE RELACIONADA
                </FormLabel>
                <Select
                  fontSize={"14px"}
                  borderRadius={"8px"}
                  border={"1px solid #A7A7A7"}
                  mt={"-9px"}
                  width={"208px"}
                  height={"56px"}
                  color="black"
                  id="atividadeRel"
                  name="atividadeRel"
                  value={atividade}
                  onChange={(event) => setAtividade(event.target.value)}
                >
                  <option value="">Selecione</option>
                  {atividadesProjeto.map((atividade, index) => (
                    <option value={atividade.nom_atividade} key={index}>
                      {atividade.nom_atividade}
                    </option>
                  ))}
                </Select>
              </Flex>

              <Flex direction={"column"}>
                <FormLabel
                  htmlFor="atividadeRel"
                  color="#949494"
                  fontSize="12px"
                  fontWeight="700"
                  mt={"6px"}
                >
                  RESPONSÁVEL
                </FormLabel>
                <Input
                  type="text"
                  fontSize={"14px"}
                  borderRadius={"8px"}
                  border={"1px solid #A7A7A7"}
                  mt={"-9px"}
                  width={"208px"}
                  height={"56px"}
                  color="black"
                  id="atividadeRel"
                  name="atividadeRel"
                  value={responsavel}
                  onChange={(event) => setResponsavel(event.target.value)}
                ></Input>
              </Flex>
            </FormControl>
            <FormLabel
              htmlFor="status"
              color="#949494"
              fontSize="12px"
              fontWeight="700"
              mt={"6px"}
            >
              STATUS
            </FormLabel>
            {/* <Input
              type="number"
              fontSize={"14px"}
              borderRadius={"8px"}
              border={"1px solid #A7A7A7"}
              mt={"-9px"}
              width={"208px"}
              height={"56px"}
              color="#2D2926"
              id="status"
              name="status"
              value={status}
              onChange={(event) => setStatus(Number(event.target.value))}
            ></Input> */}
            <NumberInput
              width={"208px"}
              height={"56px"}
              min={0}
              max={100}
              value={formataParaPorcentagem(status)}
              onChange={(valueString) => {
                const value = Number(valueString);
                setStatus(value);
              }}
              h={"56px"}
            >
              <NumberInputField h={"56px"} />

              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormControl padding={1}>
              <FormLabel
                htmlFor="acao"
                color="#949494"
                fontSize="12px"
                fontWeight="700"
                mt={"6px"}
              >
                DESCRIÇÃO DA TAREFA
              </FormLabel>
              <Textarea
                maxLength={255}
                fontSize={"14px"}
                borderRadius={"8px"}
                border={"1px solid #A7A7A7"}
                mt={"-9px"}
                width={"456px"}
                height={"121px"}
                color="black"
                isRequired
                placeholder="Descrição da tarefa"
                id="descrição"
                name="descrição"
                value={descricao.replace(regex, "")}
                onChange={(event) => setDescricao(event.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Flex gap={2}>
              <Button
                variant="primary"
                color="#F40606"
                _hover={{
                  background: "red.500",
                  transition: "all 0.4s",
                  color: "white",
                }}
                onClick={closeModal}
                width={"208px"}
                height={"56px"}
                fontWeight={"700"}
                fontSize="18px"
                fontFamily={"Mulish"}
              >
                Cancelar
              </Button>
              <Button
                background="origem.500"
                variant="primary"
                color="white"
                borderRadius={"8px"}
                _hover={{
                  background: "origem.600",
                  transition: "all 0.4s",
                }}
                onClick={() => {
                  camposParaEditar.forEach((tarefa) =>
                    patchTarefa(
                      Number(tarefaId),
                      tarefa,
                      tarefa !== "status"
                        ? updatePayload(tarefa) || 0
                        : updatePayload(tarefa)?.toString() || "",
                      user?.nome
                    )
                  );
                  newRender();
                  closeModal();
                }}
                width={"208px"}
                height={"56px"}
                fontWeight={"700"}
                fontSize="18px"
                fontFamily={"Mulish"}
              >
                Adicionar
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default EditarTarefaModal;
