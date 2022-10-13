import { useEffect, useState } from "react";

import {
  FinanceiroPorProjetos,
  PaginaCentroDeCusto,
} from "interfaces/FinanceiroProjetos";

import {
  getCentroDeCustoProjetos,
  getFinanceiroPorProjetos,
} from "services/get/Financeiro";

export function useRequests() {
  const [loading, setLoading] = useState(false);

  const [listaFinanceiroProjetos, setListaFinanceiroProjetos] = useState<
    FinanceiroPorProjetos[]
  >([]);
  const [listaCentroCustoProjetos, setTabelaCentroCustoProjetos] = useState<
    PaginaCentroDeCusto[]
  >([]);

  const reqGet = async () => {
    setLoading(true);

    const financeiroProjetos = await getFinanceiroPorProjetos();
    const tabelaCentroDeCusto = await getCentroDeCustoProjetos();

    const financeiroProjetosSorted = financeiroProjetos.data.sort(
      (a: FinanceiroPorProjetos, b: FinanceiroPorProjetos) =>
        a.nomeProjeto.localeCompare(b.nomeProjeto)
    );

    setListaFinanceiroProjetos(financeiroProjetosSorted);
    setTabelaCentroCustoProjetos(tabelaCentroDeCusto.data);
  };

  useEffect(() => {
    reqGet();
  }, []);

  useEffect(() => {
    if (listaFinanceiroProjetos.length > 0) {
      setLoading(false);
    }
  }, [listaFinanceiroProjetos]);

  return {
    loading,
    listaFinanceiroProjetos,
    listaCentroCustoProjetos,
  };
}
