// CRIADO EM: 24/09/2022
// AUTOR: Geovana Augusta
// DESCRIÇÃO DO ARQUIVO: Hook com funções para o cadastro de uma nova opção de uma priorização previamente cadastrada - módulo Configuração - Priorização.

import { useState } from "react";

import { useFormik } from "formik";
import { cadastroNovaOpcaoPriorizacao } from "validations/ModaisRanking";

import { useToast } from "contexts/Toast";

import { postOptionRanking } from "services/post/Priorizacao";

import { useAuth } from "./useAuth";

export function useCadastroNovaOpcaoPriorizacao() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const initialValues: any = {
    nom_opcao: "",
    id_ranking: 0,
    num_nota: 0,
    nom_usu_create: user?.nome,
  };

  const registerForm = useFormik({
    initialValues,
    validationSchema: cadastroNovaOpcaoPriorizacao,
    onSubmit: async (values) => {
      const newValues: any = {
        nom_opcao: values.nom_opcao,
        id_ranking: values.id_ranking,
        num_nota: values.num_nota,
        nom_usu_create: user?.nome,
      };

      setLoading(true);

      try {
        // rota post opção ranking - opção priorização
        const { status } = await postOptionRanking(newValues);

        if (status === 200 || status === 201) {
          toast.success(`Opção cadastrada com sucesso!`, {
            id: "toast-principal",
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error(`Erro ao cadastrar a opção!`, {
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
