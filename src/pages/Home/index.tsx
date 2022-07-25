import Sidebar from 'components/SideBar';
import StackedBarChart from 'components/StackedBarChart';

export function Home() {
  return (
    <>
      <Sidebar>
        <StackedBarChart />
      </Sidebar>
    </>
  );
}
