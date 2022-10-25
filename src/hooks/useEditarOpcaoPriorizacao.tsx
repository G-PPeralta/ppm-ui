import { useState } from "react";

import { useFormik } from "formik";
import { updateNovaOpcaoDePriorizacao } from "validations/ModaisRanking";

import { useToast } from "contexts/Toast";

import {
  updateOptionRanking,
  updateOptionRankingNota,
} from "services/post/Priorizacao";

import { useAuth } from "./useAuth";

export function useEdicaoOpcaoPriorizacao(opcAtual: any, initialGra: number) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const initialValues: any = {
    rankingOpcao: opcAtual,
    idRanking: 0,
    idOpcao: 0,
    num_nota: initialGra,
    nom_usu_create: user?.nome,
  };

  const registerForm = useFormik({
    initialValues,
    validationSchema: updateNovaOpcaoDePriorizacao,
    onSubmit: async (values) => {
      const newValues: any = {
        rankingOpcao: values.rankingOpcao,
        idRanking: values.idRanking,
        idOpcao: values.idOpcao,
        num_nota: values.num_nota,
        nom_usu_create: user?.nome,
      };

      setLoading(true);

      try {
        // Rota update - opção ranking
        const { status } = await updateOptionRankingNota(
          newValues.idOpcao,
          newValues.num_nota,
          newValues.nom_usu_create
        );

        await updateOptionRanking(
          newValues.idOpcao,
          newValues.rankingOpcao,
          newValues.nom_usu_create
        );

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
