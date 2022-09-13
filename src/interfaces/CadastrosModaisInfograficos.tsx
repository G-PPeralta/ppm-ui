export interface CadastroSonda {
  nome: string;
}

export interface CadastroTarefa {
  tarefa: string;
}

export interface Precedentes {
  id: number;
  nomeAtividade: string;
}

export interface AtividadesProjetoTipo {
  atividade: string;
  precedentes: Precedentes[];
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
  obs: string;
  tarefaId: number;
  areaAtuacaoId: number;
  dias: number;
}

export interface CadastroPoco {
  poco: string;
}
