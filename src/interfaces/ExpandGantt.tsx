export interface AtividadeGantt {
  id_filho: number;
  id_atividade: number;
  fase: string;
  hoje: string;
  inicioplanejado: string;
  finalplanejado: string;
  qtddias: string;
  atividade: string;
  nom_responsavel: string;
  nom_area: string;
  sonda: string;
  comentario: string;
  pct_plan: string;
  pct_real: number;
  id_poco: number;
  inicioreal: string;
  fimreal: string;
  inicioplanejadohrs: string;
  finalplanejadohrs: string;
  ind_status: number;
  comp_pct: number;
  precedentesId: [
    {
      precedente_id: number;
    }
  ];
}
