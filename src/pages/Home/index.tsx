import { Gantt } from 'components/Gantt';
import Sidebar from 'components/SideBar';

export function Home() {
  return (
    <>
      <Sidebar>
        <Gantt></Gantt>
      </Sidebar>
    </>
  );
}
