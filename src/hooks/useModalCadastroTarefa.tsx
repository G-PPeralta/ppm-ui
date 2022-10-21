import { useState } from "react";

import { useFormik } from "formik";
import { cadastroModalTarefaSchema } from "validations/cadastroModalTarefaSchema";

import { useToast } from "contexts/Toast";

import { postTarefa } from "services/post/AdicionarTarefa";

import { useAuth } from "./useAuth";

export function useModalCadastroTarefa(
  newRender: () => void,
  closeModal: () => void
) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [atividade, setAtividade] = useState<string | undefined>("");

  const registerForm = useFormik({
    initialValues: {
      nomeTarefa: "",
      atividadeRel: "",
      data: "",
      responsavel: "",
      descricao: "",
    },
    validationSchema: cadastroModalTarefaSchema,
    onSubmit: async (values) => {
      const newValues = {
        nome_tarefa: values.nomeTarefa,
        data_tarefa: new Date(values.data),
        atividade_relacionada: values.atividadeRel,
        descricao_tarefa: values.descricao,
        responsavel: values.responsavel,
        nom_usu_create: user?.nome,
        projeto_id: Number(atividade),
      };

      setLoading(true);

      try {
        const { status } = await postTarefa(newValues);

        newRender();
        closeModal();

        if (status === 200 || status === 201) {
          toast.success(`Tarefa ${values.nomeTarefa} cadastrada com sucesso!`, {
            id: "toast-principal",
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error(`Erro ao cadastrar tarefa ${values.nomeTarefa}!`, {
          id: "toast-principal",
        });
        setLoading(false);
      }
    },
  });

  return {
    registerForm,
    loading,
    setAtividade,
  };
}
