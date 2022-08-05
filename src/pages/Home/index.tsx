import { Box, Flex, VStack } from '@chakra-ui/react';

import Sidebar from 'components/SideBar';

import AreasDemandadas from './components/AreasDemandadas';
import BotoesSelecionarPolo from './components/BotoesSelecionarPolo';
import FaseProjetos from './components/FaseProjetos';
import NaoPrevisto from './components/NaoPrevisto';
import PrevistoxRealizado from './components/PrevistoxRealizado';
import Projetos from './components/Projetos';
import Realizado from './components/Realizado';
import TotalOrcamentos from './components/TotalOrcamentos';
import TotalProjetos from './components/TotalProjetos';

const windowWidth = window.innerWidth;

export function Home() {
  return (
    <>
      <Sidebar>
        <BotoesSelecionarPolo />
        <Flex
          w={'auto'}
          display={'flex'}
          wrap={'wrap'}
          align="flex-start"
          justify="center"
          direction="column"
        >
          {windowWidth > 900 ? (
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
          ) : (
            <VStack align="space-between" w={'-webkit-fit-content'}>
              <TotalProjetos />
              <Box
                mt={2}
                display={'flex'}
                flexDirection={'row'}
                flexShrink={1}
                flexWrap={'wrap'}
              >
                <Box
                  // h={280}
                  mr={2}
                  display="flex"
                  flexDirection={'column'}
                  justifyContent="space-evenly"
                >
                  <TotalOrcamentos />
                  <Realizado />
                  <NaoPrevisto />
                </Box>
                <FaseProjetos />
              </Box>

              <Box mt={5} display="flex" flexDirection={'column'}>
                <Box
                  mt={2}
                  display={'flex'}
                  flexDirection={'row'}
                  flexShrink={0}
                  flexWrap={'wrap'}
                >
                  <Projetos />
                  <Box ml={2}>
                    <AreasDemandadas />
                  </Box>
                </Box>
              </Box>
              <Box mt={5}>
                <PrevistoxRealizado />
              </Box>
            </VStack>
          )}
        </Flex>
      </Sidebar>
    </>
  );
}
