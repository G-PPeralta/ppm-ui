import { useState } from "react";

import { useFormik } from "formik";
import { cadastroNovaDespesa } from "validations/Financeiro";

import { useToast } from "contexts/Toast";

import { postCadastroDespesa } from "services/post/Financeiro";

interface CentroDeCusto {
  valor: string;
  data: string;
  fornecedorId: number;
  classeDeServicoId: number;
  pedido: string;
  textoDoPedido: string;
}

export function useCentroDeCusto() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const initialValues: CentroDeCusto = {
    valor: "",
    data: "",
    fornecedorId: 0,
    classeDeServicoId: 0,
    pedido: "",
    textoDoPedido: "",
  };

  const registerForm = useFormik({
    initialValues,
    validationSchema: cadastroNovaDespesa,
    onSubmit: async (values) => {
      const newValues = {
        valor: values.valor,
        data: values.data,
        fornecedorId: values.fornecedorId,
        classeDeServicoId: values.classeDeServicoId,
        pedido: values.pedido,
        textoDoPedido: values.textoDoPedido,
      };

      setLoading(true);

      try {
        const { status } = await postCadastroDespesa(newValues);

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
    },
  });

  return {
    registerForm,
    loading,
  };
}
