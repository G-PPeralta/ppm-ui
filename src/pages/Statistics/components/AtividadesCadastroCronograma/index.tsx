//  CRIADO EM: 7/2022
//  AUTOR: Eduardo Muchak.
//  DESCRIÇÃO DO ARQUIVO: Área de lista arrastável

import { useEffect, useId, useState } from "react";
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
} from "react-beautiful-dnd";

import { Flex, Text } from "@chakra-ui/react";
import { FormikProps } from "formik";
import { AtividadesProjetoTipo } from "interfaces/CadastrosModaisInfograficos";

import { useCadastroCronograma } from "hooks/useCadastroCronograma";

import BotaoAdicionar from "./BotaoAdicionar";
import AtividadesDraggable from "./Draggable/AtividadeDraggable";

interface AtividadePrecedente {
  id: number;
  nome: string;
  checked: boolean;
}

interface Atividade {
  area_id: number;
  operacao_id: number;
  responsavel_id: number;
  data_inicio: number;
  duracao: number;
  precedentes: AtividadePrecedente[];
}

export default function AtividadesCadastroCronograma({
  registerForm,
  listaAtividadesPrecedentes,
}: any) {
  const id = useId();
  const [render, setRender] = useState<any>([]);
  const [droppableId, setDroppableId] = useState<string>(id);
  const { listaAreaAtuacao, listaResponsaveis, listaOperacao } =
    useCadastroCronograma();

  const listas = {
    listaAreaAtuacao,
    listaResponsaveis,
    listaOperacao,
  };

  const initAdd = {
    area_id: 0,
    operacao_id: 0,
    responsavel_id: 0,
    data_inicio: "",
    duracao: 0,
    precedentes: listaAtividadesPrecedentes.filter((atividade: any) => {
      for (
        let index = 0;
        index < registerForm.values.atividades.length;
        index += 1
      ) {
        if (
          atividade.id === registerForm.values.atividades[index].operacao_id
        ) {
          return true;
        }
      }
      return false;
    }),
  };

  const reorder = (
    registerForm: FormikProps<any>,
    startIndex: number,
    endIndex: number
  ) => {
    const listaReordenada = (registerForm: FormikProps<any>) => {
      const list = registerForm.values.atividades;

      const [removed] = list.splice(startIndex, 1);

      list.splice(endIndex, 0, removed);

      return list;
    };
    registerForm.setFieldValue("atividades", listaReordenada(registerForm));
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
      initAdd,
    ]);
    setRender(!render);
  };

  useEffect(() => {
    const now = Date.now();
    const newId = droppableId + "-" + now.toLocaleString();
    setDroppableId(newId);
  }, []);

  useEffect(() => {
    const listaAtividades = registerForm.values.atividades.map(
      (atividade: Atividade) => atividade
    );
    registerForm.setFieldValue("atividades", listaAtividades);
  }, [render]);

  return (
    <>
      <Flex gap={1}>
        <Text fontWeight={"700"} fontSize={"12px"} color={"#949494"} mb={-2}>
          ATIVIDADES
        </Text>
      </Flex>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={droppableId}>
          {(provided: DroppableProvided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {registerForm.values.atividades.map(
                (_atividade: AtividadesProjetoTipo, index: number) => (
                  <AtividadesDraggable
                    key={index}
                    registerForm={registerForm}
                    index={index}
                    listas={listas}
                  />
                )
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <BotaoAdicionar add={add} registerForm={registerForm} />
    </>
  );
}
