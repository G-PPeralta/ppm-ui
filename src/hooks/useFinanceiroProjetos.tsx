import { useEffect, useState } from "react";

import { useFormik } from "formik";

import { useToast } from "contexts/Toast";

import { postNovaIntervencao } from "services/post/CadastroModaisInfograficos";

import { useAuth } from "./useAuth";

export function useFinanceiroProjetos() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const initialValues: any = {
    nom_usu_create: user?.nome,
  };

  const registerForm: any = useFormik({
    initialValues,
    // validationSchema: cadastroNovaIntervencaoSchema,
    onSubmit: async (values) => {
      const newValues: any = {
        nom_usu_create: user?.nome,
      };

      setLoading(true);

      try {
        const { status } = await postNovaIntervencao(newValues);

        if (status === 200 || status === 201) {
          toast.success("Intervenção cadastrada com sucesso!", {
            id: "toast-principal",
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error("Erro ao cadastrar intervenção!", {
          id: "toast-principal",
        });
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    setLoading(false);
  }, []);

  // useEffect(() => {
  //   if (xxxxxxxxxx) {
  //     setLoading(false);
  //   }
  // }, []);

  return {
    registerForm,
    loading,
  };
}
