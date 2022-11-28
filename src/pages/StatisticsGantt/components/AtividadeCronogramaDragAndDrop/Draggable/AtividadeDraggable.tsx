import { useEffect, useId, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FiTrash } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";

import { Box, Flex, Text } from "@chakra-ui/react";
import { FormikProps } from "formik";

import SelectFiltragem from "components/SelectFiltragem";

// import { getDataInicioExecucao } from "services/get/Estatisticas";

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
    const oldList = registerForm.values.precedentes;
    // Remove item da lista
    const newList = oldList.splice(index, 1);
    // Atualiza lista no Formik
    registerForm.setFieldValue("precedentes", newList);
  };

  const handleDataFinalPredecessor = async () => {
    if (
      registerForm?.values?.precedentes?.[index]?.atividadePrecedenteId &&
      registerForm?.values?.precedentes?.[index]?.atividadePrecedenteId !== ""
    ) {
      // const dataInicioExecucao = await getDataInicioExecucao(
      //   registerForm?.values?.precedentes?.[index]?.atividadePrecedenteId
      // );
      // console.log("dataInicioExecucao", dataInicioExecucao);
    }
  };

  useEffect(() => {
    const now = Date.now();
    const newId = draggableId + "-" + now.toLocaleString();
    setDraggableId(newId);
  }, []);

  useEffect(() => {
    handleDataFinalPredecessor();
  }, [registerForm.values.precedentes[index].atividadePrecedenteId]);
  // console.log("teste", registerForm.values);

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
                    options={atividades}
                    required={false}
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
