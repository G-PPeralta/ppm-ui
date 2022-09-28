import { useState } from "react";

import { useFormik } from "formik";
import { cadastroValorPrevistoSchema } from "validations/ModalCadastroOrcamento";

import { useToast } from "contexts/Toast";

import { useAuth } from "./useAuth";

export function useCadastroOrcamentoPrevisto() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const initialValues = {
    previsto: "",
    nom_usu_create: user?.nome,
  };

  const registerForm = useFormik({
    initialValues,
    validationSchema: cadastroValorPrevistoSchema,
    onSubmit: async (values) => {
      /* const newValues = {
        previsto: values.previsto,
        nom_usu_create: user?.nome,
      }; */

      setLoading(true);

      try {
        //   const { status } = await postNovaSonda(newValues);

        const status = 200;
        if (status === 200 || status === 201) {
          toast.success(
            `Valor Previsto ${values.previsto} cadastrada com sucesso!`,
            {
              id: "toast-principal",
            }
          );
          setLoading(false);
        }
      } catch (error) {
        toast.error(`Erro ao cadastrar valor previsto ${values.previsto}!`, {
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
