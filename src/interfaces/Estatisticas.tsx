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
