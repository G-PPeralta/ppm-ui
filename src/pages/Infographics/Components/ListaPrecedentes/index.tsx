import { useEffect, useId, useState } from "react";
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
} from "react-beautiful-dnd";

import { Flex, FormLabel } from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";

import AtividadesDraggable from "./Draggable/AtividadeDraggable";
import BotaoAdicionar from "./Draggable/BotaoAdicionar";

export default function ListaPrecedentes({
  registerForm,
  listaAtividadesPrecedentes,
}: any) {
  const id = useId();
  const [render, setRender] = useState<any>([]);
  const [droppableId, setDroppableId] = useState<any>(id);

  // console.log("registerForm", registerForm.values.atividades);

  const reorder = (registerForm: any, startIndex: any, endIndex: any) => {
    const teste = (registerForm: any) => {
      const list = registerForm.values.atividades;

      const [removed] = list.splice(startIndex, 1);
      list.splice(endIndex, 0, removed);
      return list;
    };
    registerForm.setFieldValue("atividades", teste(registerForm));
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    reorder(registerForm, result.source.index, result.destination.index);
  };

  const add = () => {
    registerForm.setFieldValue("atividades", [
      ...registerForm.values.atividades,
      {
        atividade_id_origem: 0,
        area_id: 0,
        tarefa_id: 0,
        qtde_dias: 0,
        precedentes: listaAtividadesPrecedentes,
      },
    ]);
    setRender(!render);
  };

  // const handleChangeProp = (index: any, chave: any, value: any) => {
  //   const newList = list;
  //   newList[index][chave] = value;
  //   setList(newList);
  //   setRender(!render);
  //   // handleParent(newList);
  // };

  // useEffect(() => {
  //   const newAtividades: any[] = [];
  //   registerForm.values.atividades.map((atividade: any) => {
  //     atividade.precedentes = listaAtividadesPrecedentes;
  //     newAtividades.push(atividade);
  //     return {};
  //   });
  //   setList(newAtividades);
  //   const now = Date.now();
  //   const newId = droppableId + "-" + now.toLocaleString();
  //   setDroppableId(newId);
  // }, []);

  useEffect(() => {
    // Para gerar um id aletaório para o droppable
    const now = Date.now();
    const newId = droppableId + "-" + now.toLocaleString();
    setDroppableId(newId);

    // Para atualizar os valores das atividades precedentes
    // do primeiro item da lista quando o modal é aberto
    registerForm.setFieldValue(
      "atividades[0].precedentes",
      listaAtividadesPrecedentes
    );
  }, []);

  return (
    <>
      <Flex gap={1}>
        <RequiredField />
        <FormLabel mb={0}>ATIVIDADES</FormLabel>
      </Flex>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={droppableId}>
          {(provided: DroppableProvided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {registerForm.values.atividades.map(
                (atividade: any, index: any) => (
                  <AtividadesDraggable
                    key={index}
                    registerForm={registerForm}
                    atividade={atividade}
                    index={index}
                  />
                )
              )}
              {/* {list.map((item: any, index: any) => (
                <AtividadesDraggable
                  handleChangeProp={handleChangeProp}
                  item={item}
                  index={index}
                  key={`list${index}`}
                  remove={remove}
                  list={list}
                />
              ))} */}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <BotaoAdicionar add={add} />
    </>
  );
}
