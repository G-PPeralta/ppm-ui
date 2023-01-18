//  CRIADO EM: 7/2022
//  AUTOR: Yolanda Ferreira.
//  DESCRIÇÃO DO ARQUIVO: Gráfico Gantt para relatórios

import { useEffect, useState } from "react";

import { Flex } from "@chakra-ui/react";
import {
  GanttComponent,
  Inject,
  Edit,
  Toolbar,
} from "@syncfusion/ej2-react-gantt";
import { Ring } from "@uiball/loaders";

import { getAllGanttData } from "services/get/Gantt";

import "./gantt.css";

export function Gantt() {
  const [loading, setLoading] = useState(true);
  const [gantt, setGantt] = useState<any[]>([]);

  const rowDataBound = (args: any) => {
    if (args.data.hasChildRecords) {
      args.row.style.fontWeight = 500;
    }
  };

  async function handleSetGanttData() {
    const reqGanttData = await getAllGanttData();
    if (!reqGanttData) return;
    setGantt(reqGanttData.data);
    setLoading(false);
  }

  useEffect(() => {
    handleSetGanttData();
  }, []);

  return (
    <>
      {loading ? (
        <Flex justify={"center"} gap={4} w={"100%"}>
          <Ring speed={2} lineWeight={5} color="blue" size={24} />
        </Flex>
      ) : (
        <GanttComponent
          id="gantt-control"
          dataSource={gantt}
          taskFields={{
            id: "TaskID",
            name: "TaskName",
            startDate: "StartDate",
            endDate: "EndDate",
            duration: "Duration",
            progress: "Progress",
            dependency: "Predecessor",
            child: "subtasks",
          }}
          toolbar={["ZoomIn", "ZoomOut"]}
          renderBaseline={true}
          baselineColor="red"
          editSettings={{
            allowEditing: true,
            mode: "Auto",
            allowTaskbarEditing: false,
          }}
          selectionSettings={{
            mode: "Cell",
            type: "Single",
            enableToggle: true,
          }}
          splitterSettings={{
            position: "80%",
          }}
          rowDataBound={rowDataBound}
          height={"100vh"}
          columns={[
            { field: "Item", type: "string" },
            {
              field: "TaskID",
              headerText: "ID",
              visible: false,
            },
            {
              field: "TaskName",
              headerText: "Ação/Projeto",
              headerTextAlign: "Center",
              textAlign: "Center",
              type: "string",
            },
            {
              field: "StartDate",
              headerText: "Início real",
              headerTextAlign: "Center",
              textAlign: "Center",
              format: "dd/MM/yyyy",
            },
            {
              field: "EndDate",
              headerText: "Fim real",
              headerTextAlign: "Center",
              textAlign: "Center",
              format: "dd/MM/yyyy",
            },
            {
              field: "Duration",
              headerText: "Duração",
              headerTextAlign: "Center",
              textAlign: "Center",
            },
            {
              field: "Progress",
              headerText: "Progresso (%)",
              headerTextAlign: "Center",
              textAlign: "Center",
              format: "n",
            },
            {
              field: "Predecessor",
              headerText: "Predecessor",
              headerTextAlign: "Center",
              textAlign: "Center",
            },
          ]}
        >
          <Inject services={[Edit, Toolbar]} />
        </GanttComponent>
      )}
    </>
  );
}
