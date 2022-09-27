import { SetStateAction, useEffect, useState } from "react";

// import { useFormik } from "formik";
// import { projectRegisterSchema } from "validations/ProjectRegister";

// import { useToast } from "contexts/Toast";

import { ListaSonda } from "interfaces/CadastrosModaisInfograficos";
import { Budget } from "models/Budget.model";

import { getBudgets } from "services/get/GetBudget";
import { getInfoCampanha } from "services/get/Infograficos";

export function useBudgets() {
  // const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [projects, setProjects] = useState<ListaSonda[]>([]);
  const [budgetFilter, setBudgetsFilter] = useState<Budget[]>();
  const [projectSelected, setProjectSelected] = useState("");

  const wd = window.innerWidth;

  const gerarBudgetsList = async () => {
    const data = await getBudgets();
    setBudgets(data);
    setBudgetsFilter(data);
  };

  const gerarProjectList = async () => {
    const { data } = await getInfoCampanha();
    const campanhas = data.map((d) => ({
      nome: d.sonda,
      id: d.id_campanha,
    }));
    setProjects(campanhas);
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
