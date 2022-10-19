import { useState } from "react";

import { useFormik } from "formik";
import { NovaSonda } from "interfaces/CadastrosModaisInfograficos";
import { cadastroSondaSchema } from "validations/ModaisCadastrosInfografico";

import { useToast } from "contexts/Toast";

import { postCadastroSondaOperacao } from "services/post/Estatistica";
import { postNovaSonda } from "services/post/Infograficos";

import { useAuth } from "./useAuth";

export function useCadastroSonda(modulo?: string) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const initialValues: NovaSonda = {
    nome: "",
    nom_usu_create: user?.nome,
  };

  const registerForm = useFormik({
    initialValues,
    validationSchema: cadastroSondaSchema,
    onSubmit: async (values) => {
      const newValues: NovaSonda = {
        nome: values.nome,
        nom_usu_create: user?.nome,
      };

      setLoading(true);

      try {
        if (modulo === "operacao") {
          const { status } = await postCadastroSondaOperacao(newValues);

          if (status === 200 || status === 201) {
            toast.success(`Poço cadastrado com sucesso!`, {
              id: "toast-principal",
            });
            setLoading(false);
          }
        } else {
          const { status } = await postNovaSonda(newValues);

          if (status === 200 || status === 201) {
            toast.success(`Poço cadastrado com sucesso!`, {
              id: "toast-principal",
            });
            setLoading(false);
          }
        }
        // const { status } = await postNovaSonda(newValues);

        // if (status === 200 || status === 201) {
        //   toast.success(`Sonda ${values.nome} cadastrada com sucesso!`, {
        //     id: "toast-principal",
        //   });
        //   setLoading(false);
        // }
      } catch (error) {
        toast.error(`Erro ao cadastrar sonda ${values.nome}!`, {
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
