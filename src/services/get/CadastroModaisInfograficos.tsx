import { api, token } from "services/api";

export async function getSondas(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/campanha", token());

  return { data, status };
}

export async function getPocos(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/poco", token());

  return { data, status };
}

export async function getProjetosTipo(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/projeto-intervencao", token());

  return { data, status };
}

export async function getResponsaveis(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/responsavel", token());

  return { data, status };
}

export async function getArea(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/areas", token());

  return { data, status };
}

export const cadastroProjetoTipoPayload = [
  {
    nomeUsuarioCreate: "Eduardo Muchak",
    nome: "Projeto Tipo 1",
    observacoes: "Observações do Projeto Tipo 1",
    atividades: [
      {
        id: 1,
        area: "Área 1",
        tarefa: "Tarefa 1",
        dias: 10,
        precedentes: [
          {
            id: 1,
            nome: "Tarefa 1",
          },
          {
            id: 2,
            nome: "Tarefa 2",
          },
          {
            id: 3,
            nome: "Tarefa 3",
          },
        ],
      },
    ],
  },
];

export const cadastroAtividadePayload = [
  {
    nomeUsuarioCreate: "Eduardo Muchak",
    idOrigem: "CIP01",
    nome: "Atividade 1",
    responsavel: {
      nome: "Eduardo Bortolotti",
      area: "Gestão",
    },
    restricao: {
      naoIniciarAntesDe: false,
      dataInicio: "2021-01-01",
      naoTerminarDepoisDe: false,
      dataFim: "2021-01-31",
      oMaisBrevePossivel: true,
    },
    precedentes: [
      {
        id: 1,
        area: "Área 1",
        tarefa: "Tarefa 1",
        dias: 10,
      },
    ],
    observacoes: "Observações da Atividade 1",
  },
];

export const cadastroNovaIntervencaoPayload = [
  {
    nomeUsuarioCreate: "Eduardo Muchak",
    pocoId: 1,
    campoId: 1,
    sondaId: 1,
    dataInicioPrevista: "2021-01-01",
    projetoTipo: {
      id: 1,
      nome: "Projeto Tipo 1",
    },
    observacoes: "Observações da Intervenção 1",
    atividades: [
      {
        area: "Área 1",
        tarefa: "Tarefa 1",
        dias: 10,
        responsavel: {
          id: 1,
          nome: "Eduardo Bortolotti",
        },
        precedentes: [
          {
            id: 1,
            nome: "Tarefa 1",
          },
          {
            id: 2,
            nome: "Tarefa 2",
          },
        ],
      },
    ],
  },
];
