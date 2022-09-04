export interface CadastroSonda {
  nome: string;
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
  ordem: number;
  atividaeId: number | null;
  tipo: string;
  dias: number;
  restricao: string;
}

export interface CadastroAtividade {
  nome: string;
  prioridade: boolean;
  obs: string;
  responsavelId: number;
  tarefaId: number;
  areaAtuacaoId: number;
  atividadesPrecedentes?: Precedente[];
}
