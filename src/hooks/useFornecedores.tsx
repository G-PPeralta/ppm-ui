import { useState } from "react";

import { useFormik } from "formik";
// import { projectRegisterSchema } from 'validations/ProjectRegister';
// import { Fornecedor } from 'interfaces/Services';

import { useToast } from "contexts/Toast";

import { putFornecedor } from "services/update/Fornecedor";

export function useFornecedores() {
  const { toast } = useToast();

  const initialValues = {
    id: 0,
    fornecedor: "",
    orcamento: 0,
    realizado: 0,
    responsavel: "",
    descricao: "",
  };

  const [loading, setLoading] = useState(false);

  const fornecedoresForm = useFormik({
    initialValues,

    onSubmit: async (values) => {
      const newValues = {
        fornecedor: values.fornecedor,
        orcamento: values.orcamento,
        realizado: values.realizado,
        responsavel: values.responsavel,
        descricao: values.descricao,
      };

      setLoading(true);

      try {
        const { status } = await putFornecedor(values.id, newValues);

        if (status === 200 || status === 201) {
          toast.success("Fornecedor atualizado com sucesso!", {
            id: "toast-principal",
          });
        }
      } catch (error) {
        toast.error("Erro ao atualizar fornecedor!", {
          id: "toast-principal",
        });
      }

      setLoading(false);
    },
  });

  return {
    fornecedoresForm,
    loading,
  };
}
