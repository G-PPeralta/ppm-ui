import { useState } from "react";

import { useFormik } from "formik";

import { useToast } from "contexts/Toast";

import { deleteProject } from "services/delete/DeleteProject";

export function useDeletarProjeto(id_projeto: number = 0) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleDeletar = (id_projeto: number) => {
    deleteProject(id_projeto);
  };

  const initialValues: any = {
    id_projeto: 0,
  };

  const registerForm = useFormik({
    initialValues,
    onSubmit: async () => {
      try {
        setLoading(true);
        await handleDeletar(id_projeto);
        toast.success(`Projeto deletado com sucesso!`, {
          id: "toast-principal",
        });
        setLoading(false);
        setInterval(() => window.location.reload(), 800);
      } catch (error) {
        toast.error(`Erro ao deletar projeto!`, {
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
