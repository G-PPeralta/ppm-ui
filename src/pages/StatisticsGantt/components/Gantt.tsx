import { useEffect, useState } from "react";

import {
  GanttComponent,
  Inject,
  Edit,
  Toolbar,
} from "@syncfusion/ej2-react-gantt";
import { StatisticsGanttProps } from "interfaces/Services";

type ganttOptionsProps = {
  data: StatisticsGanttProps[] | undefined; // TODO: tirar undefined
  toolbarOptions?: string[];
};

export function Gantt({ data, toolbarOptions }: ganttOptionsProps) {
  // const [ganttData, setGanttData] = useState<IGantt>({} as IGantt);
  const [loading, setLoading] = useState(true);
  const [ganttData, setGanttData] = useState<StatisticsGanttProps[]>();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [ganttData]);

  useEffect(() => {
    setGanttData(data);
  }, [data]);

  const queryTaskbarInfo = (args: any) => {
    if (args.data.taskData.color === "black") {
      // black (duração > média + desvio padrão)
      args.progressBarBgColor = "rgb(45, 41, 38)"; //     #2D2926
      args.taskbarBgColor = "rgb(115, 115, 115)"; // #737373 //
      args.taskbarBorderColor = "white";
    } else if (args.data.taskData.color === "red") {
      // red (duração >  média + DP/2)
      args.progressBarBgColor = "rgb(244, 6, 6)";
      args.taskbarBgColor = "rgb(255, 124, 124)";
      args.taskbarBorderColor = "white";
    } else if (args.data.taskData.color === "yellow") {
      // yellow (duração >  média - DP)
      args.progressBarBgColor = "rgb(244, 221, 6)";
      args.taskbarBgColor = "rgb(255, 245, 154)";
      args.taskbarBorderColor = "white";
    } else if (args.data.taskData.color === "green") {
      // green (duração < média - DP)
      args.progressBarBgColor = "rgb(5, 149, 2)";
      args.taskbarBgColor = "rgb(147, 224, 27)";
      args.taskbarBorderColor = "white";
    }
  };

  const labelSettings = {
    // leftLabel: "TaskID",
    // taskLabel: "${Progress}%",
    // eslint-disable-next-line no-template-curly-in-string
    rightLabel: "Task Name: ${TaskName}",
  };

  return (
    <>
      {!loading && (
        <GanttComponent
          id="gantt-control"
          dataSource={ganttData}
          taskFields={{
            id: "TaskID",
            name: "TaskName",
            startDate: "StartDate",
            endDate: "EndDate",
            // baselineStartDate: "BaselineStartDate",
            // baselineEndDate: "BaselineEndDate",
            duration: "Duration",
            progress: "Progress",
            child: "subtasks",
            // parentID: "ParentId",
          }}
          queryTaskbarInfo={queryTaskbarInfo}
          labelSettings={labelSettings}
          durationUnit={"Hour"}
          toolbar={toolbarOptions || []}
          editSettings={{
            allowTaskbarEditing: false,
          }}
          height={"100vh"}
          columns={[
            // {
            //   field: "item",
            //   headerText: "Item",
            //   type: "string",
            //   visible: false,
            // },
            {
              field: "TaskID",
              headerText: "ID",
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
              field: "BaselineStartDate",
              headerText: "Início planejado",
              headerTextAlign: "Center",
              textAlign: "Center",
              format: "dd/MM/yyyy",
              type: "date",
            },
            {
              field: "BaselineEndDate",
              headerText: "Fim planejado",
              headerTextAlign: "Center",
              textAlign: "Center",
              format: "dd/MM/yyyy",
              type: "date",
            },
            {
              field: "Duration",
              headerText: "Duração real",
              headerTextAlign: "Center",
              textAlign: "Center",
            },
            {
              field: "BaselineDuration",
              headerText: "Duração planejada",
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
            // {
            //   field: "ParentID",
            //   headerText: "Pai",
            //   headerTextAlign: "Center",
            //   textAlign: "Center",
            // },
          ]}
        >
          <Inject services={[Edit, Toolbar]} />
        </GanttComponent>
      )}
    </>
  );
}
