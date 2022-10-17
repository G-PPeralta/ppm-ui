// import { FornecedoreDto } from "pages/ListaDosFornecedores";

import { api } from "services/api";

export async function getFornecedor(): Promise<{
  data: any[];
  status: number;
}> {
  const { data, status } = await api.get("/fornecedores", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("@Origem:token")}`,
    },
  });

  return { data, status };
}
