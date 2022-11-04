import { useState } from "react";

import { useFormik } from "formik";
import { updateNovaOpcaoDePriorizacao } from "validations/ModaisRanking";

import { useToast } from "contexts/Toast";

import { updateUsuario } from "services/post/Usuario";

import { useAuth } from "./useAuth";

export function useEdicaoUsuario() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const initialValues: any = {
    nom_usu_create: user?.nome,
    id: 0,
    area: "",
    deletado: false,
    email: "",
    login: "",
    nome: "",
    perfil: "",
    primeiroAcesso: true,
    telefone: "",
  };

  const registerForm = useFormik({
    initialValues,
    validationSchema: updateNovaOpcaoDePriorizacao,
    onSubmit: async (values) => {
      const newValues: any = {
        nom_usu_create: user?.nome,
        id: values.id,
        area: values.area,
        deletado: values.deletado,
        email: values.email,
        login: values.login,
        nome: values.nome,
        perfil: values.perfil,
        primeiroAcesso: values.primeiroAcesso,
        telefone: values.telefone,
      };

      setLoading(true);

      try {
        // Rota update - user
        const { status } = await updateUsuario(newValues, 0);

        if (status === 200 || status === 201) {
          toast.success(`Usuário editado com sucesso!`, {
            id: "toast-principal",
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error(`Erro ao editar o usuário!`, {
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
