import { useEffect, useState } from "react";

import {
  FinanceiroPorProjetos,
  TabelaCentroDeCusto,
} from "interfaces/FinanceiroProjetos";

import {
  getCentroDeCustoProjetos,
  getClassesDeServico,
  getFinanceiroPorProjetos,
  getFornecedores,
} from "services/get/Financeiro";

export function useRequests(id?: number) {
  const [loading, setLoading] = useState(true);

  const [listaFinanceiroProjetos, setListaFinanceiroProjetos] = useState<
    FinanceiroPorProjetos[]
  >([]);
  const [listaCentroCustoProjetos, setTabelaCentroCustoProjetos] =
    useState<any>([]);
  const [listaFornecedores, setListaFornecedores] = useState<any>([]);
  const [listaClassesDeServico, setListaClassesDeServico] = useState<any>([]);

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

    const fornecedores = await getFornecedores();
    const fornecedoresSorted = fornecedores.data.sort((a: any, b: any) =>
      a.nomefornecedor.localeCompare(b.nomefornecedor)
    );
    setListaFornecedores(fornecedoresSorted);

    const classesDeServico = await getClassesDeServico();
    const classesDeServicoSorted = classesDeServico.data.sort(
      (a: any, b: any) => a.classe_servico.localeCompare(b.classe_servico)
    );
    setListaClassesDeServico(classesDeServicoSorted);
  };

  const optionsFornecedores = listaFornecedores.map((fornecedor: any) => ({
    value: fornecedor.id,
    label: fornecedor.nomefornecedor,
  }));

  const optionsClassesDeServico = listaClassesDeServico.map(
    (classeDeServico: any) => ({
      value: classeDeServico.id,
      label: classeDeServico.classe_servico,
    })
  );

  useEffect(() => {
    reqGet();
    setLoading(false);
  }, []);

  return {
    loading,
    listaFinanceiroProjetos,
    listaCentroCustoProjetos,
    listaFornecedores,
    listaClassesDeServico,
    optionsFornecedores,
    optionsClassesDeServico,
  };
}
