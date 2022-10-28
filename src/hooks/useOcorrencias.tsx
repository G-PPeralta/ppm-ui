import { useState } from "react";

import { useFormik } from "formik";
import { cadastroOcorrenciaAtividade } from "validations/Estatisticas";

import { formatFloatToMinutes } from "utils/formatDate";

import { useToast } from "contexts/Toast";

import { postCadastroNovaOcorrenciaPorAtividade } from "services/post/Estatistica";
import { patchEditarOcorrencia } from "services/update/Estatisticas";

import { useAuth } from "./useAuth";

export function useOcorrencias(
  idAtividade: number,
  metodo: string,
  idOcorrencia?: number
) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    user: user?.nome,
    id_atividade: idAtividade,
    ocorrencia: "",
    impacto: 0,
  };

  const registerForm: any = useFormik({
    initialValues,
    validationSchema: cadastroOcorrenciaAtividade,
    onSubmit: async (values) => {
      const newValues = {
        user: user?.nome,
        id_atividade: idAtividade,
        ocorrencia: values.ocorrencia,
        impacto: formatFloatToMinutes(values.impacto),
      };

      setLoading(true);

      if (metodo === "patch") {
        try {
          if (idOcorrencia) {
            const { status } = await patchEditarOcorrencia(
              idOcorrencia,
              idAtividade,
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
            idAtividade,
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
