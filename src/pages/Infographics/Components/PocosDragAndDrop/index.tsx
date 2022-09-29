import { useEffect, useId, useState } from "react";
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
} from "react-beautiful-dnd";

import { Flex, FormLabel } from "@chakra-ui/react";
import { AtividadesProjetoTipo } from "interfaces/CadastrosModaisInfograficos";

import { RequiredField } from "components/RequiredField/RequiredField";

import BotaoAdicionar from "./BotaoAdicionar";
import PocoDraggable from "./Draggable/PocoDraggable";

export default function PocosDragAndDrop({ pocos, setPocos }: any) {
  const id = useId();
  const [render, setRender] = useState<any>([]);
  const [droppableId, setDroppableId] = useState<string>(id);

  const reorder = () => {};

  const onDragEnd = (result: any) => {
    reorder();
  };

  const add = () => {
    setRender(!render);
  };

  useEffect(() => {
    const now = Date.now();
    const newId = droppableId + "-" + now.toLocaleString();
    setDroppableId(newId);
  }, []);

  return (
    <>
      <Flex gap={1}>
        <RequiredField />
        <FormLabel mb={0}>Poços</FormLabel>
      </Flex>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={droppableId}>
          {(provided: DroppableProvided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {pocos.map((poco: AtividadesProjetoTipo, index: number) => (
                <PocoDraggable
                  key={index}
                  pocos={pocos}
                  setPocos={setPocos}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <BotaoAdicionar add={add} />
    </>
  );
}
