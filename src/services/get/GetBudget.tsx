import { Budget, BudgetDetail } from "models/Budget.model";

// import { api, token } from "services/api";

export async function getBudgets(): Promise<Budget[]> {
  // const uri = "";

  // const { data } = await api.get<Budget[]>(uri, token());

  const data = [
    {
      id: 1,
      item: "1",
      projeto: {
        nome: "Olaf",
        id: 369,
      },
      planejado: 200,
      realizado: 500,
      gap: 25,
      descricao: "dafdfadfafddf",
      filhos: [
        {
          id: 4,
          item: "1.1",
          projeto: {
            nome: "Olaf",
            id: 369,
          },
          planejado: 100,
          realizado: 300,
          gap: 50,
          descricao: "da 34532fffdfadfafddf",
        },
        {
          id: 5,
          item: "1.2",
          projeto: {
            nome: "Olaf",
            id: 369,
          },
          planejado: 100,
          realizado: 200,
          gap: 50,
          descricao: "da 34532fffdfadfafddf",
        },
      ],
    },
    {
      id: 2,
      item: "2",
      projeto: {
        nome: "Head hat Lá",
        id: 2,
      },
      planejado: 200,
      realizado: 500,
      gap: 50,
      descricao: "da 34532fffdfadfafddf",
    },
    {
      id: 3,
      item: "3",
      projeto: {
        nome: "Cogumelo",
        id: 3,
      },
      planejado: 200,
      realizado: 500,
      gap: 25,
      descricao: "adfa  7s8f4sagfdaadfafddf",
    },
  ];
  return data;
}

export async function getBudgetDetail(): Promise<BudgetDetail[]> {
  const data = [
    {
      id: 1,
      data: "21/09/2022",
      brt: "1",
      servico: "Serviço 1",
      fornecedor: "-",
      total: 2000,
      previsto: 4000,
      realizado: 3500,
      gap: 50,
      filhos: [
        {
          id: 5,
          brt: "1.1",
          servico: "Serviço Mobilizacao",
          fornecedor: "-",
          total: 1000,
          previsto: 1000,
          realizado: 1000,
          gap: 50,
        },
        {
          id: 6,
          brt: "1.2",
          servico: "DTM POÇOS",
          fornecedor: "-",
          total: 1000,
          previsto: 3000,
          realizado: 2500,
          gap: 50,
        },
      ],
    },
    {
      id: 2,
      data: "22/09/2022",
      brt: "2",
      servico: "Serviço 2",
      fornecedor: "-",
      total: 5000,
      previsto: 6000,
      realizado: 4000,
      gap: 50,
      filhos: [
        {
          id: 3,
          brt: "2.1",
          servico: "Taxa Opranmdo",
          fornecedor: "-",
          total: 2000,
          previsto: 3000,
          realizado: 2000,
          gap: 50,
        },
        {
          id: 4,
          brt: "2.2",
          servico: "DTM POÇOS",
          fornecedor: "-",
          total: 3000,
          previsto: 3000,
          realizado: 2000,
          gap: 50,
        },
      ],
    },
  ];

  return data;
}