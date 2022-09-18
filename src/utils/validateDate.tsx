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

export function validateDate(date: any) {
  const dateTime = new Date().getTime();
  const initialDate = new Date(date).getTime();
  // console.log(date);

  // console.log('dateTime', dateTime);
  // console.log('initialDate', initialDate);

  if (dateTime < initialDate) {
    return statusProjeto["1"].color;
  }
  if (dateTime > initialDate) {
    return statusProjeto["3"].color;
  } else {
    return statusProjeto["0"].color;
  }
}
