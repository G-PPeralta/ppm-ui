// CRIADO EM: 10/06/2022
// AUTOR: ALEXANDRE BRITO
// DESCRIÇÃO DO ARQUIVO: ARQUIVO RESPONSÁVEL POR INICIAR A APLICAÇÃO COM AS ROTAS PRINCIPAIS, PROVIDERS E CONFIGURAÇÕES GLOBAIS

import Moment from "react-moment";
import { BrowserRouter } from "react-router-dom";

import moment from "moment";
import "moment/locale/pt";

import { AuthProvider } from "contexts/Auth";
import { ToastProvider } from "contexts/Toast";

import { MainRoutes } from "./routes";

import "./App.css";

Moment.globalMoment = moment;

Moment.globalLocale = "pt";
Moment.globalLocal = true;

export function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <AuthProvider>
          <MainRoutes />
        </AuthProvider>
      </BrowserRouter>
    </ToastProvider>
  );
}
