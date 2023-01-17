// CRIADO EM: 04/11/2022
// AUTOR: Geovana Augusta
// DESCRIÇÃO DO ARQUIVO: Hook com funções para a edição de um usuário - módulo Configuração - Usuários.

import { useState } from "react";

import { useFormik } from "formik";
import { updateUsuario } from "validations/Usuarios";

import { useToast } from "contexts/Toast";

import { updateUser } from "services/post/Usuario";

import { useAuth } from "./useAuth";

export function useEdicaoUsuario() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const initialValues: any = {
    nom_usu_create: user?.nome,
    areaAtuacao: "",
    email: "",
    nome: "",
    telefone: "",
    roleId: 0,
  };

  const registerForm = useFormik({
    initialValues,
    validationSchema: updateUsuario,
    onSubmit: async (values) => {
      const newValues: any = {
        nom_usu_create: user?.nome,
        areaAtuacao: values.areaAtuacao,
        email: values.email,
        nome: values.nome,
        roleId: values.roleId,
        telefone: values.telefone,
      };

      setLoading(true);

      try {
        // Rota update - user
        const { status } = await updateUser(newValues, 0);

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
