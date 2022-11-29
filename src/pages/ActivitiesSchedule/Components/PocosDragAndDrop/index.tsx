import { useEffect, useId, useState } from "react";
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
} from "react-beautiful-dnd";

import { Flex, Text } from "@chakra-ui/react";
import { AtividadesProjetoTipo } from "interfaces/CadastrosModaisInfograficos";

import BotaoAdicionar from "./BotaoAdicionar";
import PrecedenteDraggable from "./Draggable/PrecedenteDraggable";

export default function PocosDragAndDrop({
  precedentes,
  setPrecedentes,
  listaPrecedentes,
}: any) {
  const id = useId();
  const [render, setRender] = useState<any>([]);
  const [droppableId, setDroppableId] = useState<string>(id);

  const reorder = (source: any, destination: any) => {
    const newList = precedentes;
    const [removed] = newList.splice(source, 1);
    newList.splice(destination, 0, removed);
    setPrecedentes(newList);
    setRender(!render);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    reorder(result.source.index, result.destination.index);
  };

  const add = () => {
    const newPrecedente = {
      id: 0,
      dias: 0,
    };
    const newList = precedentes;
    newList.push(newPrecedente);
    setPrecedentes(newList);
    setRender(!render);
  };

  const remove = (index: any) => {
    const newList = precedentes;
    newList.splice(index, 1);
    setPrecedentes(newList);
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
        {/* <Text fontWeight={"bold"}>Precedentes</Text> */}
        <Text fontWeight={"700"} fontSize={"12px"} color={"#949494"} mb={-2}>
          ATIVIDADES PRECEDENTES
        </Text>
      </Flex>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={droppableId}>
          {(provided: DroppableProvided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {precedentes.map((poco: AtividadesProjetoTipo, index: number) => (
                <PrecedenteDraggable
                  remove={remove}
                  listaPrecedentes={listaPrecedentes}
                  key={index}
                  precedentes={precedentes}
                  setPrecedentes={setPrecedentes}
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
