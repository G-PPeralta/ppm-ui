//  CRIADO EM: 09/2022
//  AUTOR: Eduardo Muchak
//  DESCRIÇÃO DO ARQUIVO: Compoenete de escolher quais atividades precedentes relacionadas a atividade cadasstrada.

import { useEffect, useId, useState } from "react";
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
} from "react-beautiful-dnd";

import { Flex, Text } from "@chakra-ui/react";
import { FormikProps } from "formik";

import BotaoAdicionar from "./BotaoAdicionar";
import AtividadesDraggable from "./Draggable/AtividadeDraggable";

export default function AtividadesDragAndDrop({
  registerForm,
  atividades,
}: any) {
  const id = useId();
  const [render, setRender] = useState<any>([]);
  const [droppableId, setDroppableId] = useState<string>(id);

  const reorder = (
    registerForm: FormikProps<any>,
    startIndex: number,
    endIndex: number
  ) => {
    const listaReordenada = (registerForm: FormikProps<any>) => {
      const list = registerForm.values.precedentes;
      const [removed] = list.splice(startIndex, 1);
      list.splice(endIndex, 0, removed);

      return list;
    };
    registerForm.setFieldValue("precedentes", listaReordenada(registerForm));
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
    if (registerForm.values.precedentes.length < atividades.length) {
      registerForm.setFieldValue("precedentes", [
        ...registerForm.values.precedentes,
        {
          atividadePrecedenteId: 0,
          dias: 0,
        },
      ]);
      setRender(!render);
    }
  };

  useEffect(() => {
    const now = Date.now();
    const newId = droppableId + "-" + now.toLocaleString();
    setDroppableId(newId);
  }, []);

  return (
    <>
      <Flex gap={1}>
        <Text fontWeight={"700"} fontSize={"12px"} color={"#949494"} mb={-2}>
          ATIVIDADES PRECEDENTES
        </Text>
      </Flex>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={droppableId}>
          {(provided: DroppableProvided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {registerForm.values.precedentes.map(
                (_atividade: any, index: number) => (
                  <AtividadesDraggable
                    key={index}
                    registerForm={registerForm}
                    index={index}
                    atividades={atividades}
                  />
                )
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <BotaoAdicionar
        add={add}
        registerForm={registerForm}
        atividades={atividades}
      />
    </>
  );
}
