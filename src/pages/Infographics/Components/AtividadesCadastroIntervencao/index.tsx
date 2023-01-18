//  CRIADO EM: 9/2022
//  AUTOR: Bruno Fracaro, Eduardo Muchak.
//  DESCRIÇÃO DO ARQUIVO: Componenete arrastável para cadstro de intervenções.

import { useEffect, useId, useState } from "react";
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
} from "react-beautiful-dnd";

import { Flex, Text } from "@chakra-ui/react";
import { FormikProps } from "formik";
import { AtividadesProjetoTipo } from "interfaces/CadastrosModaisInfograficos";

import { getUniqueActivities } from "utils/removeDuplicateObjectsFromArray";

import { useCadastroIntervencao } from "hooks/useCadastroIntervencao";

import BotaoAdicionar from "./BotaoAdicionar";
import AtividadesDraggable from "./Draggable/AtividadeDraggable";

interface AtividadePrecedente {
  id: number;
  nome: string;
  checked: boolean;
}

interface Atividade {
  atividade_id_origem: number;
  area_id: number;
  tarefa_id: number;
  qtde_dias: number;
  ind_atv_execucao: boolean;
  precedentes: AtividadePrecedente[];
}

export default function AtividadesCadastroIntervencao({
  registerForm,
  listaAtividadesPrecedentes,
  reorderState,
}: any) {
  const id = useId();
  const [render, setRender] = useState<any>([]);
  const [droppableId, setDroppableId] = useState<string>(id);
  const { listaAreaAtuacao, listaResponsaveis, listaTarefas } =
    useCadastroIntervencao();
  const { setReorderLoading } = reorderState;

  const listas = {
    listaAreaAtuacao,
    listaResponsaveis,
    listaTarefas: getUniqueActivities(listaTarefas, "nom_atividade"),
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
    setReorderLoading(true);
    registerForm.setFieldValue("atividades", listaReordenada(registerForm));
    setTimeout(() => {
      setReorderLoading(false);
    }, 1000);
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
        id_origem: "",
        area_id: 0,
        tarefa_id: 0,
        qtde_dias: 0,
        ind_atv_execucao: false,
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
    const now = Date.now();
    const newId = droppableId + "-" + now.toLocaleString();
    setDroppableId(newId);

    const precedentesFiltrados = listaAtividadesPrecedentes.filter(
      (atividade: AtividadePrecedente) => {
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
      }
    );

    registerForm.setFieldValue(
      "atividades[0].precedentes",
      precedentesFiltrados
    );
  }, []);

  useEffect(() => {
    const listaAtividades = registerForm.values.atividades.map(
      (atividade: Atividade) => atividade
    );

    const listaPrecedentesChecked = listaAtividades.map(
      (atividade: Atividade) => {
        const precedentes = atividade.precedentes.map(
          (precedente: AtividadePrecedente) => {
            if (precedente.checked) {
              return precedente;
            }
            return null;
          }
        );

        return precedentes;
      }
    );

    const precedentesFiltrados = listaAtividadesPrecedentes.filter(
      (atividade: AtividadePrecedente) => {
        for (let index = 0; index < listaAtividades.length; index += 1) {
          if (atividade.id === listaAtividades[index].tarefa_id) {
            return true;
          }
        }
        return false;
      }
    );

    const listaAtividadesAtualizada = listaAtividades.map(
      (atividade: Atividade, index: number) => {
        const precedentes = precedentesFiltrados.map(
          (precedente: AtividadePrecedente) => {
            for (
              let indexPrecedente = 0;
              indexPrecedente < listaPrecedentesChecked[index].length;
              indexPrecedente += 1
            ) {
              if (
                listaPrecedentesChecked[index][indexPrecedente] &&
                listaPrecedentesChecked[index][indexPrecedente].id ===
                  precedente.id
              ) {
                return listaPrecedentesChecked[index][indexPrecedente];
              }
            }
            return { ...precedente };
          }
        );

        return { ...atividade, precedentes };
      }
    );
    registerForm.setFieldValue("atividades", listaAtividadesAtualizada);
  }, []);

  useEffect(() => {
    const listaAtividades = registerForm.values.atividades.map(
      (atividade: Atividade) => atividade
    );

    const listaPrecedentesChecked = listaAtividades.map(
      (atividade: Atividade) => {
        const precedentes = atividade.precedentes.map(
          (precedente: AtividadePrecedente) => {
            if (precedente.checked) {
              return precedente;
            }
            return null;
          }
        );

        return precedentes;
      }
    );

    const precedentesFiltrados = listaAtividadesPrecedentes.filter(
      (atividade: AtividadePrecedente) => {
        for (let index = 0; index < listaAtividades.length; index += 1) {
          if (atividade.id === listaAtividades[index].tarefa_id) {
            return true;
          }
        }
        return false;
      }
    );

    const listaAtividadesAtualizada = listaAtividades.map(
      (atividade: Atividade, index: number) => {
        const precedentes = precedentesFiltrados.map(
          (precedente: AtividadePrecedente) => {
            for (
              let indexPrecedente = 0;
              indexPrecedente < listaPrecedentesChecked[index].length;
              indexPrecedente += 1
            ) {
              if (
                listaPrecedentesChecked[index][indexPrecedente] &&
                listaPrecedentesChecked[index][indexPrecedente].id ===
                  precedente.id
              ) {
                return listaPrecedentesChecked[index][indexPrecedente];
              }
            }
            return { ...precedente };
          }
        );

        return { ...atividade, precedentes };
      }
    );
    registerForm.setFieldValue("atividades", listaAtividadesAtualizada);
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
