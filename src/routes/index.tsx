// CRIADO EM: 10/06/2022
// AUTOR:Alexander
// DESCRIÇÃO DO ARQUIVO: Rotas públicas e privadas.

import { useAuth } from "hooks/useAuth";

import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

export function MainRoutes() {
  const { signed } = useAuth();
  return signed ? <PrivateRoutes /> : <PublicRoutes />;
}
