interface User {
  nom_usu_create: string | undefined; // enviar o nome do usuário logado
}

export interface CadastroSonda {
  nome: string;
}

export interface CadastroTarefa {
  tarefa: string;
}

export interface PrecedentesCadastroProjetoTipo {
  id: number;
  nome: string;
  checked: boolean;
}

export interface AtividadesProjetoTipo {
  atividade_id_origem: string;
  area_id: number;
  tarefa_id: number;
  qtde_dias: number;
  precedentes: PrecedentesCadastroProjetoTipo[];
}

export interface CadastroProjetoTipo extends User {
  nom_projeto_tipo: string;
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

export interface CadastroAtividade extends User {
  id_origem: string;
  nom_atividade: string;
  responsavel_id: number;
  area_atuacao: string;
  nao_iniciar_antes_de: {
    data: string;
    checked: Boolean | null;
  };
  nao_terminar_depois_de: {
    data: string;
    checked: Boolean | null;
  };
  o_mais_breve_possivel: Boolean | null;
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
  nome: string;
}

export interface NovaAtividade extends User {
  id_pai: number; // sempre enviar 0
  nom_atividade: string; // enviar nome da atividade
  pct_real: number; // porcentagem realizada
  dat_ini_plan: string; // data inicio planejada
  dat_fim_plan: string; // data fim planejada
  dsc_comentario: string; // enviar comentario
  id_campanha: number; // enviar id da campanha
  id_area: number; // enviar id da area de atuação
  nom_recurso: string; // enviar nome do recurso
}

export interface Responsavel {
  id: number;
  nome: string;
  area_atuacao: string;
}

export interface AreaAtuacao {
  id?: number;
  tipo: string;
  deletado: boolean;
}

export interface Area {
  id: number;
  nom_area: string;
}

export interface ListaCampo {
  id: number;
  campo: string;
  poloId: number;
}

export interface ProjetoTipo {
  id: number;
  nom_projeto_tipo: string;
}

export interface Tarefas {
  id: number;
  id_origem: number;
  nom_atividade: string;
  responsavel_id: number;
  area_atuacao: number;
  nao_iniciar_antes_de: null;
  nao_terminar_depois_de: null;
  o_mais_breve_possivel: Boolean;
  nom_usuario_create: string | null;
  dat_usuario_create: string | null;
}
