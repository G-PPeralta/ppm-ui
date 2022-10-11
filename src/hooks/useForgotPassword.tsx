import { useState } from "react";

import { useFormik } from "formik";
import { forgotSchema } from "validations/ForgotPassword";

import { useToast } from "contexts/Toast";

import { postResetPassword } from "services/post/ResetPassword";

export function useForgotPassword() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const forgotForm = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotSchema,
    onSubmit: async (values) => {
      if (values.email === "") {
        toast.error("Preencha o email", {
          id: "toast-principal",
        });
        return;
      }
      try {
        setLoading(true);

        await postResetPassword({ email: values.email });

        setLoading(false);
        toast.success("Email enviado", { id: "toast-principal" });
      } catch (error) {
        toast.error("Erro ao enviar email", {
          id: "toast-principal",
        });
        setLoading(false);
      }
    },
  });

  return {
    forgotForm,
    loading,
  };
}
