import { useState } from "react";

import { useFormik } from "formik";
import { createPriorizacao } from "validations/ModalCadastroRanking";

import { useToast } from "contexts/Toast";

import { createRanking } from "services/post/Priorizacao";

import { useAuth } from "./useAuth";

export function useCadastroNovaPriorizacao() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const initialValues: any = {
    rankingName: "",

    nom_usu_create: user?.nome,
  };

  const registerForm = useFormik({
    initialValues,
    validationSchema: createPriorizacao,
    onSubmit: async (values) => {
      const newValues: any = {
        rankingName: values.rankingName,

        nom_usu_create: user?.nome,
      };

      setLoading(true);

      try {
        const { status } = await createRanking(newValues);

        if (status === 200 || status === 201) {
          toast.success(`Priorização cadastrada com sucesso!`, {
            id: "toast-principal",
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error(`Erro ao cadastrar a priorização!`, {
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
