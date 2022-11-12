import { useEffect, useState } from "react";

import { useFormik } from "formik";
import { cadastroUsuario } from "validations/Usuarios";

import { useToast } from "contexts/Toast";

// import { getPolo } from "services/get/Projetos";

import { postUsuario } from "services/post/Usuario";

// import { useAuth } from "./useAuth";

export function useCadastroUsuario() {
  // const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const initialValues: any = {
    areaAtuacao: "",
    email: "",
    nome: "",
    telefone: "",
    // Back nõo espera uma chave role, como saber o nível de permissão do usuário cadastrado?
    // roleId: 0,
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
        // roleId: values.roleId,
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

  // useEffect(() => {
  //   setLoading(false);
  //   reqGet();
  // }, []);

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, []);

  return {
    registerForm,
    loading,
    // optionsPolos,
  };
}
