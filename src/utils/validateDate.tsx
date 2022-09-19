export const statusProjeto = [
  {
    status: "Não Aplicável",
    color: "#F4DD06",
  },
  {
    status: "Não Iniciado",
    color: "#FFB400",
  },
  {
    status: "Concluído",
    color: "#059502",
  },
  {
    status: "Em Andamento",
    color: "#0047BB",
  },
  {
    status: "Atrasado",
    color: "#F40606",
  },
];

export function validateDate(
  pct_plan: number, // porcentagem planejada
  comp_pct: number, // comparação porcentagens
  pct_real: number // porcentagem realizada
) {
  // switch (true) {
  //   case pct_plan === 0 && comp_pct === 0:
  //     return statusProjeto[1].color;
  //   case pct_real === 100:
  //     return statusProjeto[2].color;
  //   case comp_pct === 1:
  //     return statusProjeto[3].color;
  //   case comp_pct < pct_plan:
  //     return statusProjeto[4].color;
  //   default:
  //     return statusProjeto[0].color;
  // }
  switch (true) {
    case pct_real === 100 && comp_pct === 1:
      return statusProjeto[2].color;
    case pct_real > 0 && pct_real < 100 && comp_pct === 1:
      return statusProjeto[3].color;
    case pct_real > pct_plan && comp_pct === 1:
      return statusProjeto[3].color;
    case pct_real < pct_plan:
      return statusProjeto[4].color;
    case pct_plan === 0:
      return statusProjeto[1].color;
    default:
      return statusProjeto[0].color;
  }
}
