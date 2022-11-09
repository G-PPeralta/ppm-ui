import { Routes, Route } from "react-router-dom";

import { ActivitiesPrecedents } from "pages/ActivitiesPrecedents";
import { ActivitiesRegistration } from "pages/ActivitiesRegistration";
import { ActivitiesSchedule } from "pages/ActivitiesSchedule";
import { BudgetDetail } from "pages/BudgetDetail";
import { Budgets } from "pages/Budgets";
import { CadastrarFornecedor } from "pages/CadastrarFornecedor";
import CadastrarProjeto from "pages/CadastrarProjeto";
import { CentroDeCustoProjetos } from "pages/CentroDeCustoProjetos";
import DetalhamentoProjeto from "pages/DetalhamentoProjeto";
import { FinanceiroProjetos } from "pages/FinanceiroProjetos";
import { GráficosEstatisticos } from "pages/GraficosEstatisticos";
import { Home } from "pages/Home";
import { Import } from "pages/Import";
import { Infographics } from "pages/Infographics";
import { LicoesAprendidasProjetos } from "pages/LicoesAprendidas";
import { Fornecedores } from "pages/ListaDosFornecedores";
import { Lookahead } from "pages/Lookahead";
import { LookaheadDetalhe } from "pages/Lookahead/Detalhe";
import { NotFound } from "pages/NotFound";
import { Permissions } from "pages/Permissions";
import { PermissionsList } from "pages/PermissionsList";
import { Priorizacao } from "pages/Priorizacao";
import { PriorizacaoDiretores } from "pages/PriorizacaoDiretores";
import { Profile } from "pages/Profile";
import { Projects } from "pages/Projects";
import { Reports } from "pages/Reports";
import { Settings } from "pages/Settings";
import { ShareRegister } from "pages/ShareRegister";
import { Statistics } from "pages/Statistics";
import { StatisticsGantt } from "pages/StatisticsGantt";
// import { UploadSheet } from "pages/UploadSheet";
import { Usuarios } from "pages/Usuarios";
import VisaoPorArea from "pages/VisaoPorArea";

export function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/graficos" element={<GráficosEstatisticos />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/projetos/cadastro" element={<CadastrarProjeto />} />
      <Route path="/cadastrar-fornecedor" element={<CadastrarFornecedor />} />
      <Route
        path="/activities-registration"
        element={<ActivitiesRegistration />}
      />
      <Route path="/share-register" element={<ShareRegister />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/infographics" element={<Infographics />} />
      <Route path="/permissions" element={<PermissionsList />} />
      <Route path="permissions/:id" element={<Permissions />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/upload" element={<Import />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/budgets" element={<Budgets />} />
      <Route path="/budget/detail/:id" element={<BudgetDetail />} />
      <Route path="/fornecedores" element={<Fornecedores />} />
      <Route path="/detalhamento/:id" element={<DetalhamentoProjeto />} />
      <Route path="/atividade/:id" element={<ActivitiesSchedule />} />
      <Route path="/lookahead" element={<Lookahead />} />
      <Route path="/lookahead-detalhe/:id" element={<LookaheadDetalhe />} />
      <Route
        path="/infographics/atividade/:id"
        element={<ActivitiesSchedule />}
      />
      <Route
        path="/infographics/atividade/:id/precedentes"
        element={<ActivitiesPrecedents />}
      />
      <Route
        path="/infographics/atividade/:id/visao-por-area"
        element={<VisaoPorArea />}
      />
      <Route path="/licoesAprendidas" element={<LicoesAprendidasProjetos />} />
      <Route path="/estatisticas/" element={<Statistics />} />
      <Route
        path="/estatisticas/cronograma/:sonda/:poco"
        element={<StatisticsGantt />}
      />
      <Route path="/financeiro-projetos" element={<FinanceiroProjetos />} />
      <Route
        path="/financeiro-projetos/centro-custo/:id/:mes"
        element={<CentroDeCustoProjetos />}
      />
      <Route
        path="/financeiro-projetos/centro-custo/:id"
        element={<CentroDeCustoProjetos />}
      />
      <Route path="/priorizacao" element={<Priorizacao />} />
      <Route path="/priorizacao-diretores" element={<PriorizacaoDiretores />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
