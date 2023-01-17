// CRIADO EM: 27/06/2022
// AUTOR: Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Hook com funções para o registro de atividades.

import { useState } from "react";

import { useFormik } from "formik";
import { activitiesRegisterSchema } from "validations/ActivitiesRegister";

export function useActivities() {
  const [loading, setLoading] = useState(false);
  const activitiesForm = useFormik({
    initialValues: {
      area: "",
      responsible: "",
      c: "",
      spt: "",
      pit: "",
      id: "",
      task: "",
      order: "",
      directSuccessors: "",
      directPrecedents: "",
      phase: "",
      plannedDuration: "",
      start: "",
      end: "",
    },
    validationSchema: activitiesRegisterSchema,
    onSubmit: async (values) => {
      setLoading(true);

      alert(JSON.stringify(values, null, 2));

      setLoading(false);
    },
  });

  return {
    activitiesForm,
    loading,
  };
}
