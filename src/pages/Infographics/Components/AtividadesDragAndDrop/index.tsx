import { useEffect, useId, useState } from "react";
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
} from "react-beautiful-dnd";

import { Flex, FormLabel } from "@chakra-ui/react";
import { FormikProps } from "formik";
import { AtividadesProjetoTipo } from "interfaces/CadastrosModaisInfograficos";

import { RequiredField } from "components/RequiredField/RequiredField";

import BotaoAdicionar from "./BotaoAdicionar";
import AtividadesDraggable from "./Draggable/AtividadeDraggable";

export default function AtividadesDragAndDrop({
  registerForm,
  listaAtividadesPrecedentes,
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
      // Pega a lista de atividades diretamente do Formik
      // e faz uma atribuição em uma variável para garantir
      // imutabilidade do estado original
      const list = registerForm.values.atividades;

      // Seleciona item que está sendo arrastado e o remove
      // da lista
      const [removed] = list.splice(startIndex, 1);

      // Recoloca item que está sendo arrastado e o insere
      // no array com base nos index
      list.splice(endIndex, 0, removed);

      // Retorna lista atualizada
      return list;
    };
    registerForm.setFieldValue("atividades", listaReordenada(registerForm));
  };

  const onDragEnd = (result: any) => {
    // Se o item não foi arrastado para outro lugar, não faz nada
    if (!result.destination) {
      return;
    }

    // Se o item foi arrastado para outro o mesmo lugar, não faz nada
    if (result.destination.index === result.source.index) {
      return;
    }

    // Se o item foi arrastado para outro lugar, chama a função
    // de reordenar a lista
    reorder(registerForm, result.source.index, result.destination.index);
  };

  const add = () => {
    // Cria um novo item na lista de atividades com os valores padrões
    registerForm.setFieldValue("atividades", [
      ...registerForm.values.atividades,
      {
        atividade_id_origem: "",
        area_id: 0,
        tarefa_id: 0,
        qtde_dias: 0,
        precedentes: listaAtividadesPrecedentes.filter((atividade: any) => {
          for (
            let index = 0;
            index < registerForm.values.atividades.length;
            index += 1
          ) {
            if (
              atividade.id === registerForm.values.atividades[index].tarefa_id
            ) {
              return true;
            }
          }
          return false;
        }),
      },
    ]);
    setRender(!render);
  };

  useEffect(() => {
    // Para gerar um id aletaório para o droppable
    const now = Date.now();
    const newId = droppableId + "-" + now.toLocaleString();
    setDroppableId(newId);

    // Para atualizar os valores das atividades precedentes
    // do primeiro item da lista quando o modal é aberto
    registerForm.setFieldValue(
      "atividades[0].precedentes",
      listaAtividadesPrecedentes.filter((atividade: any) => {
        for (
          let index = 0;
          index < registerForm.values.atividades.length;
          index += 1
        ) {
          if (
            atividade.id === registerForm.values.atividades[index].tarefa_id
          ) {
            return true;
          }
        }
        return false;
      })
    );
  }, []);

  useEffect(() => {
    // Para atualizar os valores das atividades precedentes
    registerForm.values.atividades.forEach((_atividade: any, index: number) => {
      // Para cada item da lista, atualiza os valores das atividades precedentes
      registerForm.setFieldValue(
        `atividades[${index}].precedentes`,
        // Filtra as atividades precedentes com base nas atividades que já estão na lista
        listaAtividadesPrecedentes.filter((atividade: any) => {
          // Para cada item da lista de atividades precedentes, verifica se o id da atividade
          // precedente é igual ao id da atividade que está sendo adicionada na lista
          for (
            let index = 0;
            index < registerForm.values.atividades.length;
            index += 1
          ) {
            if (
              atividade.id === registerForm.values.atividades[index].tarefa_id
            ) {
              return true;
            }
          }
          return false;
        })
      );
    });
  }, [render]);

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
                (_atividade: AtividadesProjetoTipo, index: number) => (
                  <AtividadesDraggable
                    key={index}
                    registerForm={registerForm}
                    index={index}
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
