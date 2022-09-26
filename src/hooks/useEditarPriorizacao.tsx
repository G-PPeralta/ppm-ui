import { useState } from "react";

import { useFormik } from "formik";
import { updatePriorizacao } from "validations/ModaisRanking";

import { useToast } from "contexts/Toast";

import { updateRanking } from "services/post/Priorizacao";

import { useAuth } from "./useAuth";

export function useEdicaoPriorizacao(priorAtual: any) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const initialValues: any = {
    rankingName: priorAtual,
    idRanking: 0,
    nom_usu_create: user?.nome,
  };

  const registerForm = useFormik({
    initialValues,
    validationSchema: updatePriorizacao,
    onSubmit: async (values) => {
      const newValues: any = {
        rankingName: values.rankingName,
        idRanking: values.idRanking,
        nom_usu_create: user?.nome,
      };

      setLoading(true);

      try {
        // Rota update
        const { status } = await updateRanking(newValues, newValues.idRanking);

        if (status === 200 || status === 201) {
          toast.success(`Priorização editada com sucesso!`, {
            id: "toast-principal",
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error(`Erro ao editar a priorização!`, {
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
