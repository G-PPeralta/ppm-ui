// CRIADO EM: --
// AUTOR:Não é possível apontar o criador, uma vez que cada rota foi feita pelo desenvolvedor da tela em questão
// DESCRIÇÃO DO ARQUIVO: Rotas públicas vinculadas às telas do sistema.

import { Routes, Route } from "react-router-dom";

import { ForgotPassword } from "pages/ForgotPassword";
import { Login } from "pages/Login";
import { NotFound } from "pages/NotFound";
import { Register } from "pages/Register";
import { ResetPassword } from "pages/ResetPassword";

export function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
