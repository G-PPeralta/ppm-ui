export interface PorCadaIntervencao {
  key: string;
  Manutenção: number;
  "Recurso Origem": number;
  "Recurso Cia": number;
  "Condições Climáticas": number;
  "Informações Técnicas": number;
  "Aguardando Outros": number;
}

export interface TempoTotal {
  tempoTotal: string;
  hrs_recursos_origem: string;
  hrs_recursos_cia: string;
  hrs_mudanca_climatica: string;
  hrs_info_tecnicas: string;
  hrs_hrs_outros: string;
  intervencao: [
    {
      id: number;
      status: string;
      color: string;
    }
  ];
}

export interface Intervenções {
  id: number;
  status: string;
  color: string;
}
