// CRIADO EM: 14/11/2022
// AUTOR: Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Função para vincular status à uma cor padrão.

export const statusProjeto = [
  {
    id: 4,
    status: "Não Iniciado",
    color: "#4B5452",
    texto: "#FEFEFE",
  },
  {
    id: 2,
    status: "Em Andamento",
    color: "#0047BB",
    texto: "#FEFEFE",
  },
  {
    id: 5,
    status: "Não Aplicável",
    color: "#A00193",
    texto: "#FEFEFE",
  },
  {
    id: 3,
    status: "Atrasado",
    color: "#B50202",
    texto: "#FEFEFE",
  },
  {
    id: 1,
    status: "Concluído",
    color: "#046700",
    texto: "#FEFEFE",
  },
];

export function validateDate(
  pct_plan: number,
  comp_pct: number,
  pct_real: number,
  finalplanejado: any,
  ind_alerta: number,
  ind_status: number
) {
  if (ind_status > 0) {
    switch (true) {
      case ind_status === 1:
        return statusProjeto[4].color;
      case ind_status === 3:
        return statusProjeto[1].color;
      case ind_status === 2:
        return statusProjeto[3].color;
      case ind_status === 4:
        return statusProjeto[0].color;
      default:
        return statusProjeto[2].color;
    }
  } else {
    switch (true) {
      case pct_real === 100:
        return statusProjeto[4].color;

      case pct_real > 0 && pct_real < 100:
        return statusProjeto[1].color;

      case pct_plan > pct_real || new Date(finalplanejado) < new Date():
        return statusProjeto[3].color;
      case pct_plan === 0 && pct_real === 0:
        return statusProjeto[0].color;
      default:
        return statusProjeto[2].color;
    }
  }
}
