import { GanttComponent, TaskFieldsModel } from "@syncfusion/ej2-react-gantt";

export interface SubTaskGantt {
  taskID: number;
  taskName: string;
  startDate: Date;
  duration: number;
  progress: number;
  predeceesor?: string;
}

export interface GanttData {
  taskID: number;
  taskName: string;
  startDate: Date;
  endDate: Date;
  subtasks: SubTaskGantt[];
}

type Props = {
  data: GanttData[];
};

function GenericGantt({ data }: Props) {
  const taskValues: TaskFieldsModel = {
    id: "taskID",
    name: "taskName",
    startDate: "startDate",
    endDate: "endDate",
    duration: "duration",
    progress: "progress",
    child: "subtasks",
    dependency: "predeceesor",
  };

  return (
    <>
      <GanttComponent
        dataSource={data}
        taskFields={taskValues}
      ></GanttComponent>
    </>
  );
}

export default GenericGantt;
