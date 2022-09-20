import { Budget } from "models/Budget.model";

// import { api, token } from "services/api";

export async function getBudgets(): Promise<Budget[]> {
  // const uri = "";

  // const { data } = await api.get<Budget[]>(uri, token());

  const data = [
    {
      id: 1,
      item: "1",
      projeto: "Lion d",
      planejado: 200,
      realizado: 500,
      gap: 25,
      descricao: "dafdfadfafddf",
      filhos: [
        {
          id: 4,
          item: "1.1",
          projeto: "Olaf",
          planejado: 100,
          realizado: 300,
          gap: 50,
          descricao: "da 34532fffdfadfafddf",
        },
        {
          id: 5,
          item: "1.2",
          projeto: "head hat",
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
      projeto: "Lala",
      planejado: 200,
      realizado: 500,
      gap: 50,
      descricao: "da 34532fffdfadfafddf",
    },
    {
      id: 3,
      item: "3",
      projeto: "Cogumelo",
      planejado: 200,
      realizado: 500,
      gap: 25,
      descricao: "adfa  7s8f4sagfdaadfafddf",
    },
  ];
  return data;
}
