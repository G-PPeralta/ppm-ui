import { useEffect, useId, useState } from "react";
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
} from "react-beautiful-dnd";

import { Flex, Text } from "@chakra-ui/react";

import DraggableNaoArrastavel from "./Draggable/DraggableNaoArrastavel";
import PocoDraggable from "./Draggable/PocoDraggable";

export default function PocosDragAndDrop({ pocos, setPocos, setPayload }: any) {
  const id = useId();
  const [droppableId, setDroppableId] = useState<string>(id);

  const handlePayload = (pocos: any) => {
    setPayload(
      pocos.map((poco: any, index: number) => ({
        id_cronograma: poco.id_poco,
        ordem: index + 1,
      }))
    );
  };

  const reorder = (pocos: any, startIndex: number, endIndex: number) => {
    const listaReordenada = (pocos: any) => {
      const list = pocos;

      const [removed] = list.splice(startIndex, 1);

      list.splice(endIndex, 0, removed);

      return list;
    };
    setPocos(listaReordenada(pocos));
    handlePayload(pocos);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    reorder(pocos, result.source.index, result.destination.index);
  };

  useEffect(() => {
    const now = Date.now();
    const newId = droppableId + "-" + now.toLocaleString();
    setDroppableId(newId);
  }, []);

  return (
    <>
      <Flex gap={1}>
        {/* <Text fontWeight={"bold"}>Intervenções</Text> */}
        <Text fontWeight={"700"} fontSize={"12px"} color={"#949494"} mb={-2}>
          INTERVENÇÕES
        </Text>
      </Flex>

      {pocos[0].pct_real !== "0" && (
        <DraggableNaoArrastavel pocos={pocos} setPocos={setPocos} index={0} />
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={droppableId}>
          {(provided: DroppableProvided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {pocos[0].pct_real === "0" && (
                <PocoDraggable
                  pocos={pocos}
                  setPocos={setPocos}
                  index={0}
                  setPayload={setPayload}
                />
              )}
              {pocos.map(
                (_poco: any, index: number) =>
                  index > 0 && (
                    <PocoDraggable
                      key={index}
                      pocos={pocos}
                      setPocos={setPocos}
                      index={index}
                      setPayload={setPayload}
                    />
                  )
              )}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
