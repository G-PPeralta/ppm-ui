import { useState } from "react";

import { useFormik } from "formik";
// import { NovaSonda } from "interfaces/CadastrosModaisInfograficos";
// import { useAuth } from "./useAuth";
// import { useToast } from "contexts/Toast";

interface Filter {
  pocoId: number;
  sondaId: number;
  profundidadeIni: number;
  profundidadeFim: number;
  metodoElevacao: string;
  metodoElevacaoId: number;
  dataDe: string;
  dataAte: string;
}

export function useFiltragemCronogramaAtividade() {
  // const { toast } = useToast();
  const [loading] = useState(false);
  // const { user } = useAuth();
  const initialValues: Filter = {
    pocoId: 0,
    sondaId: 0,
    profundidadeIni: 0,
    profundidadeFim: 0,
    metodoElevacao: "",
    metodoElevacaoId: 0,
    dataDe: "",
    dataAte: "",
  };

  const registerForm = useFormik({
    initialValues,
    onSubmit: () => {
      alert("kkkkk");
    },
  });

  return {
    registerForm,
    loading,
  };
}
