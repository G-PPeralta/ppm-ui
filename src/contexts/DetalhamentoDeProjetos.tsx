// CRIADO EM: 10/11/2022
// AUTOR:Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Context hook - Detalhamento de projetos.

import { createContext, useContext } from "react";

import { useQuery } from "@tanstack/react-query";

import { getAreaResponsavel } from "services/get/Projetos";

const DetalhamentoProjetoContext = createContext<any>({} as any);

export const DetalhamentoProjetoProvider = ({ children }: any) => {
  const reqGetAreaResponsavel = useQuery({
    queryKey: ["area-responsavel"],
    queryFn: getAreaResponsavel,
  });

  const value = {
    areaResponsavel: {
      isLoading: reqGetAreaResponsavel.isLoading,
      error: reqGetAreaResponsavel.error,
      data: reqGetAreaResponsavel.data,
    },
  };

  return (
    <DetalhamentoProjetoContext.Provider value={value}>
      {children}
    </DetalhamentoProjetoContext.Provider>
  );
};

export function useDetalhamentoProjeto() {
  const context = useContext(DetalhamentoProjetoContext);
  return context;
}
