// CRIADO EM: 21/11/2022
// AUTOR: EDUARDO MUCHAK
// DESCRIÇÃO DO ARQUIVO: ARQUIVO DE INTERFACES DE FERIADOS

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

export interface Feriados {
  id?: number;
  id_projeto: number;
  dia_feriado: number;
  mes_feriado: number;
  ano_feriado: string;
  ind_global: number;
  nome_feriado: string;
  nome_projeto: string;
}

export interface Filtro {
  id: number;
  id_projeto: number;
  dia_feriado: number;
  mes_feriado: number;
  ano_feriado: string;
  ind_global: number;
  nome_feriado: string;
  nome_projeto: string;
}

export interface initialValues {
  id?: number;
  data_completa: Date;
  id_projeto: number;
  dia_feriado: number;
  mes_feriado: number;
  ano_feriado: string;
  ind_global: number;
  nome_feriado: string;
  nom_usu_create: string | undefined;
  aplicar_todos_os_anos: boolean;
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
