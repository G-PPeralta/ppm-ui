export const statusProjeto = [
  {
    status: "Não Aplicável",
    color: "#C2561A",
  },
  {
    status: "Não Iniciado",
    color: "#585858",
  },
  {
    status: "Concluído",
    color: "#027200",
  },
  {
    status: "Em Andamento",
    color: "#0047BB",
  },
  {
    status: "Atrasado",
    color: "#BD0000",
  },
];

export function validateDate(
  pct_plan: number, // porcentagem planejada
  comp_pct: number, // comparação porcentagens
  pct_real: number // porcentagem realizada
) {
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
