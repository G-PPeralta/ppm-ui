import { useState } from "react";

import { useFormik } from "formik";
import { NovoPoco } from "interfaces/CadastrosModaisInfograficos";
import { cadastroPocoSchema } from "validations/ModaisCadastrosInfografico";

import { useToast } from "contexts/Toast";

import { postCadastroPocoOperacao } from "services/post/Estatistica";
import { postNovoPoco } from "services/post/Infograficos";

export function useCadastroPoco(modulo?: string) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const initialValues: NovoPoco = {
    poco: "",
  };

  const registerForm = useFormik({
    initialValues,
    validationSchema: cadastroPocoSchema,
    onSubmit: async (values) => {
      const newValues: NovoPoco = {
        poco: values.poco,
      };

      setLoading(true);

      try {
        if (modulo === "operacao") {
          const { status } = await postCadastroPocoOperacao(newValues);

          if (status === 200 || status === 201) {
            toast.success(`Poço cadastrado com sucesso!`, {
              id: "toast-principal",
            });
            setLoading(false);
          }
        } else {
          const { status } = await postNovoPoco(newValues);

          if (status === 200 || status === 201) {
            toast.success(`Poço cadastrado com sucesso!`, {
              id: "toast-principal",
            });
            setLoading(false);
          }
        }
      } catch (error) {
        toast.error(`Erro ao cadastrar poço!`, {
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
