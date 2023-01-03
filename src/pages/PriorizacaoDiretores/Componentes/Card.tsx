import { useEffect, useId, useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import { Flex, Text } from "@chakra-ui/react";

import { formatReal } from "utils/formatReal";

interface Props {
  data: any;
  index: number;
}

function Card({ data, index }: Props) {
  const id = useId();
  const [draggableId, setDraggableId] = useState<any>(id);

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
          <Flex w="100%" align="center" justify="space-between" p={4}>
            <Text fontWeight={"700"} fontSize={"16px"}>
              {index + 1}°
            </Text>
            <Flex
              w="80%"
              background={"#f5f5f5"}
              borderRadius={"8px"}
              p={2}
              justifyContent={"center"}
              flexDirection={"column"}
            >
              <Text
                fontWeight={"700"}
                fontSize={"16px"}
                w="100%"
                textAlign={"center"}
                mb={2}
              >
                {data.nome_projeto}
              </Text>
              <Flex w="100%" align="center" justify="space-between">
                <Text fontWeight={"700"} fontSize={"14px"}>
                  Data Início:
                </Text>
                <Text fontWeight={"300"} fontSize={"14px"}>
                  {data.data_inicio == null
                    ? "---"
                    : new Date(data.data_inicio).toLocaleDateString()}
                </Text>
              </Flex>
              <Flex w="100%" align="center" justify="space-between">
                <Text fontWeight={"700"} fontSize={"14px"}>
                  Data Fim:
                </Text>
                <Text fontWeight={"300"} fontSize={"14px"}>
                  {data.data_fim == null
                    ? "---"
                    : new Date(data.data_fim).toLocaleDateString()}
                </Text>
              </Flex>
              <Flex w="100%" align="center" justify="space-between">
                <Text fontWeight={"700"} fontSize={"14px"}>
                  Orçamento:
                </Text>
                <Text fontWeight={"300"} fontSize={"14px"}>
                  {+data.vlr_orcado ? formatReal(+data.vlr_orcado) : "R$ 0"}
                </Text>
              </Flex>
              <Flex w="100%" align="center" justify="space-between">
                <Text fontWeight={"700"} fontSize={"14px"}>
                  Realizado:
                </Text>
                <Text fontWeight={"300"} fontSize={"14px"}>
                  {+data.vlr_cr ? formatReal(+data.vlr_cr) : "R$ 0"}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </div>
      )}
    </Draggable>
  );
}

export default Card;
