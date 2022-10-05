import { useEffect, useState } from "react";

// import { useToast } from "contexts/Toast";

import { BudgetDetail } from "interfaces/Budgets";

import { getBudgetDetail } from "services/get/GetBudget";

export function useBudgetDetail() {
  // const { toast } = useToast();

  //  const [loading, setLoading] = useState(false);
  const [, /* budgets */ setBudgets] = useState<BudgetDetail[]>([]);
  // const [projects, setProjects] = useState<Project[]>([]);
  const [budgetFilter, setBudgetsFilter] = useState<BudgetDetail[]>([]);
  // const [projectSelected, setProjectSelected] = useState("");

  const wd = window.innerWidth;

  const gerarBudgetsList = async () => {
    const data = await getBudgetDetail();
    setBudgets(data);
    setBudgetsFilter(data);
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
  }, []);

  return {
    budgetFilter,
    // loading,
    wd,
    // projects,
  };
}
