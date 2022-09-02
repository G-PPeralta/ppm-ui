export interface CadastroSonda {
  nomeSpt: string;
}

export interface CadastroTarefa {
  nomeTarefa: string;
}

export interface CadastroProjetoTipo {
  nomeProjeto: string;
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
  tarefa: string;
  tipo: string;
  dias: number;
  restricao: string;
}

export interface CadastroAtividade {
  nomeAtividade: string;
  responsavel: string;
  area: string;
  precedente: Precedente[];
  comentarios: string;
}
