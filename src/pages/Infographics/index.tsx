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

import ColumnSPT from './Components/ColumnSPT';
import ExibirModal from './Components/ExibirModal';
import FiltrosModal from './Components/FiltrosModal';
import { RegisterProjectType } from './Components/RegisterProjectType';
import StatusProjeto from './Components/StatusProjeto';

export function Infographics() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const arrayOfColumns = [0, 1, 2, 3, 4];

  const statusProjeto = [
    {
      status: 'Não Aplicável',
      color: '#F4DD06',
    },
    {
      status: 'Não Iniciado',
      color: '#FFB400',
    },
    {
      status: 'Concluído',
      color: '#059502',
    },
    {
      status: 'Em Andamento',
      color: '#0047BB',
    },
    {
      status: 'Atrasado',
      color: '#F40606',
    },
  ];

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
              py={{ base: '0', sm: '8' }}
              px={{ base: '4', sm: '8' }}
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
                  <ExibirModal />
                  <FiltrosModal />
                </Flex>
              </Flex>
              <Flex gap={6} justify={'end'} mb={6}>
                {statusProjeto.map((status, index) => (
                  <StatusProjeto
                    key={index}
                    status={status.status}
                    color={status.color}
                  />
                ))}
              </Flex>
              <Flex direction={'row'} gap={10} justify={'center'} wrap={'wrap'}>
                {arrayOfColumns.map((_column) => (
                  <ColumnSPT />
                ))}
              </Flex>
            </Box>
          </Flex>
        </Stack>
      </Sidebar>
    </>
  );
}
