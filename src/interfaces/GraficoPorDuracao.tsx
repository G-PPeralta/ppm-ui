// CRIADO EM: 12/12/2022
// AUTOR: GEOVANA AUGUSTA
// DESCRIÇÃO DO ARQUIVO: ARQUIVO DE INTERFACES DO GRAFICO POR DURAÇÃO

export interface PorDuracao {
  nom_poco: string;
  id_poco: number;
  id_sonda: number;
  hrs_media: string;
  hrs_min: string;
  hrs_max: string;
  hrs_dp: number;
  tend_duracao: number;
  key: string;
  Durações: string;
}

export interface Historico {
  nom_poco: string;
  id_poco: number;
  id_sonda: number;
  hrs_media: string;
  hrs_min: string;
  hrs_max: string;
  hrs_dp: number;
  tend_duracao: number;
}
