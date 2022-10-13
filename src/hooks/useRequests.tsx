import { useEffect, useState } from "react";

import {
  FinanceiroPorProjetos,
  TabelaCentroDeCusto,
} from "interfaces/FinanceiroProjetos";

import {
  getCentroDeCustoProjetos,
  getFinanceiroPorProjetos,
} from "services/get/Financeiro";

export function useRequests(id?: number) {
  const [loading, setLoading] = useState(true);

  const [listaFinanceiroProjetos, setListaFinanceiroProjetos] = useState<
    FinanceiroPorProjetos[]
  >([]);
  const [listaCentroCustoProjetos, setTabelaCentroCustoProjetos] =
    useState<any>([]);

  const reqGet = async () => {
    setLoading(true);

    if (id) {
      const tabelaCentroDeCusto = await getCentroDeCustoProjetos(id);
      const centroDeCustoFormatado = tabelaCentroDeCusto.data.centroDeCusto.map(
        (item: TabelaCentroDeCusto) => ({
          ...item,
          valor: Number(item.valor),
        })
      );
      const data = {
        ...tabelaCentroDeCusto.data,
        centroDeCusto: centroDeCustoFormatado,
      };

      setTabelaCentroCustoProjetos(data);
    }

    const financeiroProjetos = await getFinanceiroPorProjetos();

    const financeiroProjetosSorted = financeiroProjetos.data.sort(
      (a: FinanceiroPorProjetos, b: FinanceiroPorProjetos) =>
        a.nomeprojeto.localeCompare(b.nomeprojeto)
    );
    const financeiroFormatado = financeiroProjetosSorted.map(
      (financeiro: FinanceiroPorProjetos) => ({
        idprojeto: financeiro.idprojeto,
        nomeprojeto: financeiro.nomeprojeto,
        elementopep: financeiro.elementopep,
        denominacaodeobjeto: financeiro.denominacaodeobjeto,
        mes: financeiro.mes,
        textodopedido: financeiro.textodopedido,
        totalprevisto: Number(financeiro.totalprevisto),
        totalrealizado: Number(financeiro.totalrealizado),
      })
    );

    setListaFinanceiroProjetos(financeiroFormatado);
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
