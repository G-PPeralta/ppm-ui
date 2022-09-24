import { useEffect, useId, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FiTrash } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";

import { Box, Flex, FormControl, Input, Text } from "@chakra-ui/react";
import { FormikProps } from "formik";
import {
  AreaAtuacao,
  Responsavel,
} from "interfaces/CadastrosModaisInfograficos";

import { useCadastroIntervencao } from "hooks/useCadastroIntervencao";

import SelectFiltragem from "../../SelectFiltragem";
interface Props {
  registerForm: FormikProps<any>;
  index: number;
}

function AtividadesDraggable({ index, registerForm }: Props) {
  const innerwidth = window.innerWidth;
  const { listaAreaAtuacao, listaResponsaveis } = useCadastroIntervencao();

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

  const optionsTarefa = listaAreaAtuacao.map((poco: AreaAtuacao) => ({
    value: poco.id,
    label: poco.tipo,
  }));

  const optionsResponsaveis = listaResponsaveis.map(
    (responsavel: Responsavel) => ({
      value: responsavel.nome,
      label: responsavel.nome,
    })
  );

  const getAreaValue = (options: any, i: number) => {
    const index = options
      .map(({ value }: any) => value)
      .indexOf(registerForm?.values?.atividades?.[i].area_id);

    return {
      value: options?.[index]?.value,
      label: options?.[index]?.label,
    };
  };

  const getTarefaValue = (options: any, i: number) => {
    const index = options
      .map(({ value }: any) => value)
      .indexOf(registerForm?.values?.atividades?.[i].tarefa_id);

    return {
      value: options?.[index]?.value,
      label: options?.[index]?.label,
    };
  };

  const getResponsavelValue = (options: any, i: number) => {
    const index = options
      .map(({ value }: any) => value)
      .indexOf(registerForm?.values?.atividades?.[i].responsavel_id);

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
                    value={getAreaValue(optionsAreaAtuacao, index)}
                  />
                  {/* <Select
                    name={`atividades[${index}].area_id`}
                    placeholder="Selecione"
                    onChange={registerForm.handleChange}
                    value={registerForm.values.atividades[index].area_id}
                    backgroundColor={"#fff"}
                  >
                    {listaAreaAtuacao.map((area: AreaAtuacao) => (
                      <option value={area.id}>{area.tipo}</option>
                    ))}
                  </Select> */}
                </FormControl>
                <FormControl>
                  <Text sx={{ fontSize: 12, fontWeight: "600" }}>TAREFA</Text>
                  <SelectFiltragem
                    registerForm={registerForm}
                    propName={`atividades[${index}].tarefa_id`}
                    options={optionsTarefa}
                    value={getTarefaValue(optionsTarefa, index)}
                  />
                  {/* <Select
                    name={`atividades[${index}].tarefa_id`}
                    placeholder="Selecione"
                    onChange={registerForm.handleChange}
                    value={registerForm.values.atividades[index].tarefa_id}
                    backgroundColor={"#fff"}
                  >
                    {listaResponsaveis.map((responsavel: Responsavel) => (
                      <option value={responsavel.id}>{responsavel.nome}</option>
                    ))}
                  </Select> */}
                </FormControl>
                <FormControl>
                  <Text sx={{ fontSize: 12, fontWeight: "600" }}>
                    RESPONSÁVEL
                  </Text>
                  <SelectFiltragem
                    registerForm={registerForm}
                    propName={`atividades[${index}].responsavel_id`}
                    options={optionsResponsaveis}
                    value={getResponsavelValue(optionsResponsaveis, index)}
                  />
                  {/* <Select
                    name={`atividades[${index}].responsavel_id`}
                    placeholder="Selecione"
                    onChange={registerForm.handleChange}
                    value={registerForm.values.atividades[index].responsavel_id}
                    backgroundColor={"#fff"}
                  >
                    {listaResponsaveis.map((responsavel: Responsavel) => (
                      <option value={responsavel.id}>{responsavel.nome}</option>
                    ))}
                  </Select> */}
                </FormControl>
                <FormControl>
                  <Text sx={{ fontSize: 12, fontWeight: "600" }}>DIAS</Text>
                  <Input
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
                </FormControl>
              </Flex>

              {/* <Flex
                p={1}
                align={'center'}
                justify={'center'}
                _hover={{ cursor: 'pointer' }}
              >
                <FiEdit
                  onClick={() => enableEdit(index)}
                  color="#2E69FD"
                  size={16}
                />
              </Flex> */}

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
