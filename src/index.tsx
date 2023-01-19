// CRIADO EM: 10/06/2022
// AUTOR: ALEXANDRE BRITO
// DESCRIÇÃO DO ARQUIVO: ARQUIVO RAIZ DA APLICAÇÃO, RESPONSÁVEL POR INICIAR A APLICAÇÃO COM AS ROTAS PRINCIPAIS, PROVIDERS E CONFIGURAÇÕES GLOBAIS

import * as ReactDOM from "react-dom/client";

import { ChakraProvider } from "@chakra-ui/react";
import {
  L10n,
  loadCldr,
  registerLicense,
  setCulture,
  setCurrencyCode,
} from "@syncfusion/ej2-base";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import theme from "theme/index";

import { App } from "./App";
import * as cagregorian from "./ca-gregorian.json";
import * as numbers from "./numbers.json";
loadCldr(cagregorian, numbers);

setCulture("es");

L10n.load({
  es: {
    grid: {
      EmptyRecord: "Nenhum cronograma encontrado",
    },
    gantt: {
      emptyRecord: "Nenhum cronograma encontrado",
      id: "CARTEIRA DE IDENTIDADE",
      name: "Nome",
      startDate: "Data de início",
      endDate: "Data final",
      duration: "Duração",
      progress: "Progresso",
      dependency: "Dependência",
      notes: "Notas",
      baselineStartDate: "Data  de início de referência",
      baselineEndDate: "Data  de finalização da linha de base",
      type: "Tipo",
      offset: "Compensar",
      resourceName: "Recursos",
      resourceID: "ID de recurso",
      day: "dia",
      hour: "hora",
      minute: "minuto",
      days: "dias",
      hours: "horas",
      minutes: "minutos",
      generalTab: "Guia geral",
      customTab: "Colunas personalizadas",
      writeNotes: "Anotações",
      addDialogTitle: "Nova informação de tarefa",
      editDialogTitle: "Editar informação de tarefa",
      saveButton: "Salvar",
      add: "Adicionar",
      edit: "Editar",
      update: "Atualizar",
      delete: "Deletar",
      cancel: "Cancelar",
      search: "Buscar",
      addTask: "Adicionar tarefa",
      editTask: "Editar tarefa",
      deleteTask: "Deletar tarefa",
      expandAllTasks: "Expandir todas as tarefas",
      collapseAllTasks: "Minimizar todas as tarefas",
      expandAll: "Expandir tudo",
      collapseAll: "Minimizar tudo",
      nextTimeSpan: "Próximo intervalo de tempo",
      prevTimeSpan: "Período de tempo anterior",
      okText: "Okay",
      confirmDelete: "Tem certeza que quer eliminar o registro?",
      from: "Desde",
      to: "A",
      taskLink: "Link de tarefas",
      lag: "Atraso",
      start: "Começar",
      finish: "Terminar",
      enterValue: "Inserir valor",
    },
  },
});

setCurrencyCode("BRL");

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

registerLicense(`${process.env.REACT_APP_SYNCFUSION_KEY}`);

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </QueryClientProvider>
);
