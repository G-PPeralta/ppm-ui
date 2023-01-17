// CRIADO EM: 08/11/2022
// AUTOR: Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Hook com funções para o cadastro de uma nova atividade.

import { useEffect, useState } from "react";

import { AreaAtuacao } from "interfaces/CadastrosModaisInfograficos";
import {
  FinanceiroPorProjetos,
  TabelaCentroDeCusto,
} from "interfaces/FinanceiroProjetos";

import { getResponsaveis } from "services/get/CadastroModaisInfograficos";
import {
  getMetodosElevacao,
  getPocosAtividadeOperacao,
  getSondasAtividadeOperacao,
} from "services/get/Estatisticas";
import {
  getCentroDeCustoProjetos,
  getClassesDeServico,
  getFinanceiroPorProjetos,
  getFornecedores,
} from "services/get/Financeiro";
import { getAreaAtuacaoList } from "services/get/Infograficos";

export function useRequests(id?: number, mes?: string) {
  const [loading, setLoading] = useState(true);

  const [listaFinanceiroProjetos, setListaFinanceiroProjetos] = useState<
    FinanceiroPorProjetos[]
  >([]);
  const [listaCentroCustoProjetos, setTabelaCentroCustoProjetos] =
    useState<any>([]);
  const [listaFornecedores, setListaFornecedores] = useState<any>([]);
  const [listaClassesDeServico, setListaClassesDeServico] = useState<any>([]);
  const [listaAreaAtuacao, setListaAreaAtuacao] = useState<AreaAtuacao[]>([]);
  const [listaResponsaveis, setListaResponsaveis] = useState<any[]>([]);
  const [listaPocosOperacoes, setListaPocosOperacoes] = useState<any[]>([]);
  const [listaSondasOperacoes, setListaSondasOperacoes] = useState<any[]>([]);
  const [listaMetodosElevacao, setListaMetodosElevacao] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(false);

  const reqGet = async () => {
    setLoading(true);

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
        gap: financeiro.gap,
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

    const areaAtuacao = await getAreaAtuacaoList();
    const areasAtuacaoSorted = areaAtuacao.data.sort((a: any, b: any) =>
      a.tipo.localeCompare(b.tipo)
    );
    setListaAreaAtuacao(areasAtuacaoSorted);

    const responsaveis = await getResponsaveis();
    const responsaveisSorted = responsaveis.data.sort((a: any, b: any) =>
      a.nome.localeCompare(b.nome)
    );
    setListaResponsaveis(responsaveisSorted);

    const pocosOperacoes = await getPocosAtividadeOperacao();
    const pocosOperacoesSorted = pocosOperacoes.data.sort((a: any, b: any) =>
      a.nom_atividade.localeCompare(b.nom_atividade)
    );
    setListaPocosOperacoes(pocosOperacoesSorted);

    const sondasOperacoes = await getSondasAtividadeOperacao();
    const sondasOperacoesSorted = sondasOperacoes.data.sort((a: any, b: any) =>
      a.nom_atividade.localeCompare(b.nom_atividade)
    );
    setListaSondasOperacoes(sondasOperacoesSorted);

    const metodosElevacao = await getMetodosElevacao();
    const metodosElevacaoSorted = metodosElevacao.data.sort((a: any, b: any) =>
      a.metodo.localeCompare(b.metodo)
    );
    setListaMetodosElevacao(metodosElevacaoSorted);

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

  const optionsAreaAtuacao = listaAreaAtuacao.map(
    (areaAtuacao: AreaAtuacao) => ({
      value: areaAtuacao.id,
      label: areaAtuacao.tipo,
    })
  );

  const optionsResponsaveis = listaResponsaveis.map((responsavel: any) => ({
    value: responsavel.id,
    label: responsavel.nome,
  }));

  const optionsPocosOperacoes = listaPocosOperacoes.map(
    (pocoOperacao: any) => ({
      value: pocoOperacao.id,
      label: pocoOperacao.nom_atividade,
    })
  );

  const optionsSondasOperacoes = listaSondasOperacoes.map(
    (sondaOperacao: any) => ({
      value: sondaOperacao.id,
      label: sondaOperacao.nom_atividade,
    })
  );

  const optionsMetodosElevacao = listaMetodosElevacao.map(
    (metodoElevacao: any) => ({
      value: metodoElevacao.id,
      label: metodoElevacao.metodo,
    })
  );

  useEffect(() => {
    reqGet();
    setLoading(false);
  }, [refresh]);

  function callBack() {
    setRefresh(!refresh);
  }

  return {
    loading,
    listaFinanceiroProjetos,
    listaCentroCustoProjetos,
    listaFornecedores,
    listaClassesDeServico,
    listaAreaAtuacao,
    listaResponsaveis,
    listaPocosOperacoes,
    listaSondasOperacoes,
    optionsFornecedores,
    optionsClassesDeServico,
    optionsAreaAtuacao,
    optionsResponsaveis,
    optionsPocosOperacoes,
    optionsSondasOperacoes,
    optionsMetodosElevacao,
    callBack,
  };
}
