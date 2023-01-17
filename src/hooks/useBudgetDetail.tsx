// CRIADO EM: 21/09/2022
// AUTOR: Felipe Mateus
// DESCRIÇÃO DO ARQUIVO: Hook com funções para a tela de financeiro - módulo Intervenção - Financeiro - Detalhes.

import { useEffect, useState } from "react";

import { BudgetDetail, Titulo, Totalizacao } from "interfaces/Budgets";

import { getBudgetDetail } from "services/get/GetBudget";

export function useBudgetDetail(id: string | null) {
  const [loading, setLoading] = useState(true);
  const [, setBudgets] = useState<BudgetDetail[]>([]);
  const [budgetFilter, setBudgetsFilter] = useState<BudgetDetail[]>([]);
  const [titulo, setTitulo] = useState<Titulo>();
  const [totalizacao, setTotalizacao] = useState<Totalizacao>();
  const [render, setRender] = useState(false);

  const wd = window.innerWidth;

  const gerarBudgetsList = async () => {
    setLoading(true);
    const data = await getBudgetDetail(id);

    setBudgets(data.list);
    setBudgetsFilter(data.list);

    setTitulo(data.titulo);
    setTotalizacao(data.totalizacao);
    setLoading(false);
  };

  const toogleRender = () => {
    setRender(!render);
  };

  useEffect(() => {
    gerarBudgetsList();
  }, [render]);

  return {
    budgetFilter,
    loading,
    wd,
    titulo,
    totalizacao,
    toogleRender,
  };
}
