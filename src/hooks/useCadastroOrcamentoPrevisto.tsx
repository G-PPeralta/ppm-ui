import { useState } from "react";

import { useFormik } from "formik";
import { cadastroValorPrevistoSchema } from "validations/ModalCadastroOrcamento";

import { parseNumber } from "utils/regexCoinMask";

import { useToast } from "contexts/Toast";

import { postAatualizarValorPrevisto } from "services/post/Budget";

import { useAuth } from "./useAuth";

export function useCadastroOrcamentoPrevisto() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [atividade, setAtividade] = useState<number>(0);

  const initialValues = {
    valor: "",
    atividadeId: "",
    nom_usu_create: user?.nome,
  };

  const registerForm = useFormik({
    initialValues,
    validationSchema: cadastroValorPrevistoSchema,
    onSubmit: async (values) => {
      const newValues = {
        atividadeId: atividade,
        valor: +parseNumber(values.valor),
        nom_usu_create: user?.nome,
      };

      setLoading(true);

      try {
        const { status } = await postAatualizarValorPrevisto(newValues);
        if (status === 200 || status === 201) {
          toast.success(
            `Valor Previsto ${parseNumber(values.valor)} editado com sucesso!`,
            {
              id: "toast-principal",
            }
          );
          setLoading(false);
          location.reload();
        }
      } catch (error) {
        toast.error(
          `Erro ao editar valor previsto ${parseNumber(values.valor)}!`,
          {
            id: "toast-principal",
          }
        );
        setLoading(false);
      }
    },
  });

  return {
    registerForm,
    loading,
    setAtividade,
  };
}
