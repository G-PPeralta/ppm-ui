//  CRIADO EM: 9/2022
//  AUTOR: Bruno Fracaro, Eduardo Muchak.
//  DESCRIÇÃO DO ARQUIVO: Card arrastável para o referido drag n drop

import { useEffect, useId, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { GiHamburgerMenu } from "react-icons/gi";

import { Box, Flex, Text } from "@chakra-ui/react";

import SelectPoco from "./SelectPoco";

function PocoDraggable({ pocos, setPocos, index, setPayload }: any) {
  const innerwidth = window.innerWidth;

  const id = useId();

  const [draggableId, setDraggableId] = useState<any>(id);

  const optionsPocos = pocos.map((poco: any) => ({
    value: poco.id_poco,
    label: poco.poco,
  }));

  const getValue = (options: any, i: number) => ({
    value: options?.[i]?.value,
    label: options?.[i]?.label,
  });

  useEffect(() => {
    const now = Date.now();
    const newId = draggableId + "-" + now.toLocaleString();
    setDraggableId(newId);
  }, []);

  useEffect(() => {
    setPayload(
      pocos.map((poco: any, index: number) => ({
        id_cronograma: poco.id_poco,
        ordem: index,
      }))
    );
  }, [pocos]);

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
                <Flex direction={"column"} flex={2} pr={3}>
                  <SelectPoco
                    pocos={pocos}
                    setPocos={setPocos}
                    index={index}
                    options={optionsPocos}
                    value={getValue(optionsPocos, index)}
                  />
                </Flex>
              </Flex>
            </Flex>
          </Box>
        </div>
      )}
    </Draggable>
  );
}

export default PocoDraggable;
