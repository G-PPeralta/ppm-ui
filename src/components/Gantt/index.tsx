import { useEffect, useState } from "react";

import {
  GanttComponent,
  Inject,
  Edit,
  Toolbar,
} from "@syncfusion/ej2-react-gantt";
import { IGantt, GanttProps } from "interfaces/Services";

import { getGanttData } from "services/get/Gantt";

type ganttOptionsProps = {
  toolbarOptions?: string[];
};
export function Gantt({ toolbarOptions }: ganttOptionsProps) {
  // const [ganttData, setGanttData] = useState<IGantt>({} as IGantt);
  const [loading, setLoading] = useState(true);
  const [gantt, setGantt] = useState<GanttProps[]>();

  function ganttFormatter(gantt: IGantt) {
    if (!gantt) return;

    const _gantt = gantt.macroatividades;
    const newGantt = _gantt.map(
      ({
        macroatividade_id,
        macroatividade_nome,
        macroatividade_item,
        data_inicio,
        duracao,
        micro,
        progresso,
      }) => ({
        TaskID: macroatividade_id,
        Item: macroatividade_item,
        TaskName: macroatividade_nome,
        StartDate: data_inicio,
        Duration: duracao,
        Progress: progresso,
        subtasks: micro?.map(
          ({
            macroatividade_id,
            macroatividade_item,
            macroatividade_nome,
            data_inicio,
            item,
            nome_atividade,
            microatividade_id,
            progresso,
            duracao,
          }) => ({
            TaskID: microatividade_id || 0,
            TaskName: nome_atividade || "",
            Item: item || "",
            Duration: duracao,
            Progress: progresso,
            StartDate: data_inicio,
          })
        ),
      })
    );
    setGantt(newGantt);
  }

  async function handleSetGanttData() {
    const reqGanttData = await getGanttData();
    if (!reqGanttData) return;
    const _gantt: IGantt = reqGanttData.data;
    // setGanttData(_gantt);
    ganttFormatter(_gantt);
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [gantt]);

  useEffect(() => {
    handleSetGanttData();
  }, []);

  // useEffect(() => {
  //   console.log(ganttData);
  // }, [ganttData]);

  // const ganttDataLocal = ganttData.macroatividades?.map((gantt) => ({
  //   TaskId: gantt.macroatividade_id,
  //   Item: gantt.macroatividade_item,
  //   TaskName: gantt.macroatividade_nome,
  //   subtasks: gantt.micro?.map((micro) => ({
  //     TaskID: micro.microatividade_id,
  //     Item: micro.item,
  //     TaskName: micro.nome_atividade,
  //     StartDate: micro.data_inicio,
  //     Duration: micro.duracao,
  //     Progress: micro.progresso,
  //   })),
  // }));

  // console.log(ganttDataLocal);

  // const ganttDataLocal = [
  //   {
  //     TaskID: 1,
  //     Item: '1',
  //     TaskName: 'Projeto 1',
  //     subtasks: [
  //       {
  //         TaskID: 2,
  //         Item: '1.1',
  //         TaskName: 'Ação 1',
  //         StartDate: new Date('07/11/2022'),
  //         Duration: 4,
  //         Progress: 70,
  //       },
  //       {
  //         TaskID: 3,
  //         Item: '1.2',
  //         TaskName: 'Ação 2',
  //         StartDate: new Date('07/11/2022'),
  //         Duration: 4,
  //         Progress: 50,
  //         Predecessor: `${2}FS`,
  //       },
  //       {
  //         TaskID: 4,
  //         Item: '1.3',
  //         TaskName: 'Ação 3',
  //         StartDate: new Date('07/11/2022'),
  //         Duration: 4,
  //         Progress: 50,
  //         Predecessor: `${3}FS`,
  //       },
  //     ],
  //     StartDate: null,
  //     Duration: null,
  //   },
  //   {
  //     TaskID: 8,
  //     Item: '2.3',
  //     TaskName: 'Ação 3',
  //     StartDate: new Date('07/11/2022'),
  //     Duration: 3,
  //     Progress: 80,
  //     Predecessor: `${7}FS`,
  //   },
  // ];
  return (
    <>
      {!loading && (
        <>
          <header
            style={{
              display: "flex",
              borderBottom: "1px solid black",
              background: "white",
              height: "64px",
              alignItems: "center",
              borderRadius: "8px 8px 0px 0px",
            }}
          >
            <p
              style={{
                fontFamily: "Mulish",
                fontWeight: 700,
                fontSize: "24px",
                marginLeft: "15px",
              }}
            >
              Gráfico Gantt
            </p>
          </header>
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
            // taskFields={ganttData.macroatividades.map((macroatividade) => ({
            //   id: macroatividade.macroatividade_id,
            //   item: macroatividade.macroatividade_item,
            //   name: macroatividade.macroatividade_nome,
            //   child: macroatividade.micro.map((microatividade) => ({
            //     id: microatividade.macroatividade_id,
            //     item: microatividade.item,
            //     name: microatividade.nome_projeto,
            //     startDate: microatividade.data_inicio,
            //     endDate: microatividade.data_fim,
            //     duration: microatividade.duracao,
            //     progress: microatividade.progresso,
            //   })),
            // }))}
            toolbar={toolbarOptions || []}
            editSettings={{
              allowTaskbarEditing: false,
              allowEditing: true,
            }}
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
                headerText: "Data Início",
                headerTextAlign: "Center",
                textAlign: "Center",
                format: "dd/MM/yyyy",
              },
              {
                field: "EndDate",
                headerText: "Data Fim",
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
            {/* <footer
              style={{
                background: "white",
                height: "2px",
                borderRadius: "8px",
              }}
            ></footer> */}
            <Inject services={[Edit, Toolbar]} />
          </GanttComponent>
        </>
      )}
    </>
  );
}
