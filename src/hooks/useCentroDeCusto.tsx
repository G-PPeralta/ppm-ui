import { useState } from "react";

import { useFormik } from "formik";
import { cadastroNovaDespesa } from "validations/Financeiro";

import { useToast } from "contexts/Toast";

import { postCadastroDespesa } from "services/post/Financeiro";
import { patchEditarDespesa } from "services/update/Financeiro";

import { useAuth } from "./useAuth";

export function useCentroDeCusto(id?: number, post?: boolean, patch?: boolean) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const initialValues: any = {
    valor: 0,
    data: "",
    prestadorServicoId: 0,
    classeDeServicoId: 0,
    pedido: "",
    descricaoDoServico: "",
  };

  const registerForm = useFormik({
    initialValues,
    validationSchema: cadastroNovaDespesa,
    onSubmit: async (values) => {
      const newValues = {
        user: user?.nome,
        valor: values.valor,
        data: values.data,
        prestadorServicoId: values.prestadorServicoId,
        classeDeServicoId: values.classeDeServicoId,
        pedido: values.pedido,
        descricaoDoServico: values.descricaoDoServico,
      };

      setLoading(true);

      if (patch && id) {
        try {
          const { status } = await patchEditarDespesa(id, newValues);

          if (status === 200 || status === 201) {
            toast.success(`Despesa editada com sucesso!`, {
              id: "toast-principal",
            });
            setLoading(false);
          }
        } catch (error) {
          toast.error(`Erro ao editar despesa!`, {
            id: "toast-principal",
          });
          setLoading(false);
        }
      }
      if (post && id) {
        try {
          const { status } = await postCadastroDespesa(id, newValues);

          if (status === 200 || status === 201) {
            toast.success(`Despesa cadastrada com sucesso!`, {
              id: "toast-principal",
            });
            setLoading(false);
          }
        } catch (error) {
          toast.error(`Erro ao cadastrar despesa!`, {
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
