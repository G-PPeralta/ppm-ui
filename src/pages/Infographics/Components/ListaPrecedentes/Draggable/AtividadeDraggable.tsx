// import { useState } from "react";
import { useEffect, useId, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FiTrash } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";

import { Box, Flex, FormControl, Input, Text } from "@chakra-ui/react";

import SelectFiltragemArea from "./SelectFiltragemArea";
import SelectFiltragemTarefa from "./SelectFiltragemTarefa";

// import { useCadastroProjetoTipo } from "hooks/useCadastroProjetoTipoOLD";

// import PopOverPrecedentes from "../../ListaAtividades/PopOverPrecedentes";

// interface Props {
//   index: number;
//   atividade: any;
//   remove: any;
//   handleChangeProp: any;
//   list: any;
// }

function AtividadesDraggable({
  index,
  registerForm,
}: // handleChangeProp,
// list,
any) {
  // const { registerForm, listaAtividades } = useCadastroProjetoTipo();

  // const handleChange = (event: any, chave: any) => {
  //   atividade[chave] = Number(event.target.value);
  //   handleChangeProp(index, chave, Number(event.target.value));
  //   registerForm.setFieldValue("atividades", list);
  // };

  // const [render, setRender] = useState(false);

  // const handlePopover = (indexIn: number, value: boolean) => {
  //   const newList = atividade.precedentes;
  //   newList[indexIn].checked = value;
  //   handleChangeProp(index, "precedentes", newList);
  //   setRender(!render);
  // };

  // const remove = (index: number) => {
  //   const newList = list;
  //   newList.splice(index, 1);
  //   setList(newList);
  //   setRender(!render);
  // };

  const id = useId();
  const [draggableId, setDraggableId] = useState<any>(id);

  const remove = (index: number) => {
    const newList = registerForm.values.atividades;
    newList.splice(index, 1);
    registerForm.setFieldValue("atividades", newList);
  };

  useEffect(() => {
    const now = Date.now();
    const newId = draggableId + "-" + now.toLocaleString();
    setDraggableId(newId);
  }, []);

  console.log("registerForm", registerForm.values);

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
            <Flex flexDirection={"row"} gap={4}>
              <Flex align={"center"} justify={"center"} gap={3}>
                <GiHamburgerMenu color="#2E69FD" size={16} />
                <Text sx={{ fontSize: 16, fontWeight: "600" }}>
                  {index + 1}
                </Text>
              </Flex>

              <FormControl>
                <Text sx={{ fontSize: 12, fontWeight: "600" }}>ID</Text>
                <Input
                  placeholder="0"
                  type={"number"}
                  bg={"#fff"}
                  id={`atividades[${index}].atividade_id_origem`}
                  name={`atividades[${index}].atividade_id_origem`}
                  value={
                    registerForm.values.atividades[index].atividade_id_origem
                  }
                  onChange={(event) => {
                    registerForm.setFieldValue(
                      `atividades[${index}].atividade_id_origem`,
                      Number(event.target.value)
                    );
                  }}
                />
              </FormControl>

              <FormControl>
                <SelectFiltragemArea
                  registerForm={registerForm}
                  index={index}
                />
              </FormControl>

              <FormControl>
                <SelectFiltragemTarefa
                  registerForm={registerForm}
                  index={index}
                />
              </FormControl>

              <FormControl>
                <Text sx={{ fontSize: 12, fontWeight: "600" }}>DIAS</Text>
                <Input
                  placeholder="0"
                  type={"number"}
                  bg={"#fff"}
                  id={`atividades[${index}].dias`}
                  name={`atividades[${index}].dias`}
                  value={registerForm.values.atividades[index].dias}
                  onChange={(event) => {
                    registerForm.setFieldValue(
                      `atividades[${index}].dias`,
                      Number(event.target.value)
                    );
                  }}
                />
              </FormControl>

              <Flex direction={"column"}>
                <Text sx={{ fontSize: 12, fontWeight: "600" }}>
                  PRECEDENTES
                </Text>
                {/* <PopOverPrecedentes
                  handlePopover={handlePopover}
                  atividades={atividade.precedentes}
                /> */}
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
