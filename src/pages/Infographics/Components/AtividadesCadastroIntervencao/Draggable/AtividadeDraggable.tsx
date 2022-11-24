import { useEffect, useId, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import toast from "react-hot-toast";
import { FiTrash } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";

import {
  Box,
  Flex,
  NumberInput,
  NumberInputField,
  Text,
} from "@chakra-ui/react";
import { FormikProps } from "formik";
import {
  AreaAtuacao,
  Responsavel,
} from "interfaces/CadastrosModaisInfograficos";

import { RequiredField } from "components/RequiredField/RequiredField";

import SelectFiltragem from "../../../../../components/SelectFiltragem";
import PopOverPrecedentes from "./PopOverPrecedentes";
interface Props {
  registerForm: FormikProps<any>;
  index: number;
  listas: {
    listaAreaAtuacao: AreaAtuacao[];
    listaResponsaveis: Responsavel[];
    listaTarefas: any[];
  };
}

function AtividadesDraggable({ index, registerForm, listas }: Props) {
  const innerwidth = window.innerWidth;

  const { listaAreaAtuacao, listaResponsaveis, listaTarefas } = listas;

  const id = useId();
  const [draggableId, setDraggableId] = useState<any>(id);
  const [checked, setChecked] = useState<any>();
  const [disabled, setDisabled] = useState<boolean>(false);

  // console.log(checked);
  // console.log(checked == "checked");

  // console.log(registerForm.values.ind_atv_execucao);

  useEffect(() => {
    registerForm.setFieldValue(
      "ind_atv_execucao",
      checked !== "checked" ? 1 : null
    );
  }, [checked]);

  const remove = (index: number) => {
    if (registerForm.values.atividades.length > 1) {
      // Pega a lista de atividades diretamente do Formik
      const newList = registerForm.values.atividades;
      // Remove item da lista
      newList.splice(index, 1);
      // Atualiza lista no Formik
      registerForm.setFieldValue("atividades", newList);
    } else {
      toast.error("A intervenção deve ter ao menos uma atividade", {
        id: "toast-principal",
      });
    }
  };

  const optionsAreaAtuacao = listaAreaAtuacao.map((poco: AreaAtuacao) => ({
    value: poco.id,
    label: poco.tipo,
  }));

  const optionsTarefa = listaTarefas.map((tarefa: any) => ({
    value: tarefa.id,
    label: tarefa.nom_atividade,
  }));

  const optionsResponsaveis = listaResponsaveis.map(
    (responsavel: Responsavel) => ({
      value: responsavel.id,
      label: responsavel.nome,
    })
  );

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
            justifyContent="center"
            w="100%"
            bg={"#f5f5f5"}
            px={5}
            py={4}
            borderRadius={"60px"}
            mb={2}
          >
            <Flex
              flexDirection={"row"}
              gap={4}
              flex={1}
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
                direction={innerwidth >= 640 ? "row" : "column"}
                align={"center"}
                justify={"center"}
                py={innerwidth >= 640 ? 0 : 4}
                flex={1}
              >
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

                <Flex direction={"column"} flex={2}>
                  <SelectFiltragem
                    required={true}
                    nomeSelect={"RESPONSÁVEL"}
                    registerForm={registerForm}
                    propName={`atividades[${index}].responsavel_id`}
                    options={optionsResponsaveis}
                    value={getValue(
                      optionsResponsaveis,
                      index,
                      "responsavel_id"
                    )}
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
              <input
                type={"checkbox"}
                value={getValue(optionsTarefa, index, "tarefa_id").label}
                onChange={(e) => {
                  setDisabled(!disabled);

                  setChecked(
                    e.target.value ===
                      getValue(optionsTarefa, index, "tarefa_id").label
                      ? "checked"
                      : 0
                  );
                }}
                disabled={disabled}
              />
            </Flex>
          </Box>
        </div>
      )}
    </Draggable>
  );
}

export default AtividadesDraggable;
