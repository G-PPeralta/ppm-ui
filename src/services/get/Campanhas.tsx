// CRIADO EM: 27/09/2022
// AUTOR: Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de delete vinculada(s) à tela de Campanhas.

import { api, token } from "services/api";

export const campanhasMock = [
  {
    sonda: "PIR-999",
    intervencoes: [
      {
        id: 1,
        poco: "ALS-26",
        areaAtuacao: "Área de Atuação 1",
        atividades: [
          {
            atividade: "Atividade 1",
            responsavel: "Responsável 1",
            dataInicio: "2021-07-01",
            dataFim: "2021-07-01",
            status: "Em andamento",
            pct_plan: "0.6",
            pct_real: "49.7",
          },
        ],
        pct_plan: "0.6",
        pct_real: "49.7",
        status: "Em andamento",
      },
      {
        id: 2,
        poco: "ALS-28",
        areaAtuacao: "Área de Atuação 1",
        atividades: [
          {
            atividade: "Atividade 2",
            responsavel: "Responsável 5",
            dataInicio: "2021-07-01",
            dataFim: "2021-07-01",
            status: "Em andamento",
            pct_plan: "0.6",
            pct_real: "49.7",
          },
        ],
        pct_plan: "0.6",
        pct_real: "49.7",
        status: "Em andamento",
      },
      {
        id: 3,
        poco: "ALS-90",
        areaAtuacao: "Área de Atuação 2",
        atividades: [
          {
            atividade: "Atividade 1",
            responsavel: "Responsável 2",
            dataInicio: "2021-07-01",
            dataFim: "2021-07-01",
            status: "Em andamento",
            pct_plan: "0.6",
            pct_real: "49.7",
          },
        ],
        pct_plan: "0.6",
        pct_real: "49.7",
        status: "Em andamento",
      },
      {
        id: 45,
        poco: "ALS-34",
        areaAtuacao: "Área de Atuação 1",
        atividades: [
          {
            atividade: "Atividade 4",
            responsavel: "Responsável 2",
            dataInicio: "2021-07-01",
            dataFim: "2021-07-01",
            status: "Concluído",
            pct_plan: "90.6",
            pct_real: "100.00",
          },
        ],
        pct_plan: "0.6",
        pct_real: "49.7",
        status: "Em andamento",
      },
    ],
  },
  {
    sonda: "PIR-888",
    intervencoes: [
      {
        id: 1,
        poco: "PIR-26",
        areaAtuacao: "Área de Atuação 2",
        atividades: [
          {
            atividade: "Atividade 2",
            responsavel: "Responsável 2",
            dataInicio: "2021-07-01",
            dataFim: "2021-07-01",
            status: "Em andamento",
            pct_plan: "0.6",
            pct_real: "49.7",
          },
        ],
        pct_plan: "0.6",
        pct_real: "49.7",
        status: "Em andamento",
      },
      {
        id: 2,
        poco: "PIR-12",
        areaAtuacao: "Área de Atuação 1",
        atividades: [
          {
            atividade: "Atividade 1",
            responsavel: "Responsável 2",
            dataInicio: "2021-07-01",
            dataFim: "2021-07-01",
            status: "Em andamento",
            pct_plan: "0.6",
            pct_real: "49.7",
          },
        ],
        pct_plan: "0.6",
        pct_real: "49.7",
        status: "Em andamento",
      },
      {
        id: 3,
        poco: "ALS-90",
        areaAtuacao: "Área de Atuação 2",
        atividades: [
          {
            atividade: "Atividade 1",
            responsavel: "Responsável 2",
            dataInicio: "2021-07-01",
            dataFim: "2021-07-01",
            status: "Em andamento",
            pct_plan: "0.6",
            pct_real: "49.7",
          },
        ],
        pct_plan: "0.6",
        pct_real: "49.7",
        status: "Em andamento",
      },
      {
        id: 45,
        poco: "ALS-34",
        areaAtuacao: "Área de Atuação 1",
        atividades: [
          {
            atividade: "Atividade 4",
            responsavel: "Responsável 2",
            dataInicio: "2021-07-01",
            dataFim: "2021-07-01",
            status: "Concluído",
            pct_plan: "90.6",
            pct_real: "100.00",
          },
        ],
        pct_plan: "0.6",
        pct_real: "49.7",
        status: "Em andamento",
      },
    ],
  },
];

export function filtrarIntervencoes(
  campanhas: any,
  sonda: any,
  poco: any = 0,
  areaAtuacao: any = 0,
  atividade: any = 0,
  responsavel: any = 0,
  dataInicio: any = 0,
  dataFim: any = 0,
  statusIntervencao: any = 0
) {
  switch (true) {
    case sonda:
      return campanhas.filter(
        (intervencao: any) => intervencao.sonda === sonda
      );
    case poco:
      return campanhas.filter((intervencao: any) => intervencao.poco === poco);
    case areaAtuacao:
      return campanhas.filter(
        (intervencao: any) => intervencao.areaAtuacao === areaAtuacao
      );
    case atividade:
      return campanhas.filter(
        (intervencao: any) => intervencao.atividade === atividade
      );
    case responsavel:
      return campanhas.filter(
        (intervencao: any) => intervencao.responsavel === responsavel
      );
    case dataInicio:
      return campanhas.filter(
        (intervencao: any) => intervencao.dataInicio === dataInicio
      );
    case dataFim:
      return campanhas.filter(
        (intervencao: any) => intervencao.dataFim === dataFim
      );
    case statusIntervencao:
      return campanhas.filter(
        (intervencao: any) => intervencao.status === statusIntervencao
      );
    default:
      return campanhas;
  }
}

export async function getGanttCampanhaData(id: number): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(`/gantt/campanha/${id}`, token());

  return { data, status };
}

export async function getGanttCampanhaAtividades(id: number): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(`/gantt/atividades/${id}`, token());

  return { data, status };
}

export async function getCampanhaDataInicio(id: number): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(`/campanha/datas/${id}`, token());

  return { data, status };
}
