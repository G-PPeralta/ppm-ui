import { SetStateAction, useEffect, useState } from "react";

// import { useFormik } from "formik";
// import { projectRegisterSchema } from "validations/ProjectRegister";

// import { useToast } from "contexts/Toast";

import { Budget } from "interfaces/Budgets";
import { ListaSonda } from "interfaces/CadastrosModaisInfograficos";

import { getBudgetProjects, getBudgets } from "services/get/GetBudget";

export function useBudgets() {
  // const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [projects, setProjects] = useState<ListaSonda[]>([]);
  const [budgetFilter, setBudgetsFilter] = useState<Budget[]>();
  const [projectSelected, setProjectSelected] = useState("");

  const wd = window.innerWidth;

  const gerarBudgetsList = async () => {
    const data = await getBudgets();
    setBudgets(data);
    setBudgetsFilter(data);
    setLoading(false);
  };

  const gerarProjectList = async () => {
    const data = await getBudgetProjects();

    setProjects(data);
  };

  const filterByProject = () => {
    setLoading(true);
    const filtered = budgets.filter(
      (b) => b.projeto.id.toString() === projectSelected
    );

    if (projectSelected) {
      setBudgetsFilter([...filtered]);
    } else {
      setBudgetsFilter([...budgets]);
    }

    setLoading(false);
  };

  const handleProjectChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setProjectSelected(e.target.value);
  };

  useEffect(() => {
    gerarBudgetsList();
    gerarProjectList();
  }, []);

  return {
    budgetFilter,
    loading,
    wd,
    filterByProject,
    projects,
    handleProjectChange,
  };
}
