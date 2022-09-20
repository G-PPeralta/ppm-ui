import { useState } from "react";

import { useFormik } from "formik";
import { NovoPoco } from "interfaces/CadastrosModaisInfograficos";
import { cadastroPocoSchema } from "validations/ModaisCadastrosInfografico";

import { useToast } from "contexts/Toast";

import { postNovoPoco } from "services/post/CadastroModaisInfograficos";

export function useCadastroPoco() {
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
        const { status } = await postNovoPoco(newValues);

        if (status === 200 || status === 201) {
          toast.success(`Poço cadastrado com sucesso!`, {
            id: "toast-principal",
          });
          setLoading(false);
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
