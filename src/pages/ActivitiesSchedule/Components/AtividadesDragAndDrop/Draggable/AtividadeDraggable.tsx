import { useEffect, useId, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FiTrash } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";

import { Box, Flex, FormControl, Input, Text } from "@chakra-ui/react";
import { FormikProps } from "formik";

import SelectFiltragem from "components/SelectFiltragem";

interface Props {
  registerForm: FormikProps<any>;
  index: number;
  atividades: any;
}

function AtividadesDraggable({ index, registerForm, atividades }: Props) {
  const innerwidth = window.innerWidth;

  const id = useId();
  const [draggableId, setDraggableId] = useState<any>(id);

  const remove = (index: number) => {
    const newList = registerForm.values.precedentes;
    newList.splice(index, 1);
    registerForm.setFieldValue("precedentes", newList);
  };

  const optionsAtividades = atividades.map((atividade: any) => ({
    value: atividade.id_atividade,
    label: atividade.atividade,
  }));

  const getValue = (options: any, i: number, chave: string) => {
    const index = options
      .map(({ value }: any) => value)
      .indexOf(registerForm?.values?.precedentes?.[i][chave]);

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
                <Flex direction={"column"} flex={3}>
                  <SelectFiltragem
                    registerForm={registerForm}
                    nomeSelect={"ATIVIDADE"}
                    propName={`precedentes[${index}].atividadePrecedenteId`}
                    options={optionsAtividades}
                    value={getValue(
                      optionsAtividades,
                      index,
                      "atividadePrecedenteId"
                    )}
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
                    <Input
                      h={"56px"}
                      maxW={"128px"}
                      placeholder="0"
                      type={"number"}
                      bg={"#fff"}
                      id={`precedentes[${index}].dias`}
                      name={`precedentes[${index}].dias`}
                      value={registerForm.values.precedentes[index].dias}
                      onChange={(event) => {
                        registerForm.setFieldValue(
                          `precedentes[${index}].dias`,
                          Number(event.target.value)
                        );
                      }}
                    />
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
