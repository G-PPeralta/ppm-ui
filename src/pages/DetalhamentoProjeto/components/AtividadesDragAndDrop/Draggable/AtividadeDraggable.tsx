import { useEffect, useId, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FiTrash } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";

import {
  Box,
  Flex,
  FormControl,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";
import { FormikProps } from "formik";

import SelectFiltragem from "components/SelectFiltragem";

import { formataParaTipo } from "utils/FormataParaTipo";

import { getDataFinalPrecedessor } from "services/get/Estatisticas";

// import SelectFiltragem from "components/SelectFiltragem";

interface Props {
  registerForm: FormikProps<any>;
  index: number;
  atividades?: any;
}

function AtividadesDraggable({ index, registerForm, atividades }: Props) {
  const innerwidth = window.innerWidth;

  const id = useId();
  const [draggableId, setDraggableId] = useState<any>(id);

  const remove = (index: number) => {
    // Pega a lista de precedentes diretamente do Formik
    const newList = registerForm.values.precedentes;

    // Remove item da lista
    newList.splice(index, 1);
    // Atualiza lista no Formik
    registerForm.setFieldValue("precedentes", newList);
  };

  const optionsAtividades = atividades.map((atividade: any) => ({
    value: atividade.value,
    label: atividade.label,
  }));

  // const getValue = (options: any, i: number, chave: string) => {
  //   const index = options
  //     .map(({ value }: any) => value)
  //     .indexOf(registerForm?.values?.precedentes?.[i][chave]);

  //   return {
  //     value: options?.[index]?.value,
  //     label: options?.[index]?.label,
  //   };
  // };

  const handleDataFinalPredecessor = async () => {
    if (
      registerForm?.values?.precedentes?.[index]?.atividadePrecedenteId &&
      registerForm?.values?.precedentes?.[index]?.atividadePrecedenteId !== ""
    ) {
      registerForm.setFieldValue(`precedentes[${index}].dias`, 1);
      const { data } = await getDataFinalPrecedessor(
        registerForm?.values?.precedentes?.[index]?.atividadePrecedenteId
      );
      if (registerForm.values.dat_fim_plan < data[0].dat_fim_plan) {
        registerForm.setFieldValue("dat_fim_plan", data[0].dat_fim_plan);
        registerForm.setFieldValue("dat_inicio_plan", data[0].dat_fim_plan);
      }
    }
  };

  useEffect(() => {
    const now = Date.now();
    const newId = draggableId + "-" + now.toLocaleString();
    setDraggableId(newId);
  }, []);

  useEffect(() => {
    handleDataFinalPredecessor();
    // console.log("teste", `precedentes[${index}].atividadePrecedenteId`);
  }, [registerForm.values.precedentes[index].atividadePrecedenteId]);

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
                <Flex direction={"column"} flex={3}>
                  {/* <SelectFiltragem
                    registerForm={registerForm}
                    nomeSelect={"ATIVIDADE"}
                    propName={`precedentes[${index}].atividadePrecedenteId`}
                    options={optionsAtividades}
                    value={getValue(
                      optionsAtividades,
                      index,
                      "atividadePrecedenteId"
                    )}
                  /> */}
                  <SelectFiltragem
                    registerForm={registerForm}
                    nomeSelect={"ATIVIDADE"}
                    propName={`precedentes[${index}].atividadePrecedenteId`}
                    options={optionsAtividades}
                    required={false}
                  />
                </Flex>
                <Flex flex={1}>
                  <FormControl>
                    <Text
                      fontWeight={"bold"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      DIAS
                    </Text>
                    <NumberInput
                      max={99999}
                      // min={1}
                      placeholder={"0"}
                      id={`precedentes[${index}].dias`}
                      name={`precedentes[${index}].dias`}
                      value={formataParaTipo(
                        "dias",
                        registerForm.values.precedentes[index].dias
                      )}
                      onChange={(value) => {
                        registerForm.setFieldValue(
                          `precedentes[${index}].dias`,
                          Number(value)
                        );
                      }}
                    >
                      <NumberInputField
                        h={"56px"}
                        maxW={"128px"}
                        // maxLength={5}
                        bg={"#fff"}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
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
