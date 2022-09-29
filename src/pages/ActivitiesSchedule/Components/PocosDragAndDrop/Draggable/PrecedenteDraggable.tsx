// import { useState } from "react";
import { useEffect, useId, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FiTrash } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";

import { Box, Flex, FormControl, Input, Text } from "@chakra-ui/react";

import SelectPrecedente from "./SelectPrecedente";

function PrecedenteDraggable({
  precedentes,
  setPrecedentes,
  index,
  listaPrecedentes,
  remove,
}: any) {
  const innerwidth = window.innerWidth;

  const id = useId();
  const [draggableId, setDraggableId] = useState<any>(id);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const now = Date.now();
    const newId = draggableId + "-" + now.toLocaleString();
    setDraggableId(newId);
  }, []);

  const handleChange = ({ value }: any) => {
    const newItem = precedentes[index];
    newItem.id = value;
    const filteredList = listaPrecedentes.filter(
      (precedente: any) => precedente.id_atividade == value
    );
    newItem.dias = filteredList[0].qtddias;
    const newList = precedentes;
    newList[index] = newItem;
    setPrecedentes(newList);
    setRender(!render);
  };

  const options = listaPrecedentes.map((precedente: any) => ({
    value: precedente.id_atividade,
    label: precedente.atividade,
  }));

  const getValue = (options: any, i: number) => {
    const index = options
      .map(({ value }: any) => value)
      .indexOf(precedentes[i].id);

    return {
      value: options?.[index]?.value,
      label: options?.[index]?.label,
    };
  };

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
                <Flex direction={"column"} flex={3}>
                  <SelectPrecedente
                    listaPrecedentes={listaPrecedentes}
                    handleChange={handleChange}
                    options={options}
                    value={getValue(options, index)}
                  />
                </Flex>
                <Flex flex={1}>
                  <Flex
                    gap={4}
                    direction={innerwidth >= 640 ? "row" : "column"}
                    align={"center"}
                    justify={"center"}
                    py={innerwidth >= 640 ? 0 : 4}
                    flex={1}
                  >
                    <FormControl>
                      <Text sx={{ fontSize: 12, fontWeight: "600" }}>DIAS</Text>
                      <Input
                        isDisabled
                        bg={"#fff"}
                        placeholder="0"
                        id="dias"
                        type="number"
                        name="dias"
                        w={"100%"}
                        value={precedentes[index].dias}
                      />
                    </FormControl>
                  </Flex>
                </Flex>
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
          </Box>
        </div>
      )}
    </Draggable>
  );
}

export default PrecedenteDraggable;
