import { Fornecedor } from "interfaces/Services";

import { api } from "services/api";

export async function getFornecedor(): Promise<{
  data: Fornecedor[];
  status: number;
}> {
  const { data, status } = await api.get("/fornecedores", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("@Origem:token")}`,
    },
  });

  return { data, status };
}
