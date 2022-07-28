import { Box } from '@chakra-ui/react';
import Sidebar from 'components/SideBar';

import AreasDemandadas from './components/AreasDemandadas';
import FaseProjetos from './components/FaseProjetos';
import NaoPrevisto from './components/NaoPrevisto';
import Projetos from './components/Projetos';
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
        <Box mt={5} sx={{ display: 'flex' }}>
          <Projetos />
          <Box ml={5}>
            <FaseProjetos />
          </Box>
          <Box ml={5}>
            <AreasDemandadas />
          </Box>
        </Box>
      </Sidebar>
    </>
  );
}
