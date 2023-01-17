// CRIADO EM: 26/09/2022
// AUTOR: Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Hook com funções para o cadastro de uma nova operação - módulo Intervenções - Cronogramas

import { useState } from "react";

import { useFormik } from "formik";
import { cadastroValorPrevistoSchema } from "validations/ModalCadastroOrcamento";

import { formatReal } from "utils/formatReal";
import { parseNumber } from "utils/regexCoinMask";

import { useToast } from "contexts/Toast";

import { postAatualizarValorPrevisto } from "services/post/Budget";

import { useAuth } from "./useAuth";

export function useCadastroOrcamentoPrevisto() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [atividade, setAtividade] = useState<number>(0);
  const [projeto, setProjeto] = useState<number>(0);

  const initialValues = {
    valor: "",
    atividadeId: "",
    projetoId: "",
    nom_usu_create: user?.nome,
  };

  const registerForm = useFormik({
    initialValues,
    validationSchema: cadastroValorPrevistoSchema,
    onSubmit: async (values) => {
      const newValues = {
        atividadeId: atividade,
        valor: +parseNumber(values.valor),
        projetoId: projeto,
        nom_usu_create: user?.nome,
      };
      setLoading(true);

      try {
        const { status } = await postAatualizarValorPrevisto(newValues);
        if (status === 200 || status === 201) {
          toast.success(
            `Valor Previsto ${formatReal(
              parseNumber(values.valor)
            )} editado com sucesso!`,
            {
              id: "toast-principal",
            }
          );
          setLoading(false);
        }
      } catch (error) {
        toast.error(
          `Erro ao editar valor previsto ${formatReal(
            parseNumber(values.valor)
          )}!`,
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
    setProjeto,
  };
}
