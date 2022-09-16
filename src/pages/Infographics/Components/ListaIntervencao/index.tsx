import { useEffect, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';

import { FormLabel } from '@chakra-ui/react';

import { useCadastroIntervencao } from 'hooks/useCadastroIntervencao';

import AtividadesDraggable from './AtividadesDraggable';
// import BotaoAdicionar from './BotaoAdicionar';

const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function ListDnD({ atividades, intervencaoForm }: any) {
  const [list, setList] = useState<any>([]);
  const [render, setRender] = useState<any>([]);
  const [id, setId] = useState<any>('listID');
  const { listaProjetosTipo } = useCadastroIntervencao();

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

  // const add = () => {
  //   const newList = list;
  //   newList.push({
  //     atividade: {
  //       areaAtuacaoId: 0,
  //       dias: 0,
  //       id: 0,
  //       obs: '',
  //       tarefaId: 0,
  //     },
  //   });
  //   setList(newList);
  //   setRender(!render);
  // };

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

  useEffect(() => {
    if (intervencaoForm.values.projetoId) {
      const projeto = listaProjetosTipo.find(
        (projeto: any) => projeto.id === intervencaoForm.values.projetoId,
      );

      if (projeto) {
        setList(projeto.atividades);
        setRender(projeto.atividades);
      }
    }
  }, [intervencaoForm.values.projetoId]);

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
      {/* <BotaoAdicionar add={add} /> */}
    </>
  );
}
