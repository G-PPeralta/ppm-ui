// CRIADO EM: --
// AUTOR:Não é possível apontar o criador, uma vez que cada rota foi feita pelo desenvolvedor da tela em questão
// DESCRIÇÃO DO ARQUIVO: Rotas privadas vinculadas às telas do sistema.

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
import Feriados from "pages/Feriados";
import { FinanceiroProjetos } from "pages/FinanceiroProjetos";
import GanttCampanha from "pages/GanttCampanha";
import { GráficosEstatisticos } from "pages/GraficosEstatisticos";
import { Home } from "pages/Home";
import { Import } from "pages/Import";
import { Infographics } from "pages/Infographics";
import { LicoesAprendidasProjetos } from "pages/LicoesAprendidas";
import { Fornecedores } from "pages/ListaDosFornecedores";
import { TabelaLixeira } from "pages/Lixeira";
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
// import { RegisteredList } from "pages/Trash";
import { ActionItems } from "pages/Trash/actionItems";
import { Trash } from "pages/Trash/trash";
import { Usuarios } from "pages/Usuarios";
import VisaoPorArea from "pages/VisaoPorArea";

import { DetalhamentoProjetoProvider } from "contexts/DetalhamentoDeProjetos";
import { FeriadosProvider } from "contexts/Feriados";

export function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/graficos-estatisticos" element={<GráficosEstatisticos />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/projetos/cadastro" element={<CadastrarProjeto />} />
      <Route path="/cadastrar-fornecedor" element={<CadastrarFornecedor />} />
      <Route
        path="/activities-registration"
        element={<ActivitiesRegistration />}
      />
      <Route path="/share-register" element={<ShareRegister />} />
      <Route path="/relatorios" element={<Reports />} />
      <Route path="/campanhas" element={<Infographics />} />
      <Route path="/permissoes" element={<PermissionsList />} />
      <Route path="permissoes/:id" element={<Permissions />} />
      <Route path="/configuracoes" element={<Settings />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="/upload" element={<Import />} />
      <Route path="/projetos" element={<Projects />} />
      <Route path="/financeiro-intervencoes" element={<Budgets />} />
      <Route path="/financeiro/detalhamento/:id" element={<BudgetDetail />} />
      <Route path="/fornecedores" element={<Fornecedores />} />
      <Route
        path="/detalhamento/:id"
        element={
          <DetalhamentoProjetoProvider>
            <DetalhamentoProjeto />
          </DetalhamentoProjetoProvider>
        }
      />
      <Route
        path="/feriados"
        element={
          <FeriadosProvider>
            <Feriados />
          </FeriadosProvider>
        }
      />
      <Route path="/atividade/:id" element={<ActivitiesSchedule />} />
      <Route path="/lookahead" element={<Lookahead />} />
      <Route
        path="/lookahead-detalhamento/:id"
        element={<LookaheadDetalhe />}
      />
      <Route path="/campanhas/atividade/:id" element={<ActivitiesSchedule />} />
      <Route
        path="/campanhas/atividade/:id/precedentes"
        element={<ActivitiesPrecedents />}
      />
      <Route
        path="/campanhas/atividade/:id/visao-por-area"
        element={<VisaoPorArea />}
      />
      <Route path="/gantt-campanha" element={<GanttCampanha />} />
      <Route path="/licoes-aprendidas" element={<LicoesAprendidasProjetos />} />
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
      {/* <Route path="/registered-list" element={<RegisteredList />} /> */}
      <Route path="/actions/:id" element={<ActionItems />} />
      <Route path="/lixeira" element={<TabelaLixeira />} />
      <Route path="/trash" element={<Trash />} />
      <Route path="/priorizacao-diretores" element={<PriorizacaoDiretores />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
