import { Gantt } from 'components/Gantt';
import ListDnD from 'components/ListDnD';
import SCurveChart from 'components/SCurveChart';
import Sidebar from 'components/SideBar';

export function GanttPage() {
  return (
    <>
      <Sidebar>
        <Gantt />
        <SCurveChart />
        <ListDnD />
      </Sidebar>
    </>
  );
}
