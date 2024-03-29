// CRIADO EM: 30/09/2022
// AUTOR: Felipe Mateus
// DESCRIÇÃO DO ARQUIVO: Hook com funções para o cadastro de um orçamento (realizado) - módulo Intervenções - Financeiro

import { useEffect, useState } from "react";

import { useFormik } from "formik";
import { BudgetReal, ClasseServico } from "interfaces/Budgets";
import { Fornecedor } from "interfaces/Services";
import { cadastroValorPlanejadoSchema } from "validations/ModalCadastroOrcamento";

import { formatReal } from "utils/formatReal";
import { parseNumber } from "utils/regexCoinMask";

import { useToast } from "contexts/Toast";

import { getFornecedor } from "services/get/Fornecedor";
import { getClassesServicos } from "services/get/GetBudget";
import { postAddValorRealizado } from "services/post/Budget";

import { useAuth } from "./useAuth";

export function useCadastroOrcamentoRealizado() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [atividade, setAtividade] = useState<number>(0);
  const [projeto, setProjeto] = useState<number>(0);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [classesSevicos, setClassesSevicos] = useState<ClasseServico[]>([]);

  const listaFornecedores = async () => {
    const { data } = await getFornecedor();
    setFornecedores(data);
  };

  const listaClasseServicos = async () => {
    const { data } = await getClassesServicos();
    setClassesSevicos(data);
  };

  const initialValues = {
    gasto: "",
    data: "",
    fornecedor: "",
    servico: "",
    pedido: 0,
    pedido_obs: "",
    nom_usu_create: user?.nome,
  };

  const registerForm = useFormik({
    initialValues,
    validationSchema: cadastroValorPlanejadoSchema,
    onSubmit: async (values) => {
      const dateF = new Date(values.data);
      dateF.setHours(11);
      dateF.setDate(dateF.getDate() + 1);
      const dateS = dateF.toISOString();
      const newValues: BudgetReal = {
        atividadeId: atividade,
        projetoId: projeto,
        valor: parseNumber(values.gasto),
        data: dateS,
        fornecedor: values.fornecedor,
        classeServico: values.servico,
        pedido: values.pedido,
        textPedido: values.pedido_obs,
        nom_usu_create: user?.nome,
      };
      setLoading(true);

      try {
        const { status } = await postAddValorRealizado(newValues);

        if (status === 200 || status === 201) {
          toast.success(
            `Valor Gasto ${formatReal(
              parseNumber(values.gasto)
            )} cadastrada com sucesso!`,
            {
              id: "toast-principal",
            }
          );
          setLoading(false);
        }
      } catch (error) {
        toast.error(
          `Erro ao cadastrar valor gasto ${formatReal(
            parseNumber(values.gasto)
          )}!`,
          {
            id: "toast-principal",
          }
        );
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    listaFornecedores();
    listaClasseServicos();
  }, []);

  return {
    registerForm,
    loading,
    setAtividade,
    setProjeto,
    fornecedores,
    classesSevicos,
  };
}
