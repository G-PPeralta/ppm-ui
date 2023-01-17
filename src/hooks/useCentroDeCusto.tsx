// CRIADO EM: 14/09/2022
// AUTOR: Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Hook com funções para a adição de um novo custo - Financeiro.

import { useState } from "react";

import { useFormik } from "formik";
import { cadastroNovaDespesa } from "validations/Financeiro";

import { parseNumber } from "utils/regexCoinMask";

import { useToast } from "contexts/Toast";

import { postCadastroDespesa } from "services/post/Financeiro";
import { patchEditarDespesa } from "services/update/Financeiro";

import { useAuth } from "./useAuth";

export function useCentroDeCusto(id?: number, metodo?: string) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const initialValues: any = {
    valor: "",
    data: "",
    prestadorServicoId: 0,
    classeDeServicoId: 0,
    pedido: "",
    descricaoDoServico: "",
    bm: "",
    id_nf: "",
    valor_bm_nf: 0,
    status: 0,
    data_pagamento: null,
    valor_pago: 0,
  };

  const registerForm = useFormik({
    initialValues,
    validationSchema: cadastroNovaDespesa,
    onSubmit: async (values) => {
      const newValues = {
        user: user?.nome,
        valor: parseNumber(values.valor),
        data: values.data,
        prestadorServicoId: values.prestadorServicoId,
        classeDeServicoId: values.classeDeServicoId,
        pedido: values.pedido,
        descricaoDoServico: values.descricaoDoServico,
        bm: values.bm,
        id_nf: values.id_nf,
        valor_bm_nf: values.valor_bm_nf,
        status: values.status,
        data_pagamento: values.data_pagamento ? values.data_pagamento : null,
        valor_pago: values.valor_pago,
      };

      setLoading(true);

      if (metodo === "patch" && id) {
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
      if (metodo === "post" && id) {
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
