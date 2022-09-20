import { Budget } from "models/Budget.model";

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
        id: 1,
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
            id: 1,
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
            id: 1,
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
