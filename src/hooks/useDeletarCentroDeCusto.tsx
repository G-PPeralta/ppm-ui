// CRIADO EM: 08/11/2022
// AUTOR: Maxwell
// DESCRIÇÃO DO ARQUIVO: Hook com funções para a remoção de um custo - Financeiro.

import { useState } from "react";

import { useFormik } from "formik";

import { useToast } from "contexts/Toast";

import { deleteDespesa } from "services/delete/Financeiro";

import { useAuth } from "./useAuth";

export function useDeletarCentroDeCusto(idCentroCusto: number = 0) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleDeletar = async (idCentroCusto: number) => {
    await deleteDespesa(idCentroCusto, user?.nome);
  };

  interface MyFormValues {
    idCentroCusto: number;
  }

  const initialValues: MyFormValues = {
    idCentroCusto: 0,
  };

  const registerForm = useFormik({
    initialValues,
    onSubmit: async () => {
      try {
        setLoading(true);
        await handleDeletar(idCentroCusto);
        toast.success(`Centro de Custo deletado com sucesso!`, {
          id: "toast-principal",
        });
        setLoading(false);
      } catch (error) {
        toast.error(`Erro ao deletar Centro de Custo!`, {
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
