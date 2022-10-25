export interface LoginProps {
  email: string;
  senha: string;
}

export interface User {
  id: number;
  areaAtuacao: string;
  email: string;
  nome: string;
  perfil: string;
  telefone: string;
}

export interface ResponseLogin {
  validatedUser?: boolean;
  user?: User;
  access_token?: string;
  refresh_token?: string;
}

export interface RegisterProps {
  id?: number;
  areaAtuacao: string;
  email: string;
  nome: string;
  perfil?: string;
  telefone: string;
}

export interface ResetPasswordProps {
  email: string;
}

export interface ResponseResetPassword {
  message: string;
}

export interface ResponseRoles {
  id: number;
  role: string;
  nome_role: string;
}

export interface ResponseAvatar {
  avatar: string;
}

export interface ResponsePermissions {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  areaAtuacao: string;
  avatar: string;
  role_id: number;
  nome_role: string;
}

export interface ResponseUserPending {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  areaAtuacao: string;
  avatar: string;
  nome_role: string;
}

export interface ResponsavelProjeto {
  nomeResponsavel: string;
  tipoResponsavel: number;
}

export interface RegisterProjectProps {
  nomeProjeto: string;
  descricao: string;
  valorTotalPrevisto: number;
  classificacaoId: number;
  solicitanteId: number;
  justificativa: string;
  poloId: number;
  dataInicio: string;
  dataFim: string;
  dataInicioReal: string;
  dataFimReal: string;
  prioridadeId: number;
  complexidadeId: number;
  localId: number;
  divisaoId: number;
  statusId: number;
  gateId: number;
  tipoProjetoId: number;
  // demandaId: number;
  comentarios: string;
  responsavel_id: number;
  coordenador_id: number;
  elemento_pep: string;
}

export interface GanttPayload {
  nome_projeto: string;
  data_inicio: Date;
  data_fim: Date;
  microatividade_id: number;
  nome_atividade: string;
  item: string;
  macroatividade_id: number;
  macroatividade_nome: string;
  macroatividade_item: number;
  duracao: number;
  progresso: number;
}

export interface GanttProps {
  TaskID: number;
  Item?: string;
  TaskName: string;
  StartDate?: string;
  Duration?: number;
  Progress?: number;
  subtasks?: GanttProps[];
}
export interface GanttMacroDto {
  macroatividade_id: number;
  macroatividade_item?: string;
  macroatividade_nome: string;
  duracao?: number;
  progresso?: number;
  dat_ini_real: string;
  dat_fim_real: string;
  dat_ini_plan: string;
  dat_fim_plan: string;
  item?: string;
  microatividade_id?: number;
  nome_atividade?: string;
  nome_projeto?: string;
  micro?: GanttMacroDto[];
}

export interface IGantt {
  nomeProjeto: string;
  macroatividades: GanttMacroDto[];
}

export interface TipoResponsavel {
  id: number;
  tipo_responsavel: string;
}

export interface Classificacao {
  id: number;
  classificacao: string;
  deletado: boolean;
}

export interface Polo {
  id: number;
  polo: string;
  deletado: boolean;
}

export interface Solicitante {
  id: number;
  solicitante: string;
  deletado: boolean;
}

export interface Prioridade {
  id: number;
  prioridade: string;
  deletado: boolean;
}

export interface Complexidade {
  id: number;
  complexidade: string;
  deletado: boolean;
}

export interface LocalProjeto {
  id: number;
  local: string;
  deletado: boolean;
}

export interface Divisao {
  id: number;
  divisao: string;
  deletado: boolean;
}

export interface StatusProjeto {
  id: number;
  status: string;
  deletado: boolean;
}

export interface Gate {
  id: number;
  gate: string;
  deletado: boolean;
}

export interface TipoProjeto {
  id: number;
  tipo: string;
  deletado: boolean;
}

export interface Demanda {
  id: number;
  demanda: string;
  deletado: boolean;
}

export interface TotalOrcamento {
  totalOrcamento: number;
}

export interface TotalRealizado {
  totalRealizado: number;
}

export interface TotalNaoPrevisto {
  totalRealizado: number;
}

export interface AreasDemandadasPorMes {
  month: number;
  sms: number;
  regulatorio: number;
  operacao: number;
  outros: number;
}

export interface InfoFinanceira {
  planejado: number;
  realizado: number;
  naoPrevisto: number;
  remanescente: number;
  pctRealizado: number;
  pctRemanescente: number;
  pctNaoPrevisto: number;
}

export interface CpiSpi {
  cpi: number;
  spi: number;
}

export interface ComplexidadesPrioridades {
  alta: number;
  media: number;
  baixa: number;
  nula: number;
}

export interface ProjetosPorStatus {
  id: number;
  status: string;
  qtd: number;
}

export interface TotalDeProjetos {
  complexidades: ComplexidadesPrioridades;
  prioridades: ComplexidadesPrioridades;
  projetosPorStatus: ProjetosPorStatus[];
  totalProjetos: number;
}

export interface ProjetosList {
  id: number;
  nomeProjeto: string;
  descricao?: string;
  justificativa?: string;
  valorTotalPrevisto?: number;
  dataInicio: Date;
  dataFim: Date;
  poloId: number;
  localId: number;
  solicitanteId: number;
  classificacaoId?: number;
  divisaoId: number;
  gateId?: number;
  tipoProjetoId: number;
  // demandaId?: number;
  statusId: number;
  prioridadeId: number;
  complexidadeId: number;
  dataInicioReal?: Date;
  dataFimReal?: Date;
  comentarios?: string;
  deletado: boolean;
  item: number;
  // numero: number;
  responsavel_id?: number;
  coordenador_id?: number;
  elemento_pep: string;
}

