import { useState } from "react";

import { useFormik } from "formik";
import { updateProfundidadeoSchema } from "validations/ModaisCadastrosInfografico";

import { useToast } from "contexts/Toast";

import { postDefinirProfundidade } from "services/post/Estatistica";

export function useDefinirPrioridade(projeto: any) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const registerForm = useFormik({
    initialValues: {
      poco_id: projeto.id_poco,
      profundidade: "",
    },
    validationSchema: updateProfundidadeoSchema,
    onSubmit: async (values) => {
      const newValues = {
        id_pai: values.poco_id,
        profundidade: Number(values.profundidade),
      };

      setLoading(true);

      try {
        const { status } = await postDefinirProfundidade(newValues);

        if (status === 200 || status === 201) {
          toast.success(`Profundidade atualizada com sucesso!`, {
            id: "toast-principal",
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error(`Erro ao  atualizar profundidade!`, {
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
