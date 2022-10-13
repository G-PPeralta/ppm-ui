import { useEffect, useState } from "react";

// import { useToast } from "contexts/Toast";

import { BudgetDetail } from "interfaces/Budgets";

import { getBudgetDetail, getNomePoco } from "services/get/GetBudget";

export function useBudgetDetail(id: string | null) {
  // const { toast } = useToast();

  //  const [loading, setLoading] = useState(false);
  const [, /* budgets */ setBudgets] = useState<BudgetDetail[]>([]);
  // const [projects, setProjects] = useState<Project[]>([]);
  const [budgetFilter, setBudgetsFilter] = useState<BudgetDetail[]>([]);
  // const [projectSelected, setProjectSelected] = useState("");
  const [nome, setNome] = useState("");

  const wd = window.innerWidth;

  const gerarBudgetsList = async () => {
    const data = await getBudgetDetail(id);
    setBudgets(data);
    setBudgetsFilter(data);
  };

  const getNome = async () => {
    const ls = await getNomePoco(id);
    setNome(ls[0].nom_atividade);
  };

  /* const filterByProject = () => {
    setLoading(true);
    const filtered = budgets.filter(
      (b) => b.projeto.id.toString() === projectSelected
    );

    if (filtered) {
      setBudgetsFilter([...filtered]);
    }

    setLoading(false);
  }; */

  /*  const handleProjectChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setProjectSelected(e.target.value);
  }; */

  useEffect(() => {
    gerarBudgetsList();
    getNome();
  }, []);

  return {
    budgetFilter,
    // loading,
    wd,
    // projects,
    nome,
  };
}
