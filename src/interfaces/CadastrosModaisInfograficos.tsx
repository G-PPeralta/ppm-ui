// CRIADO EM: 02/09/2022
// AUTOR: EDUARDO MUCHAK
// DESCRIÇÃO DO ARQUIVO: ARQUIVO DE INTERFACES DOS MODAIS DE CADASTRO DA PÁGINA DO MÓDULO INFOGRÁFICOS

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
  tipo: string;
}

export interface AtividadesProjetoTipo {
  atividade_id_origem: string;
  area_id: number;
  tarefa_id: number;
  qtde_dias: number;
  tipo_precedentes: string;
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
  area_atuacao?: string | number;
  area_atuacao_id?: number;
  nao_iniciar_antes_de?: {
    data: string;
    checked: Boolean | null;
  };
  nao_terminar_depois_de?: {
    data: string;
    checked: Boolean | null;
  };
  o_mais_breve_possivel?: Boolean | null;
  fase_id?: number;
}

export interface CadastroPoco {
  poco: string;
}

export interface ListaPoco {
  id: number;
  nom_poco: string;
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
  id_projeto: string;
  dsc_comentario: string;
  nom_usu_create: string | undefined;
  nova_campanha: boolean;
}

export interface Reorder {
  id_campanha_original: string;
  id_campanha_destino: string;
  id_cronograma_original: string;
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

export interface Tarefa {
  id?: number;
  id_origem: string;
  nom_atividade: string;
  responsavel_id: null;
  area_atuacao: null;
  nao_iniciar_antes_de: Date;
  nao_terminar_depois_de: Date;
  o_mais_breve_possivel: null;
  nom_usu_create: null;
  dat_usuario_create: null;
  ind_fase: number;
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
  ind_fase?: number;
}

export interface Pocos {
  id: number;
  id_polo: number;
  id_local: number;
  nom_poco: string;
  nom_usu_create: null;
  dat_usu_create: null;
  nom_usu_edit: null;
  dat_usu_edit: null;
  nom_usu_erase: null;
  dat_usu_erase: null;
}
