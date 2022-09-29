// import { useState } from "react";
import { useEffect, useId, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FiTrash } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";

import { Box, Flex, FormControl, Text } from "@chakra-ui/react";

import SelectPoco from "./SelectPoco";

function PocoDraggable({ pocos, setPocos, index }: any) {
  const innerwidth = window.innerWidth;

  const id = useId();
  const [draggableId, setDraggableId] = useState<any>(id);

  const remove = (index: number) => {};

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
            justifyContent="space-evenly"
            w="100%"
            bg={"#f5f5f5"}
            px={5}
            py={2}
            borderRadius={"60px"}
            mb={2}
          >
            <Flex align={"center"} justify={"center"} gap={3}>
              <GiHamburgerMenu color="#2E69FD" size={16} />
              <Text sx={{ fontSize: 16, fontWeight: "600" }}>{index + 1}</Text>
            </Flex>

            <Flex
              gap={4}
              direction={innerwidth >= 640 ? "row" : "column"}
              align={"center"}
              justify={"center"}
              py={innerwidth >= 640 ? 0 : 4}
            >
              <FormControl>
                <SelectPoco pocos={pocos} setPocos={setPocos} index={index} />
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
          </Box>
        </div>
      )}
    </Draggable>
  );
}

export default PocoDraggable;
