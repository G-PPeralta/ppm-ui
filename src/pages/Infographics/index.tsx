import { useState } from 'react';

import {
  Box,
  Flex,
  Heading,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';

import Sidebar from 'components/SideBar';

import { InterrogacaoModal } from './Components/InterrogacaoModal';
import { RegisterProjectType } from './Components/RegisterProjectType';
import SelectExibir from './Components/SelectExibir';
import SelectFiltros from './Components/SelectFiltros';
import StatusAtrasado from './Components/StatusAtrasado';
import StatusConcluido from './Components/StatusConcluido';
import StatusEmAndamento from './Components/StatusEmAndamento';
import StatusNaoAplicavel from './Components/StatusNaoAplicavel';
import StatusNaoIniciado from './Components/StatusNaoIniciado';
export function Infographics() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  return (
    <>
      <Sidebar>
        <button onClick={() => setModalIsVisible(true)}>Modal</button>
        <RegisterProjectType
          isOpen={modalIsVisible}
          onClose={() => setModalIsVisible(false)}
        />
        <Stack spacing="8">
          <Flex
            w={useBreakpointValue({ base: '100%', md: 'auto' })}
            align="center"
            justify="center"
            bg={useBreakpointValue({ base: 'white', sm: '#EDF2F7' })}
          >
            <Box
              py={{ base: '0', sm: '6' }}
              px={{ base: '3', sm: '6' }}
              w={useBreakpointValue({
                base: '20rem',
                sm: '35rem',
                md: '60rem',
                lg: '80rem',
              })}
              bg={useBreakpointValue({ base: 'transparent', sm: 'white' })}
              boxShadow={{
                base: 'none',
                sm: useColorModeValue('md', 'md-dark'),
              }}
              borderRadius={{ base: 'none', sm: 'xl' }}
            >
              <Flex justify={'space-between'} mb={5}>
                <Heading as="h3" size="md" mb={3}>
                  Acompanhamento de poços
                </Heading>
                <Flex gap={4}>
                  <SelectExibir />
                  <SelectFiltros />
                </Flex>
              </Flex>
              <Flex gap={6} justify={'end'}>
                <StatusNaoAplicavel />
                <StatusNaoIniciado />
                <StatusConcluido />
                <StatusEmAndamento />
                <StatusAtrasado />
                <InterrogacaoModal />
              </Flex>
            </Box>
          </Flex>
        </Stack>
      </Sidebar>
    </>
  );
}
