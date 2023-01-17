// CRIADO EM: 08/06/2022
// AUTOR: Alexander
// DESCRIÇÃO DO ARQUIVO: Hook com funções para resetar a senha de login.

import { useState } from "react";

import { useFormik } from "formik";
import { newPasswordSchema } from "validations/NewPassword";

export function usePassword() {
  const [loading, setLoading] = useState(false);

  const newPasswordForm = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: newPasswordSchema,
    onSubmit: async (values) => {
      setLoading(true);

      setLoading(false);
    },
  });

  return {
    newPasswordForm,
    loading,
  };
}
