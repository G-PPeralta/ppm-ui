import { useEffect, useState } from 'react';

import { GanttComponent, Inject, Edit } from '@syncfusion/ej2-react-gantt';
import { IGantt } from 'interfaces/Services';

import { getGanttData } from 'services/get/Gantt';

export function Gantt() {
  const [ganttData, setGanttData] = useState<IGantt>({} as IGantt);
  const [loading, setLoading] = useState(true);

  async function handleSetGanttData() {
    const reqGanttData = await getGanttData();
    setGanttData(reqGanttData.data);
  }

  useEffect(() => {
    handleSetGanttData();
  }, []);

  useEffect(() => {
    console.log(ganttData);
    setLoading(false);
  }, [ganttData]);

  // const ganttData = [
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
  //   },
  //   {
  //     TaskID: 5,
  //     Item: '2',
  //     TaskName: 'Projeto 2',
  //     StartDate: new Date('07/11/2022'),
  //     EndDate: new Date('07/11/2023'),
  //     subtasks: [
  //       {
  //         TaskID: 6,
  //         Item: '2.1',
  //         TaskName: 'Ação 1',
  //         StartDate: new Date('07/11/2022'),
  //         Duration: 3,
  //         Progress: 50,
  //         Predecessor: `${4}FS`,
  //       },
  //       {
  //         TaskID: 7,
  //         Item: '2.2',
  //         TaskName: 'Ação 2',
  //         StartDate: new Date('07/11/2022'),
  //         Duration: 3,
  //         Progress: 50,
  //         Predecessor: `${6}FS`,
  //       },
  //       {
  //         TaskID: 8,
  //         Item: '2.3',
  //         TaskName: 'Ação 3',
  //         StartDate: new Date('07/11/2022'),
  //         Duration: 3,
  //         Progress: 50,
  //         Predecessor: `${7}FS`,
  //       },
  //     ],
  //   },
  // ];
  return (
    <>
      {!loading && (
        <GanttComponent
          id="gantt-control"
          dataSource={ganttData.macroatividades.map((macroatividade) => ({
            TaskID: macroatividade.macroatividade_id,
            Item: macroatividade.macroatividade_item,
            TaskName: macroatividade.macroatividade_nome,
            subtasks: macroatividade.micro.map((microatividade) => ({
              id: microatividade.macroatividade_id,
              item: microatividade.item,
              name: microatividade.nome_projeto,
              startDate: microatividade.data_inicio,
              endDate: microatividade.data_fim,
              duration: microatividade.duracao,
              progress: Number(microatividade.progresso),
            })),
          }))}
          taskFields={{
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            child: 'subtasks',
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
          editSettings={{
            allowTaskbarEditing: false,
            allowEditing: true,
          }}
          height={'100vh'}
          // columns={[
          //   { field: 'Item', type: 'string' },
          //   {
          //     field: 'TaskID',
          //     headerText: 'ID',
          //     visible: true,
          //   },
          //   {
          //     field: 'TaskName',
          //     headerText: 'Ação/Projeto',
          //     headerTextAlign: 'Center',
          //     textAlign: 'Center',
          //     type: 'string',
          //   },
          //   {
          //     field: 'StartDate',
          //     headerText: 'Data Início',
          //     headerTextAlign: 'Center',
          //     textAlign: 'Center',
          //     format: 'dd/MM/yyyy',
          //   },
          //   {
          //     field: 'EndDate',
          //     headerText: 'Data Fim',
          //     headerTextAlign: 'Center',
          //     textAlign: 'Center',
          //     format: 'dd/MM/yyyy',
          //   },
          //   {
          //     field: 'Duration',
          //     headerText: 'Duração',
          //     headerTextAlign: 'Center',
          //     textAlign: 'Center',
          //   },
          //   {
          //     field: 'Progress',
          //     headerText: 'Progresso (%)',
          //     headerTextAlign: 'Center',
          //     textAlign: 'Center',
          //     format: 'n',
          //   },
          //   {
          //     field: 'Predecessor',
          //     headerText: 'Predecessor',
          //     headerTextAlign: 'Center',
          //     textAlign: 'Center',
          //   },
          // ]}
        >
          <Inject services={[Edit]} />
        </GanttComponent>
      )}
    </>
  );
}
