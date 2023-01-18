//  CRIADO EM: 9/2022
//  AUTOR: Bruno Fracaro, Eduardo Muchak.
//  DESCRIÇÃO DO ARQUIVO: Atividade arrastável no cadastro de intervenções.

import { useEffect, useId, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import toast from "react-hot-toast";
import { FiTrash } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";

import {
  Box,
  Checkbox,
  Flex,
  NumberInput,
  NumberInputField,
  Text,
} from "@chakra-ui/react";
import { FormikProps } from "formik";
import {
  AreaAtuacao,
  Responsavel,
  Tarefas,
} from "interfaces/CadastrosModaisInfograficos";
import { AtividadesDr } from "interfaces/Infograficos";

import InputGenerico from "components/InputGenerico";
import { RequiredField } from "components/RequiredField/RequiredField";

import SelectFiltragem from "../../../../../components/SelectFiltragem";
import PopOverPrecedentes from "./PopOverPrecedentes";
interface Props {
  registerForm: FormikProps<any>;
  index: number;
  listas: {
    listaAreaAtuacao: AreaAtuacao[];
    listaResponsaveis: Responsavel[];
    listaTarefas: Tarefas[];
  };
}

function AtividadesDraggable({ index, registerForm, listas }: Props) {
  const innerwidth = window.innerWidth;

  const { listaAreaAtuacao, listaTarefas } = listas;

  const id = useId();
  const [draggableId, setDraggableId] = useState<string>(id);

  const remove = (index: number) => {
    if (registerForm.values.atividades.length > 1) {
      const newList = registerForm.values.atividades;
      newList.splice(index, 1);
      registerForm.setFieldValue("atividades", newList);
    } else {
      toast.error("A intervenção deve ter ao menos uma atividade", {
        id: "toast-principal",
      });
    }
  };

  interface Options {
    label: string;
    value: number;
  }

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
      .map(({ value }: Options) => value)
      .indexOf(registerForm?.values?.atividades?.[i][chave]);

    return {
      value: options?.[index]?.value,
      label: options?.[index]?.label,
    };
  };

  const isDisabled = (index: number) => {
    const atividadeDefinida = registerForm.values.atividades.some(
      (atividade: AtividadesDr) => atividade.ind_atv_execucao === true
    );
    if (
      atividadeDefinida &&
      registerForm.values.atividades[index].ind_atv_execucao === false
    ) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const now = Date.now();
    const newId = draggableId + "-" + now.toLocaleString();
    setDraggableId(newId);
  }, []);

  useEffect(() => {
    isDisabled(index);
  }, [registerForm.values.atividades]);

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
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            w="100%"
            bg={"#f5f5f5"}
            px={5}
            py={4}
            borderRadius={"60px"}
            mb={2}
            gap={3}
          >
            <Flex
              flexDirection={"row"}
              gap={4}
              flex={1}
              w="100%"
              justify={"space-between"}
            >
              <Flex align={"center"} justify={"center"} gap={3}>
                <GiHamburgerMenu color="#2E69FD" size={16} />
                <Text sx={{ fontSize: 16, fontWeight: "600" }}>
                  {index + 1}
                </Text>
              </Flex>

              <Flex
                gap={4}
                direction={"column"}
                align={"start"}
                justify={"center"}
                py={innerwidth >= 640 ? 0 : 4}
                flex={1}
              >
                <Flex
                  gap={4}
                  direction={innerwidth >= 640 ? "row" : "column"}
                  align={"center"}
                  justify={"center"}
                  py={innerwidth >= 640 ? 0 : 4}
                  flex={1}
                  w="100%"
                >
                  <Flex direction={"column"} flex={2}>
                    <InputGenerico
                      registerForm={registerForm}
                      nomeInput={"ID"}
                      propName={`atividades[${index}].id_origem`}
                      value={
                        registerForm.values.atividades[index].id_origem || ""
                      }
                      required={true}
                      placeholder={"Digite o ID"}
                      maxLength={20}
                    />
                  </Flex>
                  <Flex direction={"column"} flex={2}>
                    <SelectFiltragem
                      registerForm={registerForm}
                      required={true}
                      nomeSelect={"ÁREA"}
                      propName={`atividades[${index}].area_id`}
                      options={optionsAreaAtuacao}
                      value={getValue(optionsAreaAtuacao, index, "area_id")}
                    />
                  </Flex>

                  <Flex direction={"column"} flex={2}>
                    <SelectFiltragem
                      registerForm={registerForm}
                      required={true}
                      nomeSelect={"ATIVIDADE"}
                      propName={`atividades[${index}].tarefa_id`}
                      options={optionsTarefa}
                      value={getValue(optionsTarefa, index, "tarefa_id")}
                    />
                  </Flex>

                  <Flex direction={"column"} flex={1}>
                    <Flex gap={1}>
                      <RequiredField />
                      <Text
                        fontWeight={"bold"}
                        fontSize={"12px"}
                        color={"#949494"}
                      >
                        DIAS
                      </Text>
                    </Flex>
                    <NumberInput
                      maxW={"128px"}
                      max={99999}
                      min={0}
                      id={`atividades[${index}].qtde_dias`}
                      name={`atividades[${index}].qtde_dias`}
                      value={registerForm.values.atividades[index].qtde_dias}
                      onChange={(value) => {
                        registerForm.setFieldValue(
                          `atividades[${index}].qtde_dias`,
                          Number(value)
                        );
                      }}
                    >
                      <NumberInputField bg={"#fff"} h={"56px"} />
                    </NumberInput>
                  </Flex>
                  <Flex direction={"column"} flex={1}>
                    <Flex gap={1}>
                      <Text
                        fontWeight={"bold"}
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
                </Flex>
                <Flex>
                  <Checkbox
                    variant={"origem"}
                    isChecked={
                      registerForm.values.atividades[index].ind_atv_execucao
                    }
                    onChange={(e) => {
                      registerForm.setFieldValue(
                        `atividades[${index}].ind_atv_execucao`,
                        e.target.checked
                      );
                    }}
                    isDisabled={isDisabled(index)}
                    size="md"
                    colorScheme="blue"
                  >
                    Primeira atividade do Cronograma de Execução
                  </Checkbox>
                </Flex>
              </Flex>
              <Flex
                p={1}
                align={"center"}
                justify={"center"}
                _hover={{ cursor: "pointer" }}
              >
                <FiTrash
                  onClick={() => remove(index)}
                  color="#F94144"
                  size={16}
                />
              </Flex>
            </Flex>
          </Box>
        </div>
      )}
    </Draggable>
  );
}

export default AtividadesDraggable;
