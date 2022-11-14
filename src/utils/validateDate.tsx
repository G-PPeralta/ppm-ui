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
  {
    id: 6,
    status: "Conflito de Cronograma",
    color: "#FFEA00",
    texto: "#000000",
  },
];

export function validateDate(
  pct_plan: number, // porcentagem planejada
  comp_pct: number, // comparação porcentagens
  pct_real: number, // porcentagem realizada
  ind_alerta?: number // indicador de alerta
) {
  switch (true) {
    case ind_alerta === 1:
      return statusProjeto[5].color; // conflito de cronograma
      break;

    case pct_plan > pct_real:
      return statusProjeto[3].color; // atrasado
      break;

    case pct_real === 100:
      return statusProjeto[4].color; // concluído
      break;

    case pct_real === 100 && comp_pct === 1:
      return statusProjeto[4].color; // concluído
      break;

    case pct_real > 0 && pct_real < 100:
      return statusProjeto[1].color; // em andamento
      break;

    case pct_plan === 0 && pct_real === 0:
      return statusProjeto[0].color; // não iniciado
      break;

    default: // não aplicável
      return statusProjeto[2].color;
      break;
  }
}
