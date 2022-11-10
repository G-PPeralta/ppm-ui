export interface Operacao {
  id: number;
  id_origem: string;
  nom_operacao: string;
  responsavel_id: number;
  area_id: number;
  nao_iniciar_antes_de: null;
  nao_terminar_depois_de: null;
  o_mais_breve_possivel: boolean;
  nom_usu_create: string;
  dat_usu_create: string;
}

export interface LicaoAprendida {
  id: number;
  licao_aprendida: string;
  data: string;
  acao_e_recomendacao: string;
}

export interface Ocorrencia {
  id: number;
  nome_ocorrencia: string;
  horas: string;
}

export interface Anotacoes {
  cod_moc: any;
  dat_usu_create: string;
  id: number;
  id_atividade: number;
  ind_tipo_anotacao: number;
  nom_usu_create: string;
  txt_nota: string;
  url_anexo: any;
}
