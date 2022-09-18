import { useState } from "react";

import { useFormik } from "formik";
import { cadastroPocoSchema } from "validations/ModaisCadastrosInfografico";

import { useToast } from "contexts/Toast";

import { postCadastroPoco } from "services/post/CadastroModaisInfograficos";

export function useCadastroPoco() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const registerForm = useFormik({
    initialValues: {
      poco: "",
    },
    validationSchema: cadastroPocoSchema,
    onSubmit: async (values) => {
      const newValues = {
        poco: values.poco,
      };

      setLoading(true);

      try {
        const { status } = await postCadastroPoco(newValues);

        if (status === 200 || status === 201) {
          toast.success(`Poço ${values.poco} cadastrado com sucesso!`, {
            id: "toast-principal",
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error(`Erro ao cadastrar poço ${values.poco}!`, {
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
