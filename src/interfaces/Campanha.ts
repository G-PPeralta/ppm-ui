export interface Poco {
  id_campanha: number;
  id: number;
  id_poco: number;
  sonda: number;
  poco: number;
  inicioplanejado: number;
  finalplanejado: number;
  pct_plan: number;
  pct_real: number;
  comp_pct: number;
}
export interface Campanha {
  sonda: string;
  id_campanha: number;
  pocos: Poco[];
}
