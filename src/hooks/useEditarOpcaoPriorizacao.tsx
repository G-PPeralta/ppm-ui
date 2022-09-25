import { useState } from "react";

import { useFormik } from "formik";
import { updateNovaPriorizacao } from "validations/ModalCadastroRanking";

import { useToast } from "contexts/Toast";

import { updateOptionRanking } from "services/post/Priorizacao";

import { useAuth } from "./useAuth";

export function useEdicaoOpcaoPriorizacao(opcAtual: any) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const initialValues: any = {
    rankingOpcao: opcAtual,
    idRanking: 0,
    idOpcao: 0,
    nom_usu_create: user?.nome,
  };

  const registerForm = useFormik({
    initialValues,
    validationSchema: updateNovaPriorizacao,
    onSubmit: async (values) => {
      const newValues: any = {
        rankingOpcao: values.rankingOpcao,
        idRanking: values.idRanking,
        idOpcao: values.idOpcao,
        nom_usu_create: user?.nome,
      };

      setLoading(true);

      try {
        // Rota update - opção ranking
        const { status } = await updateOptionRanking(
          newValues,
          newValues.idRanking
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
