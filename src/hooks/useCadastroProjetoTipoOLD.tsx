// CRIADO EM: 14/09/2022
// AUTOR: Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Hook com funções para o cadastro de um novo projeto OLD - módulo Intervenções - Campanhas.

import { useEffect, useState } from "react";

import { useFormik } from "formik";
// import { cadastroProjetoTipoSchema } from 'validations/ModaisCadastrosInfografico';
import { AtividadeLista } from "interfaces/Services";

import { useToast } from "contexts/Toast";

import { getAtividadesList } from "services/get/Infograficos";
// import { postProjetoTipo } from "services/post/CadastroModaisInfograficos";

export function useCadastroProjetoTipo() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [listaAtividades, setListaAtividades] = useState<AtividadeLista[]>([]);

  const carregarListaAtividade = async () => {
    const { data } = await getAtividadesList();
    const dataSorted = data.sort((a, b) => a.tarefa.localeCompare(b.tarefa));
    // console.log('dataSorted', dataSorted);
    setListaAtividades(dataSorted);
  };

  const listaAtividadesPrecedentes = listaAtividades.map((atividade) => ({
    id: atividade.id,
    nome: atividade.tarefa,
    checked: false,
  }));

  const registerForm = useFormik({
    initialValues: {
      nome: "",
      atividades: [
        {
          atividadeId: 0,
          precedentes: [0],
        },
      ],
      comentarios: "",
    },
    // validationSchema: cadastroProjetoTipoSchema,
    onSubmit: async (values) => {
      // const newValues = {
      //   nome: values.nome,
      //   atividades: values.atividades,
      //   comentarios: values.comentarios,
      // };

      setLoading(true);

      try {
        // const { status } = await postProjetoTipo(newValues);
        // if (status === 200 || status === 201) {
        //   toast.success("Projeto Tipo cadastrado com sucesso!", {
        //     id: "toast-principal",
        //   });
        //   setLoading(false);
        // }
      } catch (error) {
        toast.error("Erro ao cadastrar Projeto Tipo!", {
          id: "toast-principal",
        });
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    carregarListaAtividade();
  }, []);

  return {
    registerForm,
    loading,
    listaAtividades,
    listaAtividadesPrecedentes,
  };
}
