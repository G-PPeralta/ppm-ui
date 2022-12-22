import { useEffect, useId, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import toast from "react-hot-toast";
import { FiTrash } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";

import { Box, Flex, IconButton, Input, Text } from "@chakra-ui/react";
import { FormikProps } from "formik";
import { AreaAtuacao, Tarefas } from "interfaces/CadastrosModaisInfograficos";

import { RequiredField } from "components/RequiredField/RequiredField";

import { opcoesFase } from "utils/opcoesFase";
import { regexCaracteresEspeciais } from "utils/regex";

import { useCadastroAtividade } from "hooks/useCadastroAtividade";
import { useCadastroProjetoTipo } from "hooks/useCadastroProjetoTipo";

import SelectFiltragem from "../../../../../components/SelectFiltragem";
import PopOverPrecedentes from "./PopOverPrecedentes";

interface Props {
  registerForm: FormikProps<any>;
  index: number;
}

function AtividadesDraggable({ index, registerForm }: Props) {
  const innerwidth = window.innerWidth;

  const id = useId();
  const [draggableId, setDraggableId] = useState<any>(id);
  const { listaAreaAtuacao } = useCadastroAtividade();
  const { listaTarefas } = useCadastroProjetoTipo();

  const remove = (index: number) => {
    if (registerForm.values.atividades.length > 1) {
      // Pega a lista de atividades diretamente do Formik
      const newList = registerForm.values.atividades;
      // Remove item da lista
      newList.splice(index, 1);
      // Atualiza lista no Formik
      registerForm.setFieldValue("atividades", newList);
    } else {
      toast.error("O projeto tipo deve ter ao menos uma atividade", {
        id: "toast-principal",
      });
    }
  };

  const optionsAreaAtuacao = listaAreaAtuacao.map((poco: AreaAtuacao) => ({
    value: poco.id,
    label: poco.tipo,
  }));

  const optionsTarefa = listaTarefas.map((tarefa: Tarefas) => ({
    value: tarefa.id,
    label: tarefa.nom_atividade,
  }));

  const getValue = (options: any, i: number, chave: string) => {
    const index = options
      .map(({ value }: any) => value)
      .indexOf(registerForm?.values?.atividades?.[i][chave]);

    return {
      value: options?.[index]?.value,
      label: options?.[index]?.label,
    };
  };

  useEffect(() => {
    const now = Date.now();
    const newId = draggableId + "-" + now.toLocaleString();
    setDraggableId(newId);
  }, []);

  useEffect(() => {
    const ind = listaTarefas.findIndex(
      (val) => val.id == registerForm.values.atividades[index].tarefa_id
    );

    registerForm.setFieldValue(
      `atividades[${index}].atividade_id_origem`,
      listaTarefas[ind]?.id_origem || ""
    );

    registerForm.setFieldValue(
      `atividades[${index}].area_id`,
      listaTarefas[ind]?.area_atuacao || 0
    );

    registerForm.setFieldValue(
      `atividades[${index}].fase_id`,
      listaTarefas[ind]?.ind_fase || 0
    );
  }, [registerForm.values.atividades[index].tarefa_id]);

  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Box
            display="flex"
            flexWrap="wrap"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            w="100%"
            bg={"#f5f5f5"}
            px={5}
            py={4}
            borderRadius={"60px"}
            mb={2}
          >
            <Flex flexDirection={"row"} gap={4} flex={1}>
              <Flex align={"center"} justify={"center"} gap={3}>
                <GiHamburgerMenu color="#2E69FD" size={16} />
                <Text sx={{ fontSize: 16, fontWeight: "600" }}>
                  {index + 1}
                </Text>
              </Flex>

              <Flex
                gap={4}
                direction={innerwidth >= 640 ? "row" : "column"}
                align={"center"}
                justify={"center"}
                py={innerwidth >= 640 ? 0 : 4}
                flex={1}
              >
                <Flex direction={"column"} flex={2}>
                  <SelectFiltragem
                    registerForm={registerForm}
                    nomeSelect={"ATIVIDADE"}
                    required={true}
                    propName={`atividades[${index}].tarefa_id`}
                    options={optionsTarefa}
                    value={getValue(optionsTarefa, index, "tarefa_id")}
                  />
                </Flex>
                <Flex direction={"column"} flex={2}>
                  <SelectFiltragem
                    registerForm={registerForm}
                    nomeSelect={"FASE"}
                    required={true}
                    propName={`atividades[${index}].fase_id`}
                    options={opcoesFase}
                    value={getValue(opcoesFase, index, "fase_id")}
                  />
                </Flex>

                <Flex direction={"column"} flex={2}>
                  <Flex gap={1}>
                    <RequiredField />
                    <Text
                      fontWeight={"700"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      ID
                    </Text>
                  </Flex>
                  <Input
                    maxW={innerwidth >= 440 ? "auto" : "128px"}
                    _placeholder={{ color: "#949494" }}
                    fontSize={"14px"}
                    fontWeight={"400"}
                    color={"black"}
                    h={"56px"}
                    placeholder="Ex.: CIP02"
                    type="text"
                    bg={"#fff"}
                    id={`atividades[${index}].atividade_id_origem`}
                    name={`atividades[${index}].atividade_id_origem`}
                    value={regexCaracteresEspeciais(
                      registerForm.values.atividades[index].atividade_id_origem
                    )}
                    onChange={(event) => {
                      registerForm.setFieldValue(
                        `atividades[${index}].atividade_id_origem`,
                        event.target.value
                      );
                    }}
                    maxLength={10}
                  />
                </Flex>

                <Flex direction={"column"} flex={2}>
                  <SelectFiltragem
                    registerForm={registerForm}
                    nomeSelect={"ÁREA"}
                    required={true}
                    propName={`atividades[${index}].area_id`}
                    options={optionsAreaAtuacao}
                    value={getValue(optionsAreaAtuacao, index, "area_id")}
                  />
                </Flex>

                <Flex direction={"column"} flex={1}>
                  <Flex gap={1}>
                    <RequiredField />
                    <Text
                      fontWeight={"700"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      DIAS
                    </Text>
                  </Flex>
                  <Input
                    h={"56px"}
                    _placeholder={{ color: "#949494" }}
                    fontSize={"14px"}
                    fontWeight={"400"}
                    color={"black"}
                    maxW={"128px"}
                    placeholder="0"
                    type={"number"}
                    bg={"#fff"}
                    id={`atividades[${index}].qtde_dias`}
                    name={`atividades[${index}].qtde_dias`}
                    value={registerForm.values.atividades[index].qtde_dias}
                    onChange={(event) => {
                      registerForm.setFieldValue(
                        `atividades[${index}].qtde_dias`,
                        Number(event.target.value)
                      );
                    }}
                  />
                </Flex>
                <Flex direction={"column"} flex={1}>
                  <Flex gap={1}>
                    <Text
                      fontWeight={"700"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      PRECEDENTES
                    </Text>
                  </Flex>
                  <PopOverPrecedentes
                    registerForm={registerForm}
                    index={index}
                  />
                </Flex>
                <Flex direction={"column"} flex={1}>
                  <Flex gap={1}>
                    <Text
                      fontWeight={"700"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      TIPO
                    </Text>
                  </Flex>
                  <Input
                    h={"56px"}
                    _placeholder={{ color: "#949494" }}
                    fontSize={"14px"}
                    fontWeight={"400"}
                    color={"black"}
                    maxW={"128px"}
                    placeholder="IF+0"
                    type={"text"}
                    bg={"#fff"}
                    id={`atividades[${index}].tipo_precedentes`}
                    name={`atividades[${index}].tipo_precedentes`}
                    value={
                      registerForm.values.atividades[index].tipo_precedentes
                    }
                    onChange={(event) => {
                      registerForm.setFieldValue(
                        `atividades[${index}].tipo_precedentes`,
                        event.target.value
                      );
                    }}
                  />
                </Flex>
              </Flex>
              {/* <Flex
                mr={4}
                p={1}
                align={"center"}
                justify={"center"}
                _hover={{ cursor: "pointer" }}
              > */}
              <IconButton
                onClick={() => remove(index)}
                color={"#F40606"}
                fontWeight={"700"}
                backgroundColor={"transparent"}
                aria-label="Plus sign"
                _hover={{
                  backgroundColor: "#F40606",
                  color: "white",
                }}
                alignSelf={"center"}
              >
                <FiTrash size={13} />
              </IconButton>
              {/* </Flex> */}
            </Flex>
          </Box>
        </div>
      )}
    </Draggable>
  );
}

export default AtividadesDraggable;
