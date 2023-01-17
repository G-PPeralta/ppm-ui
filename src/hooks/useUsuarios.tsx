// CRIADO EM: 04/11/2022
// AUTOR: Geovana Augusta
// DESCRIÇÃO DO ARQUIVO: Hook com funções para o cadastro de um usuário - módulo Configuração - Usuários.

import { useEffect, useState } from "react";

import { useFormik } from "formik";
import { cadastroUsuario } from "validations/Usuarios";

import { useToast } from "contexts/Toast";

import { postUsuario } from "services/post/Usuario";

export function useCadastroUsuario() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const initialValues: any = {
    areaAtuacao: "",
    email: "",
    nome: "",
    telefone: "",
    senha: "",
  };

  const registerForm: any = useFormik({
    initialValues,
    validationSchema: cadastroUsuario,
    onSubmit: async (values) => {
      const newValues: any = {
        areaAtuacao: values.areaAtuacao,
        email: values.email,
        nome: values.nome,
        telefone: values.telefone,
        senha: values.senha,
      };

      setLoading(false);

      try {
        const { status } = await postUsuario(newValues);

        if (status === 200 || status === 201) {
          toast.success("Usuário cadastrado com sucesso!", {
            id: "toast-principal",
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error("Erro ao cadastrar usuário!", {
          id: "toast-principal",
        });
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, []);

  return {
    registerForm,
    loading,
  };
}
