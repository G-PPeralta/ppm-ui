interface User {
  nom_usu_create: string | undefined; // enviar o nome do usuário logado
}

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
  responsavel: number;
}

export interface CadastroIntervencao {
  nome: string;
  pocoId: number;
  sptId: number;
  tipoProjetoId: number;
  inicioPlanejado: string;
  fimPlanejado: string;
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

export interface NovaCampanha {
  nom_campanha: string;
  dsc_comentario: string;
  nom_usu_create: string | undefined;
}

export interface NovaIntervencao extends User {
  id_campanha: number; // enviar id da sonda
  nom_atividade: string; // enviar nome do poço
  dsc_comentario: string; // enviar comentario
  id_pai: number; // sempre enviar 0
  pct_real: number; // sempre enviar 0
  dat_ini_plan: null; // sempre enviar null
  dat_fim_plan: null; // sempre enviar null
}

export interface NovoPoco {
  poco: string;
}

export interface NovaSonda extends User {
  sonda: string;
}

export interface NovaAtividade extends User {
  nome: string;
  status: number;
  dataInicio: string;
  dataFim: string;
  observacoes: string;
}
