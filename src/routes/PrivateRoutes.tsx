import { Routes, Route } from "react-router-dom";

import { ActivitiesPrecedents } from "pages/ActivitiesPrecedents";
import { ActivitiesRegistration } from "pages/ActivitiesRegistration";
import { ActivitiesSchedule } from "pages/ActivitiesSchedule";
import { BudgetDetail } from "pages/BudgetDetail";
import { Budgets } from "pages/Budgets";
import DetalhamentoProjeto from "pages/DetalhamentoProjeto";
import { BudgetDetail2 } from "pages/FinanceiroDetalhamentoProjetos";
import { FinanceiroProjetos } from "pages/FinanceiroProjetos";
import { GanttPage } from "pages/Gantt";
import { GráficosEstatisticos } from "pages/GraficosEstatisticos";
import { Home } from "pages/Home";
import { Infographics } from "pages/Infographics";
import { LicoesAprendidasProjetos } from "pages/LicoesAprendidas";
import { Fornecedores } from "pages/ListaDosFornecedores";
import { Lookahead } from "pages/Lookahead";
import { LookaheadDetalhe } from "pages/Lookahead/Detalhe";
import { NotFound } from "pages/NotFound";
import { Permissions } from "pages/Permissions";
import { PermissionsList } from "pages/PermissionsList";
import { Priorizacao } from "pages/Priorizacao";
import { Profile } from "pages/Profile";
import { Projects } from "pages/Projects";
import { ProjectsRegistration } from "pages/ProjectsRegistration";
import { ProvidersRegistration } from "pages/ProvidersRegistration";
import { Reports } from "pages/Reports";
import { Settings } from "pages/Settings";
import { ShareRegister } from "pages/ShareRegister";
import { Statistics } from "pages/Statistics";
import { StatisticsGantt } from "pages/StatisticsGantt";
import { UploadSheet } from "pages/UploadSheet";
import VisaoPorArea from "pages/VisaoPorArea";

export function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/graficos" element={<GráficosEstatisticos />} />
      <Route path="/projects-registration" element={<ProjectsRegistration />} />
      <Route
        path="/providers-registration"
        element={<ProvidersRegistration />}
      />
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
      <Route path="/upload" element={<UploadSheet />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/budgets" element={<Budgets />} />
      <Route path="/budget/detail/:id" element={<BudgetDetail />} />
      <Route path="/gantt" element={<GanttPage />} />
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
      <Route path="/budget2/detail/:id" element={<BudgetDetail2 />} />
      <Route path="/priorizacao" element={<Priorizacao />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
