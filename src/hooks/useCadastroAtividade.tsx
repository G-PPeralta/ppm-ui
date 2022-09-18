import { useState } from "react";

import { useFormik } from "formik";
import { NovaAtividade } from "interfaces/CadastrosModaisInfograficos";
import { cadastroNovaAtividadeSchema } from "validations/ModaisCadastrosInfografico";

import { useToast } from "contexts/Toast";

import { postNovaAtividade } from "services/post/CadastroModaisInfograficos";

import { useAuth } from "./useAuth";

export function useCadastroAtividade() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const initialValues: NovaAtividade = {
    nome: "",
    status: 0,
    dataInicio: "",
    dataFim: "",
    observacoes: "",
    nom_usu_create: user?.nome,
  };

  const registerForm = useFormik({
    initialValues,
    validationSchema: cadastroNovaAtividadeSchema,
    onSubmit: async (values) => {
      const newValues: NovaAtividade = {
        nome: values.nome,
        status: values.status,
        dataInicio: values.dataInicio,
        dataFim: values.dataFim,
        observacoes: values.observacoes,
        nom_usu_create: user?.nome,
      };

      setLoading(true);

      try {
        const { status } = await postNovaAtividade(newValues);

        if (status === 200 || status === 201) {
          toast.success(`Atividade ${values.nome} cadastrada com sucesso!`, {
            id: "toast-principal",
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error(`Erro ao cadastrar atividade ${values.nome}!`, {
          id: "toast-principal",
        });
        setLoading(false);
      }
    },
  });

  return {
    registerForm,
    loading,
  };
}
