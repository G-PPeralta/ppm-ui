import { useState } from "react";

import { useFormik } from "formik";
import { NovaCampanha } from "interfaces/CadastrosModaisInfograficos";
import { cadastroNovaCampanhaSchema } from "validations/ModaisCadastrosInfografico";

import { useToast } from "contexts/Toast";

import { postNovaCampanha } from "services/post/CadastroModaisInfograficos";

export function useCadastroCampanha() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const initialValues: NovaCampanha = {
    nome: "",
    comentarios: "",
  };

  const registerForm = useFormik({
    initialValues,
    validationSchema: cadastroNovaCampanhaSchema,
    onSubmit: async (values) => {
      const newValues: NovaCampanha = {
        nome: values.nome,
        comentarios: values.comentarios,
      };

      setLoading(true);

      try {
        const { status } = await postNovaCampanha(newValues);

        if (status === 200 || status === 201) {
          toast.success(`Campanha ${values.nome} cadastrada com sucesso!`, {
            id: "toast-principal",
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error(`Erro ao cadastrar campanha ${values.nome}!`, {
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
