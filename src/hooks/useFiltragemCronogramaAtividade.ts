import { useEffect, useState } from "react";

import { useFormik } from "formik";
import { FiltroCronograma } from "interfaces/FiltroCronograma";
import {
  getMetodoElevacao,
  getPocos,
  getSondas,
} from "services/get/FiltroCronograma";

export function useFiltragemCronogramaAtividade() {
  const [loading, setLoading] = useState(false);
  const [pocos, setPocos] = useState([]);
  const [sonda, setSonda] = useState([]);
  const [metodoElevacao, setMetodoElevacao] = useState([]);

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
    // await postFiltroCronograma(initialValues);
  };

  const reqGet = async () => {
    const _sondas = await getSondas();
    const _pocos = await getPocos();
    const _metodo = await getMetodoElevacao();
    setPocos(_pocos);
    setSonda(_sondas);
    setMetodoElevacao(_metodo);
  };

  const registerForm = useFormik({
    initialValues,
    onSubmit: (values) => {
      postFiltros(values);
    },
  });

  useEffect(() => {
    setLoading(true);
    reqGet();
  }, []);

  useEffect(() => {
    if (pocos.length > 0 && sonda.length > 0 && metodoElevacao.length > 0) {
      setLoading(false);
    }
  }, [pocos, sonda, metodoElevacao]);

  return {
    registerForm,
    loading,
    pocos,
    sonda,
    metodoElevacao,
  };
}
