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
  pct_plan: number,
  comp_pct: number,
  pct_real: number
) {
  if (pct_plan === 0 && comp_pct === 0) {
    return statusProjeto["1"].color;
  } else if (comp_pct === 0 || comp_pct < pct_plan) {
    return statusProjeto["4"].color;
  } else if (comp_pct === 1) {
    return statusProjeto["3"].color;
  } else if (pct_real >= 100) {
    return statusProjeto["2"].color;
  }
}
