import { Box, Flex, useBreakpointValue, VStack } from '@chakra-ui/react';

import Sidebar from 'components/SideBar';

import AreasDemandadas from './components/AreasDemandadas';
import FaseProjetos from './components/FaseProjetos';
import NaoPrevisto from './components/NaoPrevisto';
import PrevistoxRealizado from './components/PrevistoxRealizado';
import Projetos from './components/Projetos';
import Realizado from './components/Realizado';
import TotalOrcamentos from './components/TotalOrcamentos';
import TotalProjetos from './components/TotalProjetos';

export function Home() {
  return (
    <>
      <Sidebar>
        <Flex
          w={useBreakpointValue({
            base: 'auto',
            md: '80%',
            lg: '60%',
            xl: '40%',
          })}
          display={'flex'}
          wrap={'wrap'}
          align="flex-start"
          justify="center"
          direction="column"
        >
          <VStack align="flex-start">
            <Box display={'flex'} flexShrink={0} flexWrap={'wrap'}>
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
            <Box mt={5}>
              <PrevistoxRealizado />
            </Box>
          </VStack>
        </Flex>
      </Sidebar>
    </>
  );
}
