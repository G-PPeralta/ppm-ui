import { createContext, useContext } from "react";

import { useQuery } from "@tanstack/react-query";

import { getAreaResponsavel } from "services/get/Projetos";

const DetalhamentoProjetoContext = createContext<any>({} as any);

export const DetalhamentoProjetoProvider = ({ children }: any) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["area-responsavel"],
    queryFn: getAreaResponsavel,
  });

  const value = {
    isLoading,
    error,
    data,
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
