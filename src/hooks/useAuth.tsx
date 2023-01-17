// CRIADO EM: 14/06/2022
// AUTOR: Alexander
// DESCRIÇÃO DO ARQUIVO: Hook com funções para autenticação no sistema.

import { useContext } from "react";

import { AuthContext } from "contexts/Auth";

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
