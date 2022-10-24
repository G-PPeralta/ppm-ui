import { useState } from "react";

import { useFormik } from "formik";
import { cadastroOcorrenciaAtividade } from "validations/Estatisticas";

import { useToast } from "contexts/Toast";

import { postCadastroNovaOcorrenciaPorAtividade } from "services/post/Estatistica";
import { patchEditarOcorrencia } from "services/update/Estatisticas";

import { useAuth } from "./useAuth";

export function useOcorrencias(
  idOcorrencia: number,
  metodo: string,
  idAtividade?: number
) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    user: user?.nome,
    ocorrencia: "",
    impacto: "",
    observacoes: "",
  };

  const registerForm: any = useFormik({
    initialValues,
    validationSchema: cadastroOcorrenciaAtividade,
    onSubmit: async (values) => {
      const newValues = {
        user: user?.nome,
        ocorrencia: values.ocorrencia,
        impacto: values.impacto,
        observacoes: values.observacoes,
      };

      setLoading(true);

      if (metodo === "patch") {
        try {
          if (idAtividade) {
            const { status } = await patchEditarOcorrencia(
              idAtividade,
              idOcorrencia,
              newValues
            );

            if (status === 200 || status === 201) {
              toast.success("Ocorrência editada com sucesso!", {
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
          const { status } = await postCadastroNovaOcorrenciaPorAtividade(
            idOcorrencia,
            newValues
          );

          if (status === 200 || status === 201) {
            toast.success("Ocorrência cadastrada com sucesso!", {
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
