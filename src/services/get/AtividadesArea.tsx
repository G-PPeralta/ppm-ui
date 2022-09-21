import { api, token } from "services/api";

export const getAtividadesAreaMock = [
  {
    area: "Área 1",
    pctTotalConcluido: 20,
    totalAtividades: 25,
    status: [
      {
        status: "Não Aplicável",
        qtde: 5,
      },
      {
        status: "Não Iniciado",
        qtde: 5,
      },
      {
        status: "Concluído",
        qtde: 5,
      },
      {
        status: "Em Andamento",
        qtde: 5,
      },
      {
        status: "Atrasado",
        qtde: 5,
      },
    ],
    atividades: [
      {
        atividade: "Atividade 1",
        comp_pct: 1,
        finalplanejado: "2022-09-22T03:00:00.000Z",
        id_poco: 103,
        inicioplanejado: "2022-09-21T10:00:00.984Z",
        pct_plan: "3.3",
        pct_real: 70,
        qtddias: 1,
        sonda: "PIR-12",
      },
      {
        atividade: "Atividade 2",
        comp_pct: 1,
        finalplanejado: "2022-09-22T03:00:00.000Z",
        id_poco: 103,
        inicioplanejado: "2022-09-21T10:00:00.984Z",
        pct_plan: "3.3",
        pct_real: 70,
        qtddias: 1,
        sonda: "PIR-12",
      },
      {
        atividade: "Atividade 3",
        comp_pct: 1,
        finalplanejado: "2022-09-22T03:00:00.000Z",
        id_poco: 103,
        inicioplanejado: "2022-09-21T10:00:00.984Z",
        pct_plan: "3.3",
        pct_real: 70,
        qtddias: 1,
        sonda: "PIR-12",
      },
    ],
  },
  {
    area: "Área 2",
    pctTotalConcluido: 40,
    totalAtividades: 46,
    status: [
      {
        status: "Não Aplicável",
        qtde: 0,
      },
      {
        status: "Não Iniciado",
        qtde: 13,
      },
      {
        status: "Concluído",
        qtde: 10,
      },
      {
        status: "Em Andamento",
        qtde: 20,
      },
      {
        status: "Atrasado",
        qtde: 3,
      },
    ],
    atividades: [
      {
        atividade: "Atividade 1",
        comp_pct: 1,
        finalplanejado: "2022-09-22T03:00:00.000Z",
        id_poco: 103,
        inicioplanejado: "2022-09-21T10:00:00.984Z",
        pct_plan: "3.3",
        pct_real: 70,
        qtddias: 1,
        sonda: "PIR-12",
      },
      {
        atividade: "Atividade 2",
        comp_pct: 1,
        finalplanejado: "2022-09-22T03:00:00.000Z",
        id_poco: 103,
        inicioplanejado: "2022-09-21T10:00:00.984Z",
        pct_plan: "3.3",
        pct_real: 70,
        qtddias: 1,
        sonda: "PIR-12",
      },
      {
        atividade: "Atividade 3",
        comp_pct: 1,
        finalplanejado: "2022-09-22T03:00:00.000Z",
        id_poco: 103,
        inicioplanejado: "2022-09-21T10:00:00.984Z",
        pct_plan: "3.3",
        pct_real: 70,
        qtddias: 1,
        sonda: "PIR-12",
      },
    ],
  },
];

export async function getAtividadesArea(id: string | undefined): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(`/????????/${id}`, token());

  return { data, status };
}
