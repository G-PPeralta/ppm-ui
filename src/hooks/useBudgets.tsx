import { SetStateAction, useEffect, useState } from "react";

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
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [budgetFilter, setBudgetsFilter] = useState<Budget[]>();
  const [projectSelected, setProjectSelected] = useState("");

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

  const filterByProject = () => {
    setLoading(true);
    const filtered = budgets.filter(
      (b) => b.projeto.id.toString() === projectSelected
    );

    if (filtered) {
      setBudgetsFilter([...filtered]);
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
