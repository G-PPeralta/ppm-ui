// CRIADO EM: 02/09/2022
// AUTOR: Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Hook com funções para o cadastro de uma nova sonda - módulo Intervenções - Cronograma.

import { useState } from "react";

import { useFormik } from "formik";
import { NovaSonda } from "interfaces/CadastrosModaisInfograficos";
import { cadastroSondaSchema } from "validations/ModaisCadastrosInfografico";

import { useToast } from "contexts/Toast";

import { postCadastroSondaOperacao } from "services/post/Estatistica";
import { postNovaSonda } from "services/post/Infograficos";

import { useAuth } from "./useAuth";

export function useCadastroSonda(
  modulo?: string,
  refresh?: boolean,
  setRefresh?: Function
) {
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
            toast.success(`Sonda cadastrada com sucesso!`, {
              id: "toast-principal",
            });
            setLoading(false);
          }
        } else {
          const { status } = await postNovaSonda(newValues);

          if (status === 200 || status === 201) {
            toast.success(`Sonda cadastrada com sucesso!`, {
              id: "toast-principal",
            });
            setLoading(false);
            if (setRefresh) {
              setRefresh(!refresh);
            }
          }
        }
      } catch (error) {
        toast.error(`Erro ao cadastrar sonda!`, {
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
