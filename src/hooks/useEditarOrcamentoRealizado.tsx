import { useEffect, useState } from "react";

// CRIADO EM: 04/11/2022
// AUTOR: Felipe Mateus
// DESCRIÇÃO DO ARQUIVO: Hook com funções para a edição de um orçamento (realizado) - módulo Intervenções - Financeiro.

import { useFormik } from "formik";
import { BudgetReal, ClasseServico } from "interfaces/Budgets";
import { Fornecedor } from "interfaces/Services";
import { cadastroValorPlanejadoSchema } from "validations/ModalCadastroOrcamento";

import { formatDateToYMD } from "utils/formatDate";
import { formatReal } from "utils/formatReal";
import { parseNumber } from "utils/regexCoinMask";

import { useToast } from "contexts/Toast";

import { getFornecedor } from "services/get/Fornecedor";
import { getClassesServicos, getCustoRealizado } from "services/get/GetBudget";
import { patchValorRealizado } from "services/post/Budget";

import { useAuth } from "./useAuth";

export function useEditarOrcamentoRealizado(id: number) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
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

  const getGestaoDeCusto = async () => {
    const data = await getCustoRealizado(id);

    registerForm.setFieldValue("gasto", Number(data.vlr_realizado).toFixed(2));
    registerForm.setFieldValue(
      "data",
      formatDateToYMD(new Date(data.dat_lcto))
    );
    registerForm.setFieldValue("fornecedor", data.id_fornecedor);
    registerForm.setFieldValue("servico", data.classe_servico);
    registerForm.setFieldValue("pedido", data.num_pedido);
    registerForm.setFieldValue("pedido_obs", data.txt_observacao);
    setLoading(false);
  };

  const initialValues = {
    gasto: "",
    data: "",
    fornecedor: "",
    servico: "",
    pedido: "",
    pedido_obs: "",
    nom_usu_edit: user?.nome,
  };

  const registerForm = useFormik({
    initialValues,
    validationSchema: cadastroValorPlanejadoSchema,
    onSubmit: async (values) => {
      const dateb = new Date(values.data);
      dateb.setHours(11);
      dateb.setDate(dateb.getDate() + 1);
      const dateS = dateb.toDateString();
      const newValues: BudgetReal = {
        id,
        valor: parseNumber(values.gasto),
        data: dateS,
        fornecedor: values.fornecedor,
        classeServico: values.servico,
        pedido: parseInt(values.pedido),
        textPedido: values.pedido_obs,
        nom_usu_edit: values.nom_usu_edit,
      };
      setLoading(true);

      try {
        const { status } = await patchValorRealizado(newValues);

        if (status === 200 || status === 201) {
          toast.success(
            `Valor Gasto ${formatReal(
              parseNumber(values.gasto)
            )} atualizado com sucesso!`,
            {
              id: "toast-principal",
            }
          );
          setLoading(false);
        }
      } catch (error) {
        toast.error(
          `Erro ao Ao atualizar valor gasto ${formatReal(
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
    getGestaoDeCusto();
  }, [id]);

  return {
    registerForm,
    loading,
    fornecedores,
    classesSevicos,
  };
}
