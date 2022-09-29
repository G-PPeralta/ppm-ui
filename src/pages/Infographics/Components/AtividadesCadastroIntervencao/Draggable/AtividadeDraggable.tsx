import { useEffect, useId, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FiTrash } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";

import {
  Box,
  Flex,
  FormControl,
  NumberInput,
  NumberInputField,
  Text,
} from "@chakra-ui/react";
import { FormikProps } from "formik";
import {
  AreaAtuacao,
  Responsavel,
} from "interfaces/CadastrosModaisInfograficos";

// import { useCadastroIntervencao } from "hooks/useCadastroIntervencao";

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

  const remove = (index: number) => {
    // Pega a lista de atividades diretamente do Formik
    const newList = registerForm.values.atividades;
    // Remove item da lista
    newList.splice(index, 1);
    // Atualiza lista no Formik
    registerForm.setFieldValue("atividades", newList);
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
            py={2}
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
                <FormControl>
                  <Text sx={{ fontSize: 12, fontWeight: "600" }}>ÁREA</Text>
                  <SelectFiltragem
                    registerForm={registerForm}
                    propName={`atividades[${index}].area_id`}
                    options={optionsAreaAtuacao}
                    value={getValue(optionsAreaAtuacao, index, "area_id")}
                  />
                </FormControl>
                <FormControl>
                  <Text sx={{ fontSize: 12, fontWeight: "600" }}>TAREFA</Text>
                  <SelectFiltragem
                    registerForm={registerForm}
                    propName={`atividades[${index}].tarefa_id`}
                    options={optionsTarefa}
                    value={getValue(optionsTarefa, index, "tarefa_id")}
                  />
                </FormControl>
                <FormControl>
                  <Text sx={{ fontSize: 12, fontWeight: "600" }}>
                    RESPONSÁVEL
                  </Text>
                  <SelectFiltragem
                    registerForm={registerForm}
                    propName={`atividades[${index}].responsavel_id`}
                    options={optionsResponsaveis}
                    value={getValue(
                      optionsResponsaveis,
                      index,
                      "responsavel_id"
                    )}
                  />
                </FormControl>
                <FormControl>
                  <Text sx={{ fontSize: 12, fontWeight: "600" }}>DIAS</Text>

                  <NumberInput
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
                    <NumberInputField bg={"#fff"} />
                  </NumberInput>
                </FormControl>
                <Flex direction={"column"}>
                  <Text sx={{ fontSize: 12, fontWeight: "600" }}>
                    PRECEDENTES
                  </Text>
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
            </Flex>
          </Box>
        </div>
      )}
    </Draggable>
  );
}

export default AtividadesDraggable;
