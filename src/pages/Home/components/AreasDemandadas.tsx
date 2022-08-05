import { useEffect, useState } from 'react';

import {
  Box,
  Flex,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { AreasDemandadas } from 'interfaces/Services';

import PercentPieChart from 'components/PercentPieChart';
import StackedBarChart from 'components/StackedBarChart';

import { getAreasDemandadas } from 'services/get/Dashboard';

export default function AreasDemandadasComponent() {
  const [areasDemandadas, setAreasDemandadas] = useState<AreasDemandadas[]>(
    [] as AreasDemandadas[],
  );
  async function handleGetAreasDemandadas() {
    const reqGet = await getAreasDemandadas();

    const dataReq: AreasDemandadas[] = reqGet.data;

    setAreasDemandadas(dataReq);
  }

  useEffect(() => {
    handleGetAreasDemandadas();
  }, []);

  useEffect(() => {
    // console.log(areasDemandadas);
  }, [areasDemandadas]);

  const grafData1 = [
    {
      name: 'Undone',
      value: 70,
      color: '#A8C1FF',
    },
    {
      name: 'Done',
      value: 30,
      color: '#2E69FD',
    },
  ];

  const grafData2 = [
    {
      name: 'Undone',
      value: 70,
      color: '#9fed9f',
    },
    {
      name: 'Done',
      value: 30,
      color: '#428542',
    },
  ];

  const grafData3 = [
    {
      name: 'Undone',
      value: 70,
      color: '#FFB1B1',
    },
    {
      name: 'Done',
      value: 30,
      color: '#F94144',
    },
  ];

  const grafData4 = [
    {
      name: 'Undone',
      value: 70,
      color: '#FFF8BC',
    },
    {
      name: 'Done',
      value: 30,
      color: '#F8E854',
    },
  ];

  const dataMock = [
    {
      month: 'Jan/22',
      SMS: 70,
      Regulatório: 10,
      Operação: 10,
      Outros: 10,
    },
    {
      month: 'Fev/22',
      SMS: 10,
      Regulatório: 70,
      Operação: 10,
      Outros: 10,
    },
    {
      month: 'Mar/22',
      SMS: 10,
      Regulatório: 10,
      Operação: 70,
      Outros: 10,
    },
    {
      month: 'Abr/22',
      SMS: 10,
      Regulatório: 10,
      Operação: 10,
      Outros: 70,
    },
  ];

  const dataEntries = [
    { name: 'SMS', color: '#2E69FD' },
    { name: 'Regulatório', color: '#93E01B' },
    { name: 'Operação', color: '#F94144' },
    { name: 'Outros', color: '#F4DD06' },
  ];

  return (
    <Stack spacing="8">
      <Flex
        w={useBreakpointValue({ base: '100%', md: 'fit-content' })}
        align="center"
        justify="center"
        bg={useBreakpointValue({ base: '#EDF2F7', sm: '#EDF2F7' })}
      >
        <Box
          py={{ base: '0', sm: '4' }}
          px={{ base: '0', sm: '4' }}
          w="fit-content"
          bg={useBreakpointValue({ base: 'white', sm: 'white' })}
          boxShadow={{
            base: 'none',
            sm: useColorModeValue('md', 'md-dark'),
          }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Box w={300} h={230}>
            <Text
              mb={1}
              sx={{ fontSize: 18, fontWeight: '600', alignSelf: 'center' }}
              color="#000000"
            >
              Áreas Demandadas
            </Text>
            <Box display={'flex'} w={'100%'} justifyContent="space-between">
              <Box ml={-4} pt={6}>
                <StackedBarChart
                  showY={false}
                  sizeW={180}
                  sizeH={180}
                  data={dataMock}
                  dataEntries={dataEntries}
                  barW={20}
                />
              </Box>
              <Box w={150}>
                <Box
                  mb={1}
                  display="flex"
                  w={'100%'}
                  justifyContent="space-between"
                >
                  <Box
                    w={150}
                    display={'flex'}
                    flexDirection="column"
                    alignItems={'center'}
                  >
                    <Text
                      mb={2}
                      sx={{
                        fontSize: 14,
                        fontWeight: '600',
                        alignSelf: 'center',
                      }}
                      color="#2E69FD"
                    >
                      SMS
                    </Text>
                    <PercentPieChart
                      size={60}
                      upDown={false}
                      data={grafData1}
                    />
                  </Box>
                  <Box
                    w={150}
                    display={'flex'}
                    flexDirection="column"
                    alignItems={'center'}
                  >
                    <Text
                      mb={2}
                      sx={{
                        fontSize: 14,
                        fontWeight: '600',
                        alignSelf: 'center',
                      }}
                      color="#93E01B"
                    >
                      Regulatório
                    </Text>
                    <PercentPieChart size={60} upDown={true} data={grafData2} />
                  </Box>
                </Box>
                <Box
                  mt={8}
                  mb={1}
                  display="flex"
                  w={'100%'}
                  justifyContent="space-between"
                >
                  <Box
                    w={150}
                    display={'flex'}
                    flexDirection="column"
                    alignItems={'center'}
                  >
                    <PercentPieChart size={60} upDown={true} data={grafData3} />
                    <Text
                      mt={2}
                      sx={{
                        fontSize: 14,
                        fontWeight: '600',
                        alignSelf: 'center',
                      }}
                      color="#F94144"
                    >
                      Operação
                    </Text>
                  </Box>
                  <Box
                    w={150}
                    display={'flex'}
                    flexDirection="column"
                    alignItems={'center'}
                  >
                    <PercentPieChart size={60} upDown={true} data={grafData4} />
                    <Text
                      mt={2}
                      sx={{
                        fontSize: 14,
                        fontWeight: '600',
                        alignSelf: 'center',
                      }}
                      color="#F4DD06"
                    >
                      Outros
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Stack>
  );
}
