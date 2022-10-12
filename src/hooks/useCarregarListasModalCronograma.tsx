import { useEffect, useState } from "react";

import {
  AreaAtuacao,
  Responsavel,
  Tarefas,
} from "interfaces/CadastrosModaisInfograficos";
import { Operacao } from "interfaces/Estatisticas";

import {
  getResponsaveis,
  getTarefas,
} from "services/get/CadastroModaisInfograficos";
import { getOperacoes } from "services/get/Estatisticas";
import { getAreaAtuacaoList } from "services/get/Infograficos";
// import { postCadastroNovoCronograma } from "services/post/Estatistica";

export function useCarregarListasModalCronograma() {
  const [listaAreaAtuacao, setListaAreaAtuacao] = useState<AreaAtuacao[]>([]);
  const [listaResponsaveis, setListaResponsaveis] = useState<Responsavel[]>([]);
  const [listaTarefas, setListaTarefas] = useState<Tarefas[]>([]);
  const [listaOperacao, setListaOperacao] = useState<Operacao[]>([]);

  const reqGet = async () => {
    const areaAtuacao = await getAreaAtuacaoList();
    const responsaveis = await getResponsaveis();
    const tarefas = await getTarefas();
    const operacoes = await getOperacoes();

    const areasAtuacaoSorted = areaAtuacao.data.sort((a: any, b: any) =>
      a.tipo.localeCompare(b.tipo)
    );
    const responsaveisSorted = responsaveis.data.sort((a: any, b: any) =>
      a.nome.localeCompare(b.nome)
    );
    const tarefasSorted = tarefas.data.sort((a: Tarefas, b: Tarefas) =>
      a.nom_atividade.localeCompare(b.nom_atividade)
    );
    const operacoesSorted = operacoes.data.sort((a: any, b: any) =>
      a.nom_operacao.localeCompare(b.nom_operacao)
    );

    setListaAreaAtuacao(areasAtuacaoSorted);
    setListaResponsaveis(responsaveisSorted);
    setListaTarefas(tarefasSorted);
    setListaOperacao(operacoesSorted);
  };

  const listaAtividadesPrecedentes = listaOperacao.map((atividade) => ({
    id: atividade.id,
    nome: atividade.nom_operacao,
    checked: false,
  }));

  useEffect(() => {
    reqGet();
  }, []);

  return {
    listaAreaAtuacao,
    listaResponsaveis,
    listaTarefas,
    listaAtividadesPrecedentes,
    listaOperacao,
  };
}
