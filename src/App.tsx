import Moment from "react-moment";
import { BrowserRouter } from "react-router-dom";

import moment from "moment";

import { AuthProvider } from "contexts/Auth";
import { ToastProvider } from "contexts/Toast";

import { MainRoutes } from "./routes";

import "./App.css";

Moment.globalMoment = moment;

Moment.globalLocale = "pt";
// Moment.globalTimezone = "America/Sao_Paulo";
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
