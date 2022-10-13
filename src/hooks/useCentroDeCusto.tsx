import { useState } from "react";

import { useFormik } from "formik";
import { cadastroNovaDespesa } from "validations/Financeiro";

import { useToast } from "contexts/Toast";

import { postCadastroDespesa } from "services/post/Financeiro";

export function useCentroDeCusto() {
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
        valor: values.valor,
        data: values.data,
        prestadorServicoId: values.prestadorServicoId,
        classeDeServicoId: values.classeDeServicoId,
        pedido: values.pedido,
        descricaoDoServico: values.descricaoDoServico,
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
