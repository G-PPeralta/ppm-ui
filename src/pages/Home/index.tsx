import { Box } from '@chakra-ui/react';

import PercentPieChart from 'components/PercentPieChart';
import PieChart from 'components/PieChart';
import Sidebar from 'components/SideBar';
import StackedBarChart from 'components/StackedBarChart';

import NaoPrevisto from './components/NaoPrevisto';
import Realizado from './components/Realizado';
import TotalOrcamentos from './components/TotalOrcamentos';
import TotalProjetos from './components/TotalProjetos';

export function Home() {
  return (
    <>
      <Sidebar>
        <Box sx={{ display: 'flex' }}>
          <TotalProjetos />
          <Box
            ml={5}
            sx={{ height: 'auto' }}
            display="flex"
            flexDirection={'column'}
            justifyContent="space-evenly"
          >
            <TotalOrcamentos />
            <Realizado />
            <NaoPrevisto />
          </Box>
        </Box>

        <StackedBarChart />
        <PieChart />
        <PercentPieChart />
      </Sidebar>
    </>
  );
}
