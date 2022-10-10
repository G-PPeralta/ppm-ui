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
