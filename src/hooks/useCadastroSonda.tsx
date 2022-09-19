import { useState } from "react";

import { useFormik } from "formik";
import { NovaSonda } from "interfaces/CadastrosModaisInfograficos";
import { cadastroSondaSchema } from "validations/ModaisCadastrosInfografico";

import { useToast } from "contexts/Toast";

import { postNovaSonda } from "services/post/CadastroModaisInfograficos";

import { useAuth } from "./useAuth";

export function useCadastroSonda() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const initialValues: NovaSonda = {
    sonda: "",
    nom_usu_create: user?.nome,
  };

  const registerForm = useFormik({
    initialValues,
    validationSchema: cadastroSondaSchema,
    onSubmit: async (values) => {
      const newValues: NovaSonda = {
        sonda: values.sonda,
        nom_usu_create: user?.nome,
      };

      setLoading(true);

      try {
        const { status } = await postNovaSonda(newValues);

        if (status === 200 || status === 201) {
          toast.success(`Sonda ${values.sonda} cadastrada com sucesso!`, {
            id: "toast-principal",
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error(`Erro ao cadastrar sonda ${values.sonda}!`, {
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
