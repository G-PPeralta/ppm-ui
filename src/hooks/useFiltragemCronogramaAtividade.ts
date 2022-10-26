import { useState } from "react";
import toast from "react-hot-toast";

import { useFormik } from "formik";
import { FiltroCronograma } from "interfaces/FiltroCronograma";

import { postFiltroCronograma } from "services/post/FiltroCronograma";

export function useFiltragemCronogramaAtividade() {
  const [loading] = useState(false);
  const [resultados, setResultados] = useState<any>();
  const [responsePOST, setResponsePOST] = useState<any>([]);
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
    try {
      const { status, data } = await postFiltroCronograma(initialValues);

      if (data) {
        setResponsePOST(data);
      }
      if (status === 200 || status === 201) {
        toast.success("Atividade filtrada com sucesso!", {
          id: "toast-principal",
        });
      }
    } catch (error) {
      toast.error("Erro ao filtrar atividade!", {
        id: "toast-principal",
      });
    }
    setResultados({
      duracao: 3,
    });
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
    resultados,
    responsePOST,
  };
}
