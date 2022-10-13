export interface FinanceiroPorProjetos {
  idProjeto: number;
  nomeProjeto: string;
  elementoPep: string;
  denominacaoDeObjeto: string;
  mes: string;
  textoDoPedido: string;
  totalPrevisto: number;
  totalRealizado: number;
}

export interface TabelaCentroDeCusto {
  idCusto: number;
  pedido: string;
  prestadorDeServico: string;
  prestadorDeServicoId: number;
  classeDeServico: string;
  classeDeServicoId: number;
  dataPagamento: string;
  valor: number;
  descricaoDoServico: string;
}

export interface PaginaCentroDeCusto {
  idProjeto: number;
  nomeProjeto: string;
  elementoPep: string;
  centroDeCusto: TabelaCentroDeCusto[];
}
