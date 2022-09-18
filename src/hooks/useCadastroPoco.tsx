import { useState } from "react";

import { useFormik } from "formik";
import { NovoPoco } from "interfaces/CadastrosModaisInfograficos";
import { cadastroPocoSchema } from "validations/ModaisCadastrosInfografico";

import { useToast } from "contexts/Toast";

import { postNovoPoco } from "services/post/CadastroModaisInfograficos";

import { useAuth } from "./useAuth";

export function useCadastroPoco() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const initialValues: NovoPoco = {
    poco: "",
    nom_usu_create: user?.nome,
  };

  const registerForm = useFormik({
    initialValues,
    validationSchema: cadastroPocoSchema,
    onSubmit: async (values) => {
      const newValues: NovoPoco = {
        poco: values.poco,
        nom_usu_create: user?.nome,
      };

      setLoading(true);

      try {
        const { status } = await postNovoPoco(newValues);

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
