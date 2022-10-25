import { useState } from "react";

import { useFormik } from "formik";
import { FiltroCronograma } from "interfaces/FiltroCronograma";

import { postFiltroCronograma } from "services/post/FiltroCronograma";

export function useFiltragemCronogramaAtividade() {
  const [loading] = useState(false);
  const initialValues: FiltroCronograma = {
    pocoId: 0,
    sondaId: 0,
    profundidadeIni: 0,
    profundidadeFim: 0,
    metodoElevacao: "",
    metodoElevacaoId: 0,
    dataDe: "",
    dataAte: "",
  };

  const postFiltros = async (initialValues: FiltroCronograma) => {
    await postFiltroCronograma(initialValues);
  };

  const registerForm = useFormik({
    initialValues,
    onSubmit: (values) => {
      postFiltros(values);
    },
  });

  return {
    registerForm,
    loading,
  };
}
