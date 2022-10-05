import { useEffect, useState } from "react";

import { useFormik } from "formik";
import { BudgetReal } from "interfaces/Budgets";
import { Fornecedor } from "interfaces/Services";
import { cadastroValorPlanejadoSchema } from "validations/ModalCadastroOrcamento";

import { useToast } from "contexts/Toast";

import { getFornecedor } from "services/get/Fornecedor";
import { postAddValorRealizado } from "services/post/Budget";

import { useAuth } from "./useAuth";

export function useCadastroOrcamentoPlanejado() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [atividade, setAtividade] = useState<number>(0);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);

  const listaFornecedores = async () => {
    const { data } = await getFornecedor();
    setFornecedores(data);
  };

  const initialValues = {
    gasto: 0,
    data: "",
    fornecedor: "",
    servico: "",
    pedido: "",
    pedido_obs: "",
    nom_usu_create: user?.nome,
  };

  const registerForm = useFormik({
    initialValues,
    validationSchema: cadastroValorPlanejadoSchema,
    onSubmit: async (values) => {
      const newValues: BudgetReal = {
        atividadeId: atividade,
        valor: values.gasto,
        data: values.data,
        fornecedor: values.fornecedor,
        classeServico: values.servico,
        pedido: parseInt(values.pedido),
        textPedido: values.pedido_obs,
        nom_usu_create: user?.nome,
      };
      setLoading(true);

      try {
        const { status } = await postAddValorRealizado(newValues);

        if (status === 200 || status === 201) {
          toast.success(`Valor Gasto ${values.gasto} cadastrada com sucesso!`, {
            id: "toast-principal",
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error(`Erro ao cadastrar valor previsto ${values.gasto}!`, {
          id: "toast-principal",
        });
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    listaFornecedores();
  }, []);

  return {
    registerForm,
    loading,
    setAtividade,
    fornecedores,
  };
}
