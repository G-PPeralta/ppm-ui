import { useEffect, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';

import { FormLabel } from '@chakra-ui/react';

import AtividadesDraggable from './AtividadesDraggable';
import BotaoAdicionar from './BotaoAdicionar';

const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function ListDnD({ atividades }: any) {
  const [list, setList] = useState<any>([]);
  const [render, setRender] = useState<any>([]);
  const [id, setId] = useState<any>('listID');

  function onDragEnd(result: any) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const newList = reorder(
      list,
      result.source.index,
      result.destination.index,
    );
    setList(newList);
  }

  const remove = (index: number) => {
    const newList = list;
    newList.splice(index, 1);
    setList(newList);
    setRender(!render);
  };

  const add = () => {
    const newList = list;
    newList.push({ base: '', tarefa: '', precedente: '', dias: 0 });
    setList(newList);
    setRender(!render);
  };

  const handleChangeProp = (index: any, chave: any, value: any) => {
    const newList = list;
    newList[index][chave] = value;
    setList(newList);
    setRender(!render);
  };

  useEffect(() => {
    setList(atividades);
    const now = Date.now();
    const newId = id + '-' + now.toLocaleString();
    setId(newId);
  }, []);

  return (
    <>
      <FormLabel mb={0}>ATIVIDADES</FormLabel>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={id}>
          {(provided: DroppableProvided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {list.map((item: any, index: any) => (
                <AtividadesDraggable
                  handleChangeProp={handleChangeProp}
                  item={item}
                  index={index}
                  key={`list${index}`}
                  remove={remove}
                  list={list}
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