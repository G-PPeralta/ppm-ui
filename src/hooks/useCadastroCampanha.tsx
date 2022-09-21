import { useState } from "react";

import { useFormik } from "formik";
import { NovaCampanha } from "interfaces/CadastrosModaisInfograficos";
import { cadastroNovaCampanhaSchema } from "validations/ModaisCadastrosInfografico";

import { useToast } from "contexts/Toast";

import { postNovaCampanha } from "services/post/CadastroModaisInfograficos";

import { useAuth } from "./useAuth";

export function useCadastroCampanha() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const initialValues: NovaCampanha = {
    nom_campanha: "",
    dsc_comentario: "",
    nom_usu_create: user?.nome,
  };

  const registerForm = useFormik({
    initialValues,
    validationSchema: cadastroNovaCampanhaSchema,
    onSubmit: async (values) => {
      const newValues: NovaCampanha = {
        nom_campanha: values.nom_campanha,
        dsc_comentario: values.dsc_comentario,
        nom_usu_create: user?.nome,
      };

      setLoading(true);

      try {
        const { status } = await postNovaCampanha(newValues);

        if (status === 200 || status === 201) {
          toast.success(
            `Campanha ${values.nom_campanha} cadastrada com sucesso!`,
            {
              id: "toast-principal",
            }
          );
          setLoading(false);
        }
      } catch (error) {
        toast.error(`Erro ao cadastrar campanha ${values.nom_campanha}!`, {
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
