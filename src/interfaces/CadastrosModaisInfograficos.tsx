export interface CadastroSonda {
  nome: string;
}

export interface CadastroTarefa {
  tarefa: string;
}

export interface AtividadesProjetoTipo {
  base: string;
  tarefa: string;
  precedente: string;
  dias: number;
}

export interface CadastroProjetoTipo {
  nomeProjeto: string;
  atividades: AtividadesProjetoTipo[];
  comentarios: string;
}

interface Atividades {
  ordem: number;
  atividade: string;
  responsavel: string;
}

export interface CadastroIntervencao {
  intervencao: string;
  poco: string;
  sonda: string;
  inicioPrevisto: string;
  fimPrevisto: string;
  projeto: string;
  atividades: Atividades[];
  observacoes: string;
}

export interface CadastroAtividade {
  nome: string;
  prioridade: boolean;
  obs: string;
  atividadeId: number;
  tarefaId: number;
  areaAtuacaoId: number;
}

export interface CadastroPoco {
  nomePoco: string;
}
