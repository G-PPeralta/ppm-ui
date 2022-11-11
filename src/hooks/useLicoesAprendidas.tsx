import { useState } from "react";

import { useFormik } from "formik";
import { cadastroLicaoAprendida } from "validations/Estatisticas";

import { useToast } from "contexts/Toast";

import { postCadastroNovaLicaoAprendidaPorAtividade } from "services/post/Estatistica";
import { patchEditarLicaoAprendida } from "services/update/Estatisticas";

import { useAuth } from "./useAuth";

export function useLicoesAprendidas(
  idAtividade: number,
  metodo: string,
  idLicao?: number
) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    user: user?.nome,
    id_atividade: idAtividade,
    licao_aprendida: "",
    data: "",
    acoes_e_recomendacoes: "",
  };

  const registerForm: any = useFormik({
    initialValues,
    validationSchema: cadastroLicaoAprendida,
    onSubmit: async (values) => {
      const newValues = {
        user: user?.nome,
        id_atividade: idAtividade,
        licao_aprendida: values.licao_aprendida,
        data: values.data,
        acoes_e_recomendacoes: values.acoes_e_recomendacoes,
      };

      setLoading(true);

      if (metodo === "patch") {
        try {
          if (idLicao) {
            const { status } = await patchEditarLicaoAprendida(
              idLicao,
              idAtividade,
              newValues
            );

            if (status === 200 || status === 201) {
              toast.success("Lição aprendida editada com sucesso!", {
                id: "toast-principal",
              });
              setLoading(false);
            }
          }
        } catch (error) {
          toast.error("Erro ao editada lição aprendida!", {
            id: "toast-principal",
          });
          setLoading(false);
        }
      }

      if (metodo === "post") {
        try {
          const { status } = await postCadastroNovaLicaoAprendidaPorAtividade(
            newValues
          );

          if (status === 200 || status === 201) {
            toast.success("Lição aprendida cadastrada com sucesso!", {
              id: "toast-principal",
            });
            setLoading(false);
          }
        } catch (error) {
          toast.error("Erro ao cadastrar lição aprendida!", {
            id: "toast-principal",
          });
          setLoading(false);
        }
      }
    },
  });

  return {
    registerForm,
    loading,
  };
}
