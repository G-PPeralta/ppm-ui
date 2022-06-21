import { GanttComponent, Inject, Edit } from '@syncfusion/ej2-react-gantt';

import Sidebar from 'components/SideBar';

export function Home() {
  const GanttData = [
    {
      TaskID: 1,
      TaskName: 'Project Initiation',
      StartDate: new Date('04/02/2019'),
      EndDate: new Date('04/21/2019'),
      subtasks: [
        {
          TaskID: 2,
          TaskName: 'Identify Site location',
          StartDate: new Date('04/02/2019'),
          Duration: 4,
          Progress: 50,
        },
        {
          TaskID: 3,
          TaskName: 'Perform Soil test',
          StartDate: new Date('04/02/2019'),
          Duration: 4,
          Progress: 50,
          Predecessor: '2FS',
        },
        {
          TaskID: 4,
          TaskName: 'Soil test approval',
          StartDate: new Date('04/02/2019'),
          Duration: 4,
          Progress: 50,
        },
      ],
    },
    {
      TaskID: 5,
      TaskName: 'Project Estimation',
      StartDate: new Date('04/02/2019'),
      EndDate: new Date('04/21/2019'),
      subtasks: [
        {
          TaskID: 6,
          TaskName: 'Develop floor plan for estimation',
          StartDate: new Date('04/04/2019'),
          Duration: 3,
          Progress: 50,
        },
        {
          TaskID: 7,
          TaskName: 'List materials',
          StartDate: new Date('04/04/2019'),
          Duration: 3,
          Progress: 50,
        },
        {
          TaskID: 8,
          TaskName: 'Estimation approval',
          StartDate: new Date('04/04/2019'),
          Duration: 3,
          Progress: 50,
          Predecessor: '7SS',
        },
      ],
    },
  ];

  return (
    <>
      <Sidebar>
        <GanttComponent
          id="gantt-control"
          dataSource={GanttData}
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
          editSettings={{
            allowTaskbarEditing: true,
          }}
          height={'100vh'}
        >
          <Inject services={[Edit]} />
        </GanttComponent>
      </Sidebar>
    </>
  );
}
