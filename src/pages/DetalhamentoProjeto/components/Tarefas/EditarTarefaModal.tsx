//  CRIADO EM: 09/2022
//  AUTOR: Gabriel Peralta.
//  DESCRIÇÃO DO ARQUIVO: Botão e Modal de edital tarefas do projeto.

import { useEffect, useState } from "react";

import {
  Flex,
  Box,
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
} from "@chakra-ui/react";
import { format } from "date-fns";
import { AtividadesProjeto, TarefaAtividade } from "interfaces/Services";

import { useAuth } from "hooks/useAuth";

import { patchTarefa } from "services/update/Tarefa";

interface EditModalProps {
  isModalOpen: any;
  closeModal: () => void;
  editTarefa: TarefaAtividade;
  atividadesProjeto: AtividadesProjeto[];
  newRender: () => void;
}

function EditarTarefaModal({
  isModalOpen,
  closeModal,
  editTarefa,
  atividadesProjeto,
  newRender,
}: EditModalProps) {
  const regex = /[^\w\s]/gi;

  const novaData = format(new Date(editTarefa?.data_tarefa), "yyyy-MM-dd");

  const { user } = useAuth();

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

  const handlePatchProject = async () => {
    const promises = camposParaEditar.map((tarefa) =>
      patchTarefa(
        Number(tarefaId),
        tarefa,
        tarefa !== "status"
          ? updatePayload(tarefa) || "---"
          : updatePayload(tarefa)?.toString() || "",
        user?.nome
      )
    );
    await Promise.all(promises);
    newRender();
    closeModal();
  };

  return (
    <Flex>
      <Box></Box>
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
            fontWeight={"700"}
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
            >
              <Flex flexDir={"column"} flexGrow={4} mr={4} ml={-3}>
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
                  _placeholder={{ color: "#949494" }}
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
            >
              <Flex direction={"column"} mr={4} ml={-3}>
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
                  _placeholder={{ color: "#949494" }}
                  placeholder={"Nome do responsável"}
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
              mr={4}
              ml={-2}
              htmlFor="status"
              color="#949494"
              fontSize="12px"
              fontWeight="700"
              mt={"6px"}
            >
              STATUS
            </FormLabel>
            <Select
              ml={-2}
              fontSize={"14px"}
              borderRadius={"8px"}
              border={"1px solid #A7A7A7"}
              mt={"-9px"}
              width={"208px"}
              height={"56px"}
              color="black"
              id="atividadeRel"
              name="atividadeRel"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="">Selecione</option>

              <option value={0}>Em Andamento</option>
              <option value={1}>Concluído</option>
              <option value={2}>Cancelado</option>
            </Select>
            <FormControl padding={1}>
              <FormLabel
                mr={4}
                ml={-3}
                htmlFor="acao"
                color="#949494"
                fontSize="12px"
                fontWeight="700"
                mt={"6px"}
              >
                DESCRIÇÃO DA TAREFA
              </FormLabel>
              <Textarea
                mr={4}
                ml={-3}
                maxLength={255}
                fontSize={"14px"}
                borderRadius={"8px"}
                border={"1px solid #A7A7A7"}
                mt={"-9px"}
                width={"436px"}
                height={"121px"}
                color="black"
                isRequired
                _placeholder={{ color: "#949494" }}
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
                  background: "red.600",
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
                isDisabled={
                  nome === "" ||
                  data === "" ||
                  atividade === "" ||
                  responsavel === ""
                }
                background="origem.500"
                variant="primary"
                color="white"
                borderRadius={"8px"}
                _hover={{
                  background: "origem.600",
                  transition: "all 0.4s",
                }}
                onClick={() => handlePatchProject()}
                width={"208px"}
                height={"56px"}
                fontWeight={"700"}
                fontSize="18px"
                fontFamily={"Mulish"}
              >
                Confirmar
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default EditarTarefaModal;
