import { useEffect, useState } from "react";

// import { useFormik } from "formik";
// import { projectRegisterSchema } from "validations/ProjectRegister";

// import { useToast } from "contexts/Toast";

import { Budget } from "models/Budget.model";
import { Project } from "models/Project.model";

import { getBudgets } from "services/get/GetBudget";
import { getProjects } from "services/get/GetProject";

export function useBudgets() {
  // const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [budgets, setBudgets] = useState<Budget[]>();
  const [projects, setProjects] = useState<Project[]>();
  const [budgetFilter, setBudgetsFilter] = useState<Budget[]>();

  const wd = window.innerWidth;

  const gerarBudgetsList = async () => {
    const data = await getBudgets();
    setBudgets(data);
    setBudgetsFilter(data);
  };

  const gerarProjectList = async () => {
    const data = await getProjects();
    setProjects(data);
  };

  const filterByProject = (text: string) => {
    setLoading(true);
    let filtered;
    /* if (text && text.length > 3) {
      filtered = projetos?.filter(
        (x) => x.nome.toLowerCase().indexOf(text.toLowerCase()) > -1
      );
    } else {
      filtered = projetos;
    } */
    if (budgets) {
      return budgets;
    }

    if (filtered) {
      setBudgetsFilter([...filtered]);
    }
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
  };
}
