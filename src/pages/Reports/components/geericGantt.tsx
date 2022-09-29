import { GanttComponent, TaskFieldsModel } from "@syncfusion/ej2-react-gantt";

export interface SubTaskGantt {
  taskID: number;
  taskName: string;
  startDate: Date;
  duration: number;
  progress: number;
  Predeceesor?: string;
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
    id: "TaskID",
    name: "TaskName",
    startDate: "StartDate",
    endDate: "EndDate",
    duration: "Duration",
    progress: "Progress",
    child: "subtasks",
    dependency: "Predeceesor",
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
