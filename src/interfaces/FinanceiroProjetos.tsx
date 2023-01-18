// CRIADO EM: 13/10/2022
// AUTOR: EDUARDO MUCHAK
// DESCRIÇÃO DO ARQUIVO: ARQUIVO DE INTERFACES DA PÁGINA DE FINANCEIRO POR PROJETOS

export interface FinanceiroPorProjetos {
  idprojeto: number;
  nomeprojeto: string;
  elementopep: string;
  denominacaodeobjeto: string;
  mes?: string;
  textodopedido: string;
  totalprevisto: number;
  totalrealizado: number;
  gap: number;
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
