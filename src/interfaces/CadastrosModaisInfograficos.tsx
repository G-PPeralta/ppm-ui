export interface CadastroSonda {
  nomeSpt: string;
}

export interface CadastroTarefa {
  nomeTarefa: string;
}

export interface CadastroProjetoTipo {
  nomeId: string;
  nomeProjeto: string;
  atividadeId: string;
  atividadeBase: string;
  atividadeTarefa: string;
  atividadePrecedente: string;
  atividadeDias: string;
  comentarios: string;
}

export interface CadastroIntervencao {
  poco: string;
  campo: string;
  sonda: string;
  sequencia: string;
  inicioPrevisto: string;
  projeto: string;
  observacoes: string;
}

interface Precedente {
  id: string;
  tarefa: string;
  tipo: string;
  dias: number;
  restricao: string;
}

export interface CadastroAtividade {
  nomeId: string;
  nomeAtividade: string;
  responsavel: string;
  area: string;
  precedente: Precedente[];
  comentarios: string;
}