export interface ProjetosConfig {
  id: number;
  nome_projeto: string;
  nome_responsavel: string;
  coordenador_nome: string;
  descricao: string;
  justificativa: string;
  valor_total_previsto: number;
  data_inicio: Date;
  data_fim?: Date;
  polo_id?: number;
  local_id: number;
  solicitante_id: number;
  classificacao_id: number;
  divisao_id: number;
  gate_id: number;
  tipo_projeto_id: number;
  demanda_id?: number;
  status_id: number;
  prioridade_id: number;
  complexidade_id: number;
  dataInicio_real: Date | null;
  dataFim_real: Date | null;
  comentarios: string;
  deletado: boolean;
  item?: number;
  numero?: number;
  responsavel_id: number;
  coordenador_id: number;
  elemento_pep: string;
  nom_usu_create: string;
  polo: string;
  local: string;
  solicitante: string;
  classificacao: string;
  divisao: string;
  gate: string;
  tipo: string;
  status: string;
}

export interface ProjetosInfo {
  id: number;
  nomeProjeto: string;
  valorTotalPrevisto: number;
  cpi?: any;
  spi?: any;
}

export interface RegistroResponsavel {
  id?: number;
  nome: string;
}

export interface Responsavel {
  nome: string;
}

export interface ResponsavelRetorno {
  id: number;
  nome: string;
}

export interface RegistroCoordenador {
  id?: number;
  coordenadorNome: string;
}

export interface Coordenador {
  coordenadorNome: string;
}

export interface CoordenadorRetorno {
  id_coordenador: number;
  coordenadorNome: string;
}

export interface AtividadeLista {
  id: number;
  tarefa: string;
  dias?: number;
}

export interface Tarefa {
  id: number;
  tarefa: string;
}

export interface Fornecedor {
  id?: number;
  nomefornecedor: string;
  fornecedor: string;
  orcamento: number;
  realizado: number;
  responsavel: string;
  descricao: string;
}

export interface LicoesAprendidas {
  id: number;
  id_projeto: number;
  id_categoria: number;
  data: string;
  licao_aprendida: string;
  acao_e_recomendacao: string;
  user: string;
}

export interface LicoesAprendidasPayload {
  id_atividade: number;
  data?: Date;
  licao_aprendida: string;
  acoes_e_recomendacoes: string;
  user: string | undefined;
}

export interface Categorias {
  id: number;
  nom_categoria: string;
}

export interface Opcao {
  id?: number;
  nom_opcao: string;
  opcao_id: number;
}

export interface ProjetosRanking {
  Benefício: Opcao[];
  Regulatório: Opcao[];
  Operação: Opcao[];
  Prioridade: Opcao[];
  Complexidade: Opcao[];
  "Estratégia para o Negócio": Opcao[];
}

export interface ProjetosRankingPayload {
  id_projeto: number;
  beneficio: {
    opcao_id: string;
    id_ranking: number;
  };
  regulatorio: {
    opcao_id: string;
    id_ranking: number;
  };
  operacao: {
    opcao_id: string;
    id_ranking: number;
  };
  prioridade: {
    opcao_id: string;
    id_ranking: number;
  };
  complexidade: {
    opcao_id: string;
    id_ranking: number;
  };
  estrategia: {
    opcao_id: string;
    id_ranking: number;
  };
  dsc_comentario: string;
  nom_usu_create: string;
}

export interface ProjetoProgresso {
  fn_cron_calc_pct_real: string;
}

export interface StatisticsGanttProps {
  TaskID: number | undefined;
  TaskName: string | undefined;
  StartDate?: Date | string | null | undefined;
  EndDate?: Date | string | null | undefined;
  BaselineStartDate?: Date | string | null | undefined;
  BaselineEndDate?: Date | string | null | undefined;
  Duration?: number;
  BaselineDuration?: number;
  Progress?: number | null | undefined;
  subtasks?: StatisticsGanttProps[];
  // ParentID: number | null | undefined;
}

export interface StatisticsTable {
  id_atividade: number;
  nome_atividade: string;
  custo?: string;
  inicio_planejado?: string | null;
  fim_planejado?: string | null;
  hrs_totais?: string | null;
  hrs_reais?: string | null;
  inicio_real?: string | null;
  fim_real?: string | null;
  pct_plan?: string | null;
  nome_responsavel?: string | null;
}

export interface StatisticsTableData {
  sonda: string;
  id_sonda: number;
  poco: string;
  id_poco: number;
  dat_inicio?: string;
  dat_final?: string;
  pct_real?: number;
  atividades: StatisticsTable[];
  max?: number;
  min?: number;
  med?: number;
  dp?: number;
  use?: string;
}

export interface TarefaAtividade {
  id?: number;
  nome_tarefa: string;
  data_tarefa: Date;
  atividade_relacionada: string;
  descricao_tarefa: string;
  responsavel?: string;
  nom_usu_create?: string;
  status?: number;
  projeto_id: number;
}

export interface TarefaAtividadeComId {
  id: number;
  nome_tarefa: string;
  data_tarefa: Date;
  atividade_relacionada: string;
  descricao_tarefa: string;
  nom_usu_create?: string;
  status?: number;
  responsavel: string;
  projeto_id: number;
}

export interface AtividadesProjeto {
  id: number;
  nom_atividade: string;
  tipoAtividade: string;
  deletado: boolean;
  macroatividadeId: number;
  item: string;
  temporario: boolean;
}
