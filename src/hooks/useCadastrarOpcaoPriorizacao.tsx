import { useState } from "react";

import { useFormik } from "formik";
import { cadastroNovaOpcaoPriorizacao } from "validations/ModalCadastroRanking";

import { useToast } from "contexts/Toast";

import { postOptionRanking } from "services/post/Priorizacao";

import { useAuth } from "./useAuth";

export function useCadastroNovaOpcaoPriorizacao() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const initialValues: any = {
    rankingOpcao: "",
    rankingId: 0,
    rankingGrade: "",
    nom_usu_create: user?.nome,
  };

  const registerForm = useFormik({
    initialValues,
    validationSchema: cadastroNovaOpcaoPriorizacao,
    onSubmit: async (values) => {
      const newValues: any = {
        rankingOpcao: values.rank_opcao_name,
        rankingId: values.rank_opcao_id,
        rankingGrade: values.rank_opcao_grade,
        nom_usu_create: user?.nome,
      };

      setLoading(true);

      try {
        // rota post opção ranking - opção priorização
        const { status } = await postOptionRanking(
          newValues,
          newValues.rankingId
        );

        if (status === 200 || status === 201) {
          toast.success(`Opção cadastrada com sucesso!`, {
            id: "toast-principal",
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error(`Erro ao cadastrar a opção!`, {
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
