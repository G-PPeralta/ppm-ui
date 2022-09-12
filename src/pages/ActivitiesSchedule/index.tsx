import { useEffect, useState } from 'react';

import { Box, Flex, Heading, Stack } from '@chakra-ui/react';
import { Ring } from '@uiball/loaders';

import Sidebar from 'components/SideBar';

import { Atividade } from 'services/get/ActivitiesSchedule';

import CardACT from './Components/CardACT';
import ExibirModal from './Components/ExibirModal';
import FiltrosModal from './Components/FiltrosModal';
import ModalCadastroAtividade from './Components/ModalCadastroAtividade';
import StatusProjeto from './Components/StatusProjeto';

export function ActivitiesSchedule() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

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
        {!loading ? (
          <Stack spacing="8">
            <Flex w={'auto'} align="center" justify="center" bg={'#EDF2F7'}>
              <Box
                py={{ base: '0', sm: '8' }}
                px={{ base: '4', sm: '6' }}
                w={'100%'}
                bg={'white'}
                borderRadius={{ base: 'none', sm: 'xl' }}
              >
                <Flex justify={'space-between'} mb={5}>
                  <Heading as="h3" size="md" mb={3}>
                    Acompanhamento de atividades
                  </Heading>
                  <Flex gap={4}>
                    <ExibirModal />
                    <FiltrosModal />
                  </Flex>
                </Flex>
                <Flex justify={'space-between'} gap={6} wrap={'wrap'} mb={4}>
                  <Flex gap={2}>
                    <ModalCadastroAtividade />
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
                <Flex direction={'row'} gap={4} py={4} wrap={'wrap'}>
                  {Atividade.map((atividade, index) => (
                    <Flex
                      key={index}
                      direction={'column'}
                      align={'center'}
                      justify={'center'}
                    >
                      <CardACT atividade={atividade} />
                    </Flex>
                  ))}
                </Flex>
              </Box>
            </Flex>
          </Stack>
        ) : (
          <Flex display={'flex'} align={'center'} justify={'center'} h={'90vh'}>
            <Ring speed={2} lineWeight={5} color="blue" size={64} />
          </Flex>
        )}
      </Sidebar>
    </>
  );
}
