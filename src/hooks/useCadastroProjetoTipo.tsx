// CRIADO EM: 14/09/2022
// AUTOR: Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Hook com funções para o cadastro de um novo projeto - módulo Intervenções - Campanhas.

import { useEffect, useState } from "react";

import { useFormik } from "formik";
import { Tarefas } from "interfaces/CadastrosModaisInfograficos";
import { AtividadeLista } from "interfaces/Services";
import { cadastroProjetoTipoSchema } from "validations/ModaisCadastrosInfografico";

import { useToast } from "contexts/Toast";

import { getTarefas } from "services/get/CadastroModaisInfograficos";
import { getAtividadesList } from "services/get/Infograficos";
import { postProjetoTipo } from "services/post/Infograficos";

import { useAuth } from "./useAuth";

export function useCadastroProjetoTipo() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [listaAtividades, setListaAtividades] = useState<AtividadeLista[]>([]);
  const [listaTarefas, setListaTarefas] = useState<Tarefas[]>([]);

  const reqGet = async () => {
    const atividades = await getAtividadesList();
    const tarefas = await getTarefas();

    const atividadesSorted = atividades.data.sort((a, b) =>
      a.tarefa.localeCompare(b.tarefa)
    );

    const tarefasSorted = tarefas.data.sort((a: Tarefas, b: Tarefas) =>
      a.nom_atividade.localeCompare(b.nom_atividade)
    );

    setListaAtividades(atividadesSorted);
    setListaTarefas(tarefasSorted);
  };

  const listaAtividadesPrecedentes = listaTarefas.map((atividade) => ({
    id: atividade.id,
    nome: atividade.nom_atividade,
    checked: false,
  }));

  const initialValues = {
    nom_usu_create: user?.nome,
    nom_projeto_tipo: "",
    controlar_cronograma: false,
    atividades: [
      {
        atividade_id_origem: "",
        area_id: 0,
        tarefa_id: 0,
        qtde_dias: 0,
        tipo_precedentes: "IF+0",
        ind_atv_execucao: false,
        precedentes: [
          {
            id: 0,
            nome: "",
            checked: false,
            tipo: "IF+0",
          },
        ],
        fase_id: 0,
      },
    ],
    comentarios: "",
  };

  const registerForm = useFormik({
    initialValues,
    validationSchema: cadastroProjetoTipoSchema,
    onSubmit: async (values) => {
      const newValues = {
        nom_usu_create: user?.nome,
        nom_projeto_tipo: values.nom_projeto_tipo,
        controlar_cronograma: values.controlar_cronograma,
        atividades: values.atividades.map((atividade) => ({
          atividade_id_origem: atividade.atividade_id_origem,
          area_id: atividade.area_id,
          tarefa_id: atividade.tarefa_id,
          qtde_dias: atividade.qtde_dias,
          tipo_precedentes: atividade.tipo_precedentes,
          ind_atv_execucao: atividade.ind_atv_execucao,
          precedentes: atividade.precedentes.filter(
            (precedente) => precedente.checked
          ),
          fase_id: atividade.fase_id,
        })),
        comentarios: values.comentarios,
      };

      setLoading(true);

      try {
        const { status } = await postProjetoTipo(newValues);
        if (status === 200 || status === 201) {
          toast.success("Projeto Tipo cadastrado com sucesso!", {
            id: "toast-principal",
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error("Erro ao cadastrar Projeto Tipo!", {
          id: "toast-principal",
        });
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    reqGet();
  }, []);

  useEffect(() => {
    if (listaTarefas.length > 0) {
      setLoading(false);
    }
  }, [listaTarefas]);

  return {
    registerForm,
    loading,
    listaAtividades,
    listaAtividadesPrecedentes,
    listaTarefas,
  };
}
