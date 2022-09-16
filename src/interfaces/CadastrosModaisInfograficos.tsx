export interface CadastroSonda {
  nome: string;
}

export interface CadastroTarefa {
  tarefa: string;
}

export interface AtividadesProjetoTipo {
  atividadeId: number;
  precedentes: number[];
}

export interface CadastroProjetoTipo {
  nome: string;
  atividades: AtividadesProjetoTipo[];
  comentarios: string;
}

interface Atividades {
  ordem: number;
  atividade: string;
  responsavel: string;
}

export interface CadastroIntervencao {
  nome: string;
  pocoId: number;
  sondaId: number;
  projetoId: number;
  inicioPrevisto: string;
  atividades: Atividades[];
  comentarios: string;
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

export interface ListaPoco {
  id: number;
  poco: string;
}

export interface ListaSonda {
  id: number;
  nome: string;
}

export interface AtividadeIntervencao {
  areaAtuacaoId: number;
  dias: number;
  id: number;
  obs: string;
  tarefaId: number;
}

export interface AtividadeListaProjetoTipo {
  atividade: AtividadeIntervencao;
}

export interface ListaProjetoTipo {
  id: number;
  nome: string;
  atividades: AtividadeListaProjetoTipo[];
}
