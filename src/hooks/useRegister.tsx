import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import { registerSchema } from "validations/Register";

import { useToast } from "contexts/Toast";

import { postRegister } from "services/post/Register";

export function useRegister() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const registerForm = useFormik({
    initialValues: {
      name: "",
      telephone: "",
      email: "",
      area: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      const newValues = {
        nome: values.name,
        email: values.email,
        telefone: values.telephone,
        areaAtuacao: values.area,
        senha: values.password,
      };

      setLoading(true);
      try {
        const { status } = await postRegister(newValues);

        if (status === 200 || status === 201) {
          toast.success("Usuário cadastrado com sucesso", {
            id: "toast-principal",
          });
          navigate("/");
        }
      } catch (error: any) {
        const errorMessage = error.response.data.message;
        if (errorMessage === "Email already exists") {
          toast.error(`E-mail já utilizado por outro usuário`, {
            id: "toast-principal",
          });
        } else {
          toast.error(`Erro ao cadastrar usuário`, {
            id: "toast-principal",
          });
        }
      }

      setLoading(false);
    },
  });

  return {
    registerForm,
    loading,
  };
}
