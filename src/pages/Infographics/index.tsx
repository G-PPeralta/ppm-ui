import { useState } from 'react';

import {
  Box,
  Button,
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

  const infoColunas = [
    {
      nome: 'SPT - 112',
    },
    {
      nome: 'SPT - 30',
    },
    {
      nome: 'SPT - 131',
    },
    {
      nome: 'SPT - 108',
    },
    {
      nome: 'SPT - 061',
    },
    // {
    //   nome: 'SC-XX',
    // },
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
              px={{ base: '4', sm: '6' }}
              w={useBreakpointValue({
                base: '100%',
                sm: '100%',
                md: '100%',
                lg: '100%',
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
              <Flex justify={'space-between'} gap={6} wrap={'wrap'} mb={4}>
                <Flex gap={2}>
                  <Button
                    variant="outline"
                    border={'2px solid'}
                    borderColor={'origem.500'}
                    textColor={'origem.500'}
                    _hover={{
                      borderColor: 'origem.600',
                      backgroundColor: 'origem.500',
                      textColor: 'white',
                      transition: 'all 0.4s',
                    }}
                  >
                    Sonda
                  </Button>
                  <Button
                    variant="outline"
                    border={'2px solid'}
                    borderColor={'origem.500'}
                    textColor={'origem.500'}
                    _hover={{
                      borderColor: 'origem.600',
                      backgroundColor: 'origem.500',
                      textColor: 'white',
                      transition: 'all 0.4s',
                    }}
                  >
                    Projeto
                  </Button>
                  <Button
                    variant="outline"
                    border={'2px solid'}
                    borderColor={'origem.500'}
                    textColor={'origem.500'}
                    _hover={{
                      borderColor: 'origem.600',
                      backgroundColor: 'origem.500',
                      textColor: 'white',
                      transition: 'all 0.4s',
                    }}
                  >
                    Atividade
                  </Button>
                </Flex>
                <Flex gap={4} wrap={'wrap'}>
                  {statusProjeto.map((status, index) => (
                    <StatusProjeto
                      key={index}
                      status={status.status}
                      color={status.color}
                    />
                  ))}
                </Flex>
              </Flex>
              <Flex direction={'row'} gap={10} justify={'center'} wrap={'wrap'}>
                {infoColunas.map((column) => (
                  <ColumnSPT column={column} />
                ))}
              </Flex>
            </Box>
          </Flex>
        </Stack>
      </Sidebar>
    </>
  );
}
