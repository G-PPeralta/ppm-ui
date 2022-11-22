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
    tipo_intervencao_id: null,
    controlar_cronograma: false,
    atividades: [
      {
        atividade_id_origem: "",
        area_id: 0,
        tarefa_id: 0,
        qtde_dias: 0,
        precedentes: [
          {
            id: 0,
            nome: "",
            checked: false,
          },
        ],
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
        tipo_intervencao_id: values.tipo_intervencao_id,
        controlar_cronograma: values.controlar_cronograma,
        atividades: values.atividades.map((atividade) => ({
          atividade_id_origem: atividade.atividade_id_origem,
          area_id: atividade.area_id,
          tarefa_id: atividade.tarefa_id,
          qtde_dias: atividade.qtde_dias,
          precedentes: atividade.precedentes.filter(
            (precedente) => precedente.checked
          ),
          // .map((precedente) => precedente.id),
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
