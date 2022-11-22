export interface AllFeriados {
  data_feriado: string;
  nome_feriado: string;
}

export interface Feriado {
  id?: number;
  id_projeto: number;
  dia_feriado: string;
  mes_feriado: string;
  ano_feriado: string;
  ind_global: number;
  nome_feriado: string;
}

export interface PostFeriado extends Feriado {
  nom_usu_create?: string;
  data_completa: string;
  aplicar_todos_os_anos: boolean;
}

export interface ProjetosFeriados {
  id: number;
  nome_projeto: string;
}
